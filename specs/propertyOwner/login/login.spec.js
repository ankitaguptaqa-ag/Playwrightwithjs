import { test, expect } from '../../../fixtures/poFixtures.js';

test.describe('Property Owner Login Tests', () => {
    test.describe.configure({ mode: 'serial' });

    // loginPage is the one fixture bound to a fresh, logged-out browser - these tests are
    // about signing in, so they must not ride the shared poSession.
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage();
    });

    test('should login successfully and land on dashboard', async ({ page, loginPage, poUser }) => {
        await loginPage.login(poUser.userName, poUser.password);
        await expect(page).toHaveURL(/dashboard/);
    });

    test('should logout successfully and return to login page', async ({ page, loginPage, poUser }) => {
        await loginPage.login(poUser.userName, poUser.password);
        await expect(page).toHaveURL(/dashboard/);
        await loginPage.logout();
        await expect(page).toHaveURL(/qa-auth/);
        await expect(page.locator('#username')).toBeVisible();
    });

});
