class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async waitForDashboard() {
        await this.products.first().waitFor();
    }

    async searchProduct(productName) {
        console.log(await this.productsText.allTextContents());
        const product = await this.products.filter({ hasText: productName });

        await product
            .getByRole("button", { name: " Add To Cart" })
            .click();
    }

    async navigateToCart() {
        await this.cart.click();
    }
}
module.exports = { DashboardPage };