import { TestData } from "../../mocks/common/expenseTestData.js";



export class ExpensePage {    
    constructor(page) {
        this.page = page;

        
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
            amountInput: page.locator('//input[@data-id="amount"]'),
            recordExpenseButton: page.locator('#sidepanel-primary-button'),
            cancelExpenseButton: page.locator('#sidepanel-secondary-button'),
            fileInput: page.locator('in-single-expense input[type="file"]'),
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

    async isPayeeInTable(vendorName) {
        const row = this.page.locator(`//in-manage-payee-desktop-view//table//tbody/tr/td[1][contains(text(), "${vendorName}")]`);
        await row.waitFor({ state: 'visible', timeout: 20000 });
        return await row.innerText();
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

    async recordSingleExpense() {
        

    }
        



   




}