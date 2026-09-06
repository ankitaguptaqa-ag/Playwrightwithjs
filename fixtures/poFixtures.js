import { test as base, expect } from '@playwright/test';
import { userData } from '../mocks/common/userData.js';
import { LoginPage } from '../pageObjects/poPortal/login_page.js';
import { MenuPage } from '../pageObjects/poPortal/menu_page.js';
import { IncomePage } from '../pageObjects/poPortal/income_page.js';
import { ExpensePage } from '../pageObjects/poPortal/expense_page.js';
import { PropertiesPage } from '../pageObjects/poPortal/propertyMS_page.js';

/**
 * Fixtures for the property-owner portal.
 *
 * A spec imports `test` from here instead of from '@playwright/test' and asks for what it
 * needs by name - `async ({ incomePage }) => ...`. Everything is lazy: a test that never
 * mentions poSession never logs in, which is why login.spec.js can still drive a clean,
 * logged-out browser out of the same module.
 *
 * The user is chosen per file, not per spec:
 *
 *   test.use({ poUserKey: 'expenseUser' });   // top of file, outside any describe
 *
 * poUserKey is worker-scoped, so Playwright puts files with different users in different
 * workers by itself. Setting it inside a describe throws - that is a Playwright rule about
 * worker-scoped options, not a limitation of these fixtures.
 */

/**
 * playwright.config.js picks the environment from INNAGO_ENV and resolves the URL; the same
 * variable has to pick the credentials, otherwise a `pre` run signs in with QA users. Kept
 * here rather than in the specs so no spec ever names an environment again.
 */
const currentEnv = process.env.INNAGO_ENV || 'qa';

function resolvePoUser(poUserKey) {
    const poUsers = userData.env[currentEnv]?.poUsers;
    if (!poUsers) {
        throw new Error(
            `No poUsers defined for INNAGO_ENV="${currentEnv}" in mocks/common/userData.js. ` +
            `Defined environments: ${Object.keys(userData.env).filter((key) => key !== 'genericPassword').join(', ')}`
        );
    }

    const poUser = poUsers[poUserKey];
    if (!poUser) {
        throw new Error(
            `Unknown PO user "${poUserKey}" for env "${currentEnv}". ` +
            `Available: ${Object.keys(poUsers).join(', ')}`
        );
    }

    return poUser;
}

export const test = base.extend({
    /** Which entry of userData.env[env].poUsers this file signs in as. */
    poUserKey: ['po1', { option: true, scope: 'worker' }],

    /** The resolved credentials, for the rare spec that needs the username itself. */
    poUser: [async ({ poUserKey }, use) => {
        await use(resolvePoUser(poUserKey));
    }, { scope: 'worker' }],

    /**
     * A signed-in property-owner page, built once per worker and reused by every test in it.
     *
     * Worker-scoped on purpose: signing in goes through Auth0 and costs real seconds, and the
     * suite used to pay that once per spec file. The trade is that tests in the same worker
     * share one page, so a test that leaves a modal or filter panel open hands that state to
     * the next one - the same trade the old `sharedPage` made, now with teardown that cannot
     * be skipped. Change `scope` to test scope here if a suite ever needs hard isolation more
     * than it needs the speed.
     *
     * Depends on `browser` rather than `page` because a worker fixture cannot use test-scoped
     * fixtures. Contexts made this way still inherit `use` from playwright.config.js, baseURL
     * included, so LoginPage.goToLoginPage()'s page.goto('/') resolves exactly as before.
     */
    poSession: [async ({ browser, poUser }, use) => {
        // Signing in is the most failure-prone step in the suite and this fixture is
        // worker-scoped, so a single bad sign-in used to take down every test in the worker
        // rather than just itself. On 2026-09-06 that cost a CI run 11 tests that were never
        // executed at all, none of which had anything wrong with them. Playwright's own
        // `retries` do not help: they re-run the test, and the worker fixture that actually
        // failed is rebuilt the same way each time.
        //
        // QA's auth stalls are transient, so retry the sign-in itself before writing off the
        // worker. Each attempt gets a fresh context on purpose - a half-completed Auth0 hop
        // leaves cookies behind, and reusing them makes the retry fail in a new and less
        // legible way than the first attempt did.
        const attempts = Number(process.env.PO_LOGIN_ATTEMPTS || 3);
        let context;
        let page;
        let loginPage;
        let lastError;

        for (let attempt = 1; attempt <= attempts; attempt++) {
            context = await browser.newContext();
            page = await context.newPage();
            loginPage = new LoginPage(page);

            try {
                await loginPage.goToLoginPage();
                await loginPage.login(poUser.userName, poUser.password);
                lastError = undefined;
                break;
            } catch (error) {
                lastError = error;
                await context.close().catch(() => {});
                context = undefined;

                // An MFA challenge is a property of the account, not a blip - the next attempt
                // gets challenged too. Surface it now instead of burning two more sign-ins.
                if (error.message.includes('MFA challenge')) {
                    break;
                }

                if (attempt < attempts) {
                    console.warn(`Sign-in attempt ${attempt}/${attempts} as ${poUser.userName} failed: ${error.message}`);
                    // Back off further each time: the usual cause is QA still coming back up.
                    await new Promise((resolve) => setTimeout(resolve, 5000 * attempt));
                }
            }
        }

        if (lastError) {
            throw new Error(
                `Could not sign in as ${poUser.userName} after ${attempts} attempt(s). Last failure: ${lastError.message}`,
            );
        }

        await use(page);

        // Teardown runs even when the test failed, and a failed test is exactly when the
        // session is most likely to be wedged - so a logout that throws must not turn one
        // red test into a red worker as well.
        await loginPage.logout().catch(() => {});
        await context.close();
    }, { scope: 'worker' }],

    menuPage: async ({ poSession }, use) => {
        await use(new MenuPage(poSession));
    },

    incomePage: async ({ poSession }, use) => {
        await use(new IncomePage(poSession));
    },

    expensePage: async ({ poSession }, use) => {
        await use(new ExpensePage(poSession));
    },

    propertiesPage: async ({ poSession }, use) => {
        await use(new PropertiesPage(poSession));
    },

    /**
     * The odd one out: bound to the built-in `page`, so it hands back a fresh, logged-out
     * browser. For specs that test signing in itself and must not ride an existing session.
     */
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect };
