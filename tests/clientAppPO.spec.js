const { test, expect } = require('@playwright/test');
const { POManager } = require('./pageObject/POManager');
const {customTest} = require('./utils/test-base'); // importing the test-base.js file to use the customTest with fixture data set    
const testData = JSON.parse(JSON.stringify(require('./utils/paceOrderTestData.json'))); // parsing the json file to get the data for multiple data sets

test.describe.configure({ mode: 'serial' }); // to run the tests in parallel/serial mode

for(const data of testData) // for multiple data sets, we can use for loop to run the same test with different data
{
test(` @Web Login Playwright test with Page object for ${data.productName}`, async ({ page }) => {

    const pomanager = new POManager(page);

    const loginPage = pomanager.loginPage;
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage =  pomanager.dashboardPage;
    await dashboardPage.waitForDashboard();
    await dashboardPage.searchProduct(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = pomanager.cartPage;
    await cartPage.waitforLoadCartPage();
    await cartPage.validateProductOnCartPage(data.productName);
    await cartPage.clickOnCheckout();

    const orderPlacedPage = pomanager.orderPlacedPage;
    await orderPlacedPage.selectCountry(data.country);
    await orderPlacedPage.clickOnOrderPlace();
    await orderPlacedPage.validateMessage();
});
}

customTest(` @WebLogin Playwright test with Page object with FixtureDataSet`, async ({ page, testDataForOrder }) => {

    const pomanager = new POManager(page);

    const loginPage = pomanager.loginPage;
    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage =  pomanager.dashboardPage;
    await dashboardPage.waitForDashboard();
    await dashboardPage.searchProduct(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = pomanager.cartPage;
    await cartPage.waitforLoadCartPage();
    await cartPage.validateProductOnCartPage(testDataForOrder.productName);
    await cartPage.clickOnCheckout();

    const orderPlacedPage = pomanager.orderPlacedPage;
    await orderPlacedPage.selectCountry(testDataForOrder.country);
    await orderPlacedPage.clickOnOrderPlace();
    await orderPlacedPage.validateMessage();
});