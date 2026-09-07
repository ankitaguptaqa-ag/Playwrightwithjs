import { TestData } from '../../mocks/common/maintenanceTestData.js';
import { Calendar, Month_ABBR } from '../../utils/calendar.js';

export class MaintenancePage {
    constructor(page) {
        this.page = page;
        this.calendar = new Calendar(page);

        this.list = {
            newMaintenanceButton: page.locator('#adding-new-maintenance'),
            exportButton: page.locator('#export-button'),
            filtersDropdown: page.locator('#filter-dropdown'),
            groupingToggle: page.locator('#group-not-grouped-filter'),

            // "Showing 15 of 92" - the count the list renders above the table.
            recordsShowing: page.locator('#records-showing'),

            table: page.locator('in-maintenance-list-view table'),
            rows: page.locator('tr[id^="list-row-"]'),
            firstRow: page.locator('#list-row-0'),

            // Row cells are indexed, not keyed by content, so these take the row's position.
            nameAt: (index) => page.locator(`#maintenance-name-${index}`),
            issueDateAt: (index) => page.locator(`#issue-date-${index}`),
            propertyAt: (index) => page.locator(`#property-${index}`),
            unitAt: (index) => page.locator(`#unit-${index}`),

            rowByTitle: (title) =>
                page.locator(`tr[id^="list-row-"]:has(p:text-is("${title}"))`),
        };

        this.addForm = {
            root: page.locator('in-add-maintenance-form'),
            ticketTitleInput: page.locator('#ticket-title-input'),
            propertyDropdown: page.locator('ng-select[formcontrolname="property"]'),
            unitsDropdown: page.locator('ng-select[formcontrolname="units"]'),
            categoryDropdown: page.locator('ng-select[formcontrolname="category"]'),
            requestedByDropdown: page.locator('ng-select[formcontrolname="requestedBy"]'),
            descriptionInput: page.locator('#description-value'),

            // The radio itself carries tw-hidden, so a click on the input never lands -
            // Playwright waits for a visible element and times out. The wrapping <label> has
            // no `for`, so it can only be reached through :has() on the input it contains.
            //
            // [id="..."] rather than #id: category names are used verbatim in the id, and
            // "A/C" - a stock category - is not a parsable CSS identifier. The attribute form
            // also covers the names carrying spaces.
            categoryTile: (categoryName) =>
                page.locator(`label:has(input[id="category-radio-${categoryName}"])`),
            categoryRadio: (categoryName) => page.locator(`input[id="category-radio-${categoryName}"]`),

            notifyTenantCheckbox: page.locator('#notifyTenant'),
            urgentCheckbox: page.locator('#urgent'),

            // The input itself is tw-hidden - the visible control is a "browse" link over it.
            // setInputFiles works on a hidden input directly, so callers don't need to drive
            // that link or the native file-chooser dialog it opens.
            fileInput: page.locator('in-image-uploader input[type="file"]'),
            // "0/20" -> "1/20" once a file is attached; the most reliable signal that the
            // upload actually registered, since there is no separate success toast for it.
            filesUploadedCount: page.locator('#no-of-files-uploaded'),

            createButton: page.locator('#create-button'),
            cancelButton: page.locator('#cancel-button'),
        };

        this.detail = {
            root: page.locator('in-maintenance-details'),
            heading: page.locator('#maintenanceDetail-heading'),
            name: page.locator('#detail-name'),
            propertyName: page.locator('#property-name'),
            unitName: page.locator('#unit-name'),
            requestedByName: page.locator('#requestedBy-name'),
            requestedOnDate: page.locator('#requestedOn-date'),
            dueOnDate: page.locator('#dueOn-date'),
            description: page.locator('in-description'),
            // Same element both ways - it reads "Mark as Resolved" on an open ticket and
            // "Reopen" once it's been resolved, rather than the app swapping in a second node.
            markAsResolved: page.locator('#mark-as-resolved-text'),
            setReminder: page.locator('#set-reminder-text'),
            forwardMaintenance: page.locator('#forward-maintenance-text'),
            commentInput: page.locator('#comment-text'),
            sendComment: page.locator('in-icon#send'),

            photoGallery: page.locator('in-photo-gallery'),
            noPhotoText: page.locator('#no-photo-text'),

            // Only rendered once a recurrence has actually been saved on the ticket - absent
            // on a plain one-off request.
            recurringSection: page.locator('in-recurring'),
            recurringText: page.locator('#recurring-text'),
        };

        // Opened from detail.markAsResolved. Route is .../detail/mark-as-resolved - a sidepanel
        // laid over the still-mounted list, not a page of its own.
        this.resolveForm = {
            root: page.locator('in-mark-as-resolved-sidepnal'),
            dateInput: page.locator('#mark-resolved-date'),
            noteInput: page.locator('#note-value'),
            notifyTenantCheckbox: page.locator('#notify-tenant-checkbox'),
            resolveButton: page.locator('#sidepanel-primary-button'),
            cancelButton: page.locator('#sidepanel-secondary-button'),
        };

        // Opened from detail.forwardMaintenance. Route is .../detail/fwd-maintenance.
        this.forwardForm = {
            root: page.locator('in-forward-maintenance'),
            vendorEmailInput: page.locator('#vendor-email'),
            addTenantToggle: page.locator('#add-tenant-toggle'),
            numberOfTenants: page.locator('#number-of-tenants'),
            cancelButton: page.locator('#cancel-btn'),
            sendButton: page.locator('#send-btn'),
        };

        // Opened from detail.setReminder. Route is .../detail/set-reminder. Its Save/Cancel
        // reuse #sidepanel-primary-button/#sidepanel-secondary-button, same as resolveForm -
        // harmless, since only one sidepanel is ever open at a time.
        this.reminderForm = {
            root: page.locator('in-set-reminder-sidepnal'),
            dueDateInput: page.locator('#due-date'),
            recurringToggle: page.locator('in-toggle-input#recurring-toggle'),
            repeatEveryInput: page.locator('#recur-every-input'),
            repeatEveryUnitDropdown: page.locator('ng-select[formcontrolname="recurrenceTypeId"]'),
            endsNeverRadio: page.locator('#recurrenceEndOptionId-never-radio'),
            endsOnRadio: page.locator('#recurrenceEndOptionId-on-radio'),
            endsOnDatepicker: page.locator('#recurrenceEndOptionId-on-datepicker'),
            endsAfterRadio: page.locator('#recurrenceEndOptionId-after-radio'),
            endsAfterOccurrencesInput: page.locator('#endsAfterOccurrences-input'),
            addSubUserToggle: page.locator('in-toggle-input#add-sub-user-toggle'),
            addTenantToggle: page.locator('in-toggle-input#add-tenant-toggle'),
            saveButton: page.locator('#sidepanel-primary-button'),
            cancelButton: page.locator('#sidepanel-secondary-button'),
        };

        this.toaster = page.locator('in-toaster-container');

        // Options belong to whichever ng-select is currently open - ng-dropdown-panel is
        // appended once, at the end of the body, and reused. So these are deliberately not
        // scoped to a field; scope them by opening one dropdown at a time.
        this.dropdownOptions = page.locator('ng-dropdown-panel div[role="option"]');
        this.dropdownOptionByText = (text) =>
            page.locator(`ng-dropdown-panel div[role="option"]:has-text("${text}")`);
    }

    /**
     * The list is reached by the nav icon (MenuPage) or directly. Either way the table is
     * rendered a beat after the route resolves, so callers should await this before reading
     * rows rather than assuming navigation is enough.
     */
    async waitForListLoaded() {
        await this.list.newMaintenanceButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.list.recordsShowing.waitFor({ state: 'visible', timeout: 30000 });
    }

    async openAddMaintenanceForm() {
        await this.list.newMaintenanceButton.click();
        // A direct page.goto('/maintenance/add') takes ~5s to paint the form on QA, and the
        // in-app click is not much quicker - wait on the first field, not the URL.
        await this.addForm.ticketTitleInput.waitFor({ state: 'visible', timeout: 30000 });
    }

    /**
     * Opens `dropdown` and picks an option.
     *
     * `optionText` is matched with :has-text (substring), which is what the QA property list
     * needs - names there carry punctuation and trailing markers that exact matching trips
     * over. Pass no text to take the first option, which is what requestedBy wants: its
     * options are the people on the selected lease, so the names differ per property and
     * hardcoding one would break the moment the fixture data changes.
     */
    async selectFromDropdown(dropdown, optionText) {
        await dropdown.click();
        await this.dropdownOptions.first().waitFor({ state: 'visible', timeout: 15000 });

        const option = optionText ? this.dropdownOptionByText(optionText).first() : this.dropdownOptions.first();
        await option.click();

        // Units is rendered ng-select-multiple (a checkbox-style multi-select), and that kind
        // never auto-closes on picking an option - it stays open in case more are wanted. Left
        // alone, its ng-dropdown-panel sits on screen and eats the next click (the category
        // tiles sit right underneath it) as "subtree intercepts pointer events". Property and
        // Requested By are plain single-selects and close themselves; only the multi-select
        // needs the second click that toggles it shut.
        const isMultiSelect = await dropdown.evaluate((el) => el.classList.contains('ng-select-multiple'));
        if (isMultiSelect) {
            await dropdown.click();
        }

        await this.page.locator('ng-dropdown-panel').first().waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
    }

    async selectCategory(categoryName) {
        const tile = this.addForm.categoryTile(categoryName);
        await tile.waitFor({ state: 'visible', timeout: 15000 });

        // Belt-and-braces: selectFromDropdown closes the Units panel itself now, but fall back
        // to a forced click if some other overlay is still mid-close here anyway. Safe to
        // force - the tile is a plain radio label, so there is nothing a normal click's
        // actionability checks are protecting here that force bypasses.
        await tile.click({ timeout: 8000 }).catch(() => tile.click({ force: true }));
    }

    /**
     * Picks one property at random from whatever the Property dropdown currently has
     * rendered, then picks one of its units at random too - if it has any; plenty of QA
     * properties don't, so `unit` comes back null rather than this trying another property.
     *
     * Selects by index (`.nth()`) rather than by name text: unit labels are often just short
     * numbers ("1", "11", "12"), and the substring matching selectFromDropdown otherwise uses
     * would make "1" match all of them - `.nth()` sidesteps that ambiguity entirely.
     *
     * Returns `{ property, unit }` with the option text actually chosen, so the caller can
     * assert against it the same way a pinned value would let it.
     */
    async selectRandomPropertyWithUnit() {
        await this.addForm.propertyDropdown.click();
        await this.dropdownOptions.first().waitFor({ state: 'visible', timeout: 15000 });
        const propertyCount = await this.dropdownOptions.count();

        const propertyOption = this.dropdownOptions.nth(Math.floor(Math.random() * propertyCount));
        const propertyName = (await propertyOption.textContent())?.trim();
        await propertyOption.click();

        // Property is a single-select for every account seen so far and closes itself on pick
        // - but check anyway rather than assume, the way selectFromDropdown does for Units, in
        // case some property ever renders it as a multi-select.
        const isMultiSelect = await this.addForm.propertyDropdown.evaluate((el) =>
            el.classList.contains('ng-select-multiple'),
        );
        if (isMultiSelect) {
            await this.addForm.propertyDropdown.click();
        }
        await this.page.locator('ng-dropdown-panel').first().waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});

        await this.addForm.unitsDropdown.click();
        // No option list to wait on when there genuinely are none - a short fixed wait gives
        // the (possibly empty) list time to load before counting it.
        await this.page.waitForTimeout(300);
        const unitCount = await this.dropdownOptions.count();

        let unitName = null;
        if (unitCount > 0) {
            const unitOption = this.dropdownOptions.nth(Math.floor(Math.random() * unitCount));
            unitName = (await unitOption.textContent())?.trim();
            await unitOption.click();
        }
        await this.addForm.unitsDropdown.click(); // Units is multi-select - always needs the explicit close.
        await this.page.locator('ng-dropdown-panel').first().waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});

        return { property: propertyName, unit: unitName };
    }

    /**
     * Fills and submits the Add Maintenance form, and returns what it entered so the caller
     * can assert on it.
     *
     * Field order is not incidental: Units and Requested By are both populated from the
     * chosen Property, so Property has to be selected first or those two dropdowns come up
     * empty.
     *
     * `property`/`unit` default to a random pick (see selectRandomPropertyWithUnit) rather
     * than a pinned fixture - pass them explicitly when a test needs a specific, known
     * property instead. The random path gets one retry with a different property if Create
     * stays disabled: some QA properties leave the form invalid in a way that isn't tied to a
     * missing Unit or Requested By (both of which are always confirmed filled by this point),
     * and isn't worth digging into case-by-case when just trying a different property works.
     * A caller-specified property gets no such retry - if that one is broken, the test should
     * fail loudly rather than silently run against a property the caller didn't ask for.
     *
     * Attaches a photo by default (`imagePath` defaults to TestData.defaultImagePath) - the
     * upload widget is part of the create flow and worth exercising every time a ticket is
     * created, not just in a dedicated test. Pass `imagePath: null` to create a ticket with no
     * photo.
     */
    async addMaintenance(overrides = {}) {
        const details = {
            ticketTitle: TestData.ticketTitle(),
            category: TestData.category(),
            description: TestData.description(),
            imagePath: TestData.defaultImagePath,
            ...overrides,
        };
        const usingRandomProperty = !details.property;

        await this.openAddMaintenanceForm();
        await this.addForm.ticketTitleInput.fill(details.ticketTitle);

        const fillRestOfForm = async () => {
            await this.selectCategory(details.category);
            await this.addForm.descriptionInput.fill(details.description);

            if (details.imagePath) {
                await this.addForm.fileInput.setInputFiles(details.imagePath);
                await this.addForm.filesUploadedCount.filter({ hasText: '1/' }).waitFor({ state: 'visible', timeout: 15000 });
            }

            // No argument - take whoever the lease puts first. See selectFromDropdown.
            await this.selectFromDropdown(this.addForm.requestedByDropdown);
        };

        if (!usingRandomProperty) {
            await this.selectFromDropdown(this.addForm.propertyDropdown, details.property);
            if (details.unit) {
                await this.selectFromDropdown(this.addForm.unitsDropdown, details.unit);
            }
            await fillRestOfForm();
        } else {
            const maxAttempts = 2;
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                const picked = await this.selectRandomPropertyWithUnit();
                details.property = picked.property;
                details.unit = picked.unit;

                await fillRestOfForm();

                const createEnabled = await this.addForm.createButton.isEnabled({ timeout: 5000 }).catch(() => false);
                if (createEnabled || attempt === maxAttempts) {
                    break;
                }

                await this.addForm.cancelButton.click();
                await this.list.newMaintenanceButton.waitFor({ state: 'visible', timeout: 15000 });
                await this.openAddMaintenanceForm();
                await this.addForm.ticketTitleInput.fill(details.ticketTitle);
            }
        }

        await this.addForm.createButton.click();

        // A successful create redirects to the new ticket's detail page. Waiting on the URL
        // rather than the toaster because the toaster auto-dismisses and a slow assertion
        // can miss it entirely.
        await this.page.waitForURL(/\/maintenance\/maintenancelist\/\d+\/detail/, { timeout: 30000 });
        await this.detail.name.waitFor({ state: 'visible', timeout: 20000 });

        return details;
    }

    /**
     * Opens the Mark as Resolved sidepanel and confirms it, from a ticket's detail page.
     * `note` is optional - the app accepts the resolve with no note at all.
     *
     * Waits on the URL rather than the toaster for the same reason addMaintenance does: the
     * toaster auto-dismisses and a slow assertion can miss it, while the sidepanel closing
     * back to the plain .../detail URL is a durable signal that the resolve went through.
     */
    async markAsResolved({ note } = {}) {
        await this.detail.markAsResolved.click();
        await this.resolveForm.resolveButton.waitFor({ state: 'visible', timeout: 15000 });

        if (note) {
            await this.resolveForm.noteInput.fill(note);
        }

        await this.resolveForm.resolveButton.click();
        await this.page.waitForURL(/\/maintenance\/maintenancelist\/\d+\/detail$/, { timeout: 20000 });

        // Confirms the resolve actually applied, not just that the sidepanel closed - the
        // label only flips once the ticket's status has changed.
        await this.detail.markAsResolved.filter({ hasText: 'Reopen' }).waitFor({ state: 'visible', timeout: 15000 });
    }

    /**
     * Opens the Forward Maintenance sidepanel and sends it to a vendor email, from a ticket's
     * detail page. Returns what it sent so the caller can assert on it.
     */
    async forwardMaintenance(overrides = {}) {
        const details = {
            vendorEmail: TestData.vendorEmail(),
            ...overrides,
        };

        await this.detail.forwardMaintenance.click();
        await this.forwardForm.vendorEmailInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.forwardForm.vendorEmailInput.fill(details.vendorEmail);
        await this.forwardForm.sendButton.click();

        // Same signal as markAsResolved: the sidepanel closing back to the plain detail URL is
        // what proves the send was accepted.
        await this.page.waitForURL(/\/maintenance\/maintenancelist\/\d+\/detail$/, { timeout: 20000 });

        return details;
    }

    /** Matches the "MMM DD, YYYY" the Ends On field echoes back (e.g. "Feb 05, 2027"). */
    formatRecurrenceEndDate(date) {
        const month = Month_ABBR[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        return `${month} ${day}, ${date.getFullYear()}`;
    }

    /**
     * Opens Set Reminder/Recurrence and turns the ticket into a recurring one, from a
     * ticket's detail page. Returns whatever it computed for the caller to assert on -
     * currently just the Ends On date, when one was set.
     *
     * The panel's own defaults - repeat monthly, ends never - are already a valid, submittable
     * combination (verified live on 2026-09-05), so this only touches the Recurring toggle
     * unless a caller overrides `repeatEvery`/`repeatUnit`/`endsAfterOccurrences`/
     * `endsOnMonthsFromToday`. Left untouched, Save stays enabled the whole time; there's no
     * dependent field to wait on before clicking it.
     */
    async setRecurrence(overrides = {}) {
        await this.detail.setReminder.click();
        await this.reminderForm.recurringToggle.waitFor({ state: 'visible', timeout: 15000 });
        await this.reminderForm.recurringToggle.click();

        if (overrides.repeatEvery) {
            await this.reminderForm.repeatEveryInput.fill(String(overrides.repeatEvery));
        }

        if (overrides.repeatUnit) {
            await this.selectFromDropdown(this.reminderForm.repeatEveryUnitDropdown, overrides.repeatUnit);
        }

        if (overrides.endsAfterOccurrences) {
            await this.reminderForm.endsAfterRadio.click();
            await this.reminderForm.endsAfterOccurrencesInput.fill(String(overrides.endsAfterOccurrences));
        }

        const details = {};
        if (overrides.endsOnMonthsFromToday) {
            await this.reminderForm.endsOnRadio.click();
            await this.reminderForm.endsOnDatepicker.click();
            details.endsOnDate = await this.calendar.selectDateMonthsFromToday(overrides.endsOnMonthsFromToday);
            details.endsOnLabel = this.formatRecurrenceEndDate(details.endsOnDate);
        }

        await this.reminderForm.saveButton.click();

        // Same signal as markAsResolved/forwardMaintenance: the sidepanel closing back to the
        // plain detail URL is what proves the save was accepted.
        await this.page.waitForURL(/\/maintenance\/maintenancelist\/\d+\/detail$/, { timeout: 20000 });

        // The recurring block only renders once the ticket actually has a saved recurrence -
        // this is the real confirmation, not just that the sidepanel closed.
        await this.detail.recurringSection.waitFor({ state: 'visible', timeout: 15000 });

        return details;
    }

    /** The id the app assigned to the ticket, read back out of the detail URL. */
    getOpenTicketId() {
        const match = this.page.url().match(/maintenancelist\/(\d+)\/detail/);
        return match ? match[1] : null;
    }

    async openTicketAt(index = 0) {
        await this.page.locator(`#list-row-${index}`).click();
        await this.detail.name.waitFor({ state: 'visible', timeout: 20000 });
    }

    async getDetailSummary() {
        return {
            name: (await this.detail.name.textContent())?.trim(),
            property: (await this.detail.propertyName.textContent())?.trim(),
            unit: (await this.detail.unitName.textContent())?.trim(),
            requestedBy: (await this.detail.requestedByName.textContent())?.trim(),
        };
    }

    /**
     * "Showing 15 of 92" -> 92. Returns null rather than throwing when the list is empty and
     * the counter is not rendered, so a caller can tell "no records" from "count unreadable".
     */
    async getTotalRecordCount() {
        const text = (await this.list.recordsShowing.textContent())?.trim() ?? '';
        const match = text.match(/of\s+(\d+)/i);
        return match ? Number(match[1]) : null;
    }
}
