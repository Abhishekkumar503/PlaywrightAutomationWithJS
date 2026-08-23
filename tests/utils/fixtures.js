const base = require('@playwright/test')
const { request } = require('@playwright/test')
const { APIutils } = require('./APIutils');

const loginPayLoad = { userEmail: "abis@gmail.com", userPassword: "Login@123" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };


exports.customtest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {

        // setup for authenticated page
        const context = await browser.newContext();
        const page = await context.newPage();
        const email = page.locator("#userEmail");
        const password = page.locator('#userPassword');
        const login = page.locator('input[type="submit"]');
        const cardTitles = page.locator(".card-body b");
        await page.goto("https://rahulshettyacademy.com/client");
        await email.fill("abis@gmail.com");
        await password.fill("Login@123");
        await login.click();
        await page.waitForLoadState('networkidle');
        await use(page);

        // Tear down for authenticated page
        await page.close();
        await context.close();
    },

    createOrder: async ({ }, use) => {
        //Setup for create order
        const apiContext = await request.newContext();
        const apiUtils = new APIutils(apiContext, loginPayLoad);
        const response = await apiUtils.createOrder(orderPayLoad);
        use(response);

        //Tear down for create order
        await apiContext.dispose();
    }

});