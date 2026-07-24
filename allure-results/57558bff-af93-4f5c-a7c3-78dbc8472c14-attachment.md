# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that all invoice details fields are visible on the details page
- Location: specs/propertyOwner/income/income.spec.js:73:10

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table.table-invoice-detail th:has-text("Amount")')
Expected: visible
Error: strict mode violation: locator('table.table-invoice-detail th:has-text("Amount")') resolved to 2 elements:
    1) <th width="120" class="text-end ng-tns-c320-7">Amount</th> aka getByRole('columnheader', { name: 'Amount' }).first()
    2) <th class="text-end ng-tns-c320-7">Amount</th> aka getByRole('columnheader', { name: 'Amount' }).nth(1)

Call log:
  - Expect "toBeVisible" with timeout 180000ms
  - waiting for locator('table.table-invoice-detail th:has-text("Amount")')

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { userData } from '../../../mocks/common/userData.js';
  3   | import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
  4   | import { MenuPage } from '../../../pageObjects/poPortal/menu_page.js';
  5   | import { IncomePage } from '../../../pageObjects/poPortal/income_page.js';
  6   | 
  7   | 
  8   | 
  9   | test.describe.configure({ mode: 'serial' });
  10  | 
  11  | test.describe('Income Tests - shared login', () => {
  12  |     let sharedPage;
  13  | 
  14  |     
  15  |     test.beforeAll(async ({ browser }) => {
  16  |         const context = await browser.newContext();
  17  |         sharedPage = await context.newPage();
  18  | 
  19  |         const loginPage = new LoginPage(sharedPage);
  20  |         await loginPage.goToLoginPage();
  21  |         await loginPage.login(userData.env.qa.poUsers.po2.userName, userData.env.qa.poUsers.po2.password);
  22  |     });
  23  | 
  24  |     // Navigate to the income page before each test
  25  |     test.beforeEach(async () => {
  26  |         const menuPage = new MenuPage(sharedPage);
  27  |         await menuPage.navigateToIncomesPage();
  28  |     });
  29  | 
  30  |     
  31  |     test.afterEach(async () => {
  32  |         await sharedPage.waitForTimeout(2000);
  33  |     });
  34  | 
  35  |     
  36  |     test.afterAll(async () => {
  37  |         await sharedPage.close();
  38  |     });
  39  | 
  40  |     test('Verify that the user can start creating a new invoice', async () => {
  41  |         const incomePage = new IncomePage(sharedPage);
  42  |         await incomePage.createNewInvoice();
  43  |         await expect(incomePage.invoiceCreation.propertyDropdown).toBeVisible();
  44  |     });
  45  | 
  46  |     test('Verify that Property, Unit, and Term fields are present on the Create New Invoice form', async () => {
  47  |         const incomePage = new IncomePage(sharedPage);
  48  | 
  49  |         await incomePage.invoiceCreation.createNewInvoiceBtn.click();
  50  |         await incomePage.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
  51  | 
  52  |         await expect(incomePage.invoiceCreation.propertyLabel).toBeVisible();
  53  |         await expect(incomePage.invoiceCreation.unitLabel).toBeVisible();
  54  |         await expect(incomePage.invoiceCreation.termLabel).toBeVisible();
  55  |     });
  56  | 
  57  |     test('Verify that a newly created invoice can be found via filters on the list page', async () => {
  58  |         const incomePage = new IncomePage(sharedPage);
  59  |         const menuPage = new MenuPage(sharedPage);
  60  | 
  61  |         const { propertyName, unitName } = await incomePage.createNewInvoice();
  62  |         await menuPage.navigateToIncomesPage();
  63  |         await incomePage.filterByPropertyAndUnit(propertyName, unitName);
  64  | 
  65  |         await expect(incomePage.listing.propertyNameFirstRow).toHaveText(propertyName);
  66  | 
  67  |         // grouped view: first click expands the property group, second click opens the invoice
  68  |         await incomePage.listing.tableRows.first().click();
  69  |         await incomePage.listing.tableRows.nth(1).click();
  70  |         await expect(incomePage.detail.propertyName).toHaveText(propertyName);
  71  |     });
  72  | 
  73  |     test.only('Verify that all invoice details fields are visible on the details page', async () => {
  74  |         const incomePage = new IncomePage(sharedPage);
  75  |         const menuPage = new MenuPage(sharedPage);
  76  | 
  77  |         const { propertyName, unitName } = await incomePage.createNewInvoice();
  78  |         await menuPage.navigateToIncomesPage();
  79  |         await incomePage.filterByPropertyAndUnit(propertyName, unitName);
  80  | 
  81  |         // grouped view: first click expands the property group, second click opens the invoice
  82  |         await incomePage.listing.tableRows.first().click();
  83  |         await incomePage.listing.tableRows.nth(1).click();
  84  | 
  85  |         await expect(incomePage.detail.propertyName).toHaveText(propertyName);
  86  |         await expect(incomePage.detail.invoiceIdSpan).toBeVisible();
  87  |         await expect(incomePage.detail.subjectText).toBeVisible();
  88  |         await expect(incomePage.detail.sharedByText).toBeVisible();
  89  |         await expect(incomePage.detail.contactAddressText).toBeVisible();
  90  | 
  91  |         await expect(incomePage.detail.itemHeader).toBeVisible();
  92  |         await expect(incomePage.detail.descriptionHeader).toBeVisible();
  93  |         await expect(incomePage.detail.quantityHeader).toBeVisible();
  94  |         await expect(incomePage.detail.rateHeader).toBeVisible();
> 95  |         await expect(incomePage.detail.amountHeader).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  96  |         console.log('All invoice details fields are visible on the details page');
  97  |     });
  98  | 
  99  | });
  100 | 
```