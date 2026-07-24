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

Locator: locator('//p[contains(text(), "Shared By")]')
Expected: visible
Timeout: 180000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 180000ms
  - waiting for locator('//p[contains(text(), "Shared By")]')

```

```yaml
- link "Innago LLCInnago LLC":
  - /url: /dashboard
  - img "Innago LLC"
  - img "Innago LLC"
- link "profile img":
  - /url: /profile
  - img "profile img"
- paragraph: Sumya PO
- link "Profile":
  - /url: /profile
- list:
  - listitem:
    - link "dashboard Dashboard":
      - /url: /dashboard
      - img "dashboard"
      - text: Dashboard
  - listitem:
    - link "properties Properties":
      - /url: /properties/list
      - img "properties"
      - text: Properties
  - listitem:
    - link "tenants Tenants":
      - /url: /tenants/list/0/0
      - img "tenants"
      - text: Tenants
  - listitem:
    - link "application Applications":
      - /url: /applications/list
      - img "application"
      - text: Applications
  - listitem:
    - link "lease-and-file Leases & Files":
      - /url: /lease/list
      - img "lease-and-file"
      - text: Leases & Files
  - listitem:
    - link "income Income":
      - /url: /finance/invoices
      - img "income"
      - text: Income
  - listitem:
    - link "expenses Expenses":
      - /url: /expenses
      - img "expenses"
      - text: Expenses
  - listitem:
    - link "maintenance Maintenance":
      - /url: /maintenance/maintenancelist
      - img "maintenance"
      - text: Maintenance
  - listitem:
    - link "messaging Messaging":
      - /url: /messaging/email
      - img "messaging"
      - text: Messaging
  - listitem:
    - link "listing Listings":
      - /url: /listings
      - img "listing"
      - text: Listings
  - listitem:
    - link "users Users":
      - /url: /users
      - img "users"
      - text: Users
- link "report":
  - /url: /reports
  - img "report"
- link "settings":
  - /url: /setting?tab=general
  - img "settings"
- link "refer&Earn":
  - /url: /refer-and-earn
  - img "refer&Earn"
- link "logout":
  - /url: /logout
  - img "logout"
- button "Left Toggle Button":
  - emphasis: 
- heading "Income" [level=1]
- button "Search":
  - img "Search"
- textbox "Search"
- paragraph: Grouped by Property
- img "action"
- text: Properties (1) Units (1) Clear All
- button "Instant Withdrawal"
- button "Export"
- button "New Invoice"
- table:
  - rowgroup:
    - row "Due On Balance sort":
      - columnheader "Due On"
      - columnheader "Balance sort":
        - text: Balance
        - img "sort"
  - rowgroup:
    - row "Expand Document line (Nov 19, 2024 - M to M )":
      - cell "Expand Document line (Nov 19, 2024 - M to M )":
        - button "Expand":
          - img "Expand"
        - paragraph: Document line
        - paragraph: (Nov 19, 2024 - M to M )
    - row "Jul 24, 2026 $100.00 Unpaid":
      - cell "Jul 24, 2026 $100.00":
        - paragraph: Jul 24, 2026
        - paragraph: $100.00
      - cell "Unpaid"
- 'heading "Invoice: 9142729" [level=3]'
- link "":
  - /url: javascript:void(0)
- heading "Invoice 9142729" [level=2]
- text: Document line|652732
- emphasis: 
- paragraph: Invoice Generated On
- paragraph: Jul 24, 2026 0 reminder(s) sent
- emphasis: 
- paragraph: Due
- paragraph: Jul 24, 2026
- emphasis: 
- paragraph: Payment expected in about
- paragraph: 0 days
- button " Add Note 3":
  - emphasis: 
  - text: Add Note 3
- button "Download"
- button "Remind"
- button "Record Payment" [expanded]
- button "Credit Card Payment"
- button "Edit Invoice"
- button "Delete"
- paragraph: Subject
- paragraph: Invoice_80324
- paragraph: Sent To
- paragraph: Dsd Gfgf
- paragraph: Contact Address
- paragraph: 12 House no 837 South Westmore Avenue, Lombards, Illinois
- table:
  - rowgroup:
    - row "Item Description Quantity Rate Amount":
      - columnheader "Item"
      - columnheader "Description"
      - columnheader "Quantity"
      - columnheader "Rate"
      - columnheader "Amount"
  - rowgroup:
    - row "Pet Fee Invoice_80324 1 $100.00 $100.00":
      - cell "Pet Fee"
      - cell "Invoice_80324"
      - cell "1"
      - cell "$100.00"
      - cell "$100.00"
- text: Payments Received
- paragraph: "0"
- paragraph
- table:
  - rowgroup:
    - row "Payer Submitted On Deposited On Method Amount":
      - columnheader "Payer"
      - columnheader "Submitted On"
      - columnheader "Deposited On"
      - columnheader "Method"
      - columnheader "Amount"
  - rowgroup
  - rowgroup:
    - row "No Payments Received":
      - cell "No Payments Received"
- paragraph: "Total Due: $100.00"
- paragraph: "Total Paid: $0.00"
- paragraph: "Remaining Balance: $100.00"
- main
- contentinfo:
  - text: ©2026 Innago LLC || Innago's
  - link "Terms and Conditions":
    - /url: http://innago.qa.com/termsandcondition
  - text: and
  - link "Privacy Policy":
    - /url: ""
  - text: .
- iframe
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
  73  |     test('Verify that all invoice details fields are visible on the details page', async () => {
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
> 88  |         await expect(incomePage.detail.sharedByText).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  89  |         await expect(incomePage.detail.contactAddressText).toBeVisible();
  90  | 
  91  |         await expect(incomePage.detail.itemHeader).toBeVisible();
  92  |         await expect(incomePage.detail.descriptionHeader).toBeVisible();
  93  |         await expect(incomePage.detail.quantityHeader).toBeVisible();
  94  |         await expect(incomePage.detail.rateHeader).toBeVisible();
  95  |         await expect(incomePage.detail.amountHeader).toBeVisible();
  96  |         console.log('All invoice details fields are visible on the details page');
  97  |     });
  98  | 
  99  | });
  100 | 
```