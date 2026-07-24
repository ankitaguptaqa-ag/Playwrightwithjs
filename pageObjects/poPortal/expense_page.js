import { TestData } from "../../mocks/common/expenseTestData.js";
import { Calendar } from "../../utils/calendar.js";





export class ExpensePage {
    constructor(page) {
        this.page = page;
        this.calendar = new Calendar(page);


        this.expenseButton = page.locator('img[alt="expenses"]');
        this.addExpenseButton = page.locator('//span[contains(text()," Add Expense")]');

        this.payeeManagement = {
            // button:has-text() matches text anywhere in the button subtree (child spans included)
            downloadPDFButton: page.locator('button:has-text("Download PDF")'),
            exportCSVButton: page.locator('button:has-text("Export CSV")'),
            payeeManagementButton: page.locator('in-payee-management-button').first(),
            managePayee: page.locator('#manage-payee-option'),
            addPayee: page.locator('#add-payee-option'),

        };

        this.managePayeeForm = {
            firstPayeeRow: page.locator('#payee-list-row-0'),
            firstPayeeActionMenu: page.locator('#payee-list-row-0 in-icon[name="3-dot-menu"]'),
            editFirstPayee: page.locator('li:has-text("Edit")').first(),
            deleteFirstPayee: page.locator('li:has-text("Delete")').first(),
            searchPayee: page.locator('input[placeholder="Search by name or category"]'),
            crossIconManagePayee: page.locator('#sidepanel-close-button'),

        }

        this.addNewPayeeForm = {
            addNewPayeeHeading: page.locator('#sidepanel-title'),
            crossIcon: page.locator('#sidepanel-close-button'),
            vendorNameInput: page.locator('#vendor'),
            firstNameInput: page.locator('#firstName'),
            lastNameInput: page.locator('#lastName'),
            categoryDropdown: page.locator('//ng-select[@formcontrolname="category"]'),
            categoryArrowClick: page.locator('#category'),
            categoryDropdownPanel: page.locator('//ng-dropdown-panel'),
            categorySelectLender: page.locator('//ng-dropdown-panel//div[@role="option"]//span[contains(text(), "Lender")]'),
            categorySelectContractor: page.locator('//ng-dropdown-panel//div[@role="option"]//span[contains(text(), "Contractor")]'),
            addButton: page.locator('#add-payee-button'),
            cancelButton: page.locator('#cancel-add-payee-button'),
            saveChangesButton: page.locator('#save-payee-changes-button'),
        };


        this.addAdditionalInfoButton = {
            addButton: page.locator('//button[contains(text(),"Add Additional Information")]'),
            phoneNumberInput: page.locator('#phone'),
            emailInput: page.locator('//input[@placeholder="Enter Payee Email"]'),
            websiteInput: page.locator('#website'),
            addressLine1Input: page.locator('#address1'),
            addressLine2Input: page.locator('#address2'),
            cityInput: page.locator('#city'),
            stateDropdown: page.locator('//ng-select[@formcontrolname="StateId"]'),
            stateArrow: page.locator('//ng-select[@formcontrolname="StateId"]//span[@class="ng-arrow"]'),
            postalCodeInput: page.locator('#zip'),
            secondaryPhoneNumberInput: page.locator('#officePhone'),
        };


        this.addExpense = {
            singleExpenseHeading: page.locator('//span[contains(text(), "Single Expense")]'),
            dateInput: page.locator('input#date'),
            calendarIcon: page.locator('span.tw-relative:has(input#date) in-icon'),
            categoryDropdown: page.locator('//in-single-expense//ng-select[@id="category"]'),
            taxableEntityDropdown: page.locator('//in-single-expense//ng-select[@id="taxableEntity"]'),
            propertyDropdown: page.locator('//in-single-expense//ng-select[@id="property"]'),
            unitDropdown: page.locator('//in-single-expense//ng-select[(@id="unit") or (.//input[@id="unit"])]'),
            payeeDropdown: page.locator('//in-single-expense//ng-select[@id="payee"]'),
            descriptionBoxInput: page.locator('#description'),
            amountInput: page.locator('//input[@id="amount"]'),
            recordExpenseButton: page.locator('//button[@id ="record-expense-button"]'),
            cancelExpenseButton: page.locator('//button[@id ="cancel-record-expense-button"]'),
            fileInput: page.locator('in-single-expense input[type="file"]'),
            categorySearchInput: page.locator('//input[@placeholder="Search or add category"]'),
            plusIconOnCategoryDropdown: page.locator('#add-category-button'),
            bankAccountDropdown: page.locator('ng-select#bankAccount'),
            noBankItemsFound: page.locator('//ng-dropdown-panel//div[contains(text(),"No items found")]'),
            noItemsFound: page.locator('//ng-dropdown-panel//div[contains(text(),"No items found")]'),
            descriptionLabel: page.locator('//label[contains(text(),"Description")]'),
            getExpenseListInTable:(description) =>
                page.locator(`//in-expense-list-web//table//tbody//tr//td[contains(text(), "${description}")]`),

        };


        this.editExpense = {
            heading: page.locator('//*[contains(text(), "Edit This Expense Only")]').first(),
            descriptionInput: page.locator('[placeholder="Write your description here"]'),
            categoryDropdown: page.locator('ng-select#category'),
            saveButton: page.locator('#sidepanel-primary-button'),
            discardButton: page.locator('#sidepanel-secondary-button'),
        };







    } 



    // functtion declarihg

    async clickManageePayee() {
        await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.payeeManagement.payeeManagementButton.click();
        await this.payeeManagement.managePayee.waitFor({ state: 'visible', timeout: 5000 });
        await this.payeeManagement.managePayee.click();
    }
    async clickFirstPayeeActionMenu() {
        await this.managePayeeForm.firstPayeeRow.waitFor({ state: 'visible', timeout: 15000 });
        await this.managePayeeForm.firstPayeeActionMenu.click({ timeout: 30000 });
    }

    async editFirstPayee() {
        await this.clickFirstPayeeActionMenu();
        await this.managePayeeForm.editFirstPayee.waitFor({ state: 'visible', timeout: 5000 });
        await this.managePayeeForm.editFirstPayee.click();
    }

    async updateFirstPayeeVendorName(newVendorName) {
        await this.editFirstPayee();
        await this.addNewPayeeForm.vendorNameInput.fill(newVendorName);
        await this.addNewPayeeForm.saveChangesButton.click();
    }

    //Add new payee section
    async clickAddNewPayee() { 
        await this.payeeManagement.payeeManagementButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.payeeManagement.payeeManagementButton.click();
        await this.payeeManagement.addPayee.waitFor({ state: 'visible', timeout: 5000 });
        await this.payeeManagement.addPayee.click();
    }

    getCategoryOption(categoryName) {
        return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${categoryName}"]`);
    }

    getStateOption(stateName) {
        return this.page.locator(`//ng-dropdown-panel//div[@role="option"]//span[normalize-space()="${stateName}"]`);
    }

    // async isPayeeInTable(vendorName) {
    //     //await  this.clickManageePayee();
    //     // await this.managePayeeForm.searchPayee.fill(vendorName);
    //     // const row = this.page.locator(`//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "${vendorName}")]`);
    //     // await row.waitFor({ state: 'visible', timeout: 20000 });
    //     // return await row.innerText();
    // }

    async isPayeeInTable(vendorName) {
    const isManagePayeeOpen = await this.managePayeeForm.searchPayee.isVisible();
    if (!isManagePayeeOpen) {
        await this.clickManageePayee();
    }
    await this.managePayeeForm.searchPayee.fill(vendorName);
    const row = this.page.locator(`//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "${vendorName}")]`);
    await row.waitFor({ state: 'visible', timeout: 20000 });
    return await row.innerText();
    }

    async inListPageIsExpenseInTable(description) {
        const row = this.addExpense.getExpenseListInTable(description);
        await row.waitFor({ state: 'visible', timeout: 20000 });
        return await row.isVisible();
    }




    async addNewPayee (){
        const details = {
            vendorName: TestData.vendorName(),
            firstName: TestData.firstName(),
            lastName: TestData.lastName(),
            category : 'Contractor',
            email: TestData.email(),
            phoneNumber: TestData.phoneNumber(),
            website: 'https://gemini.google.com/app',
            address1: TestData.addressLine1(),
            address2: TestData.addressLine2(),
            city: TestData.city(),
            state: TestData.state(),
            zip: TestData.zip(),
        };

        await this.clickAddNewPayee();
        await this.addNewPayeeForm.vendorNameInput.fill(details.vendorName);
        await this.addNewPayeeForm.firstNameInput.fill(details.firstName);
        await this.addNewPayeeForm.lastNameInput.fill(details.lastName);
        await this.addNewPayeeForm.categoryArrowClick.click();
        await this.getCategoryOption(details.category).click();
        await this.page.waitForTimeout(1000);
        await this.addAdditionalInfoButton.addButton.click({force: true});
        await this.addAdditionalInfoButton.phoneNumberInput.fill(details.phoneNumber);
        await this.addAdditionalInfoButton.emailInput.fill(details.email);
        await this.addAdditionalInfoButton.websiteInput.fill(details.website);
        await this.addAdditionalInfoButton.addressLine1Input.fill(details.address1);
        await this.addAdditionalInfoButton.addressLine2Input.fill(details.address2);
        await this.addAdditionalInfoButton.cityInput.fill(details.city);
        await this.addAdditionalInfoButton.stateDropdown.click();
        await this.getStateOption(details.state).click();
        await this.page.waitForTimeout(1000);
        await this.addAdditionalInfoButton.postalCodeInput.fill(details.zip);
        await this.addNewPayeeForm.addButton.click();
        return details; // Return the details for verification in the test
    }



    //**
    //  Add single expense flow and function writing*/

    async selectRandomOptionFromOpenDropdown(dropdownLocator) {
        const options = this.page.locator('//ng-dropdown-panel//div[@role="option"]');
        await options.first().waitFor({ state: 'visible', timeout: 5000 });
        const count = await options.count();
        console.log(`Dropdown has ${count} option(s) available`);
        const randomIndex = Math.floor(Math.random() * count);
        const selectedOption = options.nth(randomIndex);
        const selectedText = await selectedOption.innerText();
        console.log(`Picked option ${randomIndex}: "${selectedText}"`);
        await selectedOption.click();

        // some dropdown panels don't auto-close after selecting - force it shut if it's still open
        const stillOpen = await this.page.locator('//ng-dropdown-panel').isVisible();
        if (stillOpen) {
            console.log('Panel still open after selecting - closing it now');
            await dropdownLocator.click();
        }

        return selectedText;
    }

    async selectRandomTaxableEntity() {
        await this.addExpense.taxableEntityDropdown.click();
        return await this.selectRandomOptionFromOpenDropdown(this.addExpense.taxableEntityDropdown);
    }

    async selectBankAccountIfAvailable() {
        await this.addExpense.bankAccountDropdown.click();

        await this.page.waitForTimeout(500);
        const isEmpty = await this.addExpense.noBankItemsFound.isVisible();
        if(isEmpty){
            //no bank account linked to this taxable entity, so we can skip selecting a bank account
            await this.addExpense.bankAccountDropdown.click(); // click the same dropdown again to close it
            return 'No items found';
        }
        return await this.selectRandomOptionFromOpenDropdown(this.addExpense.bankAccountDropdown);
    }

    async selectRandomProperty() {
        await this.addExpense.propertyDropdown.click();
        return await this.selectRandomOptionFromOpenDropdown(this.addExpense.propertyDropdown);
    }

    async selectUnitIfAvailable() {
        await this.addExpense.unitDropdown.click();

        await this.page.waitForTimeout(500);
        const isEmpty = await this.addExpense.noItemsFound.isVisible();

        if (isEmpty) {
            console.log('No units available for this property - skipping');
            await this.addExpense.unitDropdown.click(); // click the same dropdown again to close it
            return 'No items found';
        }

        console.log('Units are available - selecting one at random');
        return await this.selectRandomOptionFromOpenDropdown(this.addExpense.unitDropdown);
    }

    async selectRandomPayee() {
        await this.addExpense.payeeDropdown.click();
        return await this.selectRandomOptionFromOpenDropdown(this.addExpense.payeeDropdown);
    }


    async recordSingleExpense() {
        await this.addExpenseButton.click();
        await this.addExpense.singleExpenseHeading.waitFor({ state: 'visible', timeout: 5000 });
        const expenseDetails = {
            description: `Expense_${TestData.randomNumber(5)}`,
            amount: '200.00',
            category: `Maggie_${TestData.randomNumber(5)}`,
        };

        await this.addExpense.calendarIcon.click();
        await this.calendar.selectToday();
        await this.addExpense.categoryDropdown.click();
        await this.addExpense.categorySearchInput.fill(expenseDetails.category);
        await this.addExpense.plusIconOnCategoryDropdown.click();
        expenseDetails.taxableEntity = await this.selectRandomTaxableEntity();
        expenseDetails.bankAccount = await this.selectBankAccountIfAvailable();
        expenseDetails.property = await this.selectRandomProperty();
        expenseDetails.unit = await this.selectUnitIfAvailable();
        // the closing Unit dropdown panel still overlaps nearby fields for a moment - let it fully close
        await this.page.waitForTimeout(1000);
        await this.addExpense.amountInput.fill(expenseDetails.amount);
        expenseDetails.payee = await this.selectRandomPayee();
        await this.addExpense.descriptionBoxInput.fill(expenseDetails.description);
        await this.addExpense.recordExpenseButton.click();
        // let the submission complete (panel close, expense list refresh) before moving on
        await this.page.waitForTimeout(2000);
        console.log('Recorded expense:', expenseDetails);
        return expenseDetails;

    }
    
        



   




}