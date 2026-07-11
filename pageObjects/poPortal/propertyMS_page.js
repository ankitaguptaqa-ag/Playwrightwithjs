import { expect } from '@playwright/test';
import { randomUtils } from '../../utils/randomUtils.js';
import { testData } from '../../mocks/common/testData.js';
import { Calendar } from '../../utils/calendar.js';


export class PropertiesPage {
    constructor(page) {
        this.page = page;


        this.addPropertyDetails = {
            addProperty_Button: page.locator('#add-property'),
            addressCollapse_Icon: page.locator('//in-icon[@name="menu-hamburger-reversed"]').first(),
            closeAddressCollapse_Icon: page.locator('//in-icon[@name="close-model"]').first(),
            addressLine1_Heading: page.locator('//h5[normalize-space()="Address Line 1"]'),
            addressLine1_Input: page.locator('//input[@formcontrolname="addressLine1"]'),
            addressLine2_Input: page.locator('//input[@formcontrolname="addressLine2"]'),
            city_Input: page.locator('//input[@formcontrolname="city"]'),
            zipCode_Input: page.locator('//input[@formcontrolname="zip"]'),
            state_Dropdown: page.locator('//select[@formcontrolname="state"]'),
            property_Name_Input: page.locator('//input[@formcontrolname="propertyName"]'),
            property_Type_Dropdown: page.locator('//select[@formcontrolname="propertyType"]'),
            tags_Dropdown: page.locator('//ng-select[@formcontrolname="propertyTagIds"]'),
            next_Button: page.locator('//button[@data-locator="save-info-to-move-next"]'),
            cancel_Button: page.locator('//button[@data-locator="cancel-section"]'),
            unit_Name_input: page.locator('//input[@formcontrolname="unitName"]'),
            unit_details_Collapse_Icon: page.locator('//in-icon[@class="in-icon tw-ml-auto !tw-text-dark-grey ng-tns-c583-7 ng-star-inserted"]'),
            next_Button_UnitDetails: page.locator('//button[@data-id="save-info-to-move-next"]'),
            cancel_Button_UnitDetails: page.locator('//button[@data-id="cancel-section"]'),
            back_Button_UnitDetails: page.locator('//button[@data-id="move-to-previous-section"]'),
            save_Button_Property_Setting: page.locator('//button[@data-locator="save-info-to-move-next"]'),
            bank_Account_selection: page.locator('//input[@name="deposit"]'),
            add_Lease_Button_Verify: page.locator('//button[@data-locator="navigateToCreateProperty"]'),
            propertyCountString: page.locator('//span[@id="records-showing"]'),
        };


        this.lease_TermDetails = {
            nextButton_AddLeaseTermDetails: page.locator('#start-adding-lease'),
            m2m_Lease_Type_RadioButton: page.locator('//label[@for="lease-radio-month"]'),
            next_Button_LeaseTermDetails: page.locator('#lease-next'),
            rent_Amount_Input: page.locator('//input[@name="amount"]'),
            due_On_Date_Dropdown: page.locator('//select[@name="dueOnMonthly"]'),
            first_Invoice_Date_Input: page.locator('//select[@name="firstRentalInvoiceDate"]'),
            payment_Frequency_Dropddown: page.locator('//select[@name="paymentfrequency"]'),
            payment_Schedule_Dropdown_BiMonthly: {
                payment_Schedule_Dropdown_BiMonthly_First: page.locator('//select[@name="dueDateBiMonthlyStart"]'),
                payment_Schedule_Dropdown_BiMonthly_Second: page.locator('//select[@name="dueDateBiMonthlyEnd"]'),
                first_Invoice_Due_Date_BiMonthly: page.locator('//select[@name="firstRentalInvoiceDate"]'),
            },
            payment_Schedule_Dropdown_Weekly: {
                payment_Schedule_Dropdown_Weekly_New: page.locator('//select[@name="dueweek"]'),
                first_Rental_Invoice_Weekly: page.locator('//select[@name="selectedMonthForWeekly"]'),
                select_first_Rental_Invoice_Weekly: page.locator('//input[@name="usage"]'),
            },
            view_And_Edit_Rent_Scheduled: {
                total_Number_Of_Invoices_Heading: page.locator('p[name="totals-invoices-paragraph"]'),
                total_Number_Of_Invoice_Count: page.locator('//p[@name="totals-invoices-count-paragraph"]'),
                view_Edit_Rent_Scheduled: page.locator('//button[@data-locator="qa-view-edit-rent-schedule"]'),
                action_Button_Three_Dot: page.locator('//div[@class="lease-summary-inner ng-star-inserted"]//div[2]/div/div[4]'),
                action_Button_Three_Dot_Second_Row: page.locator('//a[normalize-space()="Edit"]//img[@alt="Edit"]'),
                edit_Button: page.locator('//a[normalize-space()="Edit"]'),
                delete_Button: page.locator('//a[normalize-space()="Delete"]'),
                calender_Input: page.locator('//datepicker[@data-locator="invoiceDueDate"]//button[@aria-label="Open calendar"]'),
                calender_Input_Second_Row: page.locator(''),
                rent_Input: page.locator('//input[@data-locator="invoiceRentEditable"]'),
                rent_Input_Second_Row: page.locator('(//input[@placeholder="0"])[1]'),
                save_Button: page.locator('(//button[@title="Save"])[1]'),
                save_Button_Second_Row: page.locator('(//img[@alt="Save"])[2]'),
                row_List_Rent_Invoice: page.locator('//app-group-invoice/div[2]/div/div'),
            },
        };


        this.add_Additional_Fees_Section = {
            add_additional_Fees: page.locator('//button[contains(text(), " Add Additional Fee (Optional)")]'),
            cross_icon: page.locator('(//img[@alt="Close"])[2]'),
            item_Dropdown: page.locator('//div[@class="innago-multiselect-field"]'),
            select_Item_Checkbox: page.locator('//label[normalize-space()="Maintenance Request"]'),
            select_Item_Checkbox_LateFess: page.locator('//label[normalize-space()="Late Fee Charge"]'),
            add_New_Item: page.locator('//button[contains(text(), "Add Item")]'),
            description_Input: page.locator('//input[@placeholder="Description"]'),
            rate_Input: page.locator('//input[@id="rate0"]').first(),
            quantity_Input: page.locator('//input[@id="qty0"]').first(),
            notes_addon: page.locator('#notes'),
            recurring_Invoice_Toggle_Switch: page.locator('//div[@class="simple-switch"]'),
            recurring_Invoice_Switch_ON: {
                payement_Frequency_Dropdown: page.locator('//select[@id="paymentfrequency"]'),
                due_On_Monthly: page.locator('//select[@id="dueOnDayMonthly"]'),
                start_Date_Monthly: page.locator('//select[@id="startDateOnInvoice"]'),
                End_Date_Monthly: page.locator('//select[@id="endDateOnInvoice"]'),
            },
            cancel_Button: page.locator('//button[text()="Cancel"]'),
            create_Button: page.locator('//button[text()=" Create "]'),
            make_This_A_Line_Item_On_The_Rental_Invoice: {
                line_Item_Rental_Invoice: page.locator('label[for="rental-invoice-attach"]'),
                start_Date: page.locator('#startDateOnInvoice'),
                end_Date: page.locator('#endDateOnInvoice'),
            },
            new_Item_Added_Additional_Fees: {
                item_Dropdown_new: page.locator('//tbody/tr[2]/td[1]/div[1]/div[1]/div[1][@class="innago-multiselect-field"]'),
                add_Item_Type_New: page.locator('(//input[@placeholder="Add Item Type"])[2]'),
                plus_Icon_Add_New_Item: page.locator('//table/tbody//tr[2]/td/div/div//div//div//div[2]/button'),
                description_Input_New: page.locator('//table/tbody//tr[2]//td[2]/div/div/input[@placeholder="Description"]'),
                quantity_New_Input: page.locator('//table/tbody//tr[2]//td[3]/div/div/input[@id="qty1"]'),
                rate_New_Input: page.locator('//table/tbody//tr[2]//td[4]/div/div/input[@id="rate1"]'),
            },
            recurring_Invoice_Heading: page.locator('//h4[@name="recurring-item-heading"]'),
        };


        this.fixed_TermDetails = {
            fixed_Term_Type_RadioButton: page.locator('//label[@for="lease-radio-fixed"]'),
            calendar_Click_Input: page.locator('//label[@name="end-date-label"]/following::mat-datepicker-toggle[1]/button'),
            payment_Schedule_Dropdown: {
                payment_Schedule_Option_Monthly: page.locator('//select[@name="paymentfrequency"]/option[normalize-space()="Monthly"]'),
                payment_Schedule_Option_Bi_Monthly: page.locator('//select[@name="paymentfrequency"]/option[normalize-space()="Bi-Monthly"]'),
                payment_Schedule_Option_Semi_Annually: page.locator('//select[@name="paymentfrequency"]/option[normalize-space()="Semi-annually"]'),
                payment_Schedule_Option_Weekly: page.locator('//select[@name="paymentfrequency"]/option[normalize-space()="Weekly"]'),
                payment_Schedule_Option_Bi_Weekly: page.locator('//select[@name="paymentfrequency"]/option[normalize-space()="Bi-Weekly"]'),
                payment_Schedule_Option_Custom: page.locator('//select[@name="paymentfrequency"]/option[normalize-space()="Custom"]'),
            },
            due_On_Dropdown_Monthly_FixedTerm: page.locator('//select[@name="dueOnMonthly"]'),
            first_Invoice_Date_Input_FixedTerm: page.locator('//select[@name="firstRentalInvoiceDate"]'),
        };


        this.deposit_Details = {
            deposit_Amount_Input: page.locator('//input[@name="deposit"]'),
            due_On_Calendar_Input: page.locator('//label[@name="due-on-label"]/following::mat-datepicker-toggle[1]/button'),
        };


        this.add_TenantDetails = {
            add_Tenant_Button: page.locator('#next-add-tenant'),
            fname_Input: page.locator('//input[@placeholder="First Name"]'),
            lname_Input: page.locator('//input[@placeholder="Last Name"]'),
            email_Input: page.locator('//input[@placeholder="Email"]'),
            phone_Input: page.locator('#phone-number-filed'),
            next_Button_TenantDetails: page.locator('#sign-lease-next'),
            application_Screening_Dropdwon: page.locator('#select-pack select'),
            each_Tenant_Is_Only_Responsible_Checkbox: page.locator('//label[@name="check-box-label"]'),
            add_New_Tenant_Button: page.locator('#add-new-tenant'),
            all_Tenant_Are_Equally_Responsbile: page.locator('//label[@for="all"]'),
            click_second_Tenant_details_Fname: page.locator('//table[contains(@class, "table-look")]//tbody/tr[2]//input[@placeholder="First Name"]'),
            click_second_Tenant_details_Lastname: page.locator(
                '//table[contains(@class, "table-look")]//tbody/tr[2]//input[@placeholder="Last Name"]',
            ),
            click_second_Tenant_details_Email: page.locator('//table[contains(@class, "table-look")]//tbody/tr[2]//input[@placeholder="Email"]'),
            click_second_Tenant_details_Phone: page.locator(
                '//table[contains(@class, "table-look")]//tbody/tr[2]//input[@placeholder="Phone Number"]',
            ),
            application_Screening_Dropdwon2: page.locator('//table[contains(@class, "table-look")]//tbody/tr[2]//div[@id="select-pack"]/select'),
        };


        this.renterInsurance_Details = {
            next_Button_RenterInsuranceDetails: page.locator('//button[@data-locator="qa-renter-insurance-9"]'),
            configure_Setting_Button: page.locator('#configure-settings'),
            yes_Button_FirstPage: page.locator('#requirement-communicated'),
            no_Button_FirstPage: page.locator('#not-enforcing-requirement'),
            skip_Button: page.locator('#skip-for-now-button'),
            next_Button: page.locator('#sidepanel-primary-button'),
            cancel_Button: page.locator('#sidepanel-secondary-button'),
            yes_Button_SecondPage: page.locator('#requirement-communicated'),
            no_Button_SecondPage: page.locator('#not-enforcing-requirement-no'),
            submit_Button: page.locator('#sidepanel-primary-button'),
            back_Button: page.locator('#sidepanel-secondary-button'),
        };


        this.finalize_Lease = {
            offline_Signature_Checkbox: page.locator('#upload-signed-lease'),
            confirm_Invite_Button: page.locator('#done-btn'),
        };


        this.propertyFilter = {
            filter_Dropdown: page.locator('//div[@id="filter-dropdown"]/in-icon[2]'),
            property_Dropdown_Option: page.locator('//ng-select[@formcontrolname="propertyIds"]'),
            property_Search_Field: page.locator('input[placeholder="search"]'),
            firstPropertyCheckBox: page.locator("(//div[contains(@class,'ng-dropdown-panel')]//div[contains(@class,'ng-option')])[1]"),
            apply_Filter: page.locator('#apply-filter'),
            clear_Filter: page.locator('#clear-filter'),
            city_Label: page.locator('#city-label'),
            city_Dropdown: page.locator('#city-list'),
            city_Search_Input: page.locator('//div[1]/ng-select/div/div/div[2]/input'),
            getCityAsPerName: (cityName) => page.locator(`//span[text()="${cityName}"]`),
            state_Dropdown: page.locator('#state-list'),
            getStateAsPerName: (stateName) => page.locator(`//span[text()="${stateName}"]`),
            zipCode_Input: page.locator('#zip-code'),
            status_Dropdown: page.locator('#status-list'),
            getStatusAsPerName: (statusName) => page.locator(`//span[text()="${statusName}"]`),
            getPropertyByName: (propertyName) => page.locator(`//div[contains(text(),"${propertyName}")]`),
            numberOfUnits_Input: page.locator('#no-of-unit'),
            hasOpen_Maintenance_Checkbox: page.locator('#has-open-maintenance'),
            viewArchived_Properties_Checkbox: page.locator('#view-archived-property'),
        };


        this.addNotesSection = {
            add_Notes_Button: page.locator('//span[contains(text(),"Add Notes")]'),
            notes_And_Files_Heading: page.locator('//div[contains(text()," NOTES & FILES ")]'),
            cross_Icon: page.locator('#sidepanel-close-button'),
            Notes_Tab_Text: page.locator('//a[contains(text(),"NOTES")]'),
            Files_Tab_Text: page.locator('//a[contains(text(),"FILES")]'),
            post_Button: page.locator('//button[contains(text(),"Post")]'),
            notes_Text_Area_Input: page.locator('//textarea[@formcontrolname="addNote"]'),
            getNotesByText: (text) => page.locator(`//div[contains(text(),"${text}")]`),
            getPoNameByText: (name) => page.locator(`//span[normalize-space()="${name}"]`),
            date: page.locator('//div[@role="tabpanel"]//in-shared-section/div[2]/in-primary-notes//div[3]/span[2]'),
            poName_Notes: page.locator('//div[@role="tabpanel"]//in-shared-section/div[2]/in-primary-notes//div[3]/span[1]'),
            propertyName: page.locator('//div[@role="tabpanel"]//in-shared-section/div[2]/in-primary-notes//div[1]/div//div/div/div[1]'),
            actionMenuIconBasedOnNotesIndex: (notesindex) =>
                page.locator(`//div[contains(text(),"${notesindex}")]/ancestor::div[contains(@class,"tw-flex-row")]//in-icon[@role="img"]`),
            editIcon: page.locator('//li[contains(text(), "Edit")]'),
            deleteIcon: page.locator('//li[contains(text(), "Delete")]'),
            editNotesTextArea: page.locator('//textarea[@formcontrolname="edit"]'),
            saveBtn: page.locator('//in-note-edit/div/div[2]/button[1]/in-icon'),
            cancelBtn: page.locator('//in-note-edit/div/div[2]/button[2]/in-icon'),
            add_Attachment_Button: page.locator('//input[@type="file"]'),
        };


        this.lateFees_Section = {
            add_lateFees_Button: page.locator('//button[contains(text(), " Add Late Fee ")]'),
            arrow_Icon: page.locator('//button[@data-locator="move-back-to-property-settings1"]//in-icon'),
            add_Late_Fees_Label: page.locator('//span[contains(text(), "Add Another Late Fee")]'),
            late_Fees_Type_Dropdown: page.locator('//select[@data-locator="late-fee-type-id"]'),
            fee_Amount_Input: page.locator('//input[@data-locator="late-fee-amount"]'),
            grace_Period_Input: page.locator('//input[@data-locator="grace-period"]'),
            repeat_Toggle_Switch: page.locator('//in-toggle-input[@data-locator="repeat"]/div'),
            repeat_Every_Input: page.locator('//input[@data-locator="repeat-after-days"]'),
            end_After_Input: page.locator('//input[@data-locator="end-after-days"]'),
            apply_To_Checkbox: page.locator('(//input[@name="applyTo"])[2]'),
            save_Button_LateFees: page.locator('//button[@data-locator="save-to-add-late-fee"]'),
            cancel_Button: page.locator('//button[@data-locator="cancel-to-add-late-fee"]'),
            edit_Icon_Click_On_Property_Details: page.locator('#open-edit-property-sidepanel'),
            property_Settiong_Icon_Click: page.locator('//span[contains(text(), " Property Settings ")]'),
        };


        this.invoiceSectionOnPropertyDetailsPage = {
            upcoming_Invoice_Section: {
                table_List_Rows: page.locator('//tbody/tr'),
                view_All_Button: page.locator('//in-lease-invoices//div[2][contains(text(), " View All ")]'),
                first_Invoice_Id: page.locator('//table[@id="upcomingInvoicesTable"]//tbody//tr[1]/td[1]/span'),
                first_Due_Date: page.locator('//table[@id="upcomingInvoicesTable"]//tbody//tr[1]//td[2]'),
                first_Amount_Due: page.locator('//table[@id="upcomingInvoicesTable"]//tbody//tr[1]//td[3]'),
                goTo_Record: page.locator('#redirect-to-income-invoice-details'),
                cross_Icon: page.locator('#sidepanel-close-button'),
                edit_Button: page.locator('#open-edit-invoice-invoice-sidepanel'),
                rate_Input: page.locator('//input[@placeholder="Rate"]'),
                due_On_Input: page.locator('//input[@formcontrolname="DueDate"]'),
                save_Changes_Button: page.locator('#sidepanel-primary-button'),
                cancel_Button: page.locator('#sidepanel-secondary-button'),
                back_Arrow: page.locator('#sidepanel-back-button'),
                view_All_Invoices: {
                    row_count_View_All: page.locator('//in-tailwind-frame-content//table//tbody/tr'),
                    top_list_invoiceId: page.locator('//in-tailwind-frame-content//tbody//tr[1]/td[1]'),
                    top_list_DueDate: page.locator('//in-tailwind-frame-content//tbody//tr[1]//td[2]'),
                    top_Second_list_InvoiceId: page.locator('//in-tailwind-frame-content//tbody//tr[2]//td[1]'),
                    top_Third_list_InvoiceId: page.locator('//in-tailwind-frame-content//tbody//tr[3]//td[1]'),
                    top_Fourth_list_InvoiceId: page.locator('//in-tailwind-frame-content//tbody//tr[4]//td[1]'),
                    top_Fifth_list_InvoiceId: page.locator('//in-tailwind-frame-content//tbody//tr[5]//td[1]'),
                    top_Second_list_DueDate: page.locator('//in-tailwind-frame-content//tbody//tr[2]//td[2]'),
                    top_list_AmountDue: page.locator('//in-tailwind-frame-content//tbody//tr[1]//td[3]'),
                    top_Second_list_AmountDue: page.locator('//in-tailwind-frame-content//tbody//tr[2]//td[3]'),
                },
                popup_Message: {
                    proceed_Yes: page.locator('#modal-primary-button'),
                },
            },
        };
    }


    async createNewProperty() {
        const addressinformation = {
            propertyName: randomUtils.randomAlphabets(9),
            houseNumber: 'House Number' + randomUtils.generateRandomNumber(6),
            streetName: randomUtils.randomAlphabets(9) + 'street',
            zipCode: randomUtils.generateRandomNumber(5),
            city: randomUtils.getRandomValueFromArray(testData.po.newProperty.city_List),
            state: randomUtils.getRandomValueFromArray(testData.po.newProperty.state_List),
            propertyType: randomUtils.getRandomValueFromArray(testData.po.newProperty.property_Type),
            unit: 'Unit' + randomUtils.generateRandomNumber(5),
        };
        await this.addPropertyDetails.addProperty_Button.click();
        await this.page.waitForTimeout(1500);
        await this.addPropertyDetails.addressCollapse_Icon.click();
        await this.addPropertyDetails.addressLine1_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.addPropertyDetails.addressLine1_Input.fill(addressinformation.houseNumber + addressinformation.streetName);
        await this.addPropertyDetails.city_Input.fill(addressinformation.city);
        await this.addPropertyDetails.zipCode_Input.fill(addressinformation.zipCode.toString());
        await this.addPropertyDetails.state_Dropdown.selectOption({ label: addressinformation.state });
        await this.addPropertyDetails.closeAddressCollapse_Icon.click();
        await this.page.waitForTimeout(1000);
        await this.addPropertyDetails.property_Name_Input.fill(addressinformation.propertyName);
        await this.addPropertyDetails.property_Type_Dropdown.selectOption({ label: addressinformation.propertyType });
        await this.page.waitForTimeout(1000);
        await this.addPropertyDetails.next_Button.click();
        await this.addPropertyDetails.unit_Name_input.waitFor({ state: 'visible', timeout: 15000 });
        await this.addPropertyDetails.unit_Name_input.fill(addressinformation.unit);
        await this.page.waitForTimeout(1000);
        await this.addPropertyDetails.next_Button_UnitDetails.click();
        await this.addPropertyDetails.bank_Account_selection.waitFor({ state: 'visible', timeout: 15000 });
        await this.addPropertyDetails.bank_Account_selection.click();
        await this.page.waitForTimeout(1000);
        await this.addPropertyDetails.save_Button_Property_Setting.click();


        return addressinformation;
    }


    async addingM2MLeaseTermDetails_Monthly() {
        const tenantDetails = {
            fname: randomUtils.randomAlphabets(5),
            lastname: randomUtils.randomAlphabets(7),
            email: `test${randomUtils.generateRandomNumber(4)}@yopmail.com`,
            phone: `99999${randomUtils.generateRandomNumber(5)}`,
        };
        await this.addPropertyDetails.add_Lease_Button_Verify.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(2000);
        await this.lease_TermDetails.nextButton_AddLeaseTermDetails.click();
        await this.page.waitForTimeout(2000);
        await this.lease_TermDetails.m2m_Lease_Type_RadioButton.click();
        await this.page.waitForTimeout(1500);
        await this.lease_TermDetails.next_Button_LeaseTermDetails.click();
        await this.page.waitForTimeout(2000);
        await this.lease_TermDetails.rent_Amount_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.lease_TermDetails.rent_Amount_Input.fill('200');
        await this.page.waitForTimeout(1000);
        await this.lease_TermDetails.due_On_Date_Dropdown.selectOption({ index: 1 });
        await this.page.waitForTimeout(1000);
        await this.lease_TermDetails.first_Invoice_Date_Input.selectOption({ index: 1 });
        await this.page.waitForTimeout(2000);
        await this.add_TenantDetails.add_Tenant_Button.click();
        await this.add_TenantDetails.fname_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1500);
        await this.add_TenantDetails.fname_Input.fill(tenantDetails.fname);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.lname_Input.fill(tenantDetails.lastname);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.email_Input.fill(tenantDetails.email);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.phone_Input.fill(tenantDetails.phone);
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.application_Screening_Dropdwon.selectOption({ label: 'Not Required' });
        await this.page.waitForTimeout(2000);
        await this.add_TenantDetails.next_Button_TenantDetails.click();
        await this.page.waitForTimeout(2000);
        // Renter insurance step
        // await this.renterInsurance_Details.next_Button_RenterInsuranceDetails.waitFor({ state: 'visible', timeout: 15000 });
        // await this.page.waitForTimeout(1500);
        // await this.renterInsurance_Details.next_Button_RenterInsuranceDetails.click();
        // await this.page.waitForTimeout(2000);
        await this.finalize_Lease.offline_Signature_Checkbox.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1500);
        await this.finalize_Lease.offline_Signature_Checkbox.click();
        await this.page.waitForTimeout(1000);
        await this.finalize_Lease.confirm_Invite_Button.click();
        await this.page.waitForTimeout(2000);


        return tenantDetails;
    }


    async addingM2MLeaseTermDetails_Monthly_With_Additional_Fees() {
        const tenantDetails = {
            fname: randomUtils.randomAlphabets(5),
            fname1: randomUtils.randomAlphabets(5),
            lastname: randomUtils.randomAlphabets(7),
            lastname1: randomUtils.randomAlphabets(7),
            email: `random${randomUtils.generateRandomNumber(4)}@yopmail.com`,
            email1: `random${randomUtils.generateRandomNumber(4)}@yopmail.com`,
            phone: `99999${randomUtils.generateRandomNumber(5)}`,
            phone1: `99999${randomUtils.generateRandomNumber(5)}`,
            description: `Maintenance${randomUtils.randomAlphabets(2)}`,
            notes: `Request Raised By random test${randomUtils.randomAlphabets(2)}`,
        };


        await this.addPropertyDetails.add_Lease_Button_Verify.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(2000);
        await this.lease_TermDetails.nextButton_AddLeaseTermDetails.click();
        await this.page.waitForTimeout(1500);
        await this.lease_TermDetails.m2m_Lease_Type_RadioButton.click();
        await this.page.waitForTimeout(1000);
        await this.lease_TermDetails.next_Button_LeaseTermDetails.click();
        await this.page.waitForTimeout(2000);
        await this.lease_TermDetails.rent_Amount_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.lease_TermDetails.rent_Amount_Input.fill('200');
        await this.page.waitForTimeout(1000);
        await this.lease_TermDetails.due_On_Date_Dropdown.selectOption({ index: 1 });
        await this.page.waitForTimeout(1000);
        await this.lease_TermDetails.first_Invoice_Date_Input.selectOption({ index: 1 });
        await this.page.waitForTimeout(2000);
        await this.add_Additional_Fees_Section.add_additional_Fees.click();
        await this.page.waitForTimeout(1000);
        await this.add_Additional_Fees_Section.item_Dropdown.click();
        await this.page.waitForTimeout(500);
        await this.add_Additional_Fees_Section.select_Item_Checkbox.click();
        await this.page.waitForTimeout(500);
        await this.add_Additional_Fees_Section.item_Dropdown.click();
        await this.page.waitForTimeout(500);
        await this.add_Additional_Fees_Section.description_Input.fill(tenantDetails.description);
        await this.page.waitForTimeout(500);
        await this.add_Additional_Fees_Section.quantity_Input.fill('5');
        await this.page.waitForTimeout(500);
        await this.add_Additional_Fees_Section.rate_Input.fill('20');
        await this.page.waitForTimeout(500);
        await this.add_Additional_Fees_Section.notes_addon.click();
        await this.add_Additional_Fees_Section.notes_addon.fill(tenantDetails.notes);
        await this.page.waitForTimeout(500);
        await this.add_Additional_Fees_Section.create_Button.click();
        await this.page.waitForTimeout(1500);
        await this.add_TenantDetails.add_Tenant_Button.click();
        await this.add_TenantDetails.fname_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.fname_Input.fill(tenantDetails.fname);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.lname_Input.fill(tenantDetails.lastname);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.email_Input.fill(tenantDetails.email);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.phone_Input.fill(tenantDetails.phone);
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.application_Screening_Dropdwon.selectOption({ index: 4 });
        await this.page.waitForTimeout(2000);
        await this.add_TenantDetails.add_New_Tenant_Button.click();
        await this.page.waitForTimeout(1500);
        await this.add_TenantDetails.click_second_Tenant_details_Fname.waitFor({ state: 'visible', timeout: 15000 });
        await this.add_TenantDetails.click_second_Tenant_details_Fname.fill(tenantDetails.fname1);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.click_second_Tenant_details_Lastname.fill(tenantDetails.lastname1);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.click_second_Tenant_details_Email.fill(tenantDetails.email1);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.click_second_Tenant_details_Phone.fill(tenantDetails.phone1);
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.application_Screening_Dropdwon2.selectOption({ index: 4 });
        await this.page.waitForTimeout(2000);
        await this.add_TenantDetails.each_Tenant_Is_Only_Responsible_Checkbox.click();
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.next_Button_TenantDetails.click();
        await this.page.waitForTimeout(2000);
        // await this.renterInsurance_Details.next_Button_RenterInsuranceDetails.waitFor({ state: 'visible', timeout: 15000 });
        // await this.page.waitForTimeout(1000);
        // await this.renterInsurance_Details.next_Button_RenterInsuranceDetails.click();
        // await this.page.waitForTimeout(2000);
        await this.finalize_Lease.offline_Signature_Checkbox.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1000);
        await this.finalize_Lease.offline_Signature_Checkbox.click();
        await this.page.waitForTimeout(1000);
        await this.finalize_Lease.confirm_Invite_Button.click();
        await this.page.waitForTimeout(2000);


        return tenantDetails;
    }


    async applyFilterOnProperties(properties) {
        await this.propertyFilter.filter_Dropdown.click();
        if (properties !== undefined && properties !== null) {
            await this.propertyFilter.property_Dropdown_Option.click();
            for (let i = 0; i < properties.length; i++) {
                await this.propertyFilter.property_Search_Field.clear();
                await this.propertyFilter.property_Search_Field.fill(properties[i]);
                await this.page.waitForTimeout(2000);
                await this.propertyFilter.firstPropertyCheckBox.waitFor({ state: 'visible', timeout: 10000 });
                await this.propertyFilter.firstPropertyCheckBox.click();
                await this.propertyFilter.property_Dropdown_Option.click();
                await this.page.waitForTimeout(2000);
                await this.propertyFilter.apply_Filter.click();
                await this.page.waitForTimeout(2000);
            }
        }
    }


    async selectGivenPropertyFromList(propertyName) {
        await this.propertyFilter.getPropertyByName(propertyName).click();
    }


    async addingFixedTermLeaseDetails_Monthly() {
        const tenantDetails = {
            fname: randomUtils.randomAlphabets(5),
            lastname: randomUtils.randomAlphabets(7),
            email: `test${randomUtils.generateRandomNumber(4)}@yopmail.com`,
            phone: `99999${randomUtils.generateRandomNumber(5)}`,
        };
        const calendar = new Calendar(this.page);


        await this.addPropertyDetails.add_Lease_Button_Verify.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(2000);
        await this.lease_TermDetails.nextButton_AddLeaseTermDetails.click();
        await this.page.waitForTimeout(1500);
        await this.fixed_TermDetails.fixed_Term_Type_RadioButton.click();
        await this.page.waitForTimeout(1000);
        await this.fixed_TermDetails.calendar_Click_Input.click();
        await calendar.setSameDateOfNextYear();
        await this.page.waitForTimeout(1000);
        await this.lease_TermDetails.next_Button_LeaseTermDetails.click();
        await this.page.waitForTimeout(2000);
        await this.deposit_Details.deposit_Amount_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.deposit_Details.deposit_Amount_Input.fill('150');
        await this.page.waitForTimeout(1000);
        await this.deposit_Details.due_On_Calendar_Input.click();
        await calendar.setNextMonthGivenDate('3');
        await this.page.waitForTimeout(1000);
        await this.lease_TermDetails.rent_Amount_Input.fill('2000');
        await this.page.waitForTimeout(1000);
        await this.fixed_TermDetails.due_On_Dropdown_Monthly_FixedTerm.selectOption({ index: 2 });
        await this.page.waitForTimeout(1000);
        await this.fixed_TermDetails.first_Invoice_Date_Input_FixedTerm.selectOption({ index: 1 });
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.add_Tenant_Button.click();
        await this.add_TenantDetails.fname_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.fname_Input.fill(tenantDetails.fname);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.lname_Input.fill(tenantDetails.lastname);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.email_Input.fill(tenantDetails.email);
        await this.page.waitForTimeout(500);
        await this.add_TenantDetails.phone_Input.fill(tenantDetails.phone);
        await this.page.waitForTimeout(1000);
        await this.add_TenantDetails.application_Screening_Dropdwon.selectOption({ index: 4 });
        await this.page.waitForTimeout(2000);
        await this.add_TenantDetails.next_Button_TenantDetails.click();
        await this.page.waitForTimeout(2000);
        // await this.renterInsurance_Details.next_Button_RenterInsuranceDetails.waitFor({ state: 'visible', timeout: 15000 });
        // await this.page.waitForTimeout(1000);
        // await this.renterInsurance_Details.next_Button_RenterInsuranceDetails.click();
        // await this.page.waitForTimeout(2000);
        await this.finalize_Lease.offline_Signature_Checkbox.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.waitForTimeout(1000);
        await this.finalize_Lease.offline_Signature_Checkbox.click();
        await this.page.waitForTimeout(1000);
        await this.finalize_Lease.confirm_Invite_Button.click();
        await this.page.waitForTimeout(2000);


        return tenantDetails;
    }


    async validateUpcomingInvoicesDetailsOnPropertyDetailsPage() {
        const calendar = new Calendar(this.page);
        const invoiceSection = this.invoiceSectionOnPropertyDetailsPage.upcoming_Invoice_Section;


        await expect(invoiceSection.table_List_Rows).toHaveCount(3);


        await invoiceSection.view_All_Button.click();
        await expect(invoiceSection.view_All_Invoices.row_count_View_All).toHaveCount(12);
        await invoiceSection.cross_Icon.click();


        const invoiceId = (await invoiceSection.first_Invoice_Id.textContent()).trim();
        const dueDate = (await invoiceSection.first_Due_Date.textContent()).trim();
        const amountDue = (await invoiceSection.first_Amount_Due.textContent()).trim();
        console.log('Invoice ID:', invoiceId, '| Due Date:', dueDate, '| Amount Due:', amountDue);


        await invoiceSection.first_Invoice_Id.click();
        await expect(invoiceSection.first_Invoice_Id).toHaveText(invoiceId);


        await invoiceSection.edit_Button.click();


        await invoiceSection.rate_Input.click({ clickCount: 3 });
        await invoiceSection.rate_Input.fill('100');


        await invoiceSection.due_On_Input.click();
        await calendar.setNextMonthGivenDate('15');


        await invoiceSection.save_Changes_Button.click();
        await invoiceSection.back_Arrow.click();
        await invoiceSection.popup_Message.proceed_Yes.click();
    }


    async getPropertyCount() {
        const countString = await this.addPropertyDetails.propertyCountString.textContent();
        const match = countString.match(/\d+/g);
        if (match && match.length > 1) {
            const secondNumber = parseInt(match[1], 10);
            console.log(`Property count is --> ${secondNumber}`);
            return secondNumber;
        }
        return 0;
    }
}



