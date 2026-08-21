const { test, expect, request } = require('@playwright/test');

let cookie;
let orderId;
const fakePayLoadOrders = { data: [], message: "No Orders" };

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

    // used as for Cookies 
    // await apiContext.setCookie({ name: 'token', value: cookie, domain: 'rahulshettyacademy.com', path: '/' });

    // Order Placement API 
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        headers: {
            'Authorization': cookie,
            'Content-Type': 'application/json'
        },
        data: {
            orders: [
                {
                    country: 'Cuba',
                    productOrderedId: '6960eae1c941646b7a8b3ed3'
                }
            ]
        }
    });
    expect(orderResponse.ok()).toBeTruthy();
    const responseData = await orderResponse.json();
    orderId = responseData.orders;

});


test('Faking API Response', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, cookie);

    const orderHistory = page.locator("[routerlink*='myorders']");

    await page.goto("https://rahulshettyacademy.com/client")
    

    // routing the Backend API to return empty orders so that we can test the UI with no orders
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
        const response = await page.request.fetch(route.request()); // till here we are calling the original API and then we are going to fulfill the response with our fake payload
            let body = JSON.stringify(fakePayLoadOrders); // converting the fake payload to string so that we can fulfill the response with our fake payload
            await route.fulfill(
                {
                    response,
                    body,
                });
        });

    

    console.log(await page.title());

    // Open OrderHistory and then search orderNumber then view Order detail 

    await orderHistory.first().click();
    // if below wait not available then request got messed up and we r geting error
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await expect(page.locator(".mt-4")).toHaveText("You have No Orders to show at this time. Please Visit Back Us ");
    await page.pause();

});