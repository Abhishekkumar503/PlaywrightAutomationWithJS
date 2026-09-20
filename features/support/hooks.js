const { Before , After , BeforeStep , AfterStep } = require("@cucumber/cucumber");
const { POManager } = require('../../tests/pageObject/POManager');
const { chromium } = require('@playwright/test');

Before(async function () {
    // This hook will run before each scenario
    // You can perform setup tasks here, such as launching a browser or initializing test data
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.pomanager = new POManager(page);
});

After(async function () {
    // This hook will run after each scenario
    // You can perform cleanup tasks here, such as closing the browser or clearing test data
    await this.pomanager.page.close();
    await this.pomanager.page.context().close();
    await this.pomanager.page.context().browser().close();
});

BeforeStep(async function (step) {
    // This hook will run before each step
    // You can perform actions here, such as logging or taking screenshots
    console.log(`Before Step: ${step.pickleStep.text}`);
});

AfterStep(async function (step) {
    // This hook will run after each step
    // You can perform actions here, such as logging or taking screenshots
    await this.pomanager.page.screenshot({ path: `screenshots/${step.pickleStep.text}.png` });
});
