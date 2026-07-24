# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that a newly created invoice can be found via filters on the list page
- Location: specs/propertyOwner/income/income.spec.js:57:10

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('tbody>tr').first() to be visible

```

# Test source

```ts
  274 | 
  275 |     invoiceIdByRow(row) {
  276 |         return this.page.locator(`//app-income-list/div[2]/div[1]/table/tbody/tr[${row}]/td[4]/p`);
  277 |     }
  278 | 
  279 |     propertyByName(name) {
  280 |         return this.page.locator(`//p[text()="${name}"]`);
  281 |     }
  282 | 
  283 |     tenantByNameInListing(name) {
  284 |         return this.page.locator(`//p[text()="${name}"]`);
  285 |     }
  286 | 
  287 |     tenantNameByRow(row) {
  288 |         return this.page.locator(`(//p[@data-locator="itemTenantNames"])[${row}]`);
  289 |     }
  290 | 
  291 | 
  292 | 
  293 | 
  294 |     //dynamic function:
  295 |     async createNewInvoice() {
  296 |         await this.invoiceCreation.createNewInvoiceBtn.waitFor({ state: 'visible', timeout: 15000 });
  297 |         await this.invoiceCreation.createNewInvoiceBtn.click();
  298 |         await this.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
  299 |         const { propertyName, unitName } = await this.selectRandomPropertyWithUnit();
  300 | 
  301 |         // ---- Term (stays disabled until Property + Unit are picked) ----
  302 |         await expect(this.invoiceCreation.termDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
  303 |         await this.invoiceCreation.termDropdown.click();
  304 |         await this.invoiceCreation.termOptions.first().waitFor({ state: 'visible', timeout: 10000 });
  305 | 
  306 |         const termCount = await this.invoiceCreation.termOptions.count();
  307 |         const termIndex = Math.floor(Math.random() * termCount);
  308 |         const termName = await this.invoiceCreation.termOptions.nth(termIndex).innerText();
  309 | 
  310 |         await this.invoiceCreation.termOptions.nth(termIndex).click();
  311 |         await this.invoiceCreation.termDropdown.click(); // close
  312 | 
  313 |         // ---- Tenant (stays disabled until Term is picked) ----
  314 |         await expect(this.invoiceCreation.tenantDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
  315 |         await this.invoiceCreation.tenantDropdown.click();
  316 | 
  317 |         // index 0 in this list is "Select All Tenants" - use the first real tenant instead
  318 |         await this.invoiceCreation.selectFirstTenant.waitFor({ state: 'visible', timeout: 10000 });
  319 |         const tenantName = await this.invoiceCreation.selectFirstTenant.innerText();
  320 |         await this.invoiceCreation.selectFirstTenant.click();
  321 | 
  322 |         await this.invoiceCreation.tenantDropdown.click(); // close
  323 | 
  324 |         // ---- Invoice Type ----
  325 |         await this.invoiceCreation.invoiceTypeDropdown.click();
  326 |         await this.invoiceCreation.invoiceTypeOptions.first().waitFor({ state: 'visible', timeout: 10000 });
  327 | 
  328 |         const typeCount = await this.invoiceCreation.invoiceTypeOptions.count();
  329 |         const typeIndex = Math.floor(Math.random() * typeCount);
  330 |         const invoiceType = await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).innerText();
  331 | 
  332 |         await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).click();
  333 |         await this.invoiceCreation.invoiceTypeDropdown.click(); // close
  334 |         await this.page.waitForTimeout(1000); // pause so the selection is visible in headed mode
  335 | 
  336 |         // ---- Description, Quantity, Rate, Notes ----
  337 |         const description = `Invoice_${TestData.randomNumber(5)}`;
  338 |         await this.invoiceCreation.descriptionInput.fill(description);
  339 |         await this.invoiceCreation.quantityInput.fill('1');
  340 |         await this.invoiceCreation.rateInput.fill('100');
  341 |         await this.invoiceCreation.notesTextarea.fill(`Notes_${TestData.randomNumber(5)}`);
  342 |         await this.page.waitForTimeout(1000); // pause so the filled fields are visible in headed mode
  343 | 
  344 |         console.log(
  345 |             'Selected property:', propertyName,
  346 |             '| unit:', unitName,
  347 |             '| term:', termName,
  348 |             '| tenant:', tenantName,
  349 |             '| invoiceType:', invoiceType,
  350 |             '| description:', description
  351 |         );
  352 | 
  353 |         // ---- Submit ----
  354 |         await this.invoiceCreation.createInvoiceBtn.click();
  355 | 
  356 |         return { propertyName, unitName, termName, tenantName, invoiceType, description };
  357 |     }
  358 | 
  359 |     async filterByProperty(propertyName) {
  360 |         await this.filters.filterCollapse.click();
  361 | 
  362 |         await this.filters.propertyDropdown.click();
  363 |         await this.filters.propertySearchInput.fill(propertyName);
  364 |         await this.propertyCheckbox(propertyName).first().click();
  365 |         await this.filters.propertyDropdown.click(); // close
  366 | 
  367 |         await this.filters.applyFilterBtn.click();
  368 |         await this.page.waitForTimeout(2000); // let filtered results load
  369 | 
  370 |         // switch to Not Grouped so table rows are individual invoices, not property groups
  371 |         await this.filters.groupByDropdown.click();
  372 |         await this.filters.notGrouped.click();
  373 | 
> 374 |         await this.listing.tableRows.first().waitFor({ state: 'visible', timeout: 15000 });
      |                                              ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  375 |     }
  376 | 
  377 |     async selectRandomPropertyWithUnit() {
  378 |         let propertyName;
  379 |         let propertyIndex;
  380 |         let unitName = 'No units available';
  381 | 
  382 |         while (unitName === 'No units available') {
  383 |             // last property had no units - uncheck it before trying a different one
  384 |             if (propertyName) {
  385 |                 await this.invoiceCreation.propertyDropdown.click();
  386 |                 await this.invoiceCreation.propertyOptions.nth(propertyIndex).click(); // uncheck
  387 |                 await this.invoiceCreation.propertyDropdown.click();
  388 |             }
  389 | 
  390 |             await this.invoiceCreation.propertyDropdown.click();
  391 |             await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
  392 | 
  393 |             // index 0 is "Select All Properties", not a real property - skip it
  394 |             const count = await this.invoiceCreation.propertyOptions.count();
  395 |             propertyIndex = 1 + Math.floor(Math.random() * (count - 1));
  396 |             const option = this.invoiceCreation.propertyOptions.nth(propertyIndex);
  397 |             propertyName = await option.innerText();
  398 | 
  399 |             await option.click();
  400 |             await this.invoiceCreation.propertyDropdown.click(); // close
  401 | 
  402 |             unitName = await this.selectRandomUnitIfAvailable();
  403 |         }
  404 | 
  405 |         return { propertyName, unitName };
  406 |     }
  407 | 
  408 |     async selectRandomProperty() {
  409 |         await this.invoiceCreation.propertyDropdown.click();
  410 |         await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
  411 | 
  412 |         // index 0 is "Select All Properties", not a real property - skip it
  413 |         const count = await this.invoiceCreation.propertyOptions.count();
  414 |         const index = 1 + Math.floor(Math.random() * (count - 1));
  415 |         const option = this.invoiceCreation.propertyOptions.nth(index);
  416 |         const propertyName = await option.innerText();
  417 | 
  418 |         await option.click();
  419 |         await this.invoiceCreation.propertyDropdown.click(); // close
  420 | 
  421 |         return propertyName;
  422 |     }
  423 | 
  424 | 
  425 |     async selectRandomUnitIfAvailable() {
  426 |         const toggle = this.invoiceCreation.unitDropdown;
  427 |         const options = this.invoiceCreation.unitOptions;
  428 | 
  429 |         // 1. wait for Unit to unlock (disabled until a property is picked), then open it
  430 |         await expect(toggle).not.toHaveAttribute('disabled', { timeout: 10000 });
  431 |         await toggle.click();
  432 | 
  433 |         // 2. this property might have zero units - the panel just stays blank,
  434 |         // no "no items found" message like expense_page.js has. So wait up to 5s
  435 |         // for a real option to show up; if none does, there are none.
  436 |         let hasUnits = true;
  437 |         try {
  438 |             await options.first().waitFor({ state: 'visible', timeout: 5000 });
  439 |         } catch {
  440 |             hasUnits = false;
  441 |         }
  442 | 
  443 |         // 3. no units - close and stop
  444 |         if (!hasUnits) {
  445 |             await toggle.click();
  446 |             return 'No units available';
  447 |         }
  448 | 
  449 |         // 4. units exist - pick one at random
  450 |         const index = Math.floor(Math.random() * await options.count());
  451 |         const unitName = await options.nth(index).innerText();
  452 |         await options.nth(index).click();
  453 |         await toggle.click();
  454 | 
  455 |         return unitName;
  456 |     }
  457 | }
  458 | 
```