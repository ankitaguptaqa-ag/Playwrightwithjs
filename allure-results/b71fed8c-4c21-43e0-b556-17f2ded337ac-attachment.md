# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/income/income.spec.js >> Income Tests - shared login >> Verify that the user can start creating a new invoice
- Location: specs/propertyOwner/income/income.spec.js:42:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('#username') to be visible

```

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('img[alt="logout"]') to be visible
    - waiting for" https://identify-qa.innago.com/authorize?client_id=vchiGgmO2gck3Qv10kcveMmoWeM8e9ly&scope=openid+profile+email+offline_access+read%3Amessages&redirect_uri=https%3A%2F%2Fqa-auth.innago.com%2Flogin&pro…" navigation to finish...
    - navigated to "https://identify-qa.innago.com/u/login/identifier?state=hKFo2SBUNV9PQnNLa09WekdVc3ZnS2VPVGU3R0l4b1BBYkFacKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDNrZGRrNDNZTm1YN0llWTU3cGQwT2ZHYmNuR0VlelVho2NpZNkgdmNoaUdnbU8…"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - img "Left Image" [ref=e4]
    - main [ref=e6]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - img "innago-qa" [ref=e13]
          - heading "Welcome" [level=1] [ref=e14]
          - paragraph [ref=e16]: Log in to innago-qa to continue to Innago QA App.
        - generic [ref=e17]:
          - generic [ref=e20]:
            - button: Continue
            - generic [ref=e25]:
              - generic [ref=e26]: Email address *
              - textbox "Email address" [active] [ref=e27]
            - button "Continue" [ref=e29] [cursor=pointer]
          - paragraph [ref=e31]:
            - text: Don't have an account?
            - link "Sign up" [ref=e32] [cursor=pointer]:
              - /url: /u/signup/identifier?state=hKFo2SBUNV9PQnNLa09WekdVc3ZnS2VPVGU3R0l4b1BBYkFacKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDNrZGRrNDNZTm1YN0llWTU3cGQwT2ZHYmNuR0VlelVho2NpZNkgdmNoaUdnbU8yZ2NrM1F2MTBrY3ZlTW1vV2VNOGU5bHk
          - generic [ref=e34]: Or
          - generic [ref=e35]:
            - button "Continue with Google" [ref=e37] [cursor=pointer]:
              - generic [ref=e39]: Continue with Google
            - button "Continue with Apple" [ref=e41] [cursor=pointer]:
              - generic [ref=e43]: Continue with Apple
            - button "Continue with Microsoft Account" [ref=e45] [cursor=pointer]:
              - generic [ref=e47]: Continue with Microsoft Account
  - paragraph [ref=e49]:
    - text: By using the Innago service, you agree to our
    - link "Privacy Policy" [ref=e50] [cursor=pointer]:
      - /url: https://my.innago.com/privacypolicy
    - text: and
    - link "Terms & Conditions" [ref=e51] [cursor=pointer]:
      - /url: https://my.innago.com/termsandcondition
    - text: .
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
> 13 |         await this.logoutButton.waitFor({state : 'visible' , timeout : 10000});
     |                                 ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  14 |         await this.logoutButton.click();
  15 |         await this.page.waitForURL((url) => url.toString().includes('qa-auth'),{timeout : 30000});
  16 | 
  17 |     }
  18 | 
  19 |     async login(email, password) {
  20 |         await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });
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