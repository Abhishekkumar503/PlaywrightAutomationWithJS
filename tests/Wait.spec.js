const { test, expect } = require('@playwright/test');

test('Playwright test at step level timeout example', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.locator('[name="email"]').fill("abis@gmail.com");
  await page.getByPlaceholder("Password").fill("Login@123");
  await page.locator(".form-group [name='name']").fill("Abishek");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

  // 5 Seconds default timeout for expect to be visible, we can override it by passing a argument to toBeVisible() method
  //  this also called as step level timeout
  await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 10000});

  await page.getByRole("link", { name: "Shop" }).click();
  await expect(page).toHaveURL(/.*shop/);

  // Chain of locators
  await page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button").click();
});


test('Playwright test for test level timeout example', async ({ page }) => {
  // test level timeout, this will override the default timeout for all expect statements in this test
  const slowExpect = expect.configure({ timeout: 10000 });
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");s
  await page.locator('[name="email"]').fill("abis@gmail.com");
  await page.getByPlaceholder("Password").fill("Login@123");
  await page.locator(".form-group [name='name']").fill("Abishek");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

  // now use slowExpect to override the default timeout for expect to be visible
  await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

  await page.getByRole("link", { name: "Shop" }).click();
  await expect(page).toHaveURL(/.*shop/);

  await slowExpect(page.locator(".my-4").first()).tohavetext("Shop");

  // Chain of locators
  await page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button").click();
});

test('Playwright test for entire test level timeout example', async ({ page }) => {
  test.setTimeout(60000); // test level timeout, this will override the default timeout for all expect statements in this test
  const slowExpect = expect.configure({ timeout: 10000 });
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.locator('[name="email"]').fill("abis@gmail.com");
  await page.getByPlaceholder("Password").fill("Login@123");
  await page.locator(".form-group [name='name']").fill("Abishek");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

  await page.getByRole("link", { name: "Shop" }).click();
  await expect(page).toHaveURL(/.*shop/);

  await slowExpect(page.locator(".my-4").first()).tohavetext("Shop");

  // Chain of locators
  await page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button").click();
});
