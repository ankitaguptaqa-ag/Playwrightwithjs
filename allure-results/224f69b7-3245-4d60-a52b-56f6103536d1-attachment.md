# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/expenses/expenses.spec.js >> Expenses Tests - shared login >> Verify that user is able add new payee and that is shown in the payee list and you are able to edit
- Location: specs/propertyOwner/expenses/expenses.spec.js:54:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('in-payee-management-button').first()
    - locator resolved to <in-payee-management-button _nghost-oba-c358="" _ngcontent-oba-c362="">…</in-payee-management-button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <in-loader _ngcontent-oba-c369="" class="tw-w-full tw-overflow-auto laptop:!tw-w-[700px] tw-flex tw-items-center tw-justify-center tw-h-[calc(100vh-60px)] ng-star-inserted">…</in-loader> from <in-edit-payee _nghost-oba-c369="" class="ng-star-inserted">…</in-edit-payee> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <in-loader _ngcontent-oba-c369="" class="tw-w-full tw-overflow-auto laptop:!tw-w-[700px] tw-flex tw-items-center tw-justify-center tw-h-[calc(100vh-60px)] ng-star-inserted">…</in-loader> from <in-edit-payee _nghost-oba-c369="" class="ng-star-inserted">…</in-edit-payee> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <in-loader _ngcontent-oba-c369="" class="tw-w-full tw-overflow-auto laptop:!tw-w-[700px] tw-flex tw-items-center tw-justify-center tw-h-[calc(100vh-60px)] ng-star-inserted">…</in-loader> from <in-edit-payee _nghost-oba-c369="" class="ng-star-inserted">…</in-edit-payee> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div _ngcontent-oba-c282="" class="tw-fixed tw-bg-[rgba(24,44,74,0.45)] tw-inset-0 tw-w-full tw-h-full tw-top-0 tw-left-0 ng-tns-c282-6"></div> from <in-edit-payee _nghost-oba-c369="" class="ng-star-inserted">…</in-edit-payee> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div _ngcontent-oba-c282="" class="tw-fixed tw-bg-[rgba(24,44,74,0.45)] tw-inset-0 tw-w-full tw-h-full tw-top-0 tw-left-0 ng-tns-c282-8"></div> from <in-manage-payee class="ng-star-inserted">…</in-manage-payee> subtree intercepts pointer events
  26 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <input type="text" id="payee-search-input" placeholder="Search by name or category" class="in-text-input tw-w-full tw-text-[12px] tw-leading-[16px] tw-py-[12px] tw-pl-[15px] tw-pr-12 tw-font-medium tw-text-dark-grey ng-untouched ng-pristine ng-valid"/> from <in-manage-payee class="ng-star-inserted">…</in-manage-payee> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

```

# Test source

```ts
  14  |         this.expenseButton = page.locator('img[alt="expenses"]');
  15  |         this.addExpenseButton = page.locator('//span[contains(text()," Add Expense")]');
  16  | 
  17  |         this.payeeManagement = {
  18  |             // button:has-text() matches text anywhere in the button subtree (child spans included)
  19  |             downloadPDFButton: page.locator('button:has-text("Download PDF")'),
  20  |             exportCSVButton: page.locator('button:has-text("Export CSV")'),
  21  |             payeeManagementButton: page.locator('in-payee-management-button').first(),
  22  |             managePayee: page.locator('#manage-payee-option'),
  23  |             addPayee: page.locator('#add-payee-option'),
  24  | 
  25  |         };
  26  | 
  27  |         this.managePayeeForm = {
  28  |             firstPayeeRow: page.locator('#payee-list-row-0'),
  29  |             firstPayeeActionMenu: page.locator('#payee-list-row-0 in-icon[name="3-dot-menu"]'),
  30  |             editFirstPayee: page.locator('li:has-text("Edit")').first(),
  31  |             deleteFirstPayee: page.locator('li:has-text("Delete")').first(),
  32  |             searchPayee: page.locator('input[placeholder="Search by name or category"]'),
  33  |             crossIconManagePayee: page.locator('#sidepanel-close-button'),
  34  | 
  35  |         }
  36  | 
  37  |         this.addNewPayeeForm = {
  38  |             addNewPayeeHeading: page.locator('#sidepanel-title'),
  39  |             crossIcon: page.locator('#sidepanel-close-button'),
  40  |             vendorNameInput: page.locator('#vendor'),
  41  |             firstNameInput: page.locator('#firstName'),
  42  |             lastNameInput: page.locator('#lastName'),
  43  |             categoryDropdown: page.locator('//ng-select[@formcontrolname="category"]'),
  44  |             categoryArrowClick: page.locator('#category'),
  45  |             categoryDropdownPanel: page.locator('//ng-dropdown-panel'),
  46  |             categorySelectLender: page.locator('//ng-dropdown-panel//div[@role="option"]//span[contains(text(), "Lender")]'),
  47  |             categorySelectContractor: page.locator('//ng-dropdown-panel//div[@role="option"]//span[contains(text(), "Contractor")]'),
  48  |             addButton: page.locator('#add-payee-button'),
  49  |             cancelButton: page.locator('#cancel-add-payee-button'),
  50  |             saveChangesButton: page.locator('#save-payee-changes-button'),
  51  |         };
  52  | 
  53  | 
  54  |         this.addAdditionalInfoButton = {
  55  |             addButton: page.locator('//button[contains(text(),"Add Additional Information")]'),
  56  |             phoneNumberInput: page.locator('#phone'),
  57  |             emailInput: page.locator('//input[@placeholder="Enter Payee Email"]'),
  58  |             websiteInput: page.locator('#website'),
  59  |             addressLine1Input: page.locator('#address1'),
  60  |             addressLine2Input: page.locator('#address2'),
  61  |             cityInput: page.locator('#city'),
  62  |             stateDropdown: page.locator('//ng-select[@formcontrolname="StateId"]'),
  63  |             stateArrow: page.locator('//ng-select[@formcontrolname="StateId"]//span[@class="ng-arrow"]'),
  64  |             postalCodeInput: page.locator('#zip'),
  65  |             secondaryPhoneNumberInput: page.locator('#officePhone'),
  66  |         };
  67  | 
  68  | 
  69  |         this.addExpense = {
  70  |             singleExpenseHeading: page.locator('//span[contains(text(), "Single Expense")]'),
  71  |             dateInput: page.locator('input#date'),
  72  |             calendarIcon: page.locator('span.tw-relative:has(input#date) in-icon'),
  73  |             categoryDropdown: page.locator('//in-single-expense//ng-select[@id="category"]'),
  74  |             taxableEntityDropdown: page.locator('//in-single-expense//ng-select[@id="taxableEntity"]'),
  75  |             propertyDropdown: page.locator('//in-single-expense//ng-select[@id="property"]'),
  76  |             unitDropdown: page.locator('//in-single-expense//ng-select[(@id="unit") or (.//input[@id="unit"])]'),
  77  |             payeeDropdown: page.locator('//in-single-expense//ng-select[@id="payee"]'),
  78  |             descriptionBoxInput: page.locator('#description'),
  79  |             amountInput: page.locator('//input[@data-id="amount"]'),
  80  |             recordExpenseButton: page.locator('#sidepanel-primary-button'),
  81  |             cancelExpenseButton: page.locator('#sidepanel-secondary-button'),
  82  |             fileInput: page.locator('in-single-expense input[type="file"]'),
  83  |             categorySearchInput: page.locator('//input[@placeholder="Search or add category"]'),
  84  |             plusIconOnCategoryDropdown: page.locator('#add-category-button'),
  85  |             bankAccountDropdown: page.locator('ng-select#bankAccount'),
  86  |             noBankItemsFound: page.locator('//ng-dropdown-panel//div[contains(text(),"No items found")]'),
  87  |             noItemsFound: page.locator('//ng-dropdown-panel//div[contains(text(),"No items found")]')
  88  |         
  89  |         };
  90  | 
  91  | 
  92  |         this.editExpense = {
  93  |             heading: page.locator('//*[contains(text(), "Edit This Expense Only")]').first(),
  94  |             descriptionInput: page.locator('[placeholder="Write your description here"]'),
  95  |             categoryDropdown: page.locator('ng-select#category'),
  96  |             saveButton: page.locator('#sidepanel-primary-button'),
  97  |             discardButton: page.locator('#sidepanel-secondary-button'),
  98  |         };
  99  | 
  100 | 
  101 | 
  102 | 
  103 | 
  104 | 
  105 | 
  106 |     } 
  107 | 
  108 | 
  109 | 
  110 |     // functtion declarihg
  111 | 
  112 |     async clickManageePayee() {
  113 |         await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
> 114 |         await this.payeeManagement.payeeManagementButton.click();
      |                                                          ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  115 |         await this.payeeManagement.managePayee.waitFor({ state: 'visible', timeout: 5000 });
  116 |         await this.payeeManagement.managePayee.click();
  117 |     }
  118 |     async clickFirstPayeeActionMenu() {
  119 |         await this.managePayeeForm.firstPayeeRow.waitFor({ state: 'visible', timeout: 15000 });
  120 |         await this.managePayeeForm.firstPayeeActionMenu.click({ timeout: 30000 });
  121 |     }
  122 | 
  123 |     async editFirstPayee() {
  124 |         await this.clickFirstPayeeActionMenu();
  125 |         await this.managePayeeForm.editFirstPayee.waitFor({ state: 'visible', timeout: 5000 });
  126 |         await this.managePayeeForm.editFirstPayee.click();
  127 |     }
  128 | 
  129 |     async updateFirstPayeeVendorName(newVendorName) {
  130 |         await this.editFirstPayee();
  131 |         await this.addNewPayeeForm.vendorNameInput.fill(newVendorName);
  132 |         await this.addNewPayeeForm.saveChangesButton.click();
  133 |     }
  134 | 
  135 |     //Add new payee section
  136 |     async clickAddNewPayee() { 
  137 |         await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
  138 |         await this.payeeManagement.payeeManagementButton.click();
  139 |         await this.payeeManagement.addPayee.waitFor({ state: 'visible', timeout: 5000 });
  140 |         await this.payeeManagement.addPayee.click();
  141 |     }
  142 | 
  143 |     getCategoryOption(categoryName) {
  144 |         return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${categoryName}"]`);
  145 |     }
  146 | 
  147 |     getStateOption(stateName) {
  148 |         return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${stateName}"]`);
  149 |     }
  150 | 
  151 |     async isPayeeInTable(vendorName) {
  152 |         await  this.clickManageePayee();
  153 |         await this.managePayeeForm.searchPayee.fill(vendorName);
  154 |         const row = this.page.locator(`//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "${vendorName}")]`);
  155 |         await row.waitFor({ state: 'visible', timeout: 20000 });
  156 |         return await row.innerText();
  157 |     }
  158 | 
  159 |     async addNewPayee (){
  160 |         const details = {
  161 |             vendorName: TestData.vendorName(),
  162 |             firstName: TestData.firstName(),
  163 |             lastName: TestData.lastName(),
  164 |             category : 'Contractor',
  165 |             email: TestData.email(),
  166 |             phoneNumber: TestData.phoneNumber(),
  167 |             website: 'https://gemini.google.com/app',
  168 |             address1: TestData.addressLine1(),
  169 |             address2: TestData.addressLine2(),
  170 |             city: TestData.city(),
  171 |             state: TestData.state(),
  172 |             zip: TestData.zip(),
  173 |         };
  174 | 
  175 |         await this.clickAddNewPayee();
  176 |         await this.addNewPayeeForm.vendorNameInput.fill(details.vendorName);
  177 |         await this.addNewPayeeForm.firstNameInput.fill(details.firstName);
  178 |         await this.addNewPayeeForm.lastNameInput.fill(details.lastName);
  179 |         await this.addNewPayeeForm.categoryArrowClick.click();
  180 |         await this.getCategoryOption(details.category).click();
  181 |         await this.page.waitForTimeout(1000);
  182 |         await this.addAdditionalInfoButton.addButton.click({force: true});
  183 |         await this.addAdditionalInfoButton.phoneNumberInput.fill(details.phoneNumber);
  184 |         await this.addAdditionalInfoButton.emailInput.fill(details.email);
  185 |         await this.addAdditionalInfoButton.websiteInput.fill(details.website);
  186 |         await this.addAdditionalInfoButton.addressLine1Input.fill(details.address1);
  187 |         await this.addAdditionalInfoButton.addressLine2Input.fill(details.address2);
  188 |         await this.addAdditionalInfoButton.cityInput.fill(details.city);
  189 |         await this.addAdditionalInfoButton.stateDropdown.click();
  190 |         await this.getStateOption(details.state).click();
  191 |         await this.page.waitForTimeout(1000);
  192 |         await this.addAdditionalInfoButton.postalCodeInput.fill(details.zip);
  193 |         await this.addNewPayeeForm.addButton.click();
  194 |         return details; // Return the details for verification in the test
  195 |     }
  196 | 
  197 | 
  198 | 
  199 |     //**
  200 |     //  Add single expense flow and function writing*/
  201 | 
  202 |     async selectRandomTaxableEntity() {
  203 |     await this.addExpense.taxableEntityDropdown.click();
  204 |     const options = this.page.locator('//ng-dropdown-panel//div[@role="option"]');
  205 |     const count = await options.count();
  206 |     const randomIndex = Math.floor(Math.random() * count);
  207 |     await options.nth(randomIndex).click();
  208 |     }
  209 | 
  210 |     async selectBankAccountIfAvailable() {
  211 |         await this.addExpense.bankAccountDropdown.click();
  212 |         const isEmpty = await this.addExpense.noBankItemsFound.isVisible();
  213 |         if(isEmpty){
  214 |             //no bank account linked to this taxable entity, so we can skip selecting a bank account
```