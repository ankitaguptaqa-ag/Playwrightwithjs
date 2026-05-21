import {test,expect} from '@playwright/test';
import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
import { userData } from '../../../mocks/common/userData.js';

const po1 = userData.env.qa.poUsers.po1;

test.describe('Property Owner Login Tests', () => {
    test.describe.configure({ mode: 'serial' });
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
    });

    test('should login successfully and land on dashboard', async ({ page }) => {
        await loginPage.login(po1.userName, po1.password);
        await expect(page).toHaveURL(/dashboard/);
    });

    test('should logout successfully and return to login page', async ({ page }) => {
        await loginPage.login(po1.userName, po1.password);
        await expect(page).toHaveURL(/dashboard/);
        await loginPage.logout();
        await expect(page).toHaveURL(/qa-auth/);
        await expect(page.locator('#username')).toBeVisible();
    });

});