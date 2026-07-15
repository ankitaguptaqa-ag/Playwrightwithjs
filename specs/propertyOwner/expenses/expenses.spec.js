import { test, expect } from '@playwright/test';
import { userData } from '../../../mocks/common/userData.js';
import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
import { MenuPage } from '../../../pageObjects/poPortal/menu_page.js';
import { ExpensePage } from '../../../pageObjects/poPortal/expense_page.js';
import { randomUtils } from '../../../utils/randomUtils.js';




//serial - test run one by one(Not in parallel)
test.describe.configure({ mode: 'serial' });

test.describe('Expenses Tests - shared login', () => {
    let sharedPage;

    //login once before all tests in this file 
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        sharedPage = await context.newPage();

        const loginPage = new LoginPage(sharedPage);
        await loginPage.goToLoginPage();
        await loginPage.login(userData.env.qa.poUsers.expenseUser.userName, userData.env.qa.poUsers.expenseUser.password);
    });

    //Navigate to the expenses page before each test
    test.beforeEach(async () => {
        const menuPage = new MenuPage(sharedPage);  
        await menuPage.navigateToExpensePage();
        
    });

    // give the app time to settle between tests before the next one starts
    test.afterEach(async () => {
        await sharedPage.waitForTimeout(2000);
    });

    // close the shared page after all tests in this file
    test.afterAll(async () => {
        await sharedPage.close();
    });

    test('Verify that the user can navigate to the Expenses page & click on managee payee and click on action menu', async () => {
        const expensePage = new ExpensePage(sharedPage);
        await expensePage.clickManageePayee();
        await expensePage.clickFirstPayeeActionMenu();
        const randomSearchText = randomUtils.randomAlphabets(6);
        await expensePage.managePayeeForm.searchPayee.fill(randomSearchText);
        await sharedPage.waitForTimeout(1000);
        await expensePage.managePayeeForm.crossIconManagePayee.click();
    });

    test ('Verify that user is able add new payee and that is shown in the payee list and you are able to edit', async () => {
        const expensePage = new ExpensePage(sharedPage);
        const createPayee = await expensePage.addNewPayee();
        await expensePage.clickManageePayee();
        const foundNewPayee = await expensePage.isPayeeInTable(createPayee.vendorName);
        await expect(foundNewPayee).toBe(createPayee.vendorName);

        const updatedVendorName = `Vendor_${randomUtils.generateRandomNumber(6)}`;
        await expensePage.updateFirstPayeeVendorName(updatedVendorName);

        const foundUpdatedPayee = await expensePage.isPayeeInTable(updatedVendorName);
        await expect(foundUpdatedPayee).toBe(updatedVendorName);

    });

    test('Verify user is able to add single expense and that it is shown in the expense list', async () => {
        




    });




});