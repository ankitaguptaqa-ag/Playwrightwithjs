import { test, expect } from '@playwright/test';
import { userData } from '../../../mocks/common/userData.js';
import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
import { MenuPage } from '../../../pageObjects/poPortal/menu_page.js';
import { IncomePage } from '../../../pageObjects/poPortal/income_page.js';



test.describe.configure({ mode: 'serial' });

test.describe('Income Tests - shared login', () => {
    let sharedPage;

    
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        sharedPage = await context.newPage();

        const loginPage = new LoginPage(sharedPage);
        await loginPage.goToLoginPage();
        await loginPage.login(userData.env.qa.poUsers.po2.userName, userData.env.qa.poUsers.po2.password);
    });

    // Navigate to the income page before each test
    test.beforeEach(async () => {
        const menuPage = new MenuPage(sharedPage);
        await menuPage.navigateToIncomesPage();
    });

    
    test.afterEach(async () => {
        await sharedPage.waitForTimeout(2000);
    });

    
    test.afterAll(async () => {
        await sharedPage.close();
    });

    test('Verify that the user can start creating a new invoice', async () => {
        const incomePage = new IncomePage(sharedPage);
        await incomePage.createNewInvoice();
        await expect(incomePage.invoiceCreation.propertyDropdown).toBeVisible();
    });

    test('Verify that Property, Unit, and Term fields are present on the Create New Invoice form', async () => {
        const incomePage = new IncomePage(sharedPage);

        await incomePage.invoiceCreation.createNewInvoiceBtn.click();
        await incomePage.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });

        await expect(incomePage.invoiceCreation.propertyLabel).toBeVisible();
        await expect(incomePage.invoiceCreation.unitLabel).toBeVisible();
        await expect(incomePage.invoiceCreation.termLabel).toBeVisible();
    });

    test('Verify that a newly created invoice can be found via filters on the list page', async () => {
        const incomePage = new IncomePage(sharedPage);
        const menuPage = new MenuPage(sharedPage);

        const { propertyName } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByProperty(propertyName);

        await expect(incomePage.listing.propertyNameFirstRow).toHaveText(propertyName);

        // grouped view: first click expands the property group, second click opens the invoice
        await incomePage.listing.tableRows.first().click();
        await incomePage.listing.tableRows.nth(1).click();
        await expect(incomePage.detail.propertyName).toHaveText(propertyName);
    });

});
