import { test, expect } from '../../../fixtures/poFixtures.js';
import { randomUtils } from '../../../utils/randomUtils.js';

test.describe('Property Owner Sign Up Tests', () => {

    // loginPage rides a fresh, logged-out browser (see login.spec.js) - signing up a brand new
    // account must not touch the shared poSession.
    test('should sign up as a new landlord and land on dashboard', async ({ page, loginPage }) => {
        // Every signup needs a never-used address - Auth0 refuses one that already has a
        // password set - so a short random yopmail address is generated per run.
        const uniqueId = `${randomUtils.randomAlphabets(3)}${randomUtils.generateRandomNumber(3)}`.toLowerCase();
        const email = `po${uniqueId}@yopmail.com`;
        const firstName = 'Test';
        const lastName = 'Automation';

        await loginPage.signUpAsLandlord({
            email,
            password: 'Pass@123',
            firstName,
            lastName,
            phone: '9876543210',
            noOfRentals: '1',
            businessName: `${firstName} ${lastName} Rentals`,
            businessEmail: email,
            businessPhone: '9876543210',
            addressLine1: '123 Automation St',
            city: 'Hudson',
            state: 'Ohio',
            zip: '44236',
        });

        await expect(page).toHaveURL(/dashboard/);
        await expect(page.locator('p').filter({ hasText: `${firstName} ${lastName}` }).first()).toBeVisible();
    });

});
