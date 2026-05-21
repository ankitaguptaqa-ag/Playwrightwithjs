export class LoginPage {
    constructor(page) {
        this.page = page;
        
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[data-action-button-primary="true"]');
        this.logoutButton = page.locator('img[alt="logout"]');

    }

    async logout(){
        await this.logoutButton.waitFor({state : 'visible' , timeout : 10000});
        await this.logoutButton.click();
        await this.page.waitForURL((url) => url.toString().includes('qa-auth'),{timeout : 30000});

    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.loginButton.click();
        await this.passwordInput.waitFor({state : 'visible' , timeout : 10000});
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForURL((url) => url.toString().includes('dashboard'),{timeout : 30000});
    }

    async goToLoginPage() {
        await this.page.goto('/');
    }


}