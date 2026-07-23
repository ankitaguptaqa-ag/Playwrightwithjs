# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that the user can start creating a new invoice
- Location: specs/propertyOwner/income/income.spec.js:40:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#dropdown-properties label').first() to be visible
    34 × locator resolved to hidden <label for="select-all-prop" _ngcontent-oju-c286="">Select All Properties</label>

```

# Test source

```ts
  201 |         return this.page.locator(`//span[contains(text(), "${name}")]/..`);
  202 |     }
  203 | 
  204 |     unitOption(propertyName, unitName) {
  205 |         return this.page.locator(
  206 |             `//label[contains(text(), "${propertyName}")]/following-sibling::label[contains(text(), "${unitName}")]/input`
  207 |         );
  208 |     }
  209 | 
  210 |     paymentModeCheckbox(mode) {
  211 |         return this.page.locator(`//span[text()= " ${mode} "]`);
  212 |     }
  213 | 
  214 |     invoiceCreationPropertyCheckbox(name) {
  215 |         return this.page.locator(`//label[text()="${name}"]`);
  216 |     }
  217 | 
  218 |     invoiceTypeOption(type) {
  219 |         return this.page.locator(`//label[text()="${type}"]`);
  220 |     }
  221 | 
  222 |     tenantByName(name) {
  223 |         return this.page.locator(`//label[contains(text(),"${name}")]`);
  224 |     }
  225 | 
  226 |     statusByRow(row) {
  227 |         return this.page.locator(`//tbody/tr[${row}]/td[5]/div/span`);
  228 |     }
  229 | 
  230 |     amountByRow(row) {
  231 |         return this.page.locator(`//tbody/tr[${row}]/td[7]/p`);
  232 |     }
  233 | 
  234 |     paidAmountByRow(row) {
  235 |         return this.page.locator(`//tbody/tr[${row}]/td[9]/p`);
  236 |     }
  237 | 
  238 |     processingByRow(row) {
  239 |         return this.page.locator(`//tbody/tr[${row}]/td[8]/p`);
  240 |     }
  241 | 
  242 |     balanceByRow(row) {
  243 |         return this.page.locator(`//tbody/tr[${row}]/td[10]/p`);
  244 |     }
  245 | 
  246 |     propertyByRow(row) {
  247 |         return this.page.locator(`//tbody/tr[${row}]/td[1]/p[1]`);
  248 |     }
  249 | 
  250 |     tenantByRow(row) {
  251 |         return this.page.locator(`//tbody/tr[${row}]/td[1]/p[2]`);
  252 |     }
  253 | 
  254 |     invoiceByRow(row) {
  255 |         return this.page.locator(`//tbody/tr[${row}]/td[4]/p`);
  256 |     }
  257 | 
  258 |     dateByRow(row) {
  259 |         return this.page.locator(`//tbody/tr[${row}]/td[2]/p`);
  260 |     }
  261 | 
  262 |     unitByRow(row) {
  263 |         return this.page.locator(`(//p[@data-locator="listingUnitName"])[${row}]`);
  264 |     }
  265 | 
  266 |     invoiceIdByRow(row) {
  267 |         return this.page.locator(`//app-income-list/div[2]/div[1]/table/tbody/tr[${row}]/td[4]/p`);
  268 |     }
  269 | 
  270 |     propertyByName(name) {
  271 |         return this.page.locator(`//p[text()="${name}"]`);
  272 |     }
  273 | 
  274 |     tenantByNameInListing(name) {
  275 |         return this.page.locator(`//p[text()="${name}"]`);
  276 |     }
  277 | 
  278 |     tenantNameByRow(row) {
  279 |         return this.page.locator(`(//p[@data-locator="itemTenantNames"])[${row}]`);
  280 |     }
  281 | 
  282 | 
  283 | 
  284 | 
  285 |     //dynamic function:
  286 |     async createNewInvoice() {
  287 |         await this.invoiceCreation.createNewInvoiceBtn.waitFor({ state: 'visible', timeout: 15000 });
  288 |         await this.invoiceCreation.createNewInvoiceBtn.click();
  289 |         //await this.invoiceCreation.propertyDropdown.waitFor({ state: 'visible', timeout: 15000 });
  290 |         await this.invoiceCreation.propertyDropdown.click();
  291 |         await this.selectRandomProperty();
  292 |         await this.selectRandomUnitIfAvailable();
  293 |         console.log('Selected property and unit for new invoice');
  294 |         
  295 | 
  296 | 
  297 |     }
  298 | 
  299 |     async selectRandomProperty() {
  300 |         await this.invoiceCreation.propertyDropdown.click();
> 301 |         await this.invoiceCreation.propertyOptions.first().waitFor({ state: 'visible' });
      |                                                            ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  302 | 
  303 |         const count = await this.invoiceCreation.propertyOptions.count();
  304 |         const index = Math.floor(Math.random() * count);
  305 |         const option = this.invoiceCreation.propertyOptions.nth(index);
  306 |         const propertyName = await option.innerText();
  307 | 
  308 |         await option.click();
  309 |         await this.invoiceCreation.propertyDropdown.click(); // close
  310 | 
  311 |         return propertyName;
  312 |     }
  313 | 
  314 |     async selectRandomUnitIfAvailable() {
  315 |         // Unit box is disabled until a property is picked - wait for it to unlock
  316 |         await this.page.waitForFunction(
  317 |             () => !document.querySelector('div[aria-controls="dropdown-units"]')?.hasAttribute('disabled')
  318 |         );
  319 | 
  320 |         await this.invoiceCreation.unitDropdown.click();
  321 |         await this.page.waitForTimeout(500);
  322 | 
  323 |         const count = await this.invoiceCreation.unitOptions.count();
  324 | 
  325 |         if (count === 0) {
  326 |             await this.invoiceCreation.unitDropdown.click(); // close, nothing to pick
  327 |             return 'No units available';
  328 |         }
  329 | 
  330 |         const index = Math.floor(Math.random() * count);
  331 |         const option = this.invoiceCreation.unitOptions.nth(index);
  332 |         const unitName = await option.innerText();
  333 | 
  334 |         await option.click();
  335 |         await this.invoiceCreation.unitDropdown.click(); // close
  336 | 
  337 |         return unitName;
  338 |     }
  339 | }
  340 | 
```