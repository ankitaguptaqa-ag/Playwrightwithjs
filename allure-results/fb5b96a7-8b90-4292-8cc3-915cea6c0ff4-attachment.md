# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: propertyOwner/login/login.spec.js >> Property Owner Login Tests >> should login successfully with valid credentials
- Location: specs/propertyOwner/login/login.spec.js:17:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Dashboard')
Expected: visible
Error: strict mode violation: locator('text=Dashboard') resolved to 3 elements:
    1) <p class="my-1"> Satya Dashboard </p> aka getByText('Satya Dashboard')
    2) <span class="nav-title ms-3">Dashboard</span> aka getByRole('link', { name: 'dashboard' })
    3) <h1 id="start-tour" class="tw-w-56" _ngcontent-nru-c235="">Dashboard</h1> aka getByRole('heading', { name: 'Dashboard' })

Call log:
  - Expect "toBeVisible" with timeout 180000ms
  - waiting for locator('text=Dashboard')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - link "Innago LLCInnago LLC" [ref=e8] [cursor=pointer]:
        - /url: /dashboard
        - img "Innago LLC"
        - img "Innago LLC" [ref=e9]
      - link "profile img" [ref=e12] [cursor=pointer]:
        - /url: /profile
        - img "profile img" [ref=e13]
      - list [ref=e14]:
        - listitem [ref=e15]:
          - link "dashboard" [ref=e16] [cursor=pointer]:
            - /url: /dashboard
            - img "dashboard" [ref=e17]
        - listitem [ref=e19]:
          - link "properties" [ref=e20] [cursor=pointer]:
            - /url: /properties/list
            - img "properties" [ref=e21]
        - listitem [ref=e23]:
          - link "tenants" [ref=e24] [cursor=pointer]:
            - /url: /tenants/list/0/0
            - img "tenants" [ref=e25]
        - listitem [ref=e27]:
          - link "application" [ref=e28] [cursor=pointer]:
            - /url: /applications/list
            - img "application" [ref=e29]
        - listitem [ref=e31]:
          - link "lease-and-file" [ref=e32] [cursor=pointer]:
            - /url: /lease/list
            - img "lease-and-file" [ref=e33]
        - listitem [ref=e35]:
          - link "income" [ref=e36] [cursor=pointer]:
            - /url: /finance/invoices
            - img "income" [ref=e37]
        - listitem [ref=e39]:
          - link "expenses" [ref=e40] [cursor=pointer]:
            - /url: /expenses
            - img "expenses" [ref=e41]
        - listitem [ref=e43]:
          - link "maintenance" [ref=e44] [cursor=pointer]:
            - /url: /maintenance/maintenancelist
            - img "maintenance" [ref=e45]
        - listitem [ref=e47]:
          - link "messaging" [ref=e48] [cursor=pointer]:
            - /url: /messaging/email
            - img "messaging" [ref=e49]
        - listitem [ref=e51]:
          - link "listing" [ref=e52] [cursor=pointer]:
            - /url: /listings
            - img "listing" [ref=e53]
      - generic [ref=e55]:
        - link "report" [ref=e56] [cursor=pointer]:
          - /url: /reports
          - img "report" [ref=e60]
        - link "settings" [ref=e61] [cursor=pointer]:
          - /url: /setting?tab=general
          - img "settings" [ref=e65]
        - img "refer&Earn" [ref=e70] [cursor=pointer]
        - link "logout" [ref=e71] [cursor=pointer]:
          - /url: /logout
          - img "logout" [ref=e75]
    - generic [ref=e76]:
      - button "Left Toggle Button" [ref=e77] [cursor=pointer]:
        - emphasis [ref=e78]: 
      - generic [ref=e79]:
        - generic [ref=e81]:
          - heading "Dashboard" [level=1] [ref=e82]
          - button "Search" [ref=e85] [cursor=pointer]:
            - img "Search" [ref=e86]
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e92]:
              - generic [ref=e93]:
                - img [ref=e95]
                - generic [ref=e97]:
                  - generic [ref=e98]:
                    - paragraph [ref=e99]: AI-Powered Lease Onboarding
                    - generic [ref=e100]: NEW
                  - paragraph [ref=e101]: Upload your signed lease documents and let AI automatically extract property details, tenant information, and lease terms. Get started in minutes instead of hours!
              - button "Get Started" [ref=e103] [cursor=pointer]
              - img [ref=e104]:
                - img [ref=e105]
            - generic [ref=e112]:
              - generic [ref=e113]:
                - img [ref=e115]:
                  - img [ref=e116]
                - generic [ref=e152]:
                  - generic [ref=e153]: Accelerent’s Rent Advance
                  - generic [ref=e154]: Get early access to your upcoming rent payments with Accelerent.
              - button "Request Rent Advance" [ref=e156] [cursor=pointer]
            - generic [ref=e157]:
              - main [ref=e160]:
                - generic [ref=e162]:
                  - generic [ref=e163]:
                    - generic [ref=e164]:
                      - heading "Collection Stats" [level=3] [ref=e165]
                      - generic [ref=e169]:
                        - generic [ref=e170]: May 2026
                        - combobox [ref=e171]:
                          - textbox [ref=e172]
                    - button "Instant Withdrawal" [ref=e175] [cursor=pointer]:
                      - img [ref=e176]:
                        - img [ref=e177]
                      - text: Instant Withdrawal
                  - generic [ref=e180]:
                    - generic [ref=e185]:
                      - generic [ref=e186]:
                        - text: Total
                        - generic [ref=e187]: $4,256.00
                      - img [ref=e190]
                    - generic [ref=e204]:
                      - generic [ref=e206] [cursor=pointer]:
                        - heading "Collected" [level=5] [ref=e209]
                        - heading "$0.00" [level=4] [ref=e211]
                        - generic [ref=e212]:
                          - paragraph [ref=e215]: 0.0%
                          - img [ref=e216]:
                            - img [ref=e217]
                      - generic [ref=e220] [cursor=pointer]:
                        - heading "Processing" [level=5] [ref=e223]
                        - heading "$0.00" [level=4] [ref=e225]
                        - generic [ref=e226]:
                          - paragraph [ref=e229]: 0.0%
                          - img [ref=e230]:
                            - img [ref=e231]
                      - generic [ref=e234] [cursor=pointer]:
                        - heading "Overdue" [level=5] [ref=e237]
                        - heading "$4,256.00" [level=4] [ref=e239]
                        - generic [ref=e240]:
                          - paragraph [ref=e243]: 100.0%
                          - img [ref=e244]:
                            - img [ref=e245]
                      - generic [ref=e248] [cursor=pointer]:
                        - heading "Coming Due" [level=5] [ref=e251]
                        - heading "$0.00" [level=4] [ref=e253]
                        - generic [ref=e254]:
                          - paragraph [ref=e257]: 0.0%
                          - img [ref=e258]:
                            - img [ref=e259]
                    - generic [ref=e264]:
                      - generic [ref=e266]:
                        - heading "Units with Overdue Balance" [level=4] [ref=e267]
                        - generic [ref=e268]:
                          - heading "11" [level=1] [ref=e269]
                          - heading "/11" [level=2] [ref=e270]
                      - generic [ref=e275]:
                        - img [ref=e277]
                        - img [ref=e279]
                        - img [ref=e281]
                        - generic [ref=e282]: "+8"
                  - generic [ref=e284]:
                    - generic [ref=e285] [cursor=pointer]:
                      - heading "Past Overdue:" [level=5] [ref=e286]
                      - heading "$336.00" [level=5] [ref=e287]
                      - img [ref=e288]:
                        - img [ref=e289]
                    - generic [ref=e291]:
                      - heading "Leases:" [level=5] [ref=e292]
                      - group [ref=e295]:
                        - button "Active Only" [ref=e296] [cursor=pointer]
                        - button "All Time" [ref=e297] [cursor=pointer]
              - generic [ref=e298]:
                - generic [ref=e300]:
                  - generic [ref=e301]:
                    - generic [ref=e302]:
                      - img "properties" [ref=e303]
                      - heading "Unsigned Leases" [level=4] [ref=e304]
                    - separator [ref=e305]
                  - generic [ref=e308]:
                    - img "no-record" [ref=e309]
                    - paragraph [ref=e310]:
                      - strong [ref=e311]: No Records Found
                - generic [ref=e313]:
                  - generic [ref=e314]:
                    - generic [ref=e315]:
                      - img "properties" [ref=e316]
                      - heading "Applications Processing" [level=4] [ref=e317]
                    - separator [ref=e318]
                  - generic [ref=e321]:
                    - img "no-record" [ref=e322]
                    - paragraph [ref=e323]:
                      - strong [ref=e324]: No Records Found
          - generic [ref=e325]:
            - generic [ref=e326]:
              - button "Alternate Text Record Payment" [ref=e328] [cursor=pointer]:
                - img "Alternate Text" [ref=e329]
                - text: Record Payment
              - button "Alternate Text Add Tenant" [ref=e331] [cursor=pointer]:
                - img "Alternate Text" [ref=e332]
                - generic [ref=e333]: Add Tenant
            - generic [ref=e334]:
              - generic [ref=e335]:
                - generic [ref=e336]:
                  - img "properties" [ref=e337]
                  - heading "Occupancy Statistics" [level=4] [ref=e338]
                - separator [ref=e339]
              - generic [ref=e342]:
                - generic [ref=e343]:
                  - generic [ref=e344]:
                    - heading "5" [level=3] [ref=e345]
                    - paragraph [ref=e346]: Vacant
                  - generic [ref=e347]:
                    - heading "13" [level=3] [ref=e348]
                    - paragraph [ref=e349]: Occupied
                - generic [ref=e352]: "18"
            - generic [ref=e356]:
              - generic [ref=e357]:
                - generic [ref=e358]:
                  - img "properties" [ref=e359]
                  - heading "Open Maintenance Requests" [level=4] [ref=e360]
                - separator [ref=e361]
              - generic [ref=e365]:
                - img "Tools img" [ref=e366]
                - paragraph [ref=e367]: There are no maintenance requests
        - generic:
          - main
    - generic [ref=e369]:
      - generic [ref=e370]:
        - generic [ref=e371]:
          - paragraph [ref=e372]: Innago Guided Setup
          - paragraph [ref=e373]: 1/5
        - progressbar [ref=e375]
      - generic [ref=e376]:
        - generic:
          - generic [ref=e377]: 
          - generic [ref=e378]: Setup Properties
        - generic:
          - generic [ref=e379]: 
          - generic [ref=e380]: Setup Tenants
        - generic:
          - generic [ref=e381]: 
          - generic [ref=e382]: Setup Lease Templates
        - generic:
          - generic [ref=e383]: 
          - generic [ref=e384]: Setup Rent Collection
        - generic:
          - generic [ref=e385]: 
          - generic [ref=e386]: Setup Tenant Screening
    - contentinfo [ref=e387]:
      - text: ©2026 Innago LLC || Innago's
      - link "Terms and Conditions" [ref=e388] [cursor=pointer]:
        - /url: http://innago.qa.com/termsandcondition
      - text: and
      - link "Privacy Policy" [ref=e389] [cursor=pointer]:
        - /url: ""
      - text: .
  - generic [ref=e390]:
    - img [ref=e391]:
      - img [ref=e392]
    - iframe [ref=e394]:
      
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
  3  | import { userData } from '../../../mocks/common/userData.js';
  4  | 
  5  | const po1 = userData.env.qa.poUsers.po1;
  6  | 
  7  | test.describe('Property Owner Login Tests', () => {
  8  |     test.describe.configure({ mode: 'serial'});
  9  |     let loginPage;
  10 | 
  11 |     test.beforeEach(async ({ page }) => {
  12 |         loginPage = new LoginPage(page);
  13 |         await loginPage.goToLoginPage();
  14 |     });
  15 | 
  16 | 
  17 |     test('should login successfully with valid credentials', async ({ page }) => {
  18 |         await loginPage.login(po1.userName, po1.password);
> 19 |         await expect(page.locator('text=Dashboard')).toBeVisible();
     |                                                      ^ Error: expect(locator).toBeVisible() failed
  20 |     });
  21 | 
  22 |     test('should logout successfully', async ({ page }) => {
  23 |         await loginPage.login(po1.userName, po1.password);
  24 |         await loginPage.logout();
  25 |         await expect(page.locator('#username')).toBeVisible();
  26 |     });
  27 | 
  28 | 
  29 | });
```