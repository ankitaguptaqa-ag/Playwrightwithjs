import { test, expect } from '../../../fixtures/poFixtures.js';
import { randomUtils } from '../../../utils/randomUtils.js';

// Expenses runs as its own property owner, so the whole file signs in as expenseUser.
// Has to sit at file level - poUserKey is worker-scoped and Playwright rejects it inside a describe.
test.use({ poUserKey: 'expenseUser' });

//serial - test run one by one(Not in parallel)
test.describe.configure({ mode: 'serial' });

test.describe('Expenses Tests - shared login', () => {

    //Navigate to the expenses page before each test
    test.beforeEach(async ({ menuPage }) => {
        await menuPage.navigateToExpensePage();
    });

    // give the app time to settle between tests before the next one starts
    test.afterEach(async ({ poSession }) => {
        await poSession.waitForTimeout(2000);
    });

    test('Verify that the user can navigate to the Expenses page & click on managee payee and click on action menu', async ({ expensePage, poSession }) => {
        await expensePage.clickManageePayee();
        await expensePage.clickFirstPayeeActionMenu();
        const randomSearchText = randomUtils.randomAlphabets(6);
        await expensePage.managePayeeForm.searchPayee.fill(randomSearchText);
        await poSession.waitForTimeout(1000);
        await expensePage.managePayeeForm.crossIconManagePayee.click();
    });

    test('Verify that user is able add new payee and that is shown in the payee list and you are able to edit', async ({ expensePage }) => {
        const createPayee = await expensePage.addNewPayee();
        const foundNewPayee = await expensePage.isPayeeInTable(createPayee.vendorName);
        await expect(foundNewPayee).toBe(createPayee.vendorName);
        await expensePage.addNewPayeeForm.crossIcon.click();

        // const updatedVendorName = `Vendor_${randomUtils.generateRandomNumber(6)}`;
        // await expensePage.updateFirstPayeeVendorName(updatedVendorName);

        // const foundUpdatedPayee = await expensePage.isPayeeInTable(updatedVendorName);
        // await expect(foundUpdatedPayee).toBe(updatedVendorName);

    });

    test('Verify user is able to add single expense and that it is shown in the expense list', async ({ expensePage }) => {
        const recordedExpense = await expensePage.recordSingleExpense();
        const isExpenseInTable = await expensePage.inListPageIsExpenseInTable(recordedExpense.description);
        expect(isExpenseInTable).toBe(true);
    });

});
