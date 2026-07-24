# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that a newly created invoice can be found via filters on the list page
- Location: specs/propertyOwner/income/income.spec.js:57:10

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#dropdown-term label').first() to be visible

```

# Test source

```ts
  205 |     propertyCheckbox(name) {
  206 |         return this.page.locator(`//span[contains(text(), "${name}")]`);
  207 |     }
  208 | 
  209 |     tenantCheckbox(name) {
  210 |         return this.page.locator(`//span[contains(text(), "${name}")]/..`);
  211 |     }
  212 | 
  213 |     unitOption(propertyName, unitName) {
  214 |         return this.page.locator(
  215 |             `//label[contains(text(), "${propertyName}")]/following-sibling::label[contains(text(), "${unitName}")]/input`
  216 |         );
  217 |     }
  218 | 
  219 |     paymentModeCheckbox(mode) {
  220 |         return this.page.locator(`//span[text()= " ${mode} "]`);
  221 |     }
  222 | 
  223 |     invoiceCreationPropertyCheckbox(name) {
  224 |         return this.page.locator(`//label[text()="${name}"]`);
  225 |     }
  226 | 
  227 |     invoiceTypeOption(type) {
  228 |         return this.page.locator(`//label[text()="${type}"]`);
  229 |     }
  230 | 
  231 |     tenantByName(name) {
  232 |         return this.page.locator(`//label[contains(text(),"${name}")]`);
  233 |     }
  234 | 
  235 |     statusByRow(row) {
  236 |         return this.page.locator(`//tbody/tr[${row}]/td[5]/div/span`);
  237 |     }
  238 | 
  239 |     amountByRow(row) {
  240 |         return this.page.locator(`//tbody/tr[${row}]/td[7]/p`);
  241 |     }
  242 | 
  243 |     paidAmountByRow(row) {
  244 |         return this.page.locator(`//tbody/tr[${row}]/td[9]/p`);
  245 |     }
  246 | 
  247 |     processingByRow(row) {
  248 |         return this.page.locator(`//tbody/tr[${row}]/td[8]/p`);
  249 |     }
  250 | 
  251 |     balanceByRow(row) {
  252 |         return this.page.locator(`//tbody/tr[${row}]/td[10]/p`);
  253 |     }
  254 | 
  255 |     propertyByRow(row) {
  256 |         return this.page.locator(`//tbody/tr[${row}]/td[1]/p[1]`);
  257 |     }
  258 | 
  259 |     tenantByRow(row) {
  260 |         return this.page.locator(`//tbody/tr[${row}]/td[1]/p[2]`);
  261 |     }
  262 | 
  263 |     invoiceByRow(row) {
  264 |         return this.page.locator(`//tbody/tr[${row}]/td[4]/p`);
  265 |     }
  266 | 
  267 |     dateByRow(row) {
  268 |         return this.page.locator(`//tbody/tr[${row}]/td[2]/p`);
  269 |     }
  270 | 
  271 |     unitByRow(row) {
  272 |         return this.page.locator(`(//p[@data-locator="listingUnitName"])[${row}]`);
  273 |     }
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
  299 |         const propertyName = await this.selectRandomProperty();
  300 |         const unitName = await this.selectRandomUnitIfAvailable();
  301 | 
  302 |         // ---- Term (stays disabled until Property + Unit are picked) ----
  303 |         await expect(this.invoiceCreation.termDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
  304 |         await this.invoiceCreation.termDropdown.click();
> 305 |         await this.invoiceCreation.termOptions.first().waitFor({ state: 'visible', timeout: 10000 });
      |                                                        ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  306 | 
  307 |         const termCount = await this.invoiceCreation.termOptions.count();
  308 |         const termIndex = Math.floor(Math.random() * termCount);
  309 |         const termName = await this.invoiceCreation.termOptions.nth(termIndex).innerText();
  310 | 
  311 |         await this.invoiceCreation.termOptions.nth(termIndex).click();
  312 |         await this.invoiceCreation.termDropdown.click(); // close
  313 | 
  314 |         // ---- Tenant (stays disabled until Term is picked) ----
  315 |         await expect(this.invoiceCreation.tenantDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
  316 |         await this.invoiceCreation.tenantDropdown.click();
  317 | 
  318 |         // index 0 in this list is "Select All Tenants" - use the first real tenant instead
  319 |         await this.invoiceCreation.selectFirstTenant.waitFor({ state: 'visible', timeout: 10000 });
  320 |         const tenantName = await this.invoiceCreation.selectFirstTenant.innerText();
  321 |         await this.invoiceCreation.selectFirstTenant.click();
  322 | 
  323 |         await this.invoiceCreation.tenantDropdown.click(); // close
  324 | 
  325 |         // ---- Invoice Type ----
  326 |         await this.invoiceCreation.invoiceTypeDropdown.click();
  327 |         await this.invoiceCreation.invoiceTypeOptions.first().waitFor({ state: 'visible', timeout: 10000 });
  328 | 
  329 |         const typeCount = await this.invoiceCreation.invoiceTypeOptions.count();
  330 |         const typeIndex = Math.floor(Math.random() * typeCount);
  331 |         const invoiceType = await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).innerText();
  332 | 
  333 |         await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).click();
  334 |         await this.invoiceCreation.invoiceTypeDropdown.click(); // close
  335 |         await this.page.waitForTimeout(1000); // pause so the selection is visible in headed mode
  336 | 
  337 |         // ---- Description, Quantity, Rate, Notes ----
  338 |         const description = `Invoice_${TestData.randomNumber(5)}`;
  339 |         await this.invoiceCreation.descriptionInput.fill(description);
  340 |         await this.invoiceCreation.quantityInput.fill('1');
  341 |         await this.invoiceCreation.rateInput.fill('100');
  342 |         await this.invoiceCreation.notesTextarea.fill(`Notes_${TestData.randomNumber(5)}`);
  343 |         await this.page.waitForTimeout(1000); // pause so the filled fields are visible in headed mode
  344 | 
  345 |         console.log(
  346 |             'Selected property:', propertyName,
  347 |             '| unit:', unitName,
  348 |             '| term:', termName,
  349 |             '| tenant:', tenantName,
  350 |             '| invoiceType:', invoiceType,
  351 |             '| description:', description
  352 |         );
  353 | 
  354 |         // ---- Submit ----
  355 |         await this.invoiceCreation.createInvoiceBtn.click();
  356 | 
  357 |         return { propertyName, unitName, termName, tenantName, invoiceType, description };
  358 |     }
  359 | 
  360 |     async filterByProperty(propertyName) {
  361 |         await this.filters.filterCollapse.click();
  362 | 
  363 |         await this.filters.propertyDropdown.click();
  364 |         await this.filters.propertySearchInput.fill(propertyName);
  365 |         await this.propertyCheckbox(propertyName).first().click();
  366 |         await this.filters.propertyDropdown.click(); // close
  367 | 
  368 |         await this.filters.applyFilterBtn.click();
  369 | 
  370 |         // switch to Not Grouped so table rows are individual invoices, not property groups
  371 |         await this.filters.groupByDropdown.click();
  372 |         await this.filters.notGrouped.click();
  373 | 
  374 |         await this.listing.tableRows.first().waitFor({ state: 'visible', timeout: 15000 });
  375 |     }
  376 | 
  377 |     async selectRandomProperty() {
  378 |         await this.invoiceCreation.propertyDropdown.click();
  379 |         await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
  380 | 
  381 |         // index 0 is "Select All Properties", not a real property - skip it
  382 |         const count = await this.invoiceCreation.propertyOptions.count();
  383 |         const index = 1 + Math.floor(Math.random() * (count - 1));
  384 |         const option = this.invoiceCreation.propertyOptions.nth(index);
  385 |         const propertyName = await option.innerText();
  386 | 
  387 |         await option.click();
  388 |         await this.invoiceCreation.propertyDropdown.click(); // close
  389 | 
  390 |         return propertyName;
  391 |     }
  392 | 
  393 | 
  394 |     async selectRandomUnitIfAvailable() {
  395 |         const toggle = this.invoiceCreation.unitDropdown;
  396 |         const options = this.invoiceCreation.unitOptions;
  397 | 
  398 |         // 1. wait for Unit to unlock (disabled until a property is picked), then open it
  399 |         await expect(toggle).not.toHaveAttribute('disabled', { timeout: 10000 });
  400 |         await toggle.click();
  401 | 
  402 |         // 2. this property might have zero units - the panel just stays blank,
  403 |         // no "no items found" message like expense_page.js has. So wait up to 5s
  404 |         // for a real option to show up; if none does, there are none.
  405 |         let hasUnits = true;
```