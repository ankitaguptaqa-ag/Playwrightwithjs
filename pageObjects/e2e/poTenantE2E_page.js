import { expect } from '@playwright/test';

/**
 * Page object for the PO -> tenant end-to-end flow.
 *
 * The journey spans three surfaces, so all three live here: the PO portal lease wizard, the
 * tenant's yopmail inbox, and the tenant portal. The Auth0 sign-in is shared by both portals
 * and is therefore built twice, once bound to each page.
 *
 * It takes two pages because the PO and the tenant need separate browser contexts: both
 * portals sign in through the same Auth0 tenant, so a shared context would have the tenant
 * login evict the PO session.
 */

const YOPMAIL_INBOX_URL = 'https://yopmail.com/en/?login=';

/**
 * Innago sends the activation link through SES click tracking, so the href on "Click Here"
 * looks like:
 *   https://<id>.r.us-west-2.awstrack.me/L0/https:%2F%2Fqa-my.innago.com%2Fverifyaccount%2F<id>%2F<guid>/1/...
 *
 * Following the tracker works, but it puts a third-party redirect in the middle of the test.
 * The real destination is sitting right there percent-encoded, so decode and pull it out
 * instead - fewer moving parts, and it still fails loudly if the link is ever missing.
 */
const ACTIVATION_LINK_PATTERN = /https:\/\/[^\s/]*innago\.com\/verifyaccount\/\d+\/[0-9a-f-]{36}/i;

export function extractActivationLink(hrefs) {
    for (const href of hrefs) {
        const match = decodeURIComponent(href).match(ACTIVATION_LINK_PATTERN);
        if (match) {
            return match[0];
        }
    }
    return null;
}

export class PoTenantE2EPage {
    constructor(poPage, tenantPage) {
        this.poPage = poPage;
        this.tenantPage = tenantPage;

        this.poSignIn = PoTenantE2EPage.buildSignInLocators(poPage);
        this.tenantSignIn = PoTenantE2EPage.buildSignInLocators(tenantPage);

        this.poNav = {
            properties: poPage.locator('//span[text() = "Properties "]'),
        };

        this.addPropertyDetails = {
            // The properties list renders a header "Add Property" button (#add-property) when
            // it has records, but only an empty-state one when it has none - and QA regularly
            // serves a 500 for the list, which drops it to that empty state. Accept either, so
            // a flaky list call does not stop us creating the property.
            addProperty_Button: poPage.locator('#add-property, button:has-text("Add Property")').first(),
            addressCollapse_Icon: poPage.locator('//in-icon[@name="menu-hamburger-reversed"]').first(),
            closeAddressCollapse_Icon: poPage.locator('//in-icon[@name="close-model"]').first(),
            addressLine1_Input: poPage.locator('//input[@formcontrolname="addressLine1"]'),
            city_Input: poPage.locator('//input[@formcontrolname="city"]'),
            zipCode_Input: poPage.locator('//input[@formcontrolname="zip"]'),
            state_Dropdown: poPage.locator('//select[@formcontrolname="state"]'),
            property_Name_Input: poPage.locator('//input[@formcontrolname="propertyName"]'),
            property_Type_Dropdown: poPage.locator('//select[@formcontrolname="propertyType"]'),
            next_Button: poPage.locator('//button[@data-locator="save-info-to-move-next"]'),
            unit_Name_input: poPage.locator('//input[@formcontrolname="unitName"]'),
            next_Button_UnitDetails: poPage.locator('//button[@data-id="save-info-to-move-next"]'),
            // .first() matters: some POs have several bank accounts on this radio group, which
            // makes an unscoped locator a strict mode violation.
            bank_Account_selection: poPage.locator('//input[@name="deposit"]').first(),
            save_Button_Property_Setting: poPage.locator('//button[@data-locator="save-info-to-move-next"]'),
        };

        this.lease_TermDetails = {
            nextButton_AddLeaseTermDetails: poPage.locator('#start-adding-lease'),
            m2m_Lease_Type_RadioButton: poPage.locator('//label[@for="lease-radio-month"]'),
            next_Button_LeaseTermDetails: poPage.locator('#lease-next'),
            rent_Amount_Input: poPage.locator('//input[@name="amount"]'),
            due_On_Date_Dropdown: poPage.locator('//select[@name="dueOnMonthly"]'),
            // Only rendered once a due-on day is chosen.
            first_Invoice_Date_Input: poPage.locator('//select[@name="firstRentalInvoiceDate"]'),
        };

        this.add_TenantDetails = {
            add_Tenant_Button: poPage.locator('#next-add-tenant'),
            // Absent on the HOA/owner variant of the wizard, which renders an empty tenant row
            // instead of asking you to add one.
            add_New_Tenant_Button: poPage.locator('#add-new-tenant'),
            fname_Input: poPage.locator('//input[@placeholder="First Name"]').first(),
            lname_Input: poPage.locator('//input[@placeholder="Last Name"]').first(),
            email_Input: poPage.locator('//input[@placeholder="Email"]').first(),
            phone_Input: poPage.locator('#phone-number-filed'),
            application_Screening_Dropdwon: poPage.locator('#select-pack select').first(),
            next_Button_TenantDetails: poPage.locator('#sign-lease-next'),
        };

        this.finalize_Lease = {
            // The standard wizard opens on "Sign a lease through Innago", which wants a lease
            // template and issues a signable lease - not what this flow is testing. Switching to
            // the offline path is what reveals Confirm & Invite. Matched on a substring that
            // avoids the apostrophe in "I don't need to sign a lease through Innago". The
            // HOA/owner variant has no such choice and shows the offline panel immediately.
            skip_Signing_Button: poPage.locator('button:has-text("need to sign a lease through Innago")').first(),
            // Optional even on the offline panel.
            offline_Signature_Checkbox: poPage.locator('#upload-signed-lease'),
            confirm_Invite_Button: poPage.locator('#done-btn'),
        };

        // The wizard throws a full-screen spinner up between steps, and it swallows clicks.
        this.po_Loader = poPage.locator('div.loader-animation-wrapper');

        // Yopmail nests the inbox in iframes: #ifinbox is the message list, #ifmail the body
        // of the message currently open.
        this.tenant_Inbox = {
            first_Message: tenantPage.frameLocator('#ifinbox').locator('button.lm').first(),
            mail_Body: tenantPage.frameLocator('#ifmail').locator('body'),
            mail_Links: tenantPage.frameLocator('#ifmail').locator('a'),
        };

        this.setPassword_Page = {
            new_Password_Input: tenantPage.locator('//input[@name="Password"]'),
            confirm_Password_Input: tenantPage.locator('//input[@name="ConfirmPassword"]'),
            submit_Button: tenantPage.locator('#signin-button'),
        };

        this.tenantPortal_Header = {
            profile_Menu: tenantPage.locator('div.tenant-header-profile'),
            logout_Link: tenantPage.locator('//a[normalize-space()="Logout"]'),
            tenant_Name: tenantPage.locator('p.tenant-name').first(),
        };

        // The "YOUR PROPERTIES" card in the sidebar - the lease the tenant is on.
        this.tenantPortal_LeasedProperty = {
            card: tenantPage.locator('div.rented-prop-info'),
            property_Name: tenantPage.locator('div.rented-prop-info h4'),
            unit_Name: tenantPage.locator('div.rented-prop-info p'),
        };

        this.tenantPortal_Dashboard = {
            getInvoiceRowByAmount: (amount) => tenantPage.locator('table tbody tr').filter({ hasText: amount }).first(),
        };

        this.tenantPortal_Menu = {
            lease_And_Files: tenantPage.locator('img[alt="Lease & Files"]:visible').first(),
        };

        this.tenantPortal_Documents = {
            property_Detail_Info: tenantPage.locator('div.property-detail-info').first(),
            property_Detail_Wrap: tenantPage.locator('div.property-detail-wrap'),
        };
    }

    /**
     * Both portals sign in through the same Auth0 tenant, so these locators are identical -
     * only the page they are bound to differs.
     */
    static buildSignInLocators(page) {
        return {
            email_Input: page.locator('#username'),
            password_Input: page.locator('#password'),
            continue_Button: page.locator('button[data-action-button-primary="true"]'),
            // "Log In Faster on This Device" - WebAuthn passkey enrolment, shown to new accounts.
            // Snooze it rather than refusing: "Not on this device" (value="refuse-add-device")
            // sends the whole login back to the identifier page.
            snooze_Passkey_Button: page.locator('button[value="snooze-enrollment"]'),
            // "Authorize Innago QA App" - first-time OAuth consent.
            accept_Consent_Button: page.locator('button[value="accept"]'),
            email_Mfa_Heading: page.locator('text=Verify Your Identity'),
            // The "We've Updated Our Terms and Conditions" dialog.
            legal_Accept_Button: page.locator('#legal-accept-accept-btn'),
            legal_Document_Pane: page.locator('div.tw-fixed.tw-inset-0 div.tw-overflow-y-auto'),
        };
    }

    async signInAsPo(email, password) {
        await this.signIn(this.poPage, this.poSignIn, email, password);
    }

    async signInAsTenant(email, password) {
        await this.signIn(this.tenantPage, this.tenantSignIn, email, password);
    }

    async signIn(page, locators, email, password) {
        // Reaching the identifier page is a multi-hop redirect (qa-my -> qa-auth -> identify-qa)
        // and a hop still in flight blocks locator resolution, so settle the URL before waiting
        // on the field itself.
        await page.waitForURL(/\/u\/login|\/login/, { timeout: 60000 }).catch(() => {});
        await locators.email_Input.waitFor({ state: 'visible', timeout: 60000 });
        await locators.email_Input.fill(email);
        await locators.continue_Button.click();

        await locators.password_Input.waitFor({ state: 'visible', timeout: 15000 });
        await locators.password_Input.fill(password);
        await locators.continue_Button.click();

        await this.clearSignInInterstitials(page, locators, email);
        await page.waitForURL((url) => url.toString().includes('/dashboard'), { timeout: 60000 });
    }

    /**
     * Each interstitial appears at most once, but the order is not guaranteed, so react to
     * whichever is on screen until the portal itself loads.
     */
    async clearSignInInterstitials(page, locators, email) {
        for (let step = 0; step < 6; step++) {
            if (/\/dashboard/.test(page.url())) {
                return;
            }
            if (await locators.snooze_Passkey_Button.isVisible().catch(() => false)) {
                await locators.snooze_Passkey_Button.click();
            } else if (await locators.accept_Consent_Button.isVisible().catch(() => false)) {
                await locators.accept_Consent_Button.click();
            } else if (await locators.email_Mfa_Heading.isVisible().catch(() => false)) {
                // Some accounts are challenged with an emailed code from some networks but not
                // from CI. Fail with the reason rather than timing out on waitForURL.
                throw new Error(`${email} was served an email MFA challenge; this spec cannot complete that step`);
            }
            await page.waitForTimeout(2500);
        }
    }

    /**
     * The QA environment floats a third-party support chat (Readyly) over the page, and its
     * drag handle sits on top of the left nav, so it intercepts the Properties click. It has
     * nothing to do with anything under test, so keep it hidden.
     *
     * addInitScript so it survives every navigation and reload in the flow.
     *
     * Note this only hides the chat. The "Terms and Conditions" dialog is deliberately NOT
     * removed the same way: the app gates routing on its own pending-legal state, so
     * detaching the node client-side leaves the dialog invisible but the router still
     * refusing to move - the nav goes dead and every later step fails. That one has to be
     * cleared through the app, in dismissLegalOverlay().
     */
    static async suppressSupportChatWidget(page) {
        await page.addInitScript(() => {
            const hide = () => {
                const style = document.createElement('style');
                style.textContent = '#fasttrack-assist-root { display: none !important; }';
                document.head?.appendChild(style);
            };
            if (document.head) {
                hide();
            } else {
                document.addEventListener('DOMContentLoaded', hide);
            }
        });
    }

    /**
     * Get past the "We've Updated Our Terms and Conditions" dialog, which otherwise
     * intercepts every click on the dashboard and, worse, leaves the router refusing to move
     * even if you hide the overlay - so the left nav silently goes dead.
     *
     * Two things are non-obvious about this dialog:
     *   - Accept is gated on reading: it carries aria-disabled="true" (the `disabled`
     *     property stays false) until the document pane has been scrolled to the end.
     *   - More than one document can be queued, and the dialogs stack. The earlier one in
     *     DOM order sits *behind* the later one, so only .last() is actually clickable.
     *
     * The documents QA publishes here are explicitly sample text ("SAMPLE DOCUMENT - NOT
     * LEGALLY BINDING", generated to exercise the legal-documents flow), so accepting in the
     * QA environment is safe. Scoped to #legal-accept-accept-btn rather than a generic modal
     * button, since the app reuses ids across unrelated dashboard buttons.
     */
    async dismissLegalOverlay(page, locators) {
        const appeared = await locators.legal_Accept_Button.first()
            .waitFor({ state: 'attached', timeout: 15000 })
            .then(() => true)
            .catch(() => false);
        if (!appeared) {
            return;
        }

        for (let document = 0; document < 4; document++) {
            if ((await locators.legal_Accept_Button.count()) === 0) {
                return;
            }

            await locators.legal_Document_Pane
                .evaluateAll((panes) =>
                    panes.forEach((pane) => {
                        pane.scrollTop = pane.scrollHeight;
                        pane.dispatchEvent(new Event('scroll', { bubbles: true }));
                    }),
                )
                .catch(() => {});
            await page.waitForTimeout(500);

            await locators.legal_Accept_Button.last().click({ timeout: 10000 }).catch(() => {});
            await page.waitForTimeout(2500);
        }
    }

    async dismissLegalOverlayForPo() {
        await this.dismissLegalOverlay(this.poPage, this.poSignIn);
    }

    async dismissLegalOverlayForTenant() {
        await this.dismissLegalOverlay(this.tenantPage, this.tenantSignIn);
    }

    /**
     * The first click on the left nav after login often does not route - the dashboard just
     * stays put - so retry rather than dying 30s later on a missing button. Deep-linking
     * straight to /properties/list is not an option: a hard load of that URL bounces back to
     * /dashboard.
     */
    async navigateToPropertiesPage() {
        for (let attempt = 1; attempt <= 3; attempt++) {
            await this.poNav.properties.waitFor({ state: 'visible', timeout: 15000 });
            await this.poNav.properties.click();

            const opened = await this.addPropertyDetails.addProperty_Button
                .waitFor({ state: 'visible', timeout: 20000 })
                .then(() => true)
                .catch(() => false);
            if (opened) {
                return;
            }
            console.log(`Properties list did not open on attempt ${attempt}, retrying`);
        }

        throw new Error('Properties list did not open after 3 attempts');
    }

    /**
     * The lease wizard covers the page with a spinner between steps and it intercepts clicks,
     * so wait it out rather than letting the click burn its whole timeout retrying.
     */
    async waitForPoLoader() {
        await this.po_Loader.first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    }

    async createPropertyWithGivenDetails(property) {
        await this.addPropertyDetails.addProperty_Button.click();
        await this.poPage.waitForTimeout(1500);
        await this.addPropertyDetails.addressCollapse_Icon.click();
        await this.addPropertyDetails.addressLine1_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.addPropertyDetails.addressLine1_Input.fill(property.addressLine1);
        await this.addPropertyDetails.city_Input.fill(property.city);
        await this.addPropertyDetails.zipCode_Input.fill(property.zip.toString());
        await this.addPropertyDetails.state_Dropdown.selectOption({ label: property.state });
        await this.addPropertyDetails.closeAddressCollapse_Icon.click();
        await this.poPage.waitForTimeout(1000);
        await this.addPropertyDetails.property_Name_Input.fill(property.name);
        await this.addPropertyDetails.property_Type_Dropdown.selectOption({ label: property.type });
        await this.poPage.waitForTimeout(1000);
        await this.addPropertyDetails.next_Button.click();

        await this.addPropertyDetails.unit_Name_input.waitFor({ state: 'visible', timeout: 15000 });
        await this.addPropertyDetails.unit_Name_input.fill(property.unit);
        await this.poPage.waitForTimeout(1000);
        await this.addPropertyDetails.next_Button_UnitDetails.click();

        await this.addPropertyDetails.bank_Account_selection.waitFor({ state: 'visible', timeout: 15000 });
        await this.addPropertyDetails.bank_Account_selection.click();
        await this.poPage.waitForTimeout(1000);
        await this.addPropertyDetails.save_Button_Property_Setting.click();
        await this.lease_TermDetails.nextButton_AddLeaseTermDetails.waitFor({ state: 'visible', timeout: 20000 });

        return property;
    }

    async addM2MLeaseAndInviteTenant(tenant, rentAmount) {
        await this.lease_TermDetails.nextButton_AddLeaseTermDetails.click();
        await this.poPage.waitForTimeout(2000);
        await this.lease_TermDetails.m2m_Lease_Type_RadioButton.click();
        await this.poPage.waitForTimeout(1500);
        await this.lease_TermDetails.next_Button_LeaseTermDetails.click();
        await this.poPage.waitForTimeout(2000);
        await this.lease_TermDetails.rent_Amount_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.lease_TermDetails.rent_Amount_Input.fill(rentAmount);
        await this.poPage.waitForTimeout(1000);
        await this.lease_TermDetails.due_On_Date_Dropdown.selectOption({ index: 1 });
        await this.poPage.waitForTimeout(1000);
        await this.lease_TermDetails.first_Invoice_Date_Input.selectOption({ index: 1 });
        await this.poPage.waitForTimeout(2000);

        await this.add_TenantDetails.add_Tenant_Button.click();
        if (await this.add_TenantDetails.add_New_Tenant_Button.isVisible({ timeout: 15000 }).catch(() => false)) {
            await this.add_TenantDetails.add_New_Tenant_Button.click();
        }

        await this.add_TenantDetails.fname_Input.waitFor({ state: 'visible', timeout: 15000 });
        await this.poPage.waitForTimeout(1500);
        await this.add_TenantDetails.fname_Input.fill(tenant.fname);
        await this.poPage.waitForTimeout(500);
        await this.add_TenantDetails.lname_Input.fill(tenant.lastname);
        await this.poPage.waitForTimeout(500);
        await this.add_TenantDetails.email_Input.fill(tenant.email);
        await this.poPage.waitForTimeout(500);
        await this.add_TenantDetails.phone_Input.fill(tenant.phone);
        await this.poPage.waitForTimeout(1000);
        await this.add_TenantDetails.application_Screening_Dropdwon.selectOption({ label: 'Not Required' });
        await this.poPage.waitForTimeout(2000);
        await this.add_TenantDetails.next_Button_TenantDetails.click();
        await this.poPage.waitForTimeout(2000);

        await this.waitForPoLoader();
        if (await this.finalize_Lease.skip_Signing_Button.isVisible({ timeout: 15000 }).catch(() => false)) {
            await this.finalize_Lease.skip_Signing_Button.click();
            await this.poPage.waitForTimeout(2000);
        }

        if (await this.finalize_Lease.offline_Signature_Checkbox.isVisible({ timeout: 15000 }).catch(() => false)) {
            await this.finalize_Lease.offline_Signature_Checkbox.click();
            await this.poPage.waitForTimeout(1000);
        }

        await this.finalize_Lease.confirm_Invite_Button.waitFor({ state: 'visible', timeout: 15000 });
        await this.waitForPoLoader();
        await this.finalize_Lease.confirm_Invite_Button.click({ timeout: 30000 });
        await this.poPage.waitForURL(/\/lease\/list/, { timeout: 30000 });

        return tenant;
    }

    async openTenantInbox(tenantEmail) {
        const inboxName = tenantEmail.split('@')[0];
        await this.tenantPage.goto(`${YOPMAIL_INBOX_URL}${inboxName}`, { waitUntil: 'domcontentloaded' });

        // The newest message opens automatically when it is the only one, but click the first
        // row anyway so this still works once the inbox has history in it.
        await this.tenant_Inbox.first_Message.click({ timeout: 5000 }).catch(() => {});
    }

    /**
     * Poll the tenant's yopmail inbox until the activation link turns up, then return it
     * along with the body text it came from, so the caller can assert on what the mail said.
     *
     * The suite has no mail credentials and Innago's API is not exposed to these tests, but
     * every tenant address the framework generates is already @yopmail.com - a public
     * throwaway inbox that needs no login. So the invite is read the same way a person would
     * read it, in a browser, with no new dependency or secret. Yopmail has no refresh we can
     * trust, so each attempt re-navigates.
     */
    async waitForActivationEmail(tenantEmail, { attempts = 30, intervalMs = 6000 } = {}) {
        for (let attempt = 1; attempt <= attempts; attempt++) {
            await this.openTenantInbox(tenantEmail);

            // Opening a message swaps the contents of the #ifmail frame, so let its links show
            // up before reading them - otherwise a slow frame reads as an empty inbox.
            await this.tenant_Inbox.mail_Links.first().waitFor({ state: 'attached', timeout: 5000 }).catch(() => {});

            const hrefs = await this.tenant_Inbox.mail_Links.evaluateAll((anchors) => anchors.map((a) => a.href)).catch(
                () => [],
            );
            const activationLink = extractActivationLink(hrefs);
            if (activationLink) {
                console.log(`Activation email found for ${tenantEmail} on attempt ${attempt}`);
                return { body: await this.tenant_Inbox.mail_Body.innerText(), activationLink };
            }

            console.log(`No activation email for ${tenantEmail} yet (attempt ${attempt}/${attempts})`);
            await this.tenantPage.waitForTimeout(intervalMs);
        }

        throw new Error(`No Innago activation link reached ${tenantEmail} after ${attempts} attempts`);
    }

    /**
     * Follow the activation link from the invite email and set the account password. Setting
     * it logs the tenant straight in, so this lands on the portal dashboard.
     */
    async activateTenantAccount(activationLink, password) {
        await this.tenantPage.goto(activationLink, { waitUntil: 'domcontentloaded' });

        await this.setPassword_Page.new_Password_Input.waitFor({ state: 'visible', timeout: 30000 });

        // This form is typed into rather than filled. fill() sets the DOM value in one shot and
        // the Angular form control never picks it up, so the submit comes back with both boxes
        // flagged "Password is required" even though the inputs visibly hold text.
        // pressSequentially sends real key events, which the form does register.
        //
        // The pause first lets the form finish the re-render it does just after appearing,
        // which would otherwise wipe whatever was typed before it.
        await this.tenantPage.waitForTimeout(2000);

        for (let attempt = 0; attempt < 3; attempt++) {
            await this.setPassword_Page.new_Password_Input.click();
            await this.setPassword_Page.new_Password_Input.pressSequentially(password, { delay: 50 });
            await this.setPassword_Page.confirm_Password_Input.click();
            await this.setPassword_Page.confirm_Password_Input.pressSequentially(password, { delay: 50 });
            await this.tenantPage.waitForTimeout(1000);

            const newValue = await this.setPassword_Page.new_Password_Input.inputValue().catch(() => '');
            const confirmValue = await this.setPassword_Page.confirm_Password_Input.inputValue().catch(() => '');
            if (newValue === password && confirmValue === password) {
                break;
            }

            await this.setPassword_Page.new_Password_Input.clear().catch(() => {});
            await this.setPassword_Page.confirm_Password_Input.clear().catch(() => {});
        }

        await this.setPassword_Page.submit_Button.click();

        await this.tenantPage.waitForURL((url) => url.toString().includes('/dashboard'), { timeout: 60000 });
        return this.tenantPage.url();
    }

    async logoutTenant() {
        await this.tenantPortal_Header.profile_Menu.click();
        await this.tenantPortal_Header.logout_Link.click();
        await this.tenantPage.waitForURL(/logout=true|\/login/, { timeout: 30000 });
    }

    /**
     * The lease is real only if it is both listed and already billing, so check the property
     * card, the tenant's own name, and the first rental invoice for the agreed rent.
     */
    async validateLeaseIsVisibleToTenant(property, tenant, rentAmount) {
        await this.tenantPortal_LeasedProperty.card.waitFor({ state: 'visible', timeout: 30000 });

        await expect(this.tenantPortal_LeasedProperty.property_Name).toHaveText(property.name);
        await expect(this.tenantPortal_LeasedProperty.unit_Name).toHaveText(property.unit);
        await expect(this.tenantPortal_Header.tenant_Name).toContainText(tenant.fname, { ignoreCase: true });
        await expect(this.tenantPortal_Dashboard.getInvoiceRowByAmount(`$${rentAmount}.00`)).toBeVisible();
    }

    async validatePropertyDetailsOnDocumentsPage(property) {
        await this.tenantPortal_Menu.lease_And_Files.click();
        await this.tenantPage.waitForURL(/\/document\//, { timeout: 30000 });

        await expect(this.tenantPortal_Documents.property_Detail_Info).toContainText(property.unit);
        await expect(this.tenantPortal_Documents.property_Detail_Wrap).toContainText(property.addressLine1);
    }
}
