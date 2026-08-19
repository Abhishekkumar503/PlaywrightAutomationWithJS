const {test, expect} = require('@playwright/test'); // import playwright
 
// Locators ( only is used for run this one test at one run)
test.only('Login Playwright test',async ({page}) =>
{
    const email = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder('enter your passsword');
    const login = page.getByRole('button', { name: 'Login' });
    const cardTitles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title())
    // Assertions
    await expect(page).toHaveTitle("Let's Shop")
    await email.fill("abis@gmail.com")
    await password.fill("Login@123")
    await login.click()

    await page.waitForLoadState('networkidle')
    await cardTitles.first().waitFor()
    console.log(await cardTitles.allTextContents());

    await page.locator(".card-body").filter({ hasText: 'adidas original' })
    .getByRole("button", { name: "Add To Cart" }).click();

    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    // Validating product has been added to the cart
    await page.locator("div li").first().waitFor(); // this used because  isVisible is not waiting 
    const bool =  await page.locator("h3:has-text('adidas original')").isVisible();
    expect(bool).toBeTruthy();

    // Click on Checkout button
    await page.getByRole("button", { name: "Checkout" }).click();

    // Filling Shipping Information from dropdown
    await page.getByPlaceholder("Select Country").pressSequentially("ind"); // this will use to type one by one
    
    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
 
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});