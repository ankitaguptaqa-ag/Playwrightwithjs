# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/expenses/expenses.spec.js >> Expenses Tests - shared login >> Verify user is able to add single expense and that it is shown in the expense list
- Location: specs/propertyOwner/expenses/expenses.spec.js:69:10

# Error details

```
TypeError: expensePage.addSingleExpense is not a function
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { userData } from '../../../mocks/common/userData.js';
  3  | import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
  4  | import { MenuPage } from '../../../pageObjects/poPortal/menu_page.js';
  5  | import { ExpensePage } from '../../../pageObjects/poPortal/expense_page.js';
  6  | import { randomUtils } from '../../../utils/randomUtils.js';
  7  | 
  8  | 
  9  | 
  10 | 
  11 | //serial - test run one by one(Not in parallel)
  12 | test.describe.configure({ mode: 'serial' });
  13 | 
  14 | test.describe('Expenses Tests - shared login', () => {
  15 |     let sharedPage;
  16 | 
  17 |     //login once before all tests in this file 
  18 |     test.beforeAll(async ({ browser }) => {
  19 |         const context = await browser.newContext();
  20 |         sharedPage = await context.newPage();
  21 | 
  22 |         const loginPage = new LoginPage(sharedPage);
  23 |         await loginPage.goToLoginPage();
  24 |         await loginPage.login(userData.env.qa.poUsers.expenseUser.userName, userData.env.qa.poUsers.expenseUser.password);
  25 |     });
  26 | 
  27 |     //Navigate to the expenses page before each test
  28 |     test.beforeEach(async () => {
  29 |         const menuPage = new MenuPage(sharedPage);  
  30 |         await menuPage.navigateToExpensePage();
  31 |         
  32 |     });
  33 | 
  34 |     // give the app time to settle between tests before the next one starts
  35 |     test.afterEach(async () => {
  36 |         await sharedPage.waitForTimeout(2000);
  37 |     });
  38 | 
  39 |     // close the shared page after all tests in this file
  40 |     test.afterAll(async () => {
  41 |         await sharedPage.close();
  42 |     });
  43 | 
  44 |     test('Verify that the user can navigate to the Expenses page & click on managee payee and click on action menu', async () => {
  45 |         const expensePage = new ExpensePage(sharedPage);
  46 |         await expensePage.clickManageePayee();
  47 |         await expensePage.clickFirstPayeeActionMenu();
  48 |         const randomSearchText = randomUtils.randomAlphabets(6);
  49 |         await expensePage.managePayeeForm.searchPayee.fill(randomSearchText);
  50 |         await sharedPage.waitForTimeout(1000);
  51 |         await expensePage.managePayeeForm.crossIconManagePayee.click();
  52 |     });
  53 | 
  54 |     test ('Verify that user is able add new payee and that is shown in the payee list and you are able to edit', async () => {
  55 |         const expensePage = new ExpensePage(sharedPage);
  56 |         const createPayee = await expensePage.addNewPayee();
  57 |         await expensePage.clickManageePayee();
  58 |         const foundNewPayee = await expensePage.isPayeeInTable(createPayee.vendorName);
  59 |         await expect(foundNewPayee).toBe(createPayee.vendorName);
  60 | 
  61 |         const updatedVendorName = `Vendor_${randomUtils.generateRandomNumber(6)}`;
  62 |         await expensePage.updateFirstPayeeVendorName(updatedVendorName);
  63 | 
  64 |         const foundUpdatedPayee = await expensePage.isPayeeInTable(updatedVendorName);
  65 |         await expect(foundUpdatedPayee).toBe(updatedVendorName);
  66 | 
  67 |     });
  68 | 
  69 |     test.only('Verify user is able to add single expense and that it is shown in the expense list', async () => {
  70 |         const expensePage = new ExpensePage(sharedPage);
  71 |         await expensePage.addExpenseButton.click();
> 72 |         await expensePage.addSingleExpense().tobeVisbile();
     |                           ^ TypeError: expensePage.addSingleExpense is not a function
  73 |         await expensePage.recordSingleExpense();
  74 | 
  75 | 
  76 | 
  77 | 
  78 |     });
  79 | 
  80 | 
  81 | 
  82 | 
  83 | });
```