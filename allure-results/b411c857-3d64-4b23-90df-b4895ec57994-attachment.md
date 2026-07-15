# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/expenses/expenses.spec.js >> Expenses Tests - shared login >> Verify that the user can navigate to the Expenses page & click on managee payee and click on action menu
- Location: specs/propertyOwner/expenses/expenses.spec.js:39:5

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#username')

```

# Test source

```ts
  1  | export class LoginPage {
  2  |     constructor(page) {
  3  |         this.page = page;
  4  |         
  5  |         this.emailInput = page.locator('#username');
  6  |         this.passwordInput = page.locator('#password');
  7  |         this.loginButton = page.locator('button[data-action-button-primary="true"]');
  8  |         this.logoutButton = page.locator('img[alt="logout"]');
  9  | 
  10 |     }
  11 | 
  12 |     async logout(){
  13 |         await this.logoutButton.waitFor({state : 'visible' , timeout : 10000});
  14 |         await this.logoutButton.click();
  15 |         await this.page.waitForURL((url) => url.toString().includes('qa-auth'),{timeout : 30000});
  16 | 
  17 |     }
  18 | 
  19 |     async login(email, password) {
> 20 |         await this.emailInput.fill(email);
     |                               ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  21 |         await this.loginButton.click();
  22 |         await this.passwordInput.waitFor({state : 'visible' , timeout : 10000});
  23 |         await this.passwordInput.fill(password);
  24 |         await this.loginButton.click();
  25 |         await this.page.waitForURL((url) => url.toString().includes('dashboard'),{timeout : 30000});
  26 |     }
  27 | 
  28 |     async goToLoginPage() {
  29 |         await this.page.goto('/');
  30 |     }
  31 | 
  32 | 
  33 | }
```