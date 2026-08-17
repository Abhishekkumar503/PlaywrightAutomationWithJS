const {test, expect} = require('@playwright/test'); // import playwright
 
// Locators ( only is used for run this one test at one run)
test('Login Playwright test',async ({page}) =>
{
    const email = page.locator("#userEmail");
    const password = page.locator('#userPassword');
    const login = page.locator('input[type="submit"]');
    const cardTitles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title())
    // Assertions
    await expect(page).toHaveTitle("Let's Shop")
    await email.fill("anshika@gmail.com")
    await password.fill("Iamking@000")
    await login.click()
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    // All titles but this will not work due to mechanism
    // use wait for load status means all API are loaded properly in then start fetching the titles
    // await page.waitForLoadState('networkidle')

    // Another way without hardcoded
    await cardTitles.first().waitFor()
    console.log(await cardTitles.allTextContents());


});