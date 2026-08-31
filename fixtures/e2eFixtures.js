import { test as base, expect } from '@playwright/test';
import { PoTenantE2EPage } from '../pageObjects/e2e/poTenantE2E_page.js';

/**
 * Fixtures for the PO -> tenant end-to-end journey.
 *
 * Kept apart from poFixtures.js because this flow signs in through the page object's own
 * Auth0 helpers rather than LoginPage, and it needs two browser contexts rather than one.
 *
 * The pages are test-scoped, which suits the spec: it is a single test built out of
 * test.step()s, so "per test" and "per file" are the same lifetime here - with the
 * difference that both contexts now close even when the run dies mid-journey. Given that
 * QA mail delivery to yopmail stalls intermittently, that failure path is the normal one.
 */

/** Built once and shared by the three fixtures below, so one test gets one pair of contexts. */
const e2eSession = async ({ browser, baseURL }, use) => {
    const poContext = await browser.newContext({ baseURL });
    const poPage = await poContext.newPage();
    const tenantContext = await browser.newContext({ baseURL });
    const tenantPage = await tenantContext.newPage();

    await PoTenantE2EPage.suppressSupportChatWidget(poPage);
    await PoTenantE2EPage.suppressSupportChatWidget(tenantPage);

    await use({
        poPage,
        tenantPage,
        e2ePage: new PoTenantE2EPage(poPage, tenantPage),
    });

    await poContext.close();
    await tenantContext.close();
};

export const test = base.extend({
    /**
     * The PO and the tenant get their own contexts on purpose: both portals sign in through
     * the same Auth0 tenant, so sharing one context would have the tenant login evict the
     * PO session.
     */
    e2eSession,

    poPage: async ({ e2eSession }, use) => {
        await use(e2eSession.poPage);
    },

    tenantPage: async ({ e2eSession }, use) => {
        await use(e2eSession.tenantPage);
    },

    e2ePage: async ({ e2eSession }, use) => {
        await use(e2eSession.e2ePage);
    },
});

export { expect };
