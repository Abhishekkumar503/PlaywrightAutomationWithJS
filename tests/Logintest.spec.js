const {test, expect} = require('@playwright/test'); // import playwright

//  
// Locators ( only is used for run this one test at one run)
test('Page locators Playwright test',async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await page.locator("#username").fill("Testing")
    await page.locator('#password').fill("1234567890")
    await page.locator('#signInBtn').click()
    console.log(await page.locator("[style*='block']").textContent())
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');


});

//  
// Locators ( only is used for run this one test at one run)
test('Login Playwright test',async ({page}) =>
{
    const username = page.locator("#username");
    const password = page.locator('#password');
    const signButton = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-title a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await username.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2")
    await signButton.click()
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    // All titles but this will not work due to mechanism
    console.log(await cardTitles.allTextContents());




});