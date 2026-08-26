import { test, expect } from '../../../fixtures/poFixtures.js';

// po1 has an unfinished renters-insurance draft, which comes up mid-wizard with its Next
// button disabled and blocks every lease this file creates - account state no test can drive
// past. po2 doesn't carry that draft. Switch back once po1's draft is resolved from Settings.
test.use({ poUserKey: 'po2' });

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
