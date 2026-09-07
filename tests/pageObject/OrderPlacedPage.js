const { expect } = require("@playwright/test");
class OrderPlacedPage {

    constructor(page) {
        this.page = page;
        this.orderPlaceButton = page.getByText("PLACE ORDER");
    }

    async selectCountry(countryName) {
        await this.page.getByPlaceholder("Select Country").pressSequentially(countryName); // this will use to type one by one
        await this.page.getByRole("button", { name: countryName }).nth(1).click();
    }

    async clickOnOrderPlace() {
        await this.orderPlaceButton.click();
    }

    async validateMessage() {
        await expect(this.page.getByText("Thankyou for the order.")).toBeVisible();
    }




}
module.exports = { OrderPlacedPage }