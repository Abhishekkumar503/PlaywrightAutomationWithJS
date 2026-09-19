import { expect , Page , Locator} from  "@playwright/test";
export class CartPage {

    page : Page;
    Checkout : Locator;

    constructor(page : Page) {
        this.page = page;
        this.Checkout = page.getByRole("button", { name: "Checkout" });
    }

    async waitforLoadCartPage() {
        await this.page.locator("div li").first().waitFor();
    }

    async validateProductOnCartPage(productName : string) {
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        await expect(bool).toBeTruthy();
    }

    async clickOnCheckout() {
        await this.Checkout.click();
    }

}