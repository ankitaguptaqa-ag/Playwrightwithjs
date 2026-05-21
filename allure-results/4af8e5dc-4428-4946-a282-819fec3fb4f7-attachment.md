# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/login/login.spec.js >> Property Owner Login Tests >> should logout successfully
- Location: specs/propertyOwner/login/login.spec.js:22:5

# Error details

```
TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "https://qa-auth.innago.com/login?code=7Kg6j9WTD1p8eBaZOnfTw8bXKRnL84meTbczaYF4PTeye&state=ekJ0NUxka0NTY1I2U3E5aW55ZmZoV09zaGN2YVN6QzRYc3VUTTVzQ0JSfg%3D%3D"
  navigated to "https://qa-auth.innago.com/login?code=7Kg6j9WTD1p8eBaZOnfTw8bXKRnL84meTbczaYF4PTeye&state=ekJ0NUxka0NTY1I2U3E5aW55ZmZoV09zaGN2YVN6QzRYc3VUTTVzQ0JSfg%3D%3D"
  navigated to "https://qa-auth.innago.com/login"
  navigated to "https://qa-property-owner.innago.com/"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - link "Innago LLCInnago LLC" [ref=e8] [cursor=pointer]:
        - /url: /dashboard
        - img "Innago LLC" [ref=e9]
        - img "Innago LLC"
      - generic [ref=e10]:
        - link "profile img" [ref=e12] [cursor=pointer]:
          - /url: /profile
          - img "profile img" [ref=e13]
        - generic [ref=e14]:
          - paragraph [ref=e15]: Satya Dashboard
          - link "Profile" [ref=e16] [cursor=pointer]:
            - /url: /profile
      - list [ref=e17]:
        - listitem [ref=e18]:
          - link "dashboard Dashboard" [ref=e19] [cursor=pointer]:
            - /url: /dashboard
            - img "dashboard" [ref=e20]
            - generic [ref=e21]: Dashboard
        - listitem [ref=e22]:
          - link "properties Properties" [ref=e23] [cursor=pointer]:
            - /url: /properties/list
            - img "properties" [ref=e24]
            - generic [ref=e25]: Properties
        - listitem [ref=e26]:
          - link "tenants Tenants" [ref=e27] [cursor=pointer]:
            - /url: /tenants/list/0/0
            - img "tenants" [ref=e28]
            - generic [ref=e29]: Tenants
        - listitem [ref=e30]:
          - link "application Applications" [ref=e31] [cursor=pointer]:
            - /url: /applications/list
            - img "application" [ref=e32]
            - generic [ref=e33]: Applications
        - listitem [ref=e34]:
          - link "lease-and-file Leases & Files" [ref=e35] [cursor=pointer]:
            - /url: /lease/list
            - img "lease-and-file" [ref=e36]
            - generic [ref=e37]: Leases & Files
        - listitem [ref=e38]:
          - link "income Income" [ref=e39] [cursor=pointer]:
            - /url: /finance/invoices
            - img "income" [ref=e40]
            - generic [ref=e41]: Income
        - listitem [ref=e42]:
          - link "expenses Expenses" [ref=e43] [cursor=pointer]:
            - /url: /expenses
            - img "expenses" [ref=e44]
            - generic [ref=e45]: Expenses
        - listitem [ref=e46]:
          - link "maintenance Maintenance" [ref=e47] [cursor=pointer]:
            - /url: /maintenance/maintenancelist
            - img "maintenance" [ref=e48]
            - generic [ref=e49]: Maintenance
        - listitem [ref=e50]:
          - link "messaging Messaging" [ref=e51] [cursor=pointer]:
            - /url: /messaging/email
            - img "messaging" [ref=e52]
            - generic [ref=e53]: Messaging
        - listitem [ref=e54]:
          - link "listing Listings" [ref=e55] [cursor=pointer]:
            - /url: /listings
            - img "listing" [ref=e56]
            - generic [ref=e57]: Listings
      - generic [ref=e58]:
        - link "report" [ref=e59] [cursor=pointer]:
          - /url: /reports
          - img "report" [ref=e63]
        - link "settings" [ref=e64] [cursor=pointer]:
          - /url: /setting?tab=general
          - img "settings" [ref=e68]
        - img "refer&Earn" [ref=e73] [cursor=pointer]
        - link "logout" [ref=e74] [cursor=pointer]:
          - /url: /logout
          - img "logout" [ref=e78]
    - generic [ref=e79]:
      - button "Left Toggle Button" [ref=e80] [cursor=pointer]:
        - emphasis [ref=e81]: 
      - generic [ref=e82]:
        - generic [ref=e84]:
          - heading "Dashboard" [level=1] [ref=e85]
          - button "Search" [ref=e88] [cursor=pointer]:
            - img "Search" [ref=e89]
        - generic [ref=e92]:
          - generic [ref=e93]:
            - generic [ref=e95]:
              - generic [ref=e96]:
                - img [ref=e98]
                - generic [ref=e100]:
                  - generic [ref=e101]:
                    - paragraph [ref=e102]: AI-Powered Lease Onboarding
                    - generic [ref=e103]: NEW
                  - paragraph [ref=e104]: Upload your signed lease documents and let AI automatically extract property details, tenant information, and lease terms. Get started in minutes instead of hours!
              - button "Get Started" [ref=e106] [cursor=pointer]
              - img [ref=e107]:
                - img [ref=e108]
            - generic [ref=e115]:
              - generic [ref=e116]:
                - img [ref=e118]:
                  - img [ref=e119]
                - generic [ref=e155]:
                  - generic [ref=e156]: Accelerent’s Rent Advance
                  - generic [ref=e157]: Get early access to your upcoming rent payments with Accelerent.
              - button "Request Rent Advance" [ref=e159] [cursor=pointer]
            - generic [ref=e160]:
              - main [ref=e163]:
                - generic [ref=e165]:
                  - generic [ref=e166]:
                    - generic [ref=e167]:
                      - heading "Collection Stats" [level=3] [ref=e168]
                      - generic [ref=e172]:
                        - generic [ref=e173]: Select
                        - combobox [ref=e174]:
                          - textbox [ref=e175]
                    - button "Instant Withdrawal" [ref=e178] [cursor=pointer]:
                      - img [ref=e179]:
                        - img [ref=e180]
                      - text: Instant Withdrawal
                  - generic [ref=e248]:
                    - generic [ref=e249] [cursor=pointer]:
                      - heading "Past Overdue:" [level=5] [ref=e250]
                      - heading "$0.00" [level=5] [ref=e251]
                      - img [ref=e252]:
                        - img [ref=e253]
                    - generic [ref=e255]:
                      - heading "Leases:" [level=5] [ref=e256]
                      - group [ref=e259]:
                        - button "Active Only" [ref=e260] [cursor=pointer]
                        - button "All Time" [ref=e261] [cursor=pointer]
              - generic [ref=e262]:
                - generic [ref=e264]:
                  - generic [ref=e265]:
                    - generic [ref=e266]:
                      - img "properties" [ref=e267]
                      - heading "Unsigned Leases" [level=4] [ref=e268]
                    - separator [ref=e269]
                  - generic [ref=e282]:
                    - img "no-record"
                    - paragraph [ref=e283]:
                      - strong [ref=e284]: No Records Found
                - generic [ref=e286]:
                  - generic [ref=e287]:
                    - generic [ref=e288]:
                      - img "properties" [ref=e289]
                      - heading "Applications Processing" [level=4] [ref=e290]
                    - separator [ref=e291]
                  - generic [ref=e304]:
                    - text: Your application settings have not yet been turned on. Click below to turn them on now.
                    - link "Turn on Applications" [ref=e305] [cursor=pointer]:
                      - /url: /setting
          - generic [ref=e306]:
            - generic [ref=e307]:
              - generic [ref=e308]:
                - button "Alternate Text Record Payment" [disabled]:
                  - img "Alternate Text"
                  - text: Record Payment
              - button "Alternate Text Add Tenant" [ref=e310] [cursor=pointer]:
                - img "Alternate Text" [ref=e311]
                - generic [ref=e312]: Add Tenant
            - generic [ref=e313]:
              - generic [ref=e314]:
                - generic [ref=e315]:
                  - img "properties" [ref=e316]
                  - heading "Occupancy Statistics" [level=4] [ref=e317]
                - separator [ref=e318]
              - generic [ref=e331]:
                - generic [ref=e332]:
                  - generic [ref=e333]:
                    - heading "0" [level=3] [ref=e334]
                    - paragraph [ref=e335]: Vacant
                  - generic [ref=e336]:
                    - heading "0" [level=3] [ref=e337]
                    - paragraph [ref=e338]: Occupied
                - generic [ref=e341]: "0"
            - generic [ref=e345]:
              - generic [ref=e346]:
                - generic [ref=e347]:
                  - img "properties" [ref=e348]
                  - heading "Open Maintenance Requests" [level=4] [ref=e349]
                - separator [ref=e350]
              - paragraph [ref=e365]:
                - strong [ref=e366]:
                  - text: You have switched off accepting new online maintenance requests
                  - text: Please go to settings page to enable Maintenance request.
        - generic:
          - main
    - generic [ref=e368]:
      - generic [ref=e369]:
        - generic [ref=e370]:
          - paragraph [ref=e371]: Innago Guided Setup
          - paragraph [ref=e372]: 1/5
        - progressbar [ref=e374]
      - generic [ref=e375]:
        - generic:
          - generic [ref=e376]: 
          - generic [ref=e377]: Setup Properties
        - generic:
          - generic [ref=e378]: 
          - generic [ref=e379]: Setup Tenants
        - generic:
          - generic [ref=e380]: 
          - generic [ref=e381]: Setup Lease Templates
        - generic:
          - generic [ref=e382]: 
          - generic [ref=e383]: Setup Rent Collection
        - generic:
          - generic [ref=e384]: 
          - generic [ref=e385]: Setup Tenant Screening
    - contentinfo [ref=e386]:
      - text: ©2026 Innago LLC || Innago's
      - link "Terms and Conditions" [ref=e387] [cursor=pointer]:
        - /url: http://innago.qa.com/termsandcondition
      - text: and
      - link "Privacy Policy" [ref=e388] [cursor=pointer]:
        - /url: ""
      - text: .
  - generic [ref=e389]:
    - img [ref=e390]:
      - img [ref=e391]
    - iframe [ref=e393]:
      
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
  20 |         await this.emailInput.fill(email);
  21 |         await this.loginButton.click();
  22 |         await this.passwordInput.waitFor({state : 'visible' , timeout : 10000});
  23 |         await this.passwordInput.fill(password);
  24 |         await this.loginButton.click();
> 25 |         await this.page.waitForURL((url) => url.toString().includes('dashboard'),{timeout : 30000});
     |                         ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  26 |     }
  27 | 
  28 |     async goToLoginPage() {
  29 |         await this.page.goto('/');
  30 |     }
  31 | 
  32 | 
  33 | }
```