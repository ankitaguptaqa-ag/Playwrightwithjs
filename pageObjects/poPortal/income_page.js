export class IncomePage {
    constructor(page) {
        this.page = page;


        this.exportBtn = page.locator('button[data-locator="exportToCsv"]');
        this.incomeHeading = page.locator('//h1[contains(text(),"Income")]');


        this.stats = {
            selectedDateRange: page.locator('//app-income-stats/div/p'),
            totalInvoiceAmount: page.locator('div.income-stats>div>div.income-stats-left>div>p:nth-of-type(1)'),
            totalOverDueAmount: page.locator('p[data-locator="totalOverDueAmount"]'),
            totalDueAmount: page.locator('//p[text()="Total Due Amount"]/following-sibling::*[1]'),
            totalPaidAmount: page.locator('p[data-locator="totalPaidAmount"]'),
            processingAmount: page.locator('p[data-locator="totalPendingAmount"]'),
        };


        this.filters = {
            filterCollapse: page.locator('in-icon[id="filter-icon-tenant-list-mobile"]'),
            invoiceNumberInput: page.locator('input[name="filterInvoice"]'),
            invoiceTypeDropdown: page.locator('//in-dropdown-v2[@data-locator="invoice-type-search-filter"]/ng-select'),
            invoiceTypeInput: page.locator('input[data-locator="dropdown-search-input"]'),
            invoiceStatusDropdown: page.locator('div[aria-controls="statusCollapse"]'),
            selectedStatus: page.locator('div[data-locator="selectedStatusText"]'),
            propertyDropdown: page.locator('//in-dropdown-v2[@data-locator="property-search-filter"]/ng-select'),
            propertySearchInput: page.locator('input[data-locator="dropdown-search-input"]'),
            firstPropertyResult: page.locator('//ng-dropdown-panel/div[2]/div[2]/div[1]/span'),
            tenantDropdown: page.locator('//in-dropdown-v2[@data-locator="tenant-search-filter"]'),
            tenantSearchInput: page.locator('input[data-locator="dropdown-search-input"]'),
            unitDropdown: page.locator('//in-multi-dropdown-v2[@data-locator="unit-dropdown-filter"]/ng-select'),
            paymentModeDropdown: page.locator('(//ng-select[@data-locator="dropdown-custom-ng-select-v2"])[3]'),
            applyFilterBtn: page.locator('button[data-locator="applyFilters"]'),
            clearFilterBtn: page.locator('button[data-locator="clearFilters"]'),
            groupByDropdown: page.locator('div[aria-controls="dropdown-basic"]'),
            groupByProperty: page.locator('ul[id="dropdown-basic"]>li:nth-of-type(2)>a'),
            groupByTenant: page.locator('ul[id="dropdown-basic"]>li:nth-of-type(3)>a'),
            notGrouped: page.locator('ul[id="dropdown-basic"]>li:nth-of-type(1)>a'),
            dateRangeSelect: page.locator('select[data-locator="filterDate"]'),
            fromDateInput: page.locator('//label[text()="From"]/following-sibling::*//input[@placeholder="Select Date"]'),
            toDateInput: page.locator('//label[text()="To"]/following-sibling::*//input[@placeholder="Select Date"]'),
            paidOnFilter: page.locator('label[for="paidon"]'),
            dueOnFilter: page.locator('label[for="dueon"]'),


            // Smart search
            smartSearchInput: page.locator('input[id="smart-search-input-tenant-mobile"]'),


            // Capsule filters
            capsule: {
                invoiceTypeCross: page.locator('//span[text()="Invoice Type"]/../span/in-icon'),
                propertyCross: page.locator('//span[text()="Properties"]/../span/in-icon'),
                unitCross: page.locator('//span[text()="Units"]/../span/in-icon'),
                tenantsCross: page.locator('//span[text()="Tenants"]/../span/in-icon'),
                paymentModeCross: page.locator('//span[text()="Payment Method"]/../span/in-icon'),
                invoiceStatusCross: page.locator('//span[text()="Invoice Status"]/../span/in-icon'),
                invoiceTypeCount: page.locator('//span[text()="Invoice Type"]/following-sibling::span[1]'),
                propertyCount: page.locator('//span[text()="Properties"]/following-sibling::span[1]'),
                unitCount: page.locator('//span[text()="Units"]/following-sibling::span[1]'),
                tenantCount: page.locator('//span[text()="Tenants"]/following-sibling::span[1]'),
                statusCount: page.locator('//span[text()="Invoice Status"]/following-sibling::span[1]'),
                paymentModeCount: page.locator('//span[text()="Payment Method"]/following-sibling::span[1]'),
            },
        };


        this.invoiceCreation = {
            createNewInvoiceBtn: page.locator('//button[contains(text(),"New Invoice")]'),
            cancelBtn: page.locator('//button[text()=" Cancel "]'),
            propertyDropdown: page.locator('div[aria-controls="dropdown-properties"]'),
            unitDropdown: page.locator('//span[text()="Select Unit"]'),
            invoiceTypeDropdown: page.locator('div[aria-controls="dropdown-item-type"]>span'),
            termDropdown: page.locator('//span[text()="Select Term"]'),
            tenantDropdown: page.locator('div[aria-controls="dropdown-tenant"]'),
            selectAllTenants: page.locator('div[aria-controls="dropdown-tenant"]+div>ul>li:nth-of-type(1)>span>label'),
            selectFirstTenant: page.locator('[for="select-tenant-0"]'),
            descriptionInput: page.locator('input[placeholder="Description"]'),
            quantityInput: page.locator('tbody>tr>td:nth-of-type(3) input[data-locator="calculateAmount"]'),
            rateInput: page.locator('tbody>tr>td:nth-of-type(4) input[data-locator="calculateAmount"]'),
            addItemLink: page.locator('a[data-locator="addItem"]'),
            notesTextarea: page.locator('textarea[data-locator="additionalNotes"]'),
            subAmountSpan: page.locator('span[data-locator="totalAmount"]'),
            alreadyPaidInput: page.locator('input[data-locator="totalPaidAmount"]'),
            balanceDueSpan: page.locator('span[data-locator="balanceDue"]'),
            attachFileInput: page.locator('input[id="upload-file"]'),
            isRecurringOption: page.locator('//input[@data-locator="selectRecurringItem"]/parent::div'),
            attachToRentalOption: page.locator('//input[@data-locator="isAttachWithRentalInvoice"]/parent::div'),
            dueDateInput: page.locator('input[placeholder="Select Date"]'),
            clearDueDateBtn: page.locator('button>img'),
            createInvoiceBtn: page.locator('//button[@data-locator="saveButton"]'),
            deleteBtn: page.locator('//button[@data-locator="invoiceEdit"]/parent::div/following-sibling::div/button'),
            confirmationYesBtn: page.locator('button#confirmation-yes'),
        };


        this.listing = {
            dateRange: page.locator('//app-income-stats/div[1]/p'),
            invoicesSideNav: page.locator('#nav-invoices'),
            tableRows: page.locator('tbody>tr'),
            invoiceIdHeading: page.locator('//span[text()=" ID "]'),
            noRecordMessage: page.locator('//p[text()="No records found."]'),
            moreInvoicesBtn: page.locator('//button[text() = " More Invoices Below "]'),


            // Row data
            statusFirstRow: page.locator('tbody tr>td:nth-of-type(6)>div>span'),
            amountFirstRow: page.locator('tbody tr>td:nth-of-type(8)>p'),
            processingFirstRow: page.locator('tbody tr>td:nth-of-type(9)>p'),
            paidFirstRow: page.locator('tbody tr>td:nth-of-type(10)>p'),
            balanceFirstRow: page.locator('tbody tr>td:nth-of-type(11)>p'),
            propertyNameFirstRow: page.locator('tbody>tr>td:nth-of-type(2)>div>p'),
            unitNameFirstRow: page.locator('tbody>tr>td:nth-of-type(3)>p[data-locator="listingUnitName"]'),


            // Non-grouped mode
            nonGrouped: {
                recordCount: page.locator('//tbody/tr'),
                invoiceCount: page.locator('//p[text()="Showing"]/following-sibling::div/span[1]'),
                firstRowStatus: page.locator('//tbody/tr[1]/td[5]/div/span'),
                invoiceIdsList: page.locator('//app-income-list/div[2]/div[1]/table/tbody/tr/td[4]'),
            },
        };


        this.detail = {
            invoiceText: page.locator('//invoicedetail/div/div[2]/div[1]/div/div[1]/h2'),
            invoiceId: page.locator('//invoicedetail/div/div[2]/div[1]/div/div[1]/h2/span'),
            propertyName: page.locator('span[data-locator="propertyName"]'),
            unitName: page.locator('span[data-locator="unitName"]'),
            totalOverdueAmount: page.locator('p[data-locator="overDueInvoiceReportingModel"]'),
            recordPaymentBtn: page.locator('div[container="body"]>button[data-locator="recordPaymentBtn"]'),
            recordCCPaymentBtn: page.locator('//button[text() = " Credit Card Payment "]'),
            downloadBtn: page.locator('(//button[@data-locator = "downloadInvoice"])[2]'),
            remindBtn: page.locator('button[data-locator="sendReminders"]'),
            addNotesBtn: page.locator('button[data-locator="getNotesDetails"]'),
            editInvoiceBtn: page.locator('button[data-locator="invoiceEdit"]'),
            refundDepositBtn: page.locator('//form[@name="EditInvoiceForm"]//div/button[text()=" Refund Deposit "]'),
            deleteInvoiceBtn: page.locator('form[name="EditInvoiceForm"] button[data-locator="deleteInvoice"]'),
            tenantName: page.locator('span[data-locator="objectSecondValue"]'),
            invoiceIdSpan: page.locator('span[data-locator="invoiceId"]'),
            paidStatus: page.locator('span[data-locator="invoicePaidStatus"]'),
            refundedStatus: page.locator('span.invoice-refunded'),
            lateStatus: page.locator('span.invoice-late'),


            // Notes section
            notes: {
                countInBtn: page.locator('button[data-locator="getNotesDetails"]>span'),
                closeBtn: page.locator('button[data-locator="qa-notes-1"]'),
                heading: page.locator('//p[text()="Notes & Files"]'),
                textarea: page.locator('textarea[data-locator="qa-notes-2"]'),
                fileUpload: page.locator('app-shared-files-uploader-helper input[id="file-upload"]'),
                postBtn: page.locator('button[data-locator="qa-notes-7"]'),
                latestNote: page.locator('//app-shared-primary-notes/div[1]/div/div/div[2]/div/p'),
            },


            // Send reminder section
            reminder: {
                heading: page.locator('//h4[text()="Send Reminder"]'),
                tenantSelect: page.locator('select[name="tenant"]'),
                subjectInput: page.locator('input[name="subject"]'),
                bodyEditor: page.locator('ck-editor[id="ckEditorId"]'),
                sendBtn: page.locator('button[data-locator="sendButton"]'),
                cancelBtn: page.locator('button[data-locator="cancelButton"]'),
            },


            // Track payment section
            trackPayment: {
                heading: page.locator('//h1[text()= "Track Payment"]'),
                paymentMethod: page.locator('//div[text()= "Method"]/following-sibling::div'),
                submittedDate: page.locator('//div[text()= "Submitted On"]/following-sibling::div'),
                amount: page.locator('//div[text()= "Amount"]/following-sibling::div'),
                holdType: page.locator('//div[text()= "Hold Type"]/following-sibling::div'),
                closeBtn: page.locator('//section/div[1]/in-icon'),
            },
        };
    }


    // ==================== DYNAMIC LOCATORS ====================

    invoiceTypeCheckbox(type) {
        return this.page.locator(`//span[contains(text(), "${type}")]`);
    }

    invoiceStatus(status) {
        return this.page.locator(`//label[text()="${status}"]`);
    }

    propertyCheckbox(name) {
        return this.page.locator(`//span[contains(text(), "${name}")]`);
    }

    tenantCheckbox(name) {
        return this.page.locator(`//span[contains(text(), "${name}")]/..`);
    }

    unitOption(propertyName, unitName) {
        return this.page.locator(
            `//label[contains(text(), "${propertyName}")]/following-sibling::label[contains(text(), "${unitName}")]/input`
        );
    }

    paymentModeCheckbox(mode) {
        return this.page.locator(`//span[text()= " ${mode} "]`);
    }

    invoiceCreationPropertyCheckbox(name) {
        return this.page.locator(`//label[text()="${name}"]`);
    }

    invoiceTypeOption(type) {
        return this.page.locator(`//label[text()="${type}"]`);
    }

    tenantByName(name) {
        return this.page.locator(`//label[contains(text(),"${name}")]`);
    }

    statusByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[5]/div/span`);
    }

    amountByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[7]/p`);
    }

    paidAmountByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[9]/p`);
    }

    processingByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[8]/p`);
    }

    balanceByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[10]/p`);
    }

    propertyByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[1]/p[1]`);
    }

    tenantByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[1]/p[2]`);
    }

    invoiceByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[4]/p`);
    }

    dateByRow(row) {
        return this.page.locator(`//tbody/tr[${row}]/td[2]/p`);
    }

    unitByRow(row) {
        return this.page.locator(`(//p[@data-locator="listingUnitName"])[${row}]`);
    }

    invoiceIdByRow(row) {
        return this.page.locator(`//app-income-list/div[2]/div[1]/table/tbody/tr[${row}]/td[4]/p`);
    }

    propertyByName(name) {
        return this.page.locator(`//p[text()="${name}"]`);
    }

    tenantByNameInListing(name) {
        return this.page.locator(`//p[text()="${name}"]`);
    }

    tenantNameByRow(row) {
        return this.page.locator(`(//p[@data-locator="itemTenantNames"])[${row}]`);
    }
}
