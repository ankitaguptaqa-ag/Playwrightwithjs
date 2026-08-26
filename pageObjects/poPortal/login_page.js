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
        // QA server sometimes bounces through a slow multi-hop redirect chain before
        // landing on the dashboard - 60s gives it enough room without masking real failures
        await this.page.waitForURL((url) => url.toString().includes('dashboard'),{timeout : 60000});
        await this.dismissBlockingModal();
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


}