# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/expenses/expenses.spec.js >> Expenses Tests - shared login >> Verify that the user can navigate to the Expenses page & click on managee payee and click on action menu
- Location: specs/propertyOwner/expenses/expenses.spec.js:44:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#username') to be visible
    - waiting for" https://identify-qa.innago.com/authorize?client_id=vchiGgmO2gck3Qv10kcveMmoWeM8e9ly&scope=openid+profile+email+offline_access+read%3Amessages&redirect_uri=https%3A%2F%2Fqa-auth.innago.com%2Flogin&pro…" navigation to finish...
    - navigated to "https://identify-qa.innago.com/u/login/identifier?state=hKFo2SBBZWM4aGRzMDJNV1p5YldsNXhCNjZ1MzFsWFlsX0lXU6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExTbFRGdVJQYXNTM1FTSHR1OFh6NjZVT1A5dmpwSC1oo2NpZNkgdmNoaUdnbU8…"

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
> 20 |         await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });
     |                               ^ TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  21 |         await this.emailInput.fill(email);
  22 |         await this.loginButton.click();
  23 |         await this.passwordInput.waitFor({state : 'visible' , timeout : 10000});
  24 |         await this.passwordInput.fill(password);
  25 |         await this.loginButton.click();
  26 |         await this.page.waitForURL((url) => url.toString().includes('dashboard'),{timeout : 30000});
  27 |     }
  28 | 
  29 |     async goToLoginPage() {
  30 |         await this.page.goto('/');
  31 |     }
  32 | 
  33 | 
  34 | }
```