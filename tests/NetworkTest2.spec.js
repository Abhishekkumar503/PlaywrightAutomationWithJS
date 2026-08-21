const { test, expect, request } = require('@playwright/test');

let cookie;

// Login and Creating new orders
test.beforeAll(async () => {
    // Create a new API request context (Login API)
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: {
            userEmail: 'abis@gmail.com',
            userPassword: 'Login@123'
        }
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    cookie = loginData.token;
});

test('Security test request interception', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, cookie);

    const orderHistory = page.locator("[routerlink*='myorders']");

    await page.goto("https://rahulshettyacademy.com/client")

    await orderHistory.click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b60i' }));
    await page.locator("button:has-text('View')").first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b60i");
    expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});