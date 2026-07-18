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
  - waiting for locator('//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "Vendor_919911")]') to be visible

```

# Test source

```ts
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
  87  |         
  88  |         }
  89  | 
  90  | 
  91  |         this.editExpense = {
  92  |             heading: page.locator('//*[contains(text(), "Edit This Expense Only")]').first(),
  93  |             descriptionInput: page.locator('[placeholder="Write your description here"]'),
  94  |             categoryDropdown: page.locator('ng-select#category'),
  95  |             saveButton: page.locator('#sidepanel-primary-button'),
  96  |             discardButton: page.locator('#sidepanel-secondary-button'),
  97  |         };
  98  | 
  99  | 
  100 | 
  101 | 
  102 | 
  103 | 
  104 | 
  105 |     } 
  106 | 
  107 | 
  108 | 
  109 |     // functtion declarihg
  110 | 
  111 |     async clickManageePayee() {
  112 |         await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
  113 |         await this.payeeManagement.payeeManagementButton.click();
  114 |         await this.payeeManagement.managePayee.waitFor({ state: 'visible', timeout: 5000 });
  115 |         await this.payeeManagement.managePayee.click();
  116 |     }
  117 |     async clickFirstPayeeActionMenu() {
  118 |         await this.managePayeeForm.firstPayeeRow.waitFor({ state: 'visible', timeout: 15000 });
  119 |         await this.managePayeeForm.firstPayeeActionMenu.click({ timeout: 30000 });
  120 |     }
  121 | 
  122 |     async editFirstPayee() {
  123 |         await this.clickFirstPayeeActionMenu();
  124 |         await this.managePayeeForm.editFirstPayee.waitFor({ state: 'visible', timeout: 5000 });
  125 |         await this.managePayeeForm.editFirstPayee.click();
  126 |     }
  127 | 
  128 |     async updateFirstPayeeVendorName(newVendorName) {
  129 |         await this.editFirstPayee();
  130 |         await this.addNewPayeeForm.vendorNameInput.fill(newVendorName);
  131 |         await this.addNewPayeeForm.saveChangesButton.click();
  132 |     }
  133 | 
  134 |     //Add new payee section
  135 |     async clickAddNewPayee() { 
  136 |         await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
  137 |         await this.payeeManagement.payeeManagementButton.click();
  138 |         await this.payeeManagement.addPayee.waitFor({ state: 'visible', timeout: 5000 });
  139 |         await this.payeeManagement.addPayee.click();
  140 |     }
  141 | 
  142 |     getCategoryOption(categoryName) {
  143 |         return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${categoryName}"]`);
  144 |     }
  145 | 
  146 |     getStateOption(stateName) {
  147 |         return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${stateName}"]`);
  148 |     }
  149 | 
  150 |     async isPayeeInTable(vendorName) {
  151 |         const row = this.page.locator(`//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "${vendorName}")]`);
> 152 |         await row.waitFor({ state: 'visible', timeout: 20000 });
      |                   ^ TimeoutError: locator.waitFor: Timeout 20000ms exceeded.
  153 |         return await row.innerText();
  154 |     }
  155 | 
  156 |     async addNewPayee (){
  157 |         const details = {
  158 |             vendorName: TestData.vendorName(),
  159 |             firstName: TestData.firstName(),
  160 |             lastName: TestData.lastName(),
  161 |             category : 'Contractor',
  162 |             email: TestData.email(),
  163 |             phoneNumber: TestData.phoneNumber(),
  164 |             website: 'https://gemini.google.com/app',
  165 |             address1: TestData.addressLine1(),
  166 |             address2: TestData.addressLine2(),
  167 |             city: TestData.city(),
  168 |             state: TestData.state(),
  169 |             zip: TestData.zip(),
  170 |         };
  171 | 
  172 |         await this.clickAddNewPayee();
  173 |         await this.addNewPayeeForm.vendorNameInput.fill(details.vendorName);
  174 |         await this.addNewPayeeForm.firstNameInput.fill(details.firstName);
  175 |         await this.addNewPayeeForm.lastNameInput.fill(details.lastName);
  176 |         await this.addNewPayeeForm.categoryArrowClick.click();
  177 |         await this.getCategoryOption(details.category).click();
  178 |         await this.page.waitForTimeout(1000);
  179 |         await this.addAdditionalInfoButton.addButton.click({force: true});
  180 |         await this.addAdditionalInfoButton.phoneNumberInput.fill(details.phoneNumber);
  181 |         await this.addAdditionalInfoButton.emailInput.fill(details.email);
  182 |         await this.addAdditionalInfoButton.websiteInput.fill(details.website);
  183 |         await this.addAdditionalInfoButton.addressLine1Input.fill(details.address1);
  184 |         await this.addAdditionalInfoButton.addressLine2Input.fill(details.address2);
  185 |         await this.addAdditionalInfoButton.cityInput.fill(details.city);
  186 |         await this.addAdditionalInfoButton.stateDropdown.click();
  187 |         await this.getStateOption(details.state).click();
  188 |         await this.page.waitForTimeout(1000);
  189 |         await this.addAdditionalInfoButton.postalCodeInput.fill(details.zip);
  190 |         await this.addNewPayeeForm.addButton.click();
  191 |         return details; // Return the details for verification in the test
  192 |     }
  193 | 
  194 | 
  195 | 
  196 |     //**
  197 |     //  Add single expense flow and function writing*/
  198 | 
  199 |     async selectRandomTaxableEntity() {
  200 |     await this.addExpense.taxableEntityDropdown.click();
  201 |     const options = this.page.locator('//ng-dropdown-panel//div[@role="option"]');
  202 |     const count = await options.count();
  203 |     const randomIndex = Math.floor(Math.random() * count);
  204 |     await options.nth(randomIndex).click();
  205 |     }
  206 | 
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
  219 | 
  220 |     }
  221 | 
  222 | 
  223 |     async recordSingleExpense() {
  224 |         await this.addExpenseButton.click();
  225 |         await this.addExpense.singleExpenseHeading.waitFor({ state: 'visible', timeout: 5000 });
  226 |         const expenseDetails = {
  227 |             description: `Expense_${TestData.randomNumber(5)}`,
  228 |             amount: '200.00',
  229 |         };
  230 | 
  231 |         await this.addExpense.calendarIcon.click();
  232 |         await this.calendar.selectToday();
  233 |         await this.addExpense.categoryDropdown.click();
  234 |         await this.addExpense.categorySearchInput.fill(`Maggie_${TestData.randomNumber(5)}`);
  235 |         await this.addExpense.plusIconOnCategoryDropdown.click();
  236 |         await this.selectRandomTaxableEntity();
  237 |         await this.selectBankAccountIfAvailable();
  238 |         await this.addExpense.descriptionBoxInput.fill(expenseDetails.description);
  239 |         await this.addExpense.amountInput.fill(expenseDetails.amount);
  240 |         await this.addExpense.recordExpenseButton.click();
  241 | 
  242 |         return expenseDetails;
  243 | 
  244 | 
  245 | 
  246 | 
  247 | 
  248 | 
  249 | 
  250 |     }
  251 |         
  252 | 
```