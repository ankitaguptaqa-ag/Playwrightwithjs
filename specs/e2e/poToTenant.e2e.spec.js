import { test, expect } from '../../fixtures/e2eFixtures.js';
import { userData } from '../../mocks/common/userData.js';
import { testData } from '../../mocks/common/testData.js';
import { randomUtils } from '../../utils/randomUtils.js';

/**
 * End-to-end: property owner -> tenant, joined by a real email.
 *
 *   1. PO logs in and creates a property.
 *   2. PO adds a month-to-month lease and invites a tenant onto it.
 *   3. The invite email is read out of the tenant's yopmail inbox (see the page object for
 *      why the mail is read in a browser rather than over an API).
 *   4. The tenant follows the activation link and sets the password.
 *   5. The tenant signs in with those credentials and sees the lease they were added to.
 *
 * The PO and the tenant get their own browser contexts on purpose: both portals sign in
 * through the same Auth0 tenant, so sharing one context would have the tenant login evict
 * the PO session.
 */

test.describe.configure({ mode: 'serial' });

const RENT_AMOUNT = '200';

/**
 * Yopmail serves alternate domains that deliver into the same inbox as @yopmail.com, so the
 * mail is still read exactly the same way - only the address the app is given changes.
 *
 * Was pointed at the alternate domain 'mynes.com' between 2026-08-17 and 2026-08-23, on the
 * theory that QA had blocklisted yopmail.com specifically. Testing on 2026-08-23 ruled that
 * out: back-to-back runs delivered nothing to EITHER domain, so the alternate buys nothing
 * and this stays on the canonical yopmail.com. The blocked step is QA mail delivery itself -
 * see the note above waitForActivationEmail before debugging this constant again.
 */
const TENANT_EMAIL_DOMAIN = 'yopmail.com';

test.describe('E2E - PO creates a lease and the invited tenant signs in and sees it', () => {
    const poUser = userData.env.qa.poUsers.po2;
    const tenantPassword = userData.env.genericPassword;

    const property = {
        name: `E2E${randomUtils.randomAlphabets(7)}`,
        addressLine1: `House Number ${randomUtils.generateRandomNumber(4)} ${randomUtils.randomAlphabets(6)}street`,
        city: 'Hudson',
        state: 'Ohio',
        zip: randomUtils.generateRandomNumber(5),
        type: randomUtils.getRandomValueFromArray(testData.po.newProperty.property_Type),
        unit: `Unit${randomUtils.generateRandomNumber(5)}`,
    };

    const tenant = {
        fname: randomUtils.randomAlphabets(5),
        lastname: randomUtils.randomAlphabets(7),
        // A dedicated prefix keeps this run's invite out of the inboxes the other specs use.
        email: `innagoe2e${randomUtils.generateRandomNumber(6)}@${TENANT_EMAIL_DOMAIN}`,
        phone: `99999${randomUtils.generateRandomNumber(5)}`,
    };

    test('PO creates a property, leases it to a tenant, and the tenant activates and sees the lease', async ({ poPage, tenantPage, e2ePage }) => {
        let activationLink;
        let tenantPortalUrl;

        console.log('Property:', property);
        console.log('Tenant:', tenant);

        await test.step('PO signs in', async () => {
            await poPage.goto('/', { waitUntil: 'domcontentloaded' });
            await e2ePage.signInAsPo(poUser.userName, poUser.password);
            await e2ePage.dismissLegalOverlayForPo();
        });

        await test.step('PO creates a property', async () => {
            await e2ePage.navigateToPropertiesPage();
            await e2ePage.createPropertyWithGivenDetails(property);
        });

        await test.step('PO adds a M2M lease and invites the tenant onto it', async () => {
            await e2ePage.addM2MLeaseAndInviteTenant(tenant, RENT_AMOUNT);
        });

        await test.step('Invite email reaches the tenant and carries the property details', async () => {
            const invite = await e2ePage.waitForActivationEmail(tenant.email);
            activationLink = invite.activationLink;
            console.log('Activation link:', activationLink);

            // The mail is the handoff between the two journeys, so assert it really describes
            // the property that was just created, not merely that some mail arrived.
            // Case-insensitive: Innago title-cases the name it was given before greeting with it.
            expect(invite.body).toMatch(new RegExp(`Hi ${tenant.fname} ${tenant.lastname},`, 'i'));
            expect(invite.body).toContain(property.addressLine1);
            expect(invite.body).toContain(property.unit);
        });

        await test.step('Tenant activates the account and sets the password', async () => {
            tenantPortalUrl = await e2ePage.activateTenantAccount(activationLink, tenantPassword);
            console.log('Tenant portal:', tenantPortalUrl);
        });

        await test.step('Tenant signs out and back in with the new password', async () => {
            await e2ePage.dismissLegalOverlayForTenant();
            await e2ePage.logoutTenant();

            // Proves the credentials themselves work, rather than riding the session that
            // setting the password handed out.
            await tenantPage.goto(tenantPortalUrl, { waitUntil: 'domcontentloaded' });
            await e2ePage.signInAsTenant(tenant.email, tenantPassword);
            await e2ePage.dismissLegalOverlayForTenant();
        });

        await test.step('Tenant sees the lease they were added to', async () => {
            await e2ePage.validateLeaseIsVisibleToTenant(property, tenant, RENT_AMOUNT);
            await e2ePage.validatePropertyDetailsOnDocumentsPage(property);
        });
    });
});
