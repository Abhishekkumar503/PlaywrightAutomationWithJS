const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('./utils/APIutils');
const loginPayLoad = { userEmail: "abis@gmail.com", userPassword: "Login@123" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };

let response;

test.beforeAll(async () => {
    // Create a new API request context (Login API)
    const apiContext = await request.newContext();
    const apiUtils = new APIutils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});


test('Verify API generated orderNumber on UI', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const orderHistory = page.locator("[routerlink*='myorders']");
    const row = page.locator("tbody tr"); // we can use "tr" then go one by one -> td -> button ...  

    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title());

    // Open OrderHistory and then search orderNumber then view Order detail 
    console.log("OrderId from API: " + response.orderId);
    await orderHistory.first().click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
