const {test, expect} = require('@playwright/test'); // import playwright

// Dropdown
test('Login Playwright test',async ({page}) =>
{
    const username = page.locator("#username");
    const password = page.locator('#password');
    const dropdown = page.locator('select.form-control');
    const userRadioButton = page.locator(".checkmark").last()
    const confirmatiomRadioButton = page.locator("#okayBtn")
    const checkbox = page.locator("#terms");
    const signButton = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-title a");
    const blinkingText = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    
    await username.fill("rahulshettyacademy")
    await password.fill("Learning@830$3mK2")
    await dropdown.selectOption("Teacher")
    await userRadioButton.click()
    await confirmatiomRadioButton.click()
    console.log(await dropdown.textContent())
    
    // another way
    console.log(await userRadioButton.isChecked());

    // Assertions
    expect(await userRadioButton).toBeChecked();

    // Checkbox
    await checkbox.check(); // for check
    console.log(await checkbox.isChecked());
    expect(await checkbox).toBeChecked();

    await checkbox.uncheck(); // for uncheck
    expect(await checkbox.isChecked()).toBeFalsy(); // Customize method
    

    // await page.pause()
    await signButton.click()
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    // All titles but this will not work due to mechanism
    console.log(await cardTitles.allTextContents());

    await expect(blinkingText).toHaveClass("class","blinkingText");


});