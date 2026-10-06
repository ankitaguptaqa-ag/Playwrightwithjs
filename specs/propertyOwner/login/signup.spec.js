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

        // signUpAsLandlord pins the phone country to United States, so this has to be a valid
        // NANP number - the old 9876543210 is an Indian format and is rejected there. 330 is
        // the area code covering Hudson, which keeps it consistent with the address below.
        const phone = '3302345678';

        await loginPage.signUpAsLandlord({
            email,
            password: 'Pass@123',
            firstName,
            lastName,
            phone,
            noOfRentals: '1',
            businessName: `${firstName} ${lastName} Rentals`,
            businessEmail: email,
            businessPhone: phone,
            addressLine1: '123 Automation St',
            city: 'Hudson',
            state: 'Ohio',
            zip: '44236',
        });

        await expect(page).toHaveURL(/dashboard/);
        await expect(page.locator('p').filter({ hasText: `${firstName} ${lastName}` }).first()).toBeVisible();
    });

});
