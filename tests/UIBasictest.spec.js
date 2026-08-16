const {test, expect} = require('@playwright/test'); // import playwright


// testcase defination format with browser
test('Browser Context Playwright test',async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/practice")
});

// testcase defination format with page
test('Page fixture Playwright test',async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/practice")
    console.log(await page.title())
    // Assertions
    await expect(page).toHaveTitle("QA Automation Practice Sites | Playwright, Selenium & API Testing")
});