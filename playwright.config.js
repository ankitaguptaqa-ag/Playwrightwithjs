import 'dotenv/config';
import { defineConfig } from '@playwright/test';

const isJenkins = !!process.env.CI || !!process.env.JENKINS_HOME || !!process.env.BITBUCKET_BUILD_NUMBER;

/**
 * Environment definitions
 * Usage: npx playwright test --project=qa  (or pre, prod)
 */
const ENVIRONMENTS = {
  qa: { name: 'qa', url: 'https://qa-my.innago.com' },
  pre: { name: 'pre', url: 'https://pre-my.innago.com' },
  prod: { name: 'prod', url: 'https://my.innago.com' },
};

/**
 * Read environment override from INNAGO_ENV.
 * Defaults to qa if no value is set.
 */
const currentEnv = process.env.INNAGO_ENV || 'qa';
const envConfig = ENVIRONMENTS[currentEnv];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
 testDir: './specs',

 /* Run tests in files in parallel */
 fullyParallel: true,

 /* Fail the build on CI if you accidentally left test only in a file */
 forbidOnly: !!process.env.CI,

 /* Retry on CI only */
 retries: process.env.CI ? 2 : 0,

 /* Opt out of parallel tests on CI */
 workers: process.env.CI ? 1 : undefined,

 /* Reporter to use */
 //reporter: 'html',
 reporter: [['list'], ['html'], ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: true }]],
 //reporter: [['verbose'], ['html']],

 expect: {
  timeout: 180000,
 },
 timeout: 3000000,

 // expect: {
 //  timeout: 10000,
 // },
 // timeout: 60000,

 /* Shared settings */
 use: {
  /* Base URL to use in actions like await page.goto(''). */
  baseURL: envConfig.url,

  /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  trace: 'on-first-retry',
  headless: !!process.env.CI,
  //trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  //viewport: { width: 1280, height: 720 },
  // headless: false,
  // viewport: null,
  // channel: "chrome",
  // launchOptions: {
  //     args: ["--start-maximized"],
  // },
  // screen: { width: 1920, height: 1080 },
 },

 /* Projects - one per environment */
 projects: [
  {
   name: 'chromium',
   use: {
    browserName: 'chromium',
    launchOptions: {
     args: isJenkins ? [] : ['--start-maximized'],
    },
    viewport: isJenkins ? { width: 1920, height: 1080 } : null,
    colorScheme: 'dark',
   },
  },
 ],
});