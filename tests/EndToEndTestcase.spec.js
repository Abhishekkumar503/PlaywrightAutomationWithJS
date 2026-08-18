const {test, expect} = require('@playwright/test'); // import playwright
const console = require('node:console');
 
// End To End test 
test.only('End to End test',async ({page}) =>
{

    const user = "abis@gmail.com";
    const successMessage = " Thankyou for the order. ";
    const productName = "ZARA COAT 3";

    const email = page.locator("#userEmail");
    const password = page.locator('#userPassword');
    const login = page.locator('input[value="Login"]');
    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");
    const cart = page.locator("[routerlink*='cart']");
    const checkout = page.getByText('Checkout');
    const country = page.getByPlaceholder('Select Country');
    const countryDropdown = page.locator(".ta-results button");
    const placeOrder = page.locator(".action__submit");
    const message = page.locator(".hero-primary");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderHistory = page.locator("[routerlink*='myorders']");
    const row = page.locator(".ng-star-inserted"); // we can use "tr" then go one by one -> td -> button ...  


    // Launching url
    await page.goto("https://rahulshettyacademy.com/client")

    // verify title
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop")

    // Login to ecom site
    await email.fill(user)
    await password.fill("Login@123")
    await login.click()

    // fetching all card title
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());

    // Adding product to the cart product wise
    const productCount = await products.count();
    for(let i = 0; i < productCount; i++)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    // Navigating  to the Cart
    await cart.click();

    // Validating product has been added to the cart
    await page.locator("div li").first().waitFor(); // this used because  isVisible is not waiting 
    const bool =  await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();

    // Click on Checkout button
    await checkout.click();

    // Filling Shipping Information from dropdown
    await country.pressSequentially("ind"); // this will use to type one by one
    await countryDropdown.first().waitFor();
    const optionsCount = await countryDropdown.count();
    for(let i = 0; i < optionsCount; i++)
    {
        const countryName = await countryDropdown.nth(i).textContent();
        if(countryName === " India")
        {
            await countryDropdown.nth(i).click();
            break;
        }
    }

    //  validate username
    expect(await page.locator(".user__name [type=text]").first()).toHaveText(user);

    // Place order
    await placeOrder.click();

    // Validate Order Pleces succesfully
    expect(await message.textContent()).toEqual(successMessage);

    // Print order ID
    const orderid = await orderId.textContent();
    console.log(orderid);

    // Open OrderHistory and then search orderNumber then view Order detail 
    await orderHistory.first().click();
    const historyOrderCount = await row.count();
    for(let i = 0 ; i < historyOrderCount; i++ )
    {
        if(await row.locator("[scope = 'row']").nth(i).textContent() === orderid.split(" ")[2])
        {
            await row.locator(".btn-primary").nth(i).click();
            break;
        }
    }


    await page.pause();

});