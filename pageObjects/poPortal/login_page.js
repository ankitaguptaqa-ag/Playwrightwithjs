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

        // a previous test may have left an open panel/overlay behind that would
        // block the click - closing it first keeps logout independent of that state
        await this.page.keyboard.press('Escape').catch(() => {});
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
    }

    async goToLoginPage() {
        await this.page.goto('/');
    }


}