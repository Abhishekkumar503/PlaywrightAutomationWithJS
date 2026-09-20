const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../tests/pageObject/POManager');

Given('a login to ecommerce application with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const loginPage = this.pomanager.loginPage;
    await loginPage.goto();
    await loginPage.validLogin(username, password);

});

When('Add {string} to the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions

    const dashboardPage = this.pomanager.dashboardPage;
    await dashboardPage.waitForDashboard();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.pomanager.cartPage;
    await cartPage.waitforLoadCartPage();
    await cartPage.validateProductOnCartPage(productName);
    await cartPage.clickOnCheckout();
});

When('enter {string} detail and place the order', async function (country) {
    // Write code here that turns the phrase above into concrete actions
    this.orderPlacedPage = this.pomanager.orderPlacedPage;
    await this.orderPlacedPage.selectCountry(country);
    await this.orderPlacedPage.clickOnOrderPlace();
});

Then('Order is present in the orderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.orderPlacedPage.validateMessage();
});

