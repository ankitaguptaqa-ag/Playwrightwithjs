# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/expenses/expenses.spec.js >> Expenses Tests - shared login >> Verify that user is able add new payee and that is shown in the payee list and you are able to edit
- Location: specs/propertyOwner/expenses/expenses.spec.js:54:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 20000ms exceeded.
Call log:
  - waiting for locator('//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "Vendor_869304")]') to be visible

```

# Test source

```ts
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
  114 |         await this.payeeManagement.payeeManagementButton.click();
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
  152 |         const row = this.page.locator(`//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "${vendorName}")]`);
> 153 |         await row.waitFor({ state: 'visible', timeout: 20000 });
      |                   ^ TimeoutError: locator.waitFor: Timeout 20000ms exceeded.
  154 |         return await row.innerText();
  155 |     }
  156 | 
  157 |     async addNewPayee (){
  158 |         const details = {
  159 |             vendorName: TestData.vendorName(),
  160 |             firstName: TestData.firstName(),
  161 |             lastName: TestData.lastName(),
  162 |             category : 'Contractor',
  163 |             email: TestData.email(),
  164 |             phoneNumber: TestData.phoneNumber(),
  165 |             website: 'https://gemini.google.com/app',
  166 |             address1: TestData.addressLine1(),
  167 |             address2: TestData.addressLine2(),
  168 |             city: TestData.city(),
  169 |             state: TestData.state(),
  170 |             zip: TestData.zip(),
  171 |         };
  172 | 
  173 |         await this.clickAddNewPayee();
  174 |         await this.addNewPayeeForm.vendorNameInput.fill(details.vendorName);
  175 |         await this.addNewPayeeForm.firstNameInput.fill(details.firstName);
  176 |         await this.addNewPayeeForm.lastNameInput.fill(details.lastName);
  177 |         await this.addNewPayeeForm.categoryArrowClick.click();
  178 |         await this.getCategoryOption(details.category).click();
  179 |         await this.page.waitForTimeout(1000);
  180 |         await this.addAdditionalInfoButton.addButton.click({force: true});
  181 |         await this.addAdditionalInfoButton.phoneNumberInput.fill(details.phoneNumber);
  182 |         await this.addAdditionalInfoButton.emailInput.fill(details.email);
  183 |         await this.addAdditionalInfoButton.websiteInput.fill(details.website);
  184 |         await this.addAdditionalInfoButton.addressLine1Input.fill(details.address1);
  185 |         await this.addAdditionalInfoButton.addressLine2Input.fill(details.address2);
  186 |         await this.addAdditionalInfoButton.cityInput.fill(details.city);
  187 |         await this.addAdditionalInfoButton.stateDropdown.click();
  188 |         await this.getStateOption(details.state).click();
  189 |         await this.page.waitForTimeout(1000);
  190 |         await this.addAdditionalInfoButton.postalCodeInput.fill(details.zip);
  191 |         await this.addNewPayeeForm.addButton.click();
  192 |         return details; // Return the details for verification in the test
  193 |     }
  194 | 
  195 | 
  196 | 
  197 |     //**
  198 |     //  Add single expense flow and function writing*/
  199 | 
  200 |     async selectRandomTaxableEntity() {
  201 |     await this.addExpense.taxableEntityDropdown.click();
  202 |     const options = this.page.locator('//ng-dropdown-panel//div[@role="option"]');
  203 |     const count = await options.count();
  204 |     const randomIndex = Math.floor(Math.random() * count);
  205 |     await options.nth(randomIndex).click();
  206 |     }
  207 | 
  208 |     async selectBankAccountIfAvailable() {
  209 |         await this.addExpense.bankAccountDropdown.click();
  210 |         const isEmpty = await this.addExpense.noBankItemsFound.isVisible();
  211 |         if(isEmpty){
  212 |             //no bank account linked to this taxable entity, so we can skip selecting a bank account
  213 |             await this.page.keyboard.press('Escape'); // Close the dropdown
  214 |             return;
  215 |         }
  216 |         const bankOption = this.page.locator('//ng-dropdown-panel//div[@role="option"]').first();
  217 |         await bankOption.click();
  218 | 
  219 |     }
  220 | 
  221 |     async selectRandomProperty() {
  222 |         await this.addExpense.propertyDropdown.click();
  223 |         const options = this.page.locator('//ng-dropdown-panel//div[@role="option"]');
  224 |         const count = await options.count();
  225 |         const randomIndex = Math.floor(Math.random() * count);
  226 |         await options.nth(randomIndex).click();
  227 |     }
  228 | 
  229 |     async selectUnitIfAvailable() {
  230 |         await this.addExpense.unitDropdown.click();
  231 |         const isEmpty = await this.addExpense.noItemsFound.isVisible();
  232 | 
  233 |         if (isEmpty) {
  234 |             await this.page.keyboard.press('Escape');
  235 |             return;
  236 |         }
  237 | 
  238 |       const unitOption = this.page.locator('//ng-dropdown-panel//div[@role="option"]').first();
  239 |       await unitOption.click();
  240 |     }
  241 | 
  242 |     async selectRandomPayee() {
  243 |     await this.addExpense.payeeDropdown.click();
  244 |     const options = this.page.locator('//ng-dropdown-panel//div[@role="option"]');
  245 |     const count = await options.count();
  246 |     const randomIndex = Math.floor(Math.random() * count);
  247 |     await options.nth(randomIndex).click();
  248 |     }
  249 | 
  250 | 
  251 | 
  252 |     async recordSingleExpense() {
  253 |         await this.addExpenseButton.click();
```