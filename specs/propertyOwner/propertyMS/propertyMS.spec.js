import { test, expect } from '../../../fixtures/poFixtures.js';

/**
 * Stays on po1 (the fixtures' default) deliberately, after a run on each.
 *
 * po1 carries an unfinished renters-insurance draft, which comes up mid-wizard with its Next
 * button disabled and blocks every lease this file creates. That is account state no test can
 * drive past - clear it from the account's Settings page (Resume Settings) and this file goes
 * green with no code change. passRenterInsuranceStepIfShown() says exactly that when it hits.
 *
 * po2 has no such draft and passes locally, but it is challenged for email MFA from the CI
 * runner and never reaches the dashboard at all (run 2026-08-26) - the same challenge that
 * fails the e2e spec. Since po1 signs in from CI without complaint (income and expenses use
 * it and are green), a blocked wizard step beats a blocked login: it fails later, with a
 * message that names the cause, and needs no code change to recover.
 *
 * The real fix for the MFA is allowlisting the runner in Auth0, which would also be the only
 * thing that ever makes the e2e spec pass in CI.
 */

test.describe.configure({ mode: 'serial' });


test.describe('Property Management - Lease Tests', () => {

    test('TC to create a property with M2M Lease and Monthly payment', async ({ menuPage, propertiesPage }) => {
        await menuPage.navigateToPropertyPage();

        const createdProperty = await propertiesPage.createNewProperty();
        console.log('Created Property:', createdProperty);

        const tenantDetails = await propertiesPage.addingM2MLeaseTermDetails_Monthly();
        console.log('Tenant Details:', tenantDetails);
    });


    test('TC to create a property with Fixed Term Lease and Monthly payment', async ({ menuPage, propertiesPage }) => {
        await menuPage.navigateToPropertyPage();

        const createdProperty = await propertiesPage.createNewProperty();
        console.log('Created Property:', createdProperty);

        const tenantDetails = await propertiesPage.addingFixedTermLeaseDetails_Monthly();
        console.log('Tenant Details:', tenantDetails);
    });


    test('TC to create a property with M2M Lease, Monthly payment and Additional Fees', async ({ menuPage, propertiesPage }) => {
        await menuPage.navigateToPropertyPage();
        const createdProperty = await propertiesPage.createNewProperty();
        console.log('Created Property:', createdProperty);
        const tenantDetails = await propertiesPage.addingM2MLeaseTermDetails_Monthly_With_Additional_Fees();
        console.log('Tenant Details:', tenantDetails);
        await menuPage.navigateToPropertyPage();
        await propertiesPage.applyFilterOnProperties([createdProperty.propertyName]);
        // const filteredCount = await propertiesPage.getPropertyCount();
        // console.log('Filtered property count:', filteredCount);
        // expect(filteredCount).toBe(1);
        await propertiesPage.selectGivenPropertyFromList(createdProperty.propertyName);
    });


    test('TC to create a M2M property with lease and validate upcoming invoices', async ({ menuPage, propertiesPage }) => {
        await menuPage.navigateToPropertyPage();

        const createdProperty = await propertiesPage.createNewProperty();
        console.log('Created Property:', createdProperty);

        const tenantDetails = await propertiesPage.addingM2MLeaseTermDetails_Monthly();
        console.log('Tenant Details:', tenantDetails);
        await menuPage.navigateToPropertyPage();
        await propertiesPage.applyFilterOnProperties([createdProperty.propertyName]);
        //const filteredCount = await propertiesPage.getPropertyCount();
        // console.log('Filtered property count:', filteredCount);
        // expect(filteredCount).toBe(1);
        await propertiesPage.selectGivenPropertyFromList(createdProperty.propertyName);

        await propertiesPage.validateUpcomingInvoicesDetailsOnPropertyDetailsPage();
    });


});
