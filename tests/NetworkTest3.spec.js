const {test, expect} = require('@playwright/test'); // import playwright
 
// Locators ( only is used for run this one test at one run)
test.only('Login Playwright test',async ({page}) =>
{
    // this will block all the css files from loading
    await page.route('**/*.css', route => route.abort());
    const email = page.locator("#userEmail");
    const password = page.locator('#userPassword');
    const login = page.locator('input[type="submit"]');
    const cardTitles = page.locator(".card-body b");

    // this will log all the request and response from the page
    page.on('request', request => console.log(request.method(), request.url()));
    page.on('response', response => console.log(response.status(), response.url()));

    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title())
    // Assertions
    await expect(page).toHaveTitle("Let's Shop")
    await email.fill("abis@gmail.com")
    await password.fill("Login@123")
    await login.click()
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    await cardTitles.first().waitFor()
    console.log(await cardTitles.allTextContents());


});