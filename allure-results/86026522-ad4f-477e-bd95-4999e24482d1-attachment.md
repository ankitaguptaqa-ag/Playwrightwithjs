# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/expenses/expenses.spec.js >> Expenses Tests - shared login >> Verify that user is able add new payee and that is shown in the payee list
- Location: specs/propertyOwner/expenses/expenses.spec.js:49:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('//button[contains(text(),"Add Additional Information")]')
    - locator resolved to <button type="button" _ngcontent-pdw-c367="" class="tw-flex tw-items-center tw-text-blue tw-text-bt-1 tw-font-medium tw-gap-2 focus:tw-outline-none">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <in-payee-form _nghost-pdw-c367="" _ngcontent-pdw-c368="">…</in-payee-form> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <in-payee-form _nghost-pdw-c367="" _ngcontent-pdw-c368="">…</in-payee-form> intercepts pointer events
    - retrying click action
      - waiting 100ms
    29 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <in-payee-form _nghost-pdw-c367="" _ngcontent-pdw-c368="">…</in-payee-form> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Test source

```ts
  32  | 
  33  |         this.addNewPayeeForm = {
  34  |             addNewPayeeHeading: page.locator('#sidepanel-title'),
  35  |             crossIcon: page.locator('#sidepanel-close-button'),
  36  |             vendorNameInput: page.locator('#vendor'),
  37  |             firstNameInput: page.locator('#firstName'),
  38  |             lastNameInput: page.locator('#lastName'),
  39  |             categoryDropdown: page.locator('//ng-select[@formcontrolname="category"]'),
  40  |             categoryArrowClick: page.locator('#category'),
  41  |             categoryDropdownPanel: page.locator('//ng-dropdown-panel'),
  42  |             categorySelectLender: page.locator('//ng-dropdown-panel//div[@role="option"]//span[contains(text(), "Lender")]'),
  43  |             categorySelectContractor: page.locator('//ng-dropdown-panel//div[@role="option"]//span[contains(text(), "Contractor")]'),
  44  |             addButton: page.locator('#sidepanel-primary-button'),
  45  |             cancelButton: page.locator('#sidepanel-secondary-button'),
  46  |         };
  47  | 
  48  | 
  49  |         this.addAdditionalInfoButton = {
  50  |             addButton: page.locator('//button[contains(text(),"Add Additional Information")]'),
  51  |             phoneNumberInput: page.locator('#phone'),
  52  |             emailInput: page.locator('//input[@placeholder="Enter Payee Email"]'),
  53  |             websiteInput: page.locator('#website'),
  54  |             addressLine1Input: page.locator('#address1'),
  55  |             addressLine2Input: page.locator('#address2'),
  56  |             cityInput: page.locator('#city'),
  57  |             stateDropdown: page.locator('//ng-select[@formcontrolname="StateId"]'),
  58  |             stateArrow: page.locator('//ng-select[@formcontrolname="StateId"]//span[@class="ng-arrow"]'),
  59  |             postalCodeInput: page.locator('#zip'),
  60  |             secondaryPhoneNumberInput: page.locator('#officePhone'),
  61  |         };
  62  | 
  63  | 
  64  | 
  65  | 
  66  | 
  67  |     } 
  68  | 
  69  | 
  70  | 
  71  |     // functtion declarihg
  72  | 
  73  |     async clickManageePayee() {
  74  |         await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
  75  |         await this.payeeManagement.payeeManagementButton.click();
  76  |         await this.payeeManagement.managePayee.waitFor({ state: 'visible', timeout: 5000 });
  77  |         await this.payeeManagement.managePayee.click();
  78  |     }
  79  |     async clickFirstPayeeActionMenu() {
  80  |         await this.managePayeeForm.firstPayeeRow.waitFor({ state: 'visible', timeout: 15000 });
  81  |         await this.managePayeeForm.firstPayeeActionMenu.click({ timeout: 30000 });
  82  |     }
  83  | 
  84  |     //Add new payee section
  85  |     async clickAddNewPayee() { 
  86  |         await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
  87  |         await this.payeeManagement.payeeManagementButton.click();
  88  |         await this.payeeManagement.addPayee.waitFor({ state: 'visible', timeout: 5000 });
  89  |         await this.payeeManagement.addPayee.click();
  90  |     }
  91  | 
  92  |     getCategoryOption(categoryName) {
  93  |         return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${categoryName}"]`);
  94  |     }
  95  | 
  96  |     getStateOption(stateName) {
  97  |         return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${stateName}"]`);
  98  |     }
  99  | 
  100 |     async isPayeeInTable(vendorName) {
  101 |         const row = this.page.locator(`//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "${vendorName}")]`);
  102 |         await row.waitFor({ state: 'visible', timeout: 20000 });
  103 |         return await row.innerText();
  104 |     }
  105 | 
  106 | 
  107 | 
  108 |     async addNewPayee (){
  109 |         const details = {
  110 |             vendorName: TestData.vendorName(),
  111 |             firstName: TestData.firstName(),
  112 |             lastName: TestData.lastName(),
  113 |             category : 'Contractor',
  114 |             email: TestData.email(),
  115 |             phoneNumber: TestData.phoneNumber(),
  116 |             website: 'https://gemini.google.com/app',
  117 |             address1: TestData.addressLine1(),
  118 |             address2: TestData.addressLine2(),
  119 |             city: TestData.city(),
  120 |             state: TestData.state(),
  121 |             zip: TestData.zip(),
  122 |             secondaryPhone: '',
  123 |         };
  124 | 
  125 |         await this.clickAddNewPayee();
  126 |         await this.addNewPayeeForm.vendorNameInput.fill(details.vendorName);
  127 |         await this.addNewPayeeForm.firstNameInput.fill(details.firstName);
  128 |         await this.addNewPayeeForm.lastNameInput.fill(details.lastName);
  129 |         await this.addNewPayeeForm.categoryArrowClick.click();
  130 |         //await this.addNewPayeeForm.categoryDropdown.click();
  131 |         await this.getCategoryOption(details.category).click();
> 132 |         await this.addAdditionalInfoButton.addButton.click();
      |                                                      ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  133 | 
  134 |         
  135 |         await this.addAdditionalInfoButton.phoneNumberInput.fill(details.phoneNumber);
  136 |         await this.addAdditionalInfoButton.emailInput.fill(details.email);
  137 |         await this.addAdditionalInfoButton.websiteInput.fill(details.website);
  138 |         await this.addAdditionalInfoButton.addressLine1Input.fill(details.address1);
  139 |         await this.addAdditionalInfoButton.addressLine2Input.fill(details.address2);
  140 |         await this.addAdditionalInfoButton.cityInput.fill(details.city);
  141 |         await this.addAdditionalInfoButton.stateDropdown.click();
  142 |         await this.addAdditionalInfoButton.stateArrow.click();
  143 |         await this.getStateOption(details.state).click();
  144 |         await this.addAdditionalInfoButton.postalCodeInput.fill(details.zip);
  145 |         await this.addAdditionalInfoButton.secondaryPhoneNumberInput.fill(details.secondaryPhone);
  146 |         await this.addNewPayeeForm.addButton.click();
  147 |         return details; // Return the details for verification in the test
  148 |     }
  149 | 
  150 | 
  151 | 
  152 | }
```