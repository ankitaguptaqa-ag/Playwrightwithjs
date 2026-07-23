import { test, expect } from '@playwright/test';
import { userData } from '../../../mocks/common/userData.js';
import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
import { MenuPage } from '../../../pageObjects/poPortal/menu_page.js';
import { IncomePage } from '../../../pageObjects/poPortal/income_page.js';



test.describe.configure({ mode: 'serial' });

test.describe('Income Tests - shared login', () => {
    let sharedPage;

    
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        sharedPage = await context.newPage();

        const loginPage = new LoginPage(sharedPage);
        await loginPage.goToLoginPage();
        await loginPage.login(userData.env.qa.poUsers.po2.userName, userData.env.qa.poUsers.po2.password);
    });

    // Navigate to the income page before each test
    test.beforeEach(async () => {
        const menuPage = new MenuPage(sharedPage);
        await menuPage.navigateToIncomesPage();
    });

    
    test.afterEach(async () => {
        await sharedPage.waitForTimeout(2000);
    });

    
    test.afterAll(async () => {
        await sharedPage.close();
    });

    test('Verify that the user can start creating a new invoice', async () => {
        const incomePage = new IncomePage(sharedPage);
        await incomePage.createNewInvoice();
        await expect(incomePage.invoiceCreation.propertyDropdown).toBeVisible();
    });

    
});
