const { test, expect } = require('@playwright/test')

test("Popup Validations", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    // Naviagations
    await page.goto("https://google.com");
    await page.goBack();
    // await page.goForward();
    // await page.reload();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();

    // Alert Handling
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#alertbtn").click();
    await page.locator("#confirmbtn").click();

    await page.pause();

    // Mouse Hover
    await page.locator("#mousehover").scrollIntoViewIfNeeded();
    await page.hover("#mousehover");
    await page.locator("text=Reload").click();

    await page.hover("#mousehover");
    await page.locator("text=Top").click();

    // frame Handling
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    console.log(await framePage.locator(".text h2").textContent());
});


test("Screenshots", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' })
    await page.locator("#hide-textbox").click();

    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();

});

test.only('Visual testing', async ({ page }) => {
    await page.goto("https://playwright.dev");
    expect(await page.screenshot()).toMatchSnapshot("landingPage.png");
});