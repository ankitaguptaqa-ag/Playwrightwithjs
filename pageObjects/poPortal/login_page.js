export class LoginPage {
    constructor(page) {
        this.page = page;
        
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[data-action-button-primary="true"]');
        this.logoutButton = page.locator('img[alt="logout"]');

        // Scoped to the modal's own id rather than a generic modal button, since the app
        // reuses ids across unrelated dashboard buttons.
        this.legalAcceptButton = page.locator('#legal-accept-accept-btn');
        this.legalDocumentPane = page.locator('div.tw-fixed.tw-inset-0 div.tw-overflow-y-auto');
        this.blockingOverlay = page.locator('div.tw-fixed.tw-inset-0:visible');

        // --- Sign Up (create a new landlord account) ---
        // The identifier page's own email field has id="email" - #username above is only the
        // login form's id, so this needs its own locator rather than reusing emailInput.
        this.signUpLink = page.locator('a:has-text("Sign up")');
        this.signUpEmailInput = page.locator('#email');
        this.marketingConsentCheckbox = page.locator('#marketing-consent');
        this.verificationCodeInput = page.locator('#code');

        // Everything past the password step is rendered by Auth0's Forms product (the
        // "how will you use Innago / personal info / business info" questionnaire), a
        // different system from the Universal Login screens above. It never removes a
        // finished step from the DOM - it just stops it being visible - so every locator here
        // has to stay unique against the whole accumulated page, not just the current step.
        this.wizardContinueButton = page.locator('button.af-nextButton').last();
        this.landlordTypeCard = page.locator('label:has(img[alt="Landlord"])');
        this.firstNameInput = page.locator('input[name="first_name"]');
        this.lastNameInput = page.locator('input[name="last_name"]');
        this.phoneNumberInput = page.locator('input[name="phone_number"]');
        this.noOfRentalsInput = page.locator('input[name="no_of_rentals"]');
        this.businessNameInput = page.locator('input[name="business_name"]');
        // Has neither a name nor an id - it's the only email-type input the wizard ever renders.
        this.businessEmailInput = page.locator('input.af-stringField-input[type="email"]');
        this.businessPhoneInput = page.locator('input[name="business_phone"]');
        this.addressLine1Input = page.locator('input[name="address_line1"]');
        this.cityInput = page.locator('input[placeholder="Enter your city"]');
        this.stateSearchInput = page.locator('input.af-dropdownField-search');
        // Also unnamed - it's the only input capped at 10 characters on the address step.
        this.zipInput = page.locator('input.af-stringField-input[maxlength="10"]');

        // Interstitials Auth0 can raise between the password step and the dashboard. They
        // show up on a first-time account after the sign-up wizard, but also on an ordinary
        // sign-in, which is why clearSignInInterstitials() below leans on them too.
        this.snoozePasskeyButton = page.locator('button[value="snooze-enrollment"]');
        this.acceptConsentButton = page.locator('button[value="accept"]');
        this.emailMfaHeading = page.locator('text=Verify Your Identity');
    }

    async logout(){
        // if login never actually succeeded (e.g. beforeAll timed out), there's
        // nothing to log out of - skip instead of throwing a second, confusing error
        const isLoggedIn = await this.logoutButton.isVisible().catch(() => false);
        if (!isLoggedIn) {
            return;
        }

        // a previous test may have left an open dropdown panel behind
        await this.page.keyboard.press('Escape').catch(() => {});

        // A test that fails with the Income filter panel open leaves a full-viewport
        // div.filter-overlay behind, and it swallows the logout click ("subtree intercepts
        // pointer events"), turning one failure into two. Escape does not dismiss this
        // particular overlay - clicking it does, but only near a corner: its centre is
        // covered by the filter form sitting on top of it.
        const filterOverlay = this.page.locator('div.filter-overlay');
        if (await filterOverlay.isVisible().catch(() => false)) {
            await filterOverlay.click({ position: { x: 5, y: 5 } }).catch(() => {});
            await filterOverlay.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
        }

        await this.logoutButton.click({ timeout: 15000 });

        // Signing out hops through the app's auth host on the way to Auth0's universal login:
        //   /dashboard -> qa-auth.innago.com/login?logout=true
        //              -> identify-qa.innago.com/u/login/identifier?state=...   (settles here)
        //
        // qa-auth is only a staging post, so waiting on it returned while the browser was
        // still moving, and a caller asserting the URL straight afterwards raced the next
        // redirect. Wait for the login form instead: it is on the page the browser actually
        // settles on, and it proves the session is gone rather than that a URL flashed by.
        //
        // Deliberately not throwing when it never arrives. Sometimes the app comes straight
        // back to /dashboard instead, which would mean the sign-out did not clear the Auth0
        // session at all - that is worth a test failing over, but it is the spec's assertion
        // to make, not this helper's. Swallowing it here also keeps fixture teardown, which
        // calls logout() on a session it is about to discard anyway, from paying 30s for a
        // diagnosis nobody reads.
        await this.emailInput.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});

    }

    async login(email, password) {
        await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.emailInput.fill(email);
        await this.loginButton.click();
        await this.passwordInput.waitFor({state : 'visible' , timeout : 10000});
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await this.clearSignInInterstitials(email);

        // QA server sometimes bounces through a slow multi-hop redirect chain before
        // landing on the dashboard - 60s gives it enough room without masking real failures
        try {
            await this.page.waitForURL((url) => url.toString().includes('dashboard'), { timeout: 60000 });
        } catch (error) {
            // A bare "waitForURL timed out" says nothing about which hop stalled, and the hop
            // is the whole diagnosis: still on identify-qa means the credentials never took,
            // whereas parked on qa-auth with a ?code= in the URL means Auth0 authenticated
            // fine and it is the handoff back to the portal that died. Name the URL so the CI
            // log answers that without anyone opening a trace.
            throw new Error(
                `${email} signed in but never reached the dashboard - still on ${this.page.url()} after 60s (${error.message})`,
            );
        }
        await this.dismissBlockingModal();
    }

    /**
     * Auth0 can put one-off screens between the password step and the dashboard: a passkey
     * enrolment offer, a consent screen, or an emailed MFA code. Each appears at most once and
     * the order is not guaranteed, so react to whichever is on screen until the portal loads.
     *
     * This mirrors clearSignInInterstitials() in pageObjects/e2e/poTenantE2E_page.js, which has
     * handled the e2e sign-in this way all along - keep the two in step. login() did not, so an
     * interstitial surfaced here only as a 60s waitForURL timeout with nothing to say about what
     * was on screen. That is how CI failed on 2026-09-06: the sign-in stalled, and because
     * poSession is worker-scoped it took the whole worker with it - 6 failed, 11 never ran.
     */
    async clearSignInInterstitials(email) {
        for (let step = 0; step < 6; step++) {
            if (this.page.url().includes('dashboard')) {
                return;
            }
            if (await this.snoozePasskeyButton.isVisible().catch(() => false)) {
                await this.snoozePasskeyButton.click().catch(() => {});
            } else if (await this.acceptConsentButton.isVisible().catch(() => false)) {
                await this.acceptConsentButton.click().catch(() => {});
            } else if (await this.emailMfaHeading.isVisible().catch(() => false)) {
                // Some accounts are challenged with an emailed code from some networks but not
                // others. Fail with the reason rather than timing out on waitForURL. Retrying
                // this is pointless - see the guard in poSession.
                throw new Error(`${email} was served an email MFA challenge; this spec cannot complete that step`);
            }
            await this.page.waitForTimeout(2500);
        }
    }

    /**
     * The dashboard can come up behind a full-viewport modal that swallows every click after
     * login - the "We've Updated Our Terms and Conditions" acceptance dialog, which QA raises
     * whenever sample legal documents are published (it took out the whole suite on
     * 2026-08-03: every test failed on "subtree intercepts pointer events").
     *
     * This used to reload the page instead of accepting, on the reasoning that recording a
     * legal acceptance isn't a test's decision to make. Two things since disproved that:
     *
     *   - The reload doesn't work. CI run #49 on 2026-08-24 failed income, expenses and
     *     propertyMS with the backdrop still intercepting the left-nav click, 24 times over.
     *     Hiding the overlay isn't enough either - per the e2e page object, the router then
     *     refuses to move and the left nav silently goes dead. It has to be cleared through
     *     the app.
     *   - The documents QA publishes here are explicitly sample text ("SAMPLE DOCUMENT - NOT
     *     LEGALLY BINDING", generated to exercise the legal-documents flow), so accepting in
     *     the QA environment is safe.
     *
     * So this now does what dismissLegalOverlay() in pageObjects/e2e/poTenantE2E_page.js has
     * been doing successfully all along, and the two should be kept in step. Two things are
     * non-obvious about the dialog:
     *   - Accept is gated on reading: it carries aria-disabled="true" (the `disabled`
     *     property stays false) until the document pane has been scrolled to the end.
     *   - More than one document can be queued, and the dialogs stack. The earlier one in
     *     DOM order sits *behind* the later one, so only .last() is actually clickable.
     */
    async dismissBlockingModal() {
        // 'attached' rather than 'visible': the button is in the DOM before the dialog has
        // finished animating in. 15s because the modal is fetched asynchronously a moment
        // after the dashboard renders - the old 8s window was being outlived by it.
        const appeared = await this.legalAcceptButton
            .first()
            .waitFor({ state: 'attached', timeout: 15000 })
            .then(() => true)
            .catch(() => false);
        if (!appeared) {
            return;
        }

        for (let document = 0; document < 4; document++) {
            if ((await this.legalAcceptButton.count()) === 0) {
                break;
            }

            await this.legalDocumentPane
                .evaluateAll((panes) =>
                    panes.forEach((pane) => {
                        pane.scrollTop = pane.scrollHeight;
                        pane.dispatchEvent(new Event('scroll', { bubbles: true }));
                    }),
                )
                .catch(() => {});
            await this.page.waitForTimeout(500);

            await this.legalAcceptButton.last().click({ timeout: 10000 }).catch(() => {});
            await this.page.waitForTimeout(2500);
        }

        // :visible matters - the app leaves empty, hidden modal wrappers in the DOM, and
        // waiting on one of those would time out while the real overlay is up
        await this.blockingOverlay.first().waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
    }

    async goToLoginPage() {
        await this.page.goto('/');
    }

    async goToSignUpPage() {
        await this.goToLoginPage();
        await this.signUpLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.signUpLink.click();
        await this.signUpEmailInput.waitFor({ state: 'visible', timeout: 30000 });
    }

    async submitSignUpEmail(email) {
        await this.signUpEmailInput.fill(email);
        await this.loginButton.click();
    }

    /**
     * Auth0 verifies a new address with an emailed 6-digit code rather than a link. Read the
     * same way waitForActivationEmail() reads the tenant invite in pageObjects/e2e/poTenantE2E_page.js:
     * open the yopmail inbox in its own tab, since every generated address is already
     * @yopmail.com and needs no login or API credentials.
     */
    async getSignUpVerificationCode(email, { attempts = 10, intervalMs = 5000 } = {}) {
        const inboxName = email.split('@')[0];
        const mailPage = await this.page.context().newPage();

        try {
            for (let attempt = 1; attempt <= attempts; attempt++) {
                await mailPage.goto(`https://yopmail.com/en/?login=${inboxName}`, { waitUntil: 'domcontentloaded' });
                // The newest message opens automatically when it is the only one, but click
                // the first row anyway so this still works once the inbox has history in it.
                await mailPage.frameLocator('#ifinbox').locator('button.lm').first().click({ timeout: 5000 }).catch(() => {});

                const codeElement = mailPage.frameLocator('#ifmail').locator('code').first();
                const arrived = await codeElement.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
                if (arrived) {
                    return (await codeElement.innerText()).trim();
                }

                await mailPage.waitForTimeout(intervalMs);
            }
            throw new Error(`No Innago verification code reached ${email} after ${attempts} attempts`);
        } finally {
            await mailPage.close();
        }
    }

    async enterVerificationCode(code) {
        await this.verificationCodeInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.verificationCodeInput.fill(code);
        await this.loginButton.click();
    }

    async setSignUpPassword(password) {
        await this.passwordInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async selectLandlordAccountType() {
        await this.landlordTypeCard.waitFor({ state: 'visible', timeout: 30000 });
        await this.landlordTypeCard.click();
        await this.wizardContinueButton.click();
    }

    async fillPersonalInfo({ firstName, lastName, phone, noOfRentals = '1' }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.phoneNumberInput.fill(phone);
        await this.noOfRentalsInput.fill(noOfRentals);
        await this.wizardContinueButton.click();
    }

    async fillBusinessContactInfo({ businessName, businessEmail, businessPhone }) {
        await this.businessNameInput.fill(businessName);
        await this.businessEmailInput.fill(businessEmail);
        await this.businessPhoneInput.fill(businessPhone);
        await this.wizardContinueButton.click();
    }

    /**
     * The state field is a searchable dropdown layered over a hidden native <select> - typing
     * into the search box doesn't actually narrow the option list, so the option is matched by
     * its exact visible text instead of relying on the search to filter down to one result.
     */
    async fillBusinessAddress({ addressLine1, city, state, zip }) {
        await this.addressLine1Input.fill(addressLine1);
        await this.cityInput.fill(city);
        await this.stateSearchInput.fill(state);
        await this.page.locator('div').filter({ hasText: new RegExp(`^${state}$`) }).first().click();
        await this.zipInput.fill(zip);
        await this.wizardContinueButton.click();
    }

    /**
     * Two one-time interstitials can follow the wizard, in no guaranteed order: a WebAuthn
     * passkey enrolment prompt (skipped headless, where there is no platform authenticator)
     * and an OAuth consent screen for the app's first-ever access to this account. Mirrors
     * clearSignInInterstitials() in pageObjects/e2e/poTenantE2E_page.js.
     */
    async clearSignUpInterstitials() {
        for (let step = 0; step < 6; step++) {
            if (this.page.url().includes('/dashboard')) {
                return;
            }
            if (await this.snoozePasskeyButton.isVisible().catch(() => false)) {
                await this.snoozePasskeyButton.click();
            } else if (await this.acceptConsentButton.isVisible().catch(() => false)) {
                await this.acceptConsentButton.click();
            }
            await this.page.waitForTimeout(2500);
        }
    }

    /**
     * Creates a brand-new landlord account end-to-end: email -> emailed verification code ->
     * password -> the "how will you use Innago / personal info / business info" wizard -> the
     * passkey/consent interstitials -> dashboard. Every email passed in must be unique - Auth0
     * refuses to sign up an address that already has a password set.
     */
    async signUpAsLandlord({
        email, password, firstName, lastName, phone, noOfRentals,
        businessName, businessEmail, businessPhone, addressLine1, city, state, zip,
    }) {
        await this.goToSignUpPage();
        await this.submitSignUpEmail(email);

        const code = await this.getSignUpVerificationCode(email);
        await this.enterVerificationCode(code);

        await this.setSignUpPassword(password);

        await this.selectLandlordAccountType();
        await this.fillPersonalInfo({ firstName, lastName, phone, noOfRentals });
        await this.fillBusinessContactInfo({ businessName, businessEmail, businessPhone });
        await this.fillBusinessAddress({ addressLine1, city, state, zip });

        await this.clearSignUpInterstitials();
        await this.page.waitForURL((url) => url.toString().includes('dashboard'), { timeout: 60000 });
        await this.dismissBlockingModal();
    }

}