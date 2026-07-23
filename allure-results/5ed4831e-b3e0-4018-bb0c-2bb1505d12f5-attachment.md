# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that the user can start creating a new invoice
- Location: specs/propertyOwner/income/income.spec.js:40:5

# Error details

```
Error: expect(locator).not.toHaveAttribute() failed

Locator:  locator('div[aria-controls="dropdown-term"]')
Expected: not have attribute
Received: have attribute
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for locator('div[aria-controls="dropdown-term"]')
    24 × locator resolved to <div disabled="true" dropdowntoggle="" aria-haspopup="true" aria-expanded="false" _ngcontent-jbd-c286="" aria-controls="dropdown-term" class="innago-multiselect-field">…</div>
       - unexpected value "attribute present"

```

```yaml
- text: Select Term
```

# Test source

```ts
  200 |     }
  201 | 
  202 |     propertyCheckbox(name) {
  203 |         return this.page.locator(`//span[contains(text(), "${name}")]`);
  204 |     }
  205 | 
  206 |     tenantCheckbox(name) {
  207 |         return this.page.locator(`//span[contains(text(), "${name}")]/..`);
  208 |     }
  209 | 
  210 |     unitOption(propertyName, unitName) {
  211 |         return this.page.locator(
  212 |             `//label[contains(text(), "${propertyName}")]/following-sibling::label[contains(text(), "${unitName}")]/input`
  213 |         );
  214 |     }
  215 | 
  216 |     paymentModeCheckbox(mode) {
  217 |         return this.page.locator(`//span[text()= " ${mode} "]`);
  218 |     }
  219 | 
  220 |     invoiceCreationPropertyCheckbox(name) {
  221 |         return this.page.locator(`//label[text()="${name}"]`);
  222 |     }
  223 | 
  224 |     invoiceTypeOption(type) {
  225 |         return this.page.locator(`//label[text()="${type}"]`);
  226 |     }
  227 | 
  228 |     tenantByName(name) {
  229 |         return this.page.locator(`//label[contains(text(),"${name}")]`);
  230 |     }
  231 | 
  232 |     statusByRow(row) {
  233 |         return this.page.locator(`//tbody/tr[${row}]/td[5]/div/span`);
  234 |     }
  235 | 
  236 |     amountByRow(row) {
  237 |         return this.page.locator(`//tbody/tr[${row}]/td[7]/p`);
  238 |     }
  239 | 
  240 |     paidAmountByRow(row) {
  241 |         return this.page.locator(`//tbody/tr[${row}]/td[9]/p`);
  242 |     }
  243 | 
  244 |     processingByRow(row) {
  245 |         return this.page.locator(`//tbody/tr[${row}]/td[8]/p`);
  246 |     }
  247 | 
  248 |     balanceByRow(row) {
  249 |         return this.page.locator(`//tbody/tr[${row}]/td[10]/p`);
  250 |     }
  251 | 
  252 |     propertyByRow(row) {
  253 |         return this.page.locator(`//tbody/tr[${row}]/td[1]/p[1]`);
  254 |     }
  255 | 
  256 |     tenantByRow(row) {
  257 |         return this.page.locator(`//tbody/tr[${row}]/td[1]/p[2]`);
  258 |     }
  259 | 
  260 |     invoiceByRow(row) {
  261 |         return this.page.locator(`//tbody/tr[${row}]/td[4]/p`);
  262 |     }
  263 | 
  264 |     dateByRow(row) {
  265 |         return this.page.locator(`//tbody/tr[${row}]/td[2]/p`);
  266 |     }
  267 | 
  268 |     unitByRow(row) {
  269 |         return this.page.locator(`(//p[@data-locator="listingUnitName"])[${row}]`);
  270 |     }
  271 | 
  272 |     invoiceIdByRow(row) {
  273 |         return this.page.locator(`//app-income-list/div[2]/div[1]/table/tbody/tr[${row}]/td[4]/p`);
  274 |     }
  275 | 
  276 |     propertyByName(name) {
  277 |         return this.page.locator(`//p[text()="${name}"]`);
  278 |     }
  279 | 
  280 |     tenantByNameInListing(name) {
  281 |         return this.page.locator(`//p[text()="${name}"]`);
  282 |     }
  283 | 
  284 |     tenantNameByRow(row) {
  285 |         return this.page.locator(`(//p[@data-locator="itemTenantNames"])[${row}]`);
  286 |     }
  287 | 
  288 | 
  289 | 
  290 | 
  291 |     //dynamic function:
  292 |     async createNewInvoice() {
  293 |         await this.invoiceCreation.createNewInvoiceBtn.waitFor({ state: 'visible', timeout: 15000 });
  294 |         await this.invoiceCreation.createNewInvoiceBtn.click();
  295 |         await this.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
  296 |         const propertyName = await this.selectRandomProperty();
  297 |         const unitName = await this.selectRandomUnitIfAvailable();
  298 | 
  299 |         // ---- Term (stays disabled until Property + Unit are picked) ----
> 300 |         await expect(this.invoiceCreation.termDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
      |                                                             ^ Error: expect(locator).not.toHaveAttribute() failed
  301 |         await this.invoiceCreation.termDropdown.click();
  302 |         await this.invoiceCreation.termOptions.first().waitFor({ state: 'visible', timeout: 10000 });
  303 | 
  304 |         const termCount = await this.invoiceCreation.termOptions.count();
  305 |         const termIndex = Math.floor(Math.random() * termCount);
  306 |         const termName = await this.invoiceCreation.termOptions.nth(termIndex).innerText();
  307 | 
  308 |         await this.invoiceCreation.termOptions.nth(termIndex).click();
  309 |         await this.invoiceCreation.termDropdown.click(); // close
  310 | 
  311 |         // ---- Tenant (stays disabled until Term is picked) ----
  312 |         await expect(this.invoiceCreation.tenantDropdown).not.toHaveAttribute('disabled', { timeout: 10000 });
  313 |         await this.invoiceCreation.tenantDropdown.click();
  314 | 
  315 |         // index 0 in this list is "Select All Tenants" - use the first real tenant instead
  316 |         await this.invoiceCreation.selectFirstTenant.waitFor({ state: 'visible', timeout: 10000 });
  317 |         const tenantName = await this.invoiceCreation.selectFirstTenant.innerText();
  318 |         await this.invoiceCreation.selectFirstTenant.click();
  319 | 
  320 |         await this.invoiceCreation.tenantDropdown.click(); // close
  321 | 
  322 |         // ---- Invoice Type ----
  323 |         await this.invoiceCreation.invoiceTypeDropdown.click();
  324 |         await this.invoiceCreation.invoiceTypeOptions.first().waitFor({ state: 'visible', timeout: 10000 });
  325 | 
  326 |         const typeCount = await this.invoiceCreation.invoiceTypeOptions.count();
  327 |         const typeIndex = Math.floor(Math.random() * typeCount);
  328 |         const invoiceType = await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).innerText();
  329 | 
  330 |         await this.invoiceCreation.invoiceTypeOptions.nth(typeIndex).click();
  331 |         await this.invoiceCreation.invoiceTypeDropdown.click(); // close
  332 |         await this.page.waitForTimeout(1000); // pause so the selection is visible in headed mode
  333 | 
  334 |         // ---- Description, Quantity, Rate, Notes ----
  335 |         const description = `Invoice_${TestData.randomNumber(5)}`;
  336 |         await this.invoiceCreation.descriptionInput.fill(description);
  337 |         await this.invoiceCreation.quantityInput.fill('1');
  338 |         await this.invoiceCreation.rateInput.fill('100');
  339 |         await this.invoiceCreation.notesTextarea.fill(`Notes_${TestData.randomNumber(5)}`);
  340 |         await this.page.waitForTimeout(1000); // pause so the filled fields are visible in headed mode
  341 | 
  342 |         console.log(
  343 |             'Selected property:', propertyName,
  344 |             '| unit:', unitName,
  345 |             '| term:', termName,
  346 |             '| tenant:', tenantName,
  347 |             '| invoiceType:', invoiceType,
  348 |             '| description:', description
  349 |         );
  350 | 
  351 |         // ---- Submit ----
  352 |         await this.invoiceCreation.createInvoiceBtn.click();
  353 | 
  354 |         return { propertyName, unitName, termName, tenantName, invoiceType, description };
  355 |     }
  356 | 
  357 |     async selectRandomProperty() {
  358 |         await this.invoiceCreation.propertyDropdown.click();
  359 |         await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
  360 | 
  361 |         // index 0 is "Select All Properties", not a real property - skip it
  362 |         const count = await this.invoiceCreation.propertyOptions.count();
  363 |         const index = 1 + Math.floor(Math.random() * (count - 1));
  364 |         const option = this.invoiceCreation.propertyOptions.nth(index);
  365 |         const propertyName = await option.innerText();
  366 | 
  367 |         await option.click();
  368 |         await this.invoiceCreation.propertyDropdown.click(); // close
  369 | 
  370 |         return propertyName;
  371 |     }
  372 | 
  373 | 
  374 |     async selectRandomUnitIfAvailable() {
  375 |         const toggle = this.invoiceCreation.unitDropdown;
  376 |         const options = this.invoiceCreation.unitOptions;
  377 | 
  378 |         // 1. wait for Unit to unlock (disabled until a property is picked), then open it
  379 |         await expect(toggle).not.toHaveAttribute('disabled', { timeout: 10000 });
  380 |         await toggle.click();
  381 | 
  382 |         // 2. this property might have zero units - the panel just stays blank,
  383 |         // no "no items found" message like expense_page.js has. So wait up to 5s
  384 |         // for a real option to show up; if none does, there are none.
  385 |         let hasUnits = true;
  386 |         try {
  387 |             await options.first().waitFor({ state: 'visible', timeout: 5000 });
  388 |         } catch {
  389 |             hasUnits = false;
  390 |         }
  391 | 
  392 |         // 3. no units - close and stop
  393 |         if (!hasUnits) {
  394 |             await toggle.click();
  395 |             return 'No units available';
  396 |         }
  397 | 
  398 |         // 4. units exist - pick one at random
  399 |         const index = Math.floor(Math.random() * await options.count());
  400 |         const unitName = await options.nth(index).innerText();
```