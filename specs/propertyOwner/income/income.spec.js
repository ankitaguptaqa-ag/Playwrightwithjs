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
        await loginPage.login(userData.env.qa.poUsers.po1.userName, userData.env.qa.poUsers.po1.password);
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
        const loginPage = new LoginPage(sharedPage);
        await loginPage.logout();
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

        const { propertyName, unitName, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await expect(incomePage.listing.propertyNameFirstRow).toHaveText(propertyName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay);
        await expect(incomePage.detail.propertyName).toHaveText(propertyName);
    });

    test('Verify that all invoice details fields are visible on the details page', async () => {
        const incomePage = new IncomePage(sharedPage);
        const menuPage = new MenuPage(sharedPage);

        const { propertyName, unitName, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay);

        await expect(incomePage.detail.propertyName).toHaveText(propertyName);
        await expect(incomePage.detail.invoiceIdSpan).toBeVisible();
        await expect(incomePage.detail.subjectText).toBeVisible();
        await expect(incomePage.detail.sharedByText).toBeVisible();
        await expect(incomePage.detail.contactAddressText).toBeVisible();

        await expect(incomePage.detail.itemHeader).toBeVisible();
        await expect(incomePage.detail.descriptionHeader).toBeVisible();
        await expect(incomePage.detail.quantityHeader).toBeVisible();
        await expect(incomePage.detail.rateHeader).toBeVisible();
        await expect(incomePage.detail.amountHeader).toBeVisible();
        console.log('All invoice details fields are visible on the details page');
    });
    test('Verify that the user can edit an invoice from the details page', async () => {
     
        const incomePage = new IncomePage(sharedPage);
        const menuPage = new MenuPage(sharedPage);
        const { propertyName, unitName, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay);

        const newSubject = `Updated Subject ${Math.floor(Math.random() * 1000)}`;
        const newRate = '200';

        await incomePage.editInvoice({ subject: newSubject, rate: newRate });

        // Verify that the subject and rate have been updated on the details page
        await expect(incomePage.detail.subjectValue).toHaveText(newSubject);
        await expect(incomePage.detail.rateValue).toContainText(newRate);
    });

    test('Verify that the user is able to click on recored payment and make the offline payment', async () => {
        const incomePage = new IncomePage(sharedPage);
        const menuPage = new MenuPage(sharedPage);
        const { propertyName, unitName, amount, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay);

        // wait for the real invoice data to load - right after opening a row the panel can
        // briefly show a placeholder "Invoice: 0" state with no Record Payment button yet
        await expect(incomePage.detail.invoiceIdSpan).not.toHaveText('0', { timeout: 15000 });

        // pay only half of the known invoice amount, to verify partial-payment behaviour
        const partialAmount = (amount / 2).toFixed(2);
        const remainingAmount = (amount - Number(partialAmount)).toFixed(2);

        await incomePage.recordPayment(partialAmount);

        await expect(incomePage.detail.paymentAmountValue).toContainText(partialAmount);
        await expect(incomePage.detail.totalPaidText).toContainText(partialAmount);
        await expect(incomePage.detail.remainingBalanceText).toContainText(remainingAmount);
    });

});
