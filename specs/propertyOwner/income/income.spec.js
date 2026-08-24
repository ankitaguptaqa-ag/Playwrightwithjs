import { test, expect } from '../../../fixtures/poFixtures.js';

test.describe.configure({ mode: 'serial' });

test.describe('Income Tests - shared login', () => {

    // Navigate to the income page before each test
    test.beforeEach(async ({ menuPage }) => {
        await menuPage.navigateToIncomesPage();
    });

    test.afterEach(async ({ poSession }) => {
        await poSession.waitForTimeout(2000);
    });

    test('Verify that the user can start creating a new invoice', async ({ incomePage }) => {
        await incomePage.createNewInvoice();
        await expect(incomePage.invoiceCreation.propertyDropdown).toBeVisible();
    });

    test('Verify that Property, Unit, and Term fields are present on the Create New Invoice form', async ({ incomePage }) => {
        await incomePage.invoiceCreation.createNewInvoiceBtn.click();
        await incomePage.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });

        await expect(incomePage.invoiceCreation.propertyLabel).toBeVisible();
        await expect(incomePage.invoiceCreation.unitLabel).toBeVisible();
        await expect(incomePage.invoiceCreation.termLabel).toBeVisible();
    });

    test('Verify that a newly created invoice can be found via filters on the list page', async ({ incomePage, menuPage }) => {
        const { propertyName, unitName, description, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await expect(incomePage.listing.propertyNameFirstRow).toHaveText(propertyName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay, description);
        await expect(incomePage.detail.propertyName).toHaveText(propertyName);
    });

    test('Verify that all invoice details fields are visible on the details page', async ({ incomePage, menuPage }) => {
        const { propertyName, unitName, description, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay, description);

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

    test('Verify that the user can edit an invoice from the details page', async ({ incomePage, menuPage }) => {
        const { propertyName, unitName, description, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay, description);

        const newSubject = `Updated Subject ${Math.floor(Math.random() * 1000)}`;
        const newRate = '200';

        await incomePage.editInvoice({ subject: newSubject, rate: newRate });

        // Verify that the subject and rate have been updated on the details page
        await expect(incomePage.detail.subjectValue).toHaveText(newSubject);
        await expect(incomePage.detail.rateValue).toContainText(newRate);
    });

    test('Verify that the user is able to click on recored payment and make the offline payment', async ({ incomePage, menuPage }) => {
        const { propertyName, unitName, amount, description, dueDateDisplay } = await incomePage.createNewInvoice();
        await menuPage.navigateToIncomesPage();
        await incomePage.filterByPropertyAndUnit(propertyName, unitName);

        await incomePage.openCreatedInvoiceRow(dueDateDisplay, description);

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
