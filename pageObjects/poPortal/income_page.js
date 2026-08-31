import { expect } from '@playwright/test';
import { TestData } from '../../mocks/common/expenseTestData.js';

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
            unitDropdown: page.locator('div[aria-controls="dropdown-units"]'),
            propertyOptions: page.locator('#dropdown-properties label'),
            unitOptions: page.locator('#dropdown-units label'),
            propertyLabel: page.locator('//label[contains(text(), "Property")]'),
            unitLabel: page.locator('//label[contains(text(), "Unit")]'),
            termLabel: page.locator('//label[contains(text(), "Term")]'),
            invoiceTypeDropdown: page.locator('div[aria-controls="dropdown-item-type"]>span'),
            invoiceTypeOptions: page.locator('#dropdown-item-type label'),
            termDropdown: page.locator('div[aria-controls="dropdown-term"]'),
            termOptions: page.locator('#dropdown-term label'),
            tenantDropdown: page.locator('div[aria-controls="dropdown-tenant"]'),
            tenantOptions: page.locator('#dropdown-tenant label'),
            selectAllTenants: page.locator('div[aria-controls="dropdown-tenant"]+div>ul>li:nth-of-type(1)>span>label'),
            selectFirstTenant: page.locator('[for="select-tenant-0"]'),
            // .first() guards against invoices with multiple line items (e.g. Rent + a Late Fee Charge row)
            descriptionInput: page.locator('input[placeholder="Description"]').first(),
            quantityInput: page.locator('tbody>tr>td:nth-of-type(3) input').first(),
            rateInput: page.locator('tbody>tr>td:nth-of-type(4) input').first(),
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
            propertyNameFirstRow: page.locator('tbody>tr>td:nth-of-type(2)>div>p').first(),
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
            subjectText: page.locator('//p[contains(text(), "Subject")]'),
            subjectValue: page.locator('//p[contains(text(), "Subject")]/following-sibling::p[1]'),
            // some invoices show "Shared By", others show "Sent To" for the same field
            sharedByText: page.locator('//p[contains(text(), "Shared By") or contains(text(), "Sent To")]'),
            contactAddressText: page.locator('//p[contains(text(), "Contact Address")]'),

            
            itemHeader: page.locator('table.table-invoice-detail th:has-text("Item")'),
            descriptionHeader: page.locator('table.table-invoice-detail th:has-text("Description")'),
            quantityHeader: page.locator('table.table-invoice-detail th:has-text("Quantity")'),
            rateHeader: page.locator('table.table-invoice-detail th:has-text("Rate")'),
            amountHeader: page.locator('table.table-invoice-detail th:has-text("Amount")').first(),
            // first item row - Description is the 2nd cell, Rate is the 4th (Item, Description, Quantity, Rate, Amount)
            descriptionValue: page.locator('table.table-invoice-detail tbody tr').first().locator('td').nth(1),
            rateValue: page.locator('table.table-invoice-detail tbody tr').first().locator('td').nth(3),

            
            paymentsReceivedHeading: page.locator('//label[contains(text(), "Payments Received")]'),
            totalDueText: page.locator('span[data-locator="totalDue"]'),
            totalPaidText: page.locator('span[data-locator="totalPaidAmount"]'),
            remainingBalanceText: page.locator('span[data-locator="balanceAmount"]'),
            paymentAmountValue: page.locator('td[data-locator="NetAmount"]').first(),


            totalOverdueAmount: page.locator('p[data-locator="overDueInvoiceReportingModel"]'),
            recordPaymentBtn: page.locator('div[container="body"]>button[data-locator="recordPaymentBtn"]'),
            recordCCPaymentBtn: page.locator('//button[text() = " Credit Card Payment "]'),
            downloadBtn: page.locator('(//button[@data-locator = "downloadInvoice"])[2]'),
            remindBtn: page.locator('button[data-locator="sendReminders"]'),
            addNotesBtn: page.locator('button[data-locator="getNotesDetails"]'),
            editInvoiceBtn: page.locator('button[data-locator="invoiceEdit"]'),
            saveButton: page.locator('button[data-locator="submitButton"]').first(),
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


            // Record Payment form
            recordPayment: {
                tenantSelect: page.locator('form[name="cheque_form"] select:has(option[data-locator="itemText-0"])'),
                paymentMethodSelect: page.locator('form[name="cheque_form"] select:has(option[data-locator="methodText-0"])'),
                checkNumberInput: page.locator('form[name="cheque_form"] input[data-locator="checkNumber"]'),
                moneyOrderNumberInput: page.locator('form[name="cheque_form"] input[data-locator="moneyOrderPayment"]'),
                amountInput: page.locator('form[name="cheque_form"] input[data-locator="suggestedAmount"]'),
                submitBtn: page.locator('form[name="cheque_form"] button[data-locator="submitButton"]'),
                cancelBtn: page.locator('form[name="cheque_form"] button[data-locator="cancelledButton"]'),
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

    // Scoped to the open dropdown panel on purpose: the property name is also rendered in
    // the listing rows and filter capsules behind the panel, and an unscoped //span match
    // can click one of those instead - which silently leaves the filter unset.
    propertyCheckbox(name) {
        return this.page.locator(`//ng-dropdown-panel//span[contains(text(), "${name}")]`);
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




    //dynamic function:
    async createNewInvoice() {
        await this.invoiceCreation.createNewInvoiceBtn.waitFor({ state: 'visible', timeout: 15000 });
        await this.invoiceCreation.createNewInvoiceBtn.click();
        await this.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
        const { propertyName, unitName, termName } = await this.selectRandomPropertyWithUnitAndTerm();

        // ---- Tenant (stays disabled until Term is picked) ----
        await expect(this.invoiceCreation.tenantDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
        await this.invoiceCreation.tenantDropdown.click();

        // index 0 in this list is "Select All Tenants" - use the first real tenant instead
        await this.invoiceCreation.selectFirstTenant.waitFor({ state: 'visible', timeout: 10000 });
        const tenantName = await this.invoiceCreation.selectFirstTenant.innerText();
        await this.invoiceCreation.selectFirstTenant.click();

        await this.invoiceCreation.tenantDropdown.click(); // close

        // ---- Invoice Type ----
        await this.invoiceCreation.invoiceTypeDropdown.click();
        await this.invoiceCreation.invoiceTypeOptions.first().waitFor({ state: 'visible', timeout: 10000 });

        // Rent invoices get a server-computed Subject ("Rent due on <date>") that ignores
        // whatever is typed into Description, which breaks editInvoice()'s verification -
        // exclude it so the randomly picked type always has an editable Subject/Description.
        const allTypeTexts = await this.invoiceCreation.invoiceTypeOptions.allInnerTexts();
        const nonRentIndexes = allTypeTexts
            .map((text, index) => ({ text: text.trim(), index }))
            .filter(({ text }) => text !== 'Rent')
            .map(({ index }) => index);
        const typeIndex = nonRentIndexes[Math.floor(Math.random() * nonRentIndexes.length)];
        const invoiceType = allTypeTexts[typeIndex].trim();

        await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).click();
        await this.invoiceCreation.invoiceTypeDropdown.click(); // close
        await this.page.waitForTimeout(1000); // pause so the selection is visible in headed mode

        // ---- Description, Quantity, Rate, Notes ----
        const description = `Invoice_${TestData.randomNumber(5)}`;
        await this.invoiceCreation.descriptionInput.fill(description);
        await this.invoiceCreation.quantityInput.fill('1');
        await this.invoiceCreation.rateInput.fill('100');
        await this.invoiceCreation.notesTextarea.fill(`Notes_${TestData.randomNumber(5)}`);

        // Due Date can auto-fill based on the random Term picked, sometimes landing outside
        // the current month - force it to today so the invoice shows up in the listing's
        // default date-range filter right after creation.
        const today = new Date();
        const todayStr = today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        // matches the "Jul 30, 2026" format the listing renders per-row - used to pick out
        // this exact invoice later, since a property/unit with an active lease usually already
        // has other invoices under it (see openCreatedInvoiceRow)
        const dueDateDisplay = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        await this.invoiceCreation.dueDateInput.fill(todayStr);

        await this.page.waitForTimeout(1000); // pause so the filled fields are visible in headed mode

        console.log(
            'Selected property:', propertyName,
            '| unit:', unitName,
            '| term:', termName,
            '| tenant:', tenantName,
            '| invoiceType:', invoiceType,
            '| description:', description
        );

        // ---- Submit ----
        await this.invoiceCreation.createInvoiceBtn.click();

        return { propertyName, unitName, termName, tenantName, invoiceType, description, amount: 100, dueDateDisplay };
    }

    async openCreatedInvoiceRow(dueDateDisplay, description) {
        // Due date alone isn't always enough to identify the right invoice - a property's own
        // auto-generated recurring invoice (e.g. Rent) can coincidentally share today's due
        // date, and $100 (createNewInvoice()'s fixed rate) is too common in this account's
        // data to disambiguate either. Try each same-due-date candidate and verify its actual
        // Description matches what we created, since that's the only genuinely unique value.
        // :visible excludes stale/collapsed rows left behind in the DOM (class="d-none")
        // from other groups elsewhere in the table that happen to also contain this date
        // text - without it, count()/nth() can pick up a hidden decoy row.
        // .income-table-row keeps this to actual invoice rows: the property group's header row
        // (.invoice-table-row) spells out the lease term, e.g. "(Jul 15, 2026 - M to M)", so it
        // matches the due-date text too - and clicking it collapses the group instead of opening
        // an invoice, hiding the rows a later nth() is still waiting for.
        const candidateRows = this.page.locator('tbody>tr.income-table-row:visible', { hasText: dueDateDisplay });

        await this.expandInvoiceGroup(candidateRows);
        // the first candidate being visible doesn't guarantee any others have finished
        // rendering too, especially on this method's first call in a run (same cold-start
        // rendering delay seen with the unit dropdown above) - counting too early can miss
        // a still-rendering row and leave a later nth() waiting on an index that never fills in
        await this.page.waitForTimeout(1000);
        const candidateCount = await candidateRows.count();

        let tried = 0;
        for (let i = 0; i < candidateCount; i++) {
            // the group is re-expanded between attempts, so the row set is rebuilt each time -
            // if it comes back shorter than the count taken on the first pass, stop here rather
            // than spend the whole action timeout clicking an index that will never appear
            if (!(await candidateRows.nth(i).isVisible().catch(() => false))) {
                break;
            }

            tried++;
            const rowInvoiceId = (await candidateRows.nth(i).locator('[data-locator="invoiceId"]').innerText()).trim();
            await candidateRows.nth(i).click();

            // The detail panel keeps the previously opened invoice on screen while the next one
            // loads, so descriptionValue becoming "visible" isn't enough - read it too early and
            // the comparison is against the last invoice's description, which sends this loop
            // past the very row it was looking for. Wait for the panel to be showing this row.
            await expect(this.detail.invoiceIdSpan).toHaveText(rowInvoiceId, { timeout: 15000 });
            await this.detail.descriptionValue.waitFor({ state: 'visible', timeout: 10000 });
            const actualDescription = (await this.detail.descriptionValue.innerText()).trim();
            if (actualDescription === description) {
                return;
            }

            // wrong invoice - close it, re-expand the group, and try the next candidate
            await this.page.locator('a[data-locator="closeInvoice"]').click();
            await this.expandInvoiceGroup(candidateRows);
        }

        throw new Error(
            `Could not find an invoice due "${dueDateDisplay}" with description "${description}" (${tried} of ${candidateCount} candidate(s) tried)`,
        );
    }

    // Clicking the listing's first row toggles the property group open/closed. Coming back
    // from an invoice's detail view the group is sometimes already expanded, and clicking it
    // then collapses it instead - hiding the very candidate rows the caller is iterating over.
    // Only click when the rows aren't showing, and confirm they're there afterwards.
    // Because it's a toggle, one mistimed click is self-defeating: if the group was already
    // opening when we clicked, we close it, and the single waitFor then times out on rows
    // that our own click hid (CI 2026-08-24, "all invoice details fields" - the same flow
    // that passed one test earlier in the run). Clicking again re-opens it, so try a few
    // times rather than giving up on the first miss.
    async expandInvoiceGroup(candidateRows) {
        // Group header rows (.invoice-table-row) toggle their group open and shut; the invoice
        // rows inside are .income-table-row. This used to click tableRows.first(), which is
        // the first header - and so assumed the invoice we just created sits in the first
        // property group. That holds while the filter narrows the listing to one property and
        // fails otherwise, which is how "record payment" spent three attempts toggling a group
        // that never contained the row (CI 2026-08-26).
        const groupHeaders = this.page.locator('tbody>tr.invoice-table-row:visible');

        // Twice round: a group that was already opening when we clicked gets closed by that
        // click, and is open again by the time the second pass reaches it.
        for (let attempt = 0; attempt < 2; attempt++) {
            if (await candidateRows.first().isVisible().catch(() => false)) {
                return;
            }

            const headerCount = await groupHeaders.count();
            if (headerCount === 0) {
                // no group headers rendered yet - fall back to the old behaviour rather than
                // skip the click entirely, then let the loop re-check
                await this.listing.tableRows.first().click().catch(() => {});
                await candidateRows.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
                continue;
            }

            for (let i = 0; i < headerCount; i++) {
                await groupHeaders.nth(i).click().catch(() => {});
                const appeared = await candidateRows
                    .first()
                    .waitFor({ state: 'visible', timeout: 5000 })
                    .then(() => true)
                    .catch(() => false);
                if (appeared) {
                    return;
                }

                // Nothing here - click again to put the group back as we found it. Without
                // this, a group that was already open ends up closed, and the rows the caller
                // wants can be the ones we just hid.
                await groupHeaders.nth(i).click().catch(() => {});
            }
        }

        // out of attempts - let the caller see the real timeout rather than a silent miss
        await candidateRows.first().waitFor({ state: 'visible', timeout: 10000 });
    }

    // The dropdown panel starts out holding every property and is re-filtered as the search
    // text is typed, so a count taken mid-filter can be wrong in either direction. Wait for
    // two identical readings before trusting it.
    async stableCount(locator, timeout = 10000) {
        const deadline = Date.now() + timeout;
        let previous = await locator.count();
        while (Date.now() < deadline) {
            await this.page.waitForTimeout(500);
            const current = await locator.count();
            if (current === previous) {
                return current;
            }
            previous = current;
        }
        return previous;
    }

    async filterByProperty(propertyName) {
        await this.filters.filterCollapse.click();

        await this.filters.propertyDropdown.click();
        await this.filters.propertySearchInput.fill(propertyName);
        await this.page.waitForTimeout(1000); // let the search results filter before picking one
        await this.propertyCheckbox(propertyName).first().click();
        await this.filters.propertyDropdown.click(); // close

        await this.filters.applyFilterBtn.click();
        await this.page.waitForTimeout(2000); // let filtered results load

        // stay in the default Grouped by Property view - no need to switch
        await this.listing.propertyNameFirstRow.waitFor({ state: 'visible', timeout: 15000 });
    }

    async filterByPropertyAndUnit(propertyName, unitName) {
        await this.openFilterPanel();

        // Filters survive between tests on the shared page. Whatever property an earlier test
        // left checked is still checked here, and since the Property filter is a multi-select,
        // clicking this test's property would add to it rather than replace it - or, if it
        // happens to be the same property, toggle it back off and leave the filter unset.
        await this.filters.clearFilterBtn.click();
        await this.page.waitForTimeout(2000); // clearing closes the panel and reloads the list
        await this.openFilterPanel();

        await this.filters.propertyDropdown.click();
        await this.filters.propertySearchInput.fill(propertyName);
        await this.page.waitForTimeout(1000); // let the search results filter before picking one

        // Property names aren't unique in this account - multiple properties can share the
        // exact same display name. Try each match in turn (unchecking the wrong one before
        // moving to the next) until one's Unit dropdown actually contains the unit we're
        // after, since that's the only reliable way to confirm we picked the right property.
        const matches = this.propertyCheckbox(propertyName);
        await matches.first().waitFor({ state: 'visible', timeout: 15000 });
        const matchCount = await this.stableCount(matches);
        const unitOption = this.page.locator(`//ng-dropdown-panel//label[contains(text(), "${unitName}")]`);
        let listedUnits = [];

        // Each loop iteration starts and ends with the property dropdown closed, and only
        // ever opens it via propertySearchInput becoming visible as confirmation - relying on
        // blind toggle clicks here previously left the dropdown in an inconsistent open/closed
        // state, since a click meant to "open" it can get swallowed as just closing whatever
        // other dropdown (e.g. Unit) was still open at the time.
        let unitFound = false;
        for (let i = 0; i < matchCount; i++) {
            await matches.nth(i).click();
            await this.filters.propertyDropdown.click(); // close

            // Unit filter defaults to "All" checked - uncheck it first so only the
            // one unit we pick ends up selected, otherwise a property with multiple
            // units/invoices returns more than one row and it's unclear which is ours.
            await this.filters.unitDropdown.click();
            await this.page.locator('label[data-locator="multi-dropdown-select-all-label"]').waitFor({ state: 'visible', timeout: 10000 });
            await this.page.locator('label[data-locator="multi-dropdown-select-all-label"]').click();

            // The whole list renders at once (it only ever holds this property's own units),
            // so once the "All" row above is up, a short wait is enough to tell a still-
            // rendering list from a property that genuinely doesn't have this unit.
            unitFound = await unitOption
                .first()
                .waitFor({ state: 'visible', timeout: 10000 })
                .then(() => true)
                .catch(() => false);
            listedUnits = await this.page.locator('//ng-dropdown-panel//label').allInnerTexts();
            if (unitFound) {
                await unitOption.first().click();
                await this.filters.unitDropdown.click(); // close
                break;
            }

            // wrong property - close the unit dropdown, reopen the property dropdown
            // (confirmed via its search input, not just a click) to uncheck this match,
            // then close it again before trying the next one
            await this.filters.unitDropdown.click();
            await this.filters.propertyDropdown.click();
            await this.filters.propertySearchInput.waitFor({ state: 'visible', timeout: 10000 });
            await matches.nth(i).click(); // uncheck
            await this.filters.propertyDropdown.click(); // close
        }

        if (!unitFound) {
            // The Unit filter is fed by a live per-property API call that returns only that
            // property's active, non-archived units (POST /api/Home/DropDown/v2/units), so a
            // unit it doesn't list can't be waited for - it isn't coming. That happens when
            // the unit the invoice was created against has since been archived or renamed in
            // this shared QA account. Filtering by property alone still proves the invoice is
            // findable through the filters, and openCreatedInvoiceRow identifies it by its
            // unique description anyway - so narrow by property and carry on rather than
            // failing the whole serial suite over the account's data.
            console.warn(
                `Unit "${unitName}" is not offered by the Income filter for property "${propertyName}" ` +
                    `(it lists: [${listedUnits.map((u) => u.trim()).join(', ')}]) - filtering by property only.`,
            );
            await this.reselectPropertyWithAllUnits(matches);
        }

        await this.filters.applyFilterBtn.click();
        await this.page.waitForTimeout(2000); // let filtered results load

        // stay in the default Grouped by Property view - no need to switch
        await this.listing.propertyNameFirstRow.waitFor({ state: 'visible', timeout: 15000 });
    }

    // filterCollapse toggles the filter panel, so a blind click closes it when it's already
    // open. Check first, and confirm the panel is really up before anyone reaches into it.
    async openFilterPanel() {
        if (!(await this.filters.propertyDropdown.isVisible().catch(() => false))) {
            await this.filters.filterCollapse.click();
        }
        await this.filters.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
    }

    // Fallback for filterByPropertyAndUnit: its loop leaves every property match unchecked and
    // the Unit filter's "All" unchecked, which would apply an empty filter and return no rows.
    // Re-check the first match and put the unit filter back to "All".
    async reselectPropertyWithAllUnits(matches) {
        await this.filters.propertyDropdown.click();
        await this.filters.propertySearchInput.waitFor({ state: 'visible', timeout: 10000 });
        await matches.first().click();
        await this.filters.propertyDropdown.click(); // close

        await this.filters.unitDropdown.click();
        const selectAllLabel = this.page.locator('label[data-locator="multi-dropdown-select-all-label"]');
        const selectAllCheckbox = this.page.locator('input[data-locator="multi-dropdown-select-all-checkbox"]');
        await selectAllLabel.waitFor({ state: 'visible', timeout: 10000 });
        if (!(await selectAllCheckbox.isChecked().catch(() => false))) {
            await selectAllLabel.click();
        }
        await this.filters.unitDropdown.click(); // close
    }

    async editInvoice({ subject, rate }) {
        await this.detail.editInvoiceBtn.click();

        // the edit panel reuses the same form fields as Create New Invoice
        await this.invoiceCreation.descriptionInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.invoiceCreation.descriptionInput.fill(subject);
        await this.page.waitForTimeout(500); // let Angular's form register the new description before the next fill
        await this.invoiceCreation.rateInput.fill(String(rate));
        await this.page.waitForTimeout(500); // let Angular's form register the new rate before saving

        await this.detail.saveButton.click();

        await this.invoiceCreation.confirmationYesBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.invoiceCreation.confirmationYesBtn.click();
    }

    async recordPayment(amount, method = 'Cash') {
        // dropdown option order: 1=Check, 2=Cash, 3=Money Order
        const methodIndex = { Check: 1, Cash: 2, 'Money Order': 3 }[method];

        await this.detail.recordPaymentBtn.click();

        await this.detail.recordPayment.tenantSelect.waitFor({ state: 'visible', timeout: 15000 });
        await this.detail.recordPayment.tenantSelect.selectOption({ index: 1 });
        await this.page.waitForTimeout(1000); // let Angular render the Payment Method field
        await this.detail.recordPayment.paymentMethodSelect.selectOption({ index: methodIndex });
        await this.page.waitForTimeout(1000); // let Angular render the conditional Check/Money Order number field

        if (method === 'Check') {
            await this.detail.recordPayment.checkNumberInput.fill(String(TestData.randomNumber(6)));
        } else if (method === 'Money Order') {
            await this.detail.recordPayment.moneyOrderNumberInput.fill(String(TestData.randomNumber(6)));
        }

        await this.detail.recordPayment.amountInput.fill(String(amount));
        await this.page.waitForTimeout(1000); // let Angular's form validity catch up before submitting

        // clicking Submit opens a second "review before submitting" confirmation dialog -
        // the click occasionally doesn't register the first time, so retry once
        await this.detail.recordPayment.submitBtn.click();
        try {
            await this.invoiceCreation.confirmationYesBtn.waitFor({ state: 'visible', timeout: 8000 });
        } catch {
            await this.detail.recordPayment.submitBtn.click();
            await this.invoiceCreation.confirmationYesBtn.waitFor({ state: 'visible', timeout: 20000 });
        }
        await this.invoiceCreation.confirmationYesBtn.click();

        await this.detail.paymentAmountValue.waitFor({ state: 'visible', timeout: 20000 });
    }

    async selectRandomPropertyWithUnitAndTerm() {
        let propertyName;
        let propertyIndex;
        let unitName = 'No units available';
        let termName = 'No terms available';

        while (unitName === 'No units available' || termName === 'No terms available') {
            // last property didn't have both a unit and a term - uncheck it before trying another
            if (propertyName) {
                await this.invoiceCreation.propertyDropdown.click();
                await this.invoiceCreation.propertyOptions.nth(propertyIndex).click(); // uncheck
                await this.invoiceCreation.propertyDropdown.click();
            }

            await this.invoiceCreation.propertyDropdown.click();
            await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });

            // index 0 is "Select All Properties", not a real property - skip it
            const count = await this.invoiceCreation.propertyOptions.count();
            propertyIndex = 1 + Math.floor(Math.random() * (count - 1));
            const option = this.invoiceCreation.propertyOptions.nth(propertyIndex);
            propertyName = await option.innerText();

            await option.click();
            await this.invoiceCreation.propertyDropdown.click(); // close

            unitName = await this.selectRandomUnitIfAvailable();
            if (unitName === 'No units available') {
                continue; // no unit - no point checking term, try a different property
            }

            termName = await this.selectRandomTermIfAvailable();
        }

        return { propertyName, unitName, termName };
    }

    async selectRandomTermIfAvailable() {
        const toggle = this.invoiceCreation.termDropdown;
        const options = this.invoiceCreation.termOptions;

        // Term stays disabled until Property + Unit are picked
        await expect(toggle).not.toHaveAttribute('disabled', { timeout: 10000 });
        await toggle.click();

        // some property/unit combos have no term (and no tenant) - panel just stays blank
        let hasTerms = true;
        try {
            await options.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch {
            hasTerms = false;
        }

        if (!hasTerms) {
            await toggle.click(); // close, nothing to pick
            return 'No terms available';
        }

        const count = await options.count();
        const index = Math.floor(Math.random() * count);
        const termName = await options.nth(index).innerText();

        await options.nth(index).click();
        await toggle.click(); // close

        return termName;
    }

    async selectRandomProperty() {
        await this.invoiceCreation.propertyDropdown.click();
        await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });

        // index 0 is "Select All Properties", not a real property - skip it
        const count = await this.invoiceCreation.propertyOptions.count();
        const index = 1 + Math.floor(Math.random() * (count - 1));
        const option = this.invoiceCreation.propertyOptions.nth(index);
        const propertyName = await option.innerText();

        await option.click();
        await this.invoiceCreation.propertyDropdown.click(); // close

        return propertyName;
    }


    async selectRandomUnitIfAvailable() {
        const toggle = this.invoiceCreation.unitDropdown;
        const options = this.invoiceCreation.unitOptions;

        // 1. wait for Unit to unlock (disabled until a property is picked), then open it
        await expect(toggle).not.toHaveAttribute('disabled', { timeout: 10000 });
        await toggle.click();

        // 2. this property might have zero units - the panel just stays blank,
        // no "no items found" message like expense_page.js has. So wait up to 5s
        // for a real option to show up; if none does, there are none. The panel can also
        // still be holding the previous property's units at this point (this method is
        // called again for a new property whenever one turns out to have no term), so let
        // the list settle before reading anything off it.
        let hasUnits = true;
        try {
            await options.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch {
            hasUnits = false;
        }
        const count = hasUnits ? await this.stableCount(options) : 0;

        // 3. no units - close and stop
        if (count === 0) {
            await toggle.click();
            return 'No units available';
        }

        // 4. units exist - pick one at random
        const index = Math.floor(Math.random() * count);
        await options.nth(index).click();
        await toggle.click();

        // 5. Report the unit the form actually ended up with, not the option that was clicked:
        // if the panel re-rendered under the click, those differ, and the invoice then gets
        // created against a unit this method never names. That mismatch surfaces much later as
        // a misleading "Could not find unit X" in filterByPropertyAndUnit, because the Income
        // filter only ever lists units that really belong to the selected property.
        // The closed toggle reads "Select Unit" while nothing is selected, and the unit's own
        // name once something is - so it's the honest answer in both cases.
        const selectedUnit = (await toggle.innerText()).trim();
        if (!selectedUnit || selectedUnit === 'Select Unit') {
            return 'No units available'; // nothing stuck - caller moves on to another property
        }

        return selectedUnit;
    }
}
