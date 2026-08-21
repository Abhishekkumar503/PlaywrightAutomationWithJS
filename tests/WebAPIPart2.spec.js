const { test, expect } = require('@playwright/test'); // import playwright
const console = require('node:console');
let webContext; // global variable to store the state of the browser 
const user = "abis@gmail.com";

test.beforeAll(async ({ browser }) => {
    const user = "abis@gmail.com";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client")
    const email = page.locator("#userEmail");
    const password = page.locator('#userPassword');
    const login = page.locator('input[value="Login"]');
    await email.fill(user);
    await password.fill("Login@123");
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' }); // save the state of the browser in json file

    // till here lauching the page and login to the application and save the state of the browser in json file

    webContext = await browser.newContext({ storageState: 'state.json' }); // save the state of the browser in json file

});



test('Testcase - 1', async () => {
    const successMessage = " Thankyou for the order. ";
    const productName = "ZARA COAT 3";

    // Here we are calling the state.json file which is created in beforeAll hook and we are using that state to login to the application
    const page = await webContext.newPage();

    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");
    const cart = page.locator("[routerlink*='cart']");
    const checkout = page.getByText('Checkout');
    const message = page.locator(".hero-primary");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderHistory = page.locator("[routerlink*='myorders']");
    const row = page.locator(".ng-star-inserted"); // we can use "tr" then go one by one -> td -> button ...  


    await page.goto("https://rahulshettyacademy.com/client")

    // fetching all card title
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());

    // Adding product to the cart product wise
    const productCount = await products.count();
    for (let i = 0; i < productCount; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    // Navigating  to the Cart
    await cart.click();

    // Validating product has been added to the cart
    await page.locator("div li").first().waitFor(); // this used because  isVisible is not waiting 
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();

    // Click on Checkout button
    await checkout.click();

    // Filling Shipping Information from dropdown
    await page.getByPlaceholder("Select Country").pressSequentially("ind"); // this will use to type one by one

    await page.getByRole("button", { name: "India" }).nth(1).click();

    //  validate username
    expect(await page.locator(".user__name [type=text]").first()).toHaveText(user);

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    // Validate Order Pleces succesfully
    expect(await message.textContent()).toEqual(successMessage);

    // Print order ID
    const orderid = await orderId.textContent();
    console.log(orderid);

    // Open OrderHistory and then search orderNumber then view Order detail 
    await orderHistory.first().click();
    const historyOrderCount = await row.count();
    for (let i = 0; i < historyOrderCount; i++) {
        if (await row.locator("[scope = 'row']").nth(i).textContent() === orderid.split(" ")[2]) {
            await row.locator(".btn-primary").nth(i).click();
            break;
        }
    }

});

test('Testcase - 2', async () => {
    // Here we are calling the state.json file which is created in beforeAll hook and we are using that state to login to the application
    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client")
    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");

    // fetching all card title
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());

});