import { expect } from '@playwright/test';


export class MenuPage {
    constructor(page) {
        this.page = page;


        this.property = page.locator('//span[text() = "Properties "]');
        this.poName = page.locator('//nav-menu/div/div/div[2]/div[2]/p');
        this.profile = page.locator('//a[@title="Profile"]');
        this.dashboard = page.locator('li[id="nav-dash"]>a[href="/Landlord/dashboard"]');
        this.tenant = page.locator('li[id="nav-tenant"]>a>img');
        this.application = page.locator('li[id="nav-applications"]>a');
        this.leaseAndFiles = page.locator('li[id="nav-leases"]>a>img');
        this.incomes = page.locator('li[id="nav-invoices"]>a>img');
        this.expenses = page.locator('img[alt="expenses"]');
        this.maintenance = page.locator('li[id="nav-maintenance"]>a>img');
        this.messaging = page.locator('li[id="nav-messaging"]>a>img');
        this.listing = page.locator('img[alt="listing"]');
        this.users = page.locator('img[alt="users"]');
        this.settings = page.locator('img[alt="settings"]');
        this.reports = page.locator('img[alt="report"]');
        this.confirmationYes = page.locator('button[id="confirmation-yes"]');
        this.confirmationNo = page.locator('button[id="confirmation-no"]');
        this.moduleByText = (moduleName) => page.locator(`//span[text()="${moduleName} "]`);
    }


    async waitForDashboardLoad() {
        await expect(this.dashboard).toBeVisible();
        await expect(this.page.locator('#add-tenant')).toBeVisible({ timeout: 20000 });
    }


    async navigateToExpensePage() {
        // Nav icon is always rendered after login — 5 s is plenty
        await this.expenses.waitFor({ state: 'visible', timeout: 5000 });
        await this.expenses.scrollIntoViewIfNeeded();
        await this.expenses.click();
        // Wait for page content: "Add Expense" button confirms the expense list has rendered.
        // 30 s handles slow QA server responses without making each beforeEach unnecessarily long.
        await this.page
            .locator('//span[contains(text()," Add Expense")]')
            .waitFor({ state: 'visible', timeout: 30000 });
    }


    async navigateToPropertyPage() {
        await this.property.waitFor({ state: 'visible', timeout: 15000 });
        await this.property.click();
        await this.page.locator('#add-property').waitFor({ state: 'visible', timeout: 15000 });
    }


    async getPOName() {
        return await this.poName.textContent();
    }



    async navigateToDashboard() {
        await this.page.waitForTimeout(1000);
        if (await this.confirmationYes.isVisible()) {
            await this.confirmationYes.click();
        }
        await this.dashboard.click();
        await this.page.waitForTimeout(1000);
        if (await this.confirmationYes.isVisible()) {
            await this.confirmationYes.click();
        }
        await this.page.locator('//h3[text()="Collection Stats"]').waitFor({ state: 'visible' });
        await this.page.waitForTimeout(2000);
    }


    async navigateToProfilePage() {
        await this.profile.click();
        await this.page.waitForTimeout(3000);
    }



    async navigateToTenantPage() {
        await this.tenant.click();
        await this.page.locator('in-icon[id="filter-icon-tenant-list"]').waitFor({ state: 'visible' });
        await this.page.waitForTimeout(5000);
    }


    async navigateToApplicationPage() {
        await this.application.click();
        await this.page.waitForTimeout(3000);
    }


    async navigateToLeaseAndFilesPage() {
        await this.leaseAndFiles.click();
        await this.page.waitForTimeout(2000);
    }


    async navigateToIncomesPage() {
        await this.incomes.click();
        await this.page.waitForURL(/invoices/, { timeout: 15000 });
    }



    async navigateToMaintenancePage() {
        await this.maintenance.click();
        await this.page.waitForTimeout(3000);
    }


    async navigateToMessagingPage() {
        await this.messaging.click();
        await this.page.waitForTimeout(3000);
    }


    async navigateToListingPage() {
        await this.listing.click();
        await this.page.waitForTimeout(3000);
    }


    async navigateToUsersPage() {
        await this.users.click();
        await this.page.locator('button[data-locator="addNewUser"]').waitFor({ state: 'visible' });
        await this.page.waitForTimeout(3000);
    }


    async navigateToSettingsPage() {
        await this.settings.click();
        await this.page.waitForTimeout(3000);
        await expect(this.page).toHaveURL(/\/Landlord\/setting/);
    }


    async navigateToReportsPage() {
        await this.reports.click();
        await this.page.waitForTimeout(3000);
    }
}



