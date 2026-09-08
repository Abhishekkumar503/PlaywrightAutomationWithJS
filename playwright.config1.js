// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({ // this one is calling at bottom
  testDir: './tests', // for which test
  timeout: 40 * 1000,
    expect: { // for expected timeout
      timeout: 40 * 1000
    },
  retries: 1, // retry failed test cases once, if it fails again then it will be marked as failed
  workers: 10, // 1 run tests in single thread, if we set it to 2 then it will run in 2 threads, if we set it to 3 then it will run in 3 threads and so on

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [
  //   ['line'],
  //   ['allure-playwright']
  // ],
  repoprter: [['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on', // retain-on-failure, off
    screenshot:'on',
    headless: true, // means browser will launch in headless mode, if we set it to false then browser will launch in headed mode
    browserName: 'chromium', // means browser will launch
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    // viewport: { width: 1280, height: 720 }, // set viewport size
    ignoreHTTPSErrors: true, // SSL certificate errors will be ignored
    permissions: ['geolocation'], // set permissions for the browser
    video: 'retain-on-failure', // record video of test execution
  },

  /* Configure projects for major browsers */ 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


module.exports = config