const { test, expect } = require('@playwright/test');

test('GetBy Locator example', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.locator('[name="email"]').fill("abis@gmail.com");
  await page.getByPlaceholder("Password").fill("Login@123");
  await page.locator(".form-group [name='name']").fill("Abishek");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  await expect(page).toHaveURL(/.*shop/);

  // Chain of locators
  await page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button").click();
});
