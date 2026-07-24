# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that all invoice details fields are visible on the details page
- Location: specs/propertyOwner/income/income.spec.js:73:10

# Error details

```
Error: locator.waitFor: Error: strict mode violation: locator('tbody>tr>td:nth-of-type(2)>div>p') resolved to 2 elements:
    1) <p inapplyhighlight="" _ngcontent-nfu-c283="" data-locator="listingPropertyName" class="font-600 m-0 color-dark text-break">Credit Reporting via authorise.net ||26th June</p> aka getByText('Credit Reporting via').first()
    2) <p inapplyhighlight="" _ngcontent-nfu-c283="" data-locator="listingPropertyName" class="font-600 m-0 color-dark text-break">Credit Reporting via authorise.net ||26th June</p> aka getByText('Credit Reporting via').nth(1)

Call log:
  - waiting for locator('tbody>tr>td:nth-of-type(2)>div>p') to be visible

```

# Test source

```ts
  284 | 
  285 |     dateByRow(row) {
  286 |         return this.page.locator(`//tbody/tr[${row}]/td[2]/p`);
  287 |     }
  288 | 
  289 |     unitByRow(row) {
  290 |         return this.page.locator(`(//p[@data-locator="listingUnitName"])[${row}]`);
  291 |     }
  292 | 
  293 |     invoiceIdByRow(row) {
  294 |         return this.page.locator(`//app-income-list/div[2]/div[1]/table/tbody/tr[${row}]/td[4]/p`);
  295 |     }
  296 | 
  297 |     propertyByName(name) {
  298 |         return this.page.locator(`//p[text()="${name}"]`);
  299 |     }
  300 | 
  301 |     tenantByNameInListing(name) {
  302 |         return this.page.locator(`//p[text()="${name}"]`);
  303 |     }
  304 | 
  305 |     tenantNameByRow(row) {
  306 |         return this.page.locator(`(//p[@data-locator="itemTenantNames"])[${row}]`);
  307 |     }
  308 | 
  309 | 
  310 | 
  311 | 
  312 |     //dynamic function:
  313 |     async createNewInvoice() {
  314 |         await this.invoiceCreation.createNewInvoiceBtn.waitFor({ state: 'visible', timeout: 15000 });
  315 |         await this.invoiceCreation.createNewInvoiceBtn.click();
  316 |         await this.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
  317 |         const { propertyName, unitName, termName } = await this.selectRandomPropertyWithUnitAndTerm();
  318 | 
  319 |         // ---- Tenant (stays disabled until Term is picked) ----
  320 |         await expect(this.invoiceCreation.tenantDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
  321 |         await this.invoiceCreation.tenantDropdown.click();
  322 | 
  323 |         // index 0 in this list is "Select All Tenants" - use the first real tenant instead
  324 |         await this.invoiceCreation.selectFirstTenant.waitFor({ state: 'visible', timeout: 10000 });
  325 |         const tenantName = await this.invoiceCreation.selectFirstTenant.innerText();
  326 |         await this.invoiceCreation.selectFirstTenant.click();
  327 | 
  328 |         await this.invoiceCreation.tenantDropdown.click(); // close
  329 | 
  330 |         // ---- Invoice Type ----
  331 |         await this.invoiceCreation.invoiceTypeDropdown.click();
  332 |         await this.invoiceCreation.invoiceTypeOptions.first().waitFor({ state: 'visible', timeout: 10000 });
  333 | 
  334 |         const typeCount = await this.invoiceCreation.invoiceTypeOptions.count();
  335 |         const typeIndex = Math.floor(Math.random() * typeCount);
  336 |         const invoiceType = await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).innerText();
  337 | 
  338 |         await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).click();
  339 |         await this.invoiceCreation.invoiceTypeDropdown.click(); // close
  340 |         await this.page.waitForTimeout(1000); // pause so the selection is visible in headed mode
  341 | 
  342 |         // ---- Description, Quantity, Rate, Notes ----
  343 |         const description = `Invoice_${TestData.randomNumber(5)}`;
  344 |         await this.invoiceCreation.descriptionInput.fill(description);
  345 |         await this.invoiceCreation.quantityInput.fill('1');
  346 |         await this.invoiceCreation.rateInput.fill('100');
  347 |         await this.invoiceCreation.notesTextarea.fill(`Notes_${TestData.randomNumber(5)}`);
  348 | 
  349 |         // Due Date can auto-fill based on the random Term picked, sometimes landing outside
  350 |         // the current month - force it to today so the invoice shows up in the listing's
  351 |         // default date-range filter right after creation.
  352 |         const todayStr = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  353 |         await this.invoiceCreation.dueDateInput.fill(todayStr);
  354 | 
  355 |         await this.page.waitForTimeout(1000); // pause so the filled fields are visible in headed mode
  356 | 
  357 |         console.log(
  358 |             'Selected property:', propertyName,
  359 |             '| unit:', unitName,
  360 |             '| term:', termName,
  361 |             '| tenant:', tenantName,
  362 |             '| invoiceType:', invoiceType,
  363 |             '| description:', description
  364 |         );
  365 | 
  366 |         // ---- Submit ----
  367 |         await this.invoiceCreation.createInvoiceBtn.click();
  368 | 
  369 |         return { propertyName, unitName, termName, tenantName, invoiceType, description };
  370 |     }
  371 | 
  372 |     async filterByProperty(propertyName) {
  373 |         await this.filters.filterCollapse.click();
  374 | 
  375 |         await this.filters.propertyDropdown.click();
  376 |         await this.filters.propertySearchInput.fill(propertyName);
  377 |         await this.propertyCheckbox(propertyName).first().click();
  378 |         await this.filters.propertyDropdown.click(); // close
  379 | 
  380 |         await this.filters.applyFilterBtn.click();
  381 |         await this.page.waitForTimeout(2000); // let filtered results load
  382 | 
  383 |         // stay in the default Grouped by Property view - no need to switch
> 384 |         await this.listing.propertyNameFirstRow.waitFor({ state: 'visible', timeout: 15000 });
      |                                                 ^ Error: locator.waitFor: Error: strict mode violation: locator('tbody>tr>td:nth-of-type(2)>div>p') resolved to 2 elements:
  385 |     }
  386 | 
  387 |     async selectRandomPropertyWithUnitAndTerm() {
  388 |         let propertyName;
  389 |         let propertyIndex;
  390 |         let unitName = 'No units available';
  391 |         let termName = 'No terms available';
  392 | 
  393 |         while (unitName === 'No units available' || termName === 'No terms available') {
  394 |             // last property didn't have both a unit and a term - uncheck it before trying another
  395 |             if (propertyName) {
  396 |                 await this.invoiceCreation.propertyDropdown.click();
  397 |                 await this.invoiceCreation.propertyOptions.nth(propertyIndex).click(); // uncheck
  398 |                 await this.invoiceCreation.propertyDropdown.click();
  399 |             }
  400 | 
  401 |             await this.invoiceCreation.propertyDropdown.click();
  402 |             await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
  403 | 
  404 |             // index 0 is "Select All Properties", not a real property - skip it
  405 |             const count = await this.invoiceCreation.propertyOptions.count();
  406 |             propertyIndex = 1 + Math.floor(Math.random() * (count - 1));
  407 |             const option = this.invoiceCreation.propertyOptions.nth(propertyIndex);
  408 |             propertyName = await option.innerText();
  409 | 
  410 |             await option.click();
  411 |             await this.invoiceCreation.propertyDropdown.click(); // close
  412 | 
  413 |             unitName = await this.selectRandomUnitIfAvailable();
  414 |             if (unitName === 'No units available') {
  415 |                 continue; // no unit - no point checking term, try a different property
  416 |             }
  417 | 
  418 |             termName = await this.selectRandomTermIfAvailable();
  419 |         }
  420 | 
  421 |         return { propertyName, unitName, termName };
  422 |     }
  423 | 
  424 |     async selectRandomTermIfAvailable() {
  425 |         const toggle = this.invoiceCreation.termDropdown;
  426 |         const options = this.invoiceCreation.termOptions;
  427 | 
  428 |         // Term stays disabled until Property + Unit are picked
  429 |         await expect(toggle).not.toHaveAttribute('disabled', { timeout: 10000 });
  430 |         await toggle.click();
  431 | 
  432 |         // some property/unit combos have no term (and no tenant) - panel just stays blank
  433 |         let hasTerms = true;
  434 |         try {
  435 |             await options.first().waitFor({ state: 'visible', timeout: 5000 });
  436 |         } catch {
  437 |             hasTerms = false;
  438 |         }
  439 | 
  440 |         if (!hasTerms) {
  441 |             await toggle.click(); // close, nothing to pick
  442 |             return 'No terms available';
  443 |         }
  444 | 
  445 |         const count = await options.count();
  446 |         const index = Math.floor(Math.random() * count);
  447 |         const termName = await options.nth(index).innerText();
  448 | 
  449 |         await options.nth(index).click();
  450 |         await toggle.click(); // close
  451 | 
  452 |         return termName;
  453 |     }
  454 | 
  455 |     async selectRandomProperty() {
  456 |         await this.invoiceCreation.propertyDropdown.click();
  457 |         await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
  458 | 
  459 |         // index 0 is "Select All Properties", not a real property - skip it
  460 |         const count = await this.invoiceCreation.propertyOptions.count();
  461 |         const index = 1 + Math.floor(Math.random() * (count - 1));
  462 |         const option = this.invoiceCreation.propertyOptions.nth(index);
  463 |         const propertyName = await option.innerText();
  464 | 
  465 |         await option.click();
  466 |         await this.invoiceCreation.propertyDropdown.click(); // close
  467 | 
  468 |         return propertyName;
  469 |     }
  470 | 
  471 | 
  472 |     async selectRandomUnitIfAvailable() {
  473 |         const toggle = this.invoiceCreation.unitDropdown;
  474 |         const options = this.invoiceCreation.unitOptions;
  475 | 
  476 |         // 1. wait for Unit to unlock (disabled until a property is picked), then open it
  477 |         await expect(toggle).not.toHaveAttribute('disabled', { timeout: 10000 });
  478 |         await toggle.click();
  479 | 
  480 |         // 2. this property might have zero units - the panel just stays blank,
  481 |         // no "no items found" message like expense_page.js has. So wait up to 5s
  482 |         // for a real option to show up; if none does, there are none.
  483 |         let hasUnits = true;
  484 |         try {
```