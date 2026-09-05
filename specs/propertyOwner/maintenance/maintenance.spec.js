import { test, expect } from '@playwright/test';
import { userData } from '../../../mocks/common/userData.js';
import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
import { MenuPage } from '../../../pageObjects/poPortal/menu_page.js';
import { MaintenancePage } from '../../../pageObjects/poPortal/maintenance_page.js';

// Kept to 4 tests / 3 create-maintenance calls total, each combining what used to be several
// separate tickets into one - the create endpoint on QA has rate-limited this suite before
// (see project_qa_maintenance_create_403 in memory) when it ran more of them back to back.

//serial - test run one by one(Not in parallel)
test.describe.configure({ mode: 'serial' });

test.describe('Maintenance Tests - shared login', () => {
    let sharedPage;

    //login once before all tests in this file
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        sharedPage = await context.newPage();

        const loginPage = new LoginPage(sharedPage);
        await loginPage.goToLoginPage();
        await loginPage.login(userData.env.qa.poUsers.po2.userName, userData.env.qa.poUsers.po2.password);
    });

    //Navigate to the maintenance page before each test
    test.beforeEach(async () => {
        const menuPage = new MenuPage(sharedPage);
        await menuPage.navigateToMaintenancePage();
    });

    // give the app time to settle between tests before the next one starts
    test.afterEach(async () => {
        await sharedPage.waitForTimeout(2000);
    });

    // close the shared page after all tests in this file
    test.afterAll(async () => {
        await sharedPage.close();
    });

    test('Verify that the user can navigate to the Maintenance page and the ticket list renders', async () => {
        const maintenancePage = new MaintenancePage(sharedPage);
        await maintenancePage.waitForListLoaded();

        await expect(maintenancePage.list.newMaintenanceButton).toBeVisible();
        await expect(maintenancePage.list.firstRow).toBeVisible();
        const totalRecords = await maintenancePage.getTotalRecordCount();
        expect(totalRecords).toBeGreaterThan(0);
    });

    test('Verify that the user can add a new maintenance request with a photo, and it shows up in both the detail page and the list', async () => {
        const maintenancePage = new MaintenancePage(sharedPage);
        await maintenancePage.waitForListLoaded();

        const createdTicket = await maintenancePage.addMaintenance();
        expect(maintenancePage.getOpenTicketId()).not.toBeNull();

        const detail = await maintenancePage.getDetailSummary();
        expect(detail.name).toBe(createdTicket.ticketTitle);
        expect(detail.property).toContain(createdTicket.property);
        // addMaintenance now picks a random property, and plenty of QA properties have no
        // units at all - only assert the unit when one was actually available to pick.
        if (createdTicket.unit) {
            expect(detail.unit).toBe(createdTicket.unit);
        }
        await expect(maintenancePage.detail.description).toContainText(createdTicket.description);

        // addMaintenance attaches a photo by default - confirm it actually carried through to
        // the detail page's Photos section rather than just accepting the upload silently.
        await expect(maintenancePage.detail.noPhotoText).toBeHidden();
        await expect(maintenancePage.detail.photoGallery.locator('img')).toHaveCount(1);

        // Same ticket, not a second create - back to the list the way a user would get there
        // (the detail view keeps the list mounted beside it, so a reload wouldn't prove
        // anything a fresh navigation doesn't).
        const menuPage = new MenuPage(sharedPage);
        await menuPage.navigateToMaintenancePage();
        await maintenancePage.waitForListLoaded();
        await expect(maintenancePage.list.rowByTitle(createdTicket.ticketTitle)).toBeVisible({ timeout: 20000 });
    });

    test('Verify that the user can mark a maintenance request as resolved and then forward that same ticket to a vendor', async () => {
        const maintenancePage = new MaintenancePage(sharedPage);
        await maintenancePage.waitForListLoaded();

        const createdTicket = await maintenancePage.addMaintenance();

        await maintenancePage.markAsResolved({ note: 'Resolved by the automation suite.' });
        await expect(maintenancePage.detail.markAsResolved).toHaveText(/Reopen/);

        // Forwarding a resolved ticket is still a valid action in the app (Forward Maintenance
        // stays on the page after resolving) - one ticket covers both flows instead of two.
        await maintenancePage.forwardMaintenance();
        expect(maintenancePage.getOpenTicketId()).not.toBeNull();
        await expect(maintenancePage.detail.name).toHaveText(createdTicket.ticketTitle);
        await expect(maintenancePage.forwardForm.root).toBeHidden();
    });

    test('Verify that the user can set a recurring maintenance request to end on a calendar date 5 months from today', async () => {
        const maintenancePage = new MaintenancePage(sharedPage);
        await maintenancePage.waitForListLoaded();

        await maintenancePage.addMaintenance();
        const { endsOnLabel } = await maintenancePage.setRecurrence({ endsOnMonthsFromToday: 5 });

        // The recurring summary sentence computes its own "last occurrence" wording, which
        // can land a period before the exact Ends On date rather than echoing it verbatim -
        // so re-open the panel and check the persisted field directly instead of parsing
        // that sentence.
        await expect(maintenancePage.detail.recurringText).toContainText(/untill/i);

        await maintenancePage.detail.setReminder.click();
        await expect(maintenancePage.reminderForm.endsOnDatepicker).toHaveValue(endsOnLabel);
    });

});
