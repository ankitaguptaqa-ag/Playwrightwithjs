# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that all invoice details fields are visible on the details page
- Location: specs/propertyOwner/income/income.spec.js:75:5

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
    - row "Expand M5 Apartments (Jun 06, 2025 - M to M )":
      - cell "Expand M5 Apartments (Jun 06, 2025 - M to M )":
        - button "Expand":
          - img "Expand"
        - paragraph: M5 Apartments
        - paragraph: (Jun 06, 2025 - M to M )
    - row "Jul 01, 2026 $1,980.00 Overdue":
      - cell "Jul 01, 2026 $1,980.00":
        - paragraph: Jul 01, 2026
        - paragraph: $1,980.00
      - cell "Overdue"
    - row "Jul 24, 2026 $100.00 Unpaid":
      - cell "Jul 24, 2026 $100.00":
        - paragraph: Jul 24, 2026
        - paragraph: $100.00
      - cell "Unpaid"
    - row "Jul 24, 2026 $100.00 Unpaid":
      - cell "Jul 24, 2026 $100.00":
        - paragraph: Jul 24, 2026
        - paragraph: $100.00
      - cell "Unpaid"
- 'heading "Invoice: 4139228" [level=3]'
- link "":
  - /url: javascript:void(0)
- heading "Invoice 4139228" [level=2]
- text: M5 Apartments|1025 - Mud Bay
- emphasis: 
- paragraph: Invoice Generated On
- paragraph: Jul 01, 2025 0 reminder(s) sent
- emphasis: 
- paragraph: Due
- paragraph: Jul 01, 2026 23 days late
- text: Late
- button " Add Note 3":
  - emphasis: 
  - text: Add Note 3
- button "Download"
- button "Remind"
- button "Waive Late Fee $1,380.00"
- button "Record Payment" [expanded]
- button "Credit Card Payment"
- button "Edit Invoice"
- button "Delete"
- paragraph: Subject
- paragraph: Rent due on July 1, 2026
- paragraph: Sent To
- paragraph: M One
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
    - row "Rent Rent due on July 1, 2026 1 $600.00 $600.00":
      - cell "Rent"
      - cell "Rent due on July 1, 2026"
      - cell "1"
      - cell "$600.00"
      - cell "$600.00"
    - row "Late Fee Charge Late fee charges - 10.0000% on amount $600.00 23 $60.00 $1,380.00":
      - cell "Late Fee Charge"
      - cell "Late fee charges - 10.0000% on amount $600.00"
      - cell "23"
      - cell "$60.00"
      - cell "$1,380.00"
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
- paragraph: "Total Due: $1,980.00"
- paragraph: "Total Paid: $0.00"
- paragraph: "Remaining Balance: $1,980.00"
- link " Invoice History":
  - /url: javascript:void(0);
  - emphasis: 
  - text: Invoice History
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
  37  |         const loginPage = new LoginPage(sharedPage);
  38  |         await loginPage.logout();
  39  |         await sharedPage.close();
  40  |     });
  41  | 
  42  |     test('Verify that the user can start creating a new invoice', async () => {
  43  |         const incomePage = new IncomePage(sharedPage);
  44  |         await incomePage.createNewInvoice();
  45  |         await expect(incomePage.invoiceCreation.propertyDropdown).toBeVisible();
  46  |     });
  47  | 
  48  |     test('Verify that Property, Unit, and Term fields are present on the Create New Invoice form', async () => {
  49  |         const incomePage = new IncomePage(sharedPage);
  50  | 
  51  |         await incomePage.invoiceCreation.createNewInvoiceBtn.click();
  52  |         await incomePage.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
  53  | 
  54  |         await expect(incomePage.invoiceCreation.propertyLabel).toBeVisible();
  55  |         await expect(incomePage.invoiceCreation.unitLabel).toBeVisible();
  56  |         await expect(incomePage.invoiceCreation.termLabel).toBeVisible();
  57  |     });
  58  | 
  59  |     test('Verify that a newly created invoice can be found via filters on the list page', async () => {
  60  |         const incomePage = new IncomePage(sharedPage);
  61  |         const menuPage = new MenuPage(sharedPage);
  62  | 
  63  |         const { propertyName, unitName } = await incomePage.createNewInvoice();
  64  |         await menuPage.navigateToIncomesPage();
  65  |         await incomePage.filterByPropertyAndUnit(propertyName, unitName);
  66  | 
  67  |         await expect(incomePage.listing.propertyNameFirstRow).toHaveText(propertyName);
  68  | 
  69  |         // grouped view: first click expands the property group, second click opens the invoice
  70  |         await incomePage.listing.tableRows.first().click();
  71  |         await incomePage.listing.tableRows.nth(1).click();
  72  |         await expect(incomePage.detail.propertyName).toHaveText(propertyName);
  73  |     });
  74  | 
  75  |     test('Verify that all invoice details fields are visible on the details page', async () => {
  76  |         const incomePage = new IncomePage(sharedPage);
  77  |         const menuPage = new MenuPage(sharedPage);
  78  | 
  79  |         const { propertyName, unitName } = await incomePage.createNewInvoice();
  80  |         await menuPage.navigateToIncomesPage();
  81  |         await incomePage.filterByPropertyAndUnit(propertyName, unitName);
  82  | 
  83  |         // grouped view: first click expands the property group, second click opens the invoice
  84  |         await incomePage.listing.tableRows.first().click();
  85  |         await incomePage.listing.tableRows.nth(1).click();
  86  | 
  87  |         await expect(incomePage.detail.propertyName).toHaveText(propertyName);
  88  |         await expect(incomePage.detail.invoiceIdSpan).toBeVisible();
  89  |         await expect(incomePage.detail.subjectText).toBeVisible();
> 90  |         await expect(incomePage.detail.sharedByText).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  91  |         await expect(incomePage.detail.contactAddressText).toBeVisible();
  92  | 
  93  |         await expect(incomePage.detail.itemHeader).toBeVisible();
  94  |         await expect(incomePage.detail.descriptionHeader).toBeVisible();
  95  |         await expect(incomePage.detail.quantityHeader).toBeVisible();
  96  |         await expect(incomePage.detail.rateHeader).toBeVisible();
  97  |         await expect(incomePage.detail.amountHeader).toBeVisible();
  98  |         console.log('All invoice details fields are visible on the details page');
  99  |     });
  100 | 
  101 | });
  102 | 
```