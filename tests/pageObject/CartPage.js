const { expect } = require("@playwright/test");
class CartPage {
    constructor(page) {
        this.page = page;
        this.Checkout = page.getByRole("button", { name: "Checkout" });
    }

    async waitforLoadCartPage() {
        await this.page.locator("div li").first().waitFor();
    }

    async validateProductOnCartPage(productName) {
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        await expect(bool).toBeTruthy();
    }

    async clickOnCheckout() {
        await this.Checkout.click();
    }

}
module.exports = { CartPage };