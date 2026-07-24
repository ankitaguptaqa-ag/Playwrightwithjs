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
  204 | 
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
  299 |         const { propertyName, unitName } = await this.selectRandomPropertyWithUnit();
  300 | 
  301 |         // ---- Term (stays disabled until Property + Unit are picked) ----
  302 |         await expect(this.invoiceCreation.termDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
  303 |         await this.invoiceCreation.termDropdown.click();
> 304 |         await this.invoiceCreation.termOptions.first().waitFor({ state: 'visible', timeout: 10000 });
      |                                                        ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
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
  370 |         // stay in the default Grouped by Property view - no need to switch
  371 |         await this.listing.propertyNameFirstRow.waitFor({ state: 'visible', timeout: 15000 });
  372 |     }
  373 | 
  374 |     async selectRandomPropertyWithUnit() {
  375 |         let propertyName;
  376 |         let propertyIndex;
  377 |         let unitName = 'No units available';
  378 | 
  379 |         while (unitName === 'No units available') {
  380 |             // last property had no units - uncheck it before trying a different one
  381 |             if (propertyName) {
  382 |                 await this.invoiceCreation.propertyDropdown.click();
  383 |                 await this.invoiceCreation.propertyOptions.nth(propertyIndex).click(); // uncheck
  384 |                 await this.invoiceCreation.propertyDropdown.click();
  385 |             }
  386 | 
  387 |             await this.invoiceCreation.propertyDropdown.click();
  388 |             await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
  389 | 
  390 |             // index 0 is "Select All Properties", not a real property - skip it
  391 |             const count = await this.invoiceCreation.propertyOptions.count();
  392 |             propertyIndex = 1 + Math.floor(Math.random() * (count - 1));
  393 |             const option = this.invoiceCreation.propertyOptions.nth(propertyIndex);
  394 |             propertyName = await option.innerText();
  395 | 
  396 |             await option.click();
  397 |             await this.invoiceCreation.propertyDropdown.click(); // close
  398 | 
  399 |             unitName = await this.selectRandomUnitIfAvailable();
  400 |         }
  401 | 
  402 |         return { propertyName, unitName };
  403 |     }
  404 | 
```