const {test, expect} = require('@playwright/test'); // import playwright

// Switching from parent to child window
test('@Child windows hadl',async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const blinkingText = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    
    const [newPage] = await Promise.all( // listen for any new page pending,rejected,fulfilled
        [
            context.waitForEvent('page'),
            blinkingText.click(),
        ]
    )

    // testcase : 1
    const textLine = await newPage.locator(".red").textContent();
    console.log(textLine);

    // Testcase : 2
    const textArray = textLine.split("@");
    const domain = textArray[1].split(" ")[0];
    console.log(domain);
    const username =  page.locator("#username");
    await username.fill(domain);

    // testcase : 3
    console.log(await username.textContent())
    console.log(await username.inputValue())

    /**
     * O/P
     *     (blank)
     * rahulshettyacademy.com (value)
     */
    // await page.pause();
});


/**
 * Step 1: Change fuction to browser 
 * test.only('Login Playwright test',async ({browser}) =>
 * 
 * Step 2 : Declare browser context 
 * const context = await browser.newContext();
 * const page = await context.newPage();
 * 
 * Step 3 : use Promise.all() for making action parallel other wise this will not work
 * this will writting in Array form and also return in array format
 * const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            blinkingText.click(),
        ]
    )

    Why Promise.all()?

Both operations need to start at nearly the same time:

context.waitForEvent('page') waits for the new tab.
blinkingText.click() triggers the new tab.

This avoids a race condition where the page opens before you're listening for it.
 *  

Last : fetch from child then fill in parent
 */