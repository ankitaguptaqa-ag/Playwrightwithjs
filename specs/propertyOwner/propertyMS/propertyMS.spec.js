import { test, expect } from '@playwright/test';
import { userData } from '../../../mocks/common/userData.js';
import { PropertiesPage } from '../../../pageObjects/poPortal/propertyMS_page.js';
import { LoginPage } from '../../../pageObjects/poPortal/login_page.js';
import { MenuPage } from '../../../pageObjects/poPortal/menu_page.js';


test.describe.configure({ mode: 'serial' });


test.describe('Property Management - Lease Tests', () => {
    const poUser = userData.env.qa.poUsers.po1;
    let sharedPage;


    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        sharedPage = await context.newPage();


        const loginPage = new LoginPage(sharedPage);
        await loginPage.goToLoginPage();
        await loginPage.login(poUser.userName, poUser.password);
    });


    test.afterAll(async () => {
        const loginPage = new LoginPage(sharedPage);
        await loginPage.logout();
        await sharedPage.close();
    });


    test('TC to create a property with M2M Lease and Monthly payment', async () => {
        const menuPage = new MenuPage(sharedPage);
        const propertiesPage = new PropertiesPage(sharedPage);


        await menuPage.navigateToPropertyPage();


        const createdProperty = await propertiesPage.createNewProperty();
        console.log('Created Property:', createdProperty);


        const tenantDetails = await propertiesPage.addingM2MLeaseTermDetails_Monthly();
        console.log('Tenant Details:', tenantDetails);
    });


    test('TC to create a property with Fixed Term Lease and Monthly payment', async () => {
        const menuPage = new MenuPage(sharedPage);
        const propertiesPage = new PropertiesPage(sharedPage);


        await menuPage.navigateToPropertyPage();


        const createdProperty = await propertiesPage.createNewProperty();
        console.log('Created Property:', createdProperty);


        const tenantDetails = await propertiesPage.addingFixedTermLeaseDetails_Monthly();
        console.log('Tenant Details:', tenantDetails);
    });


    test('TC to create a property with M2M Lease, Monthly payment and Additional Fees', async () => {
        const menuPage = new MenuPage(sharedPage);
        const propertiesPage = new PropertiesPage(sharedPage);
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


    test('TC to create a M2M property with lease and validate upcoming invoices', async () => {
        const menuPage = new MenuPage(sharedPage);
        const propertiesPage = new PropertiesPage(sharedPage);


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



