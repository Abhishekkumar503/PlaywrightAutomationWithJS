const {test, expect, request} = require('@playwright/test');

let cookie;
let orderId;

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


test('Login Test with API token',async ({page}) =>
{
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    },cookie);

    const orderHistory = page.locator("[routerlink*='myorders']");
    const row = page.locator("tbody tr"); // we can use "tr" then go one by one -> td -> button ...  

    await page.goto("https://rahulshettyacademy.com/client")
    console.log(await page.title());

    // Open OrderHistory and then search orderNumber then view Order detail 
    console.log("OrderId from API: " + orderId);
    await orderHistory.first().click();
    const historyOrderCount = await row.count();
    for(let i = 0 ; i < historyOrderCount; i++ )
    {
        if(await row.locator("[scope = 'row']").nth(i).textContent() === orderId)
        {
            await row.locator(".btn-primary").nth(i).click();
            break;
        }
    }


    await page.pause();

});