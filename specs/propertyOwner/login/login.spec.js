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

        // Signing out settles on Auth0's universal login (identify-*), having passed through
        // the app's own auth host (qa-auth) on the way - see the redirect chain in logout().
        // Accept either, so this doesn't depend on which hop the browser happens to be on.
        await expect(page).toHaveURL(/identify-|-auth\.innago\.com/);
        // the real proof the session is gone: signing in is being asked for again
        await expect(page.locator('#username')).toBeVisible();
    });

});
