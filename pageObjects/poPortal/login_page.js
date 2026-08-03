export class LoginPage {
    constructor(page) {
        this.page = page;
        
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[data-action-button-primary="true"]');
        this.logoutButton = page.locator('img[alt="logout"]');

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
        await this.page.waitForURL((url) => url.toString().includes('qa-auth'),{timeout : 30000});

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
     * login - most recently the "We've Updated Our Terms and Conditions" acceptance dialog,
     * which QA raises whenever sample legal documents are published (it took out the whole
     * suite on 2026-08-03: every test failed on "subtree intercepts pointer events").
     *
     * It's fetched asynchronously a moment after the dashboard renders, and shows once per
     * login, so a reload is enough to get past it for the rest of the session. Deliberately
     * not clicking the modal's Accept button: that records acceptance of a legal document
     * against the account, which isn't a test's decision to make - and the app reuses the
     * same element id on unrelated dashboard buttons, so a mis-scoped click is a real risk.
     */
    async dismissBlockingModal() {
        // :visible matters - the app leaves empty, hidden modal wrappers in the DOM, and
        // waiting on one of those would time out while the real overlay is up
        const overlay = this.page.locator('div.tw-fixed.tw-inset-0:visible');

        const appeared = await overlay
            .first()
            .waitFor({ state: 'visible', timeout: 8000 })
            .then(() => true)
            .catch(() => false);
        if (!appeared) {
            return;
        }

        await this.page.reload();
        await this.page
            .waitForURL((url) => url.toString().includes('dashboard'), { timeout: 30000 })
            .catch(() => {});
        // it also disappears on its own after a while, so allow for either
        await overlay.first().waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
    }

    async goToLoginPage() {
        await this.page.goto('/');
    }


}