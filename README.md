# Playwright Automation Framework (JS / TS)

Welcome to the **PlaywrightAutomationWithJS** repository! ([View Repository](https://github.com/Abhishekkumar503/PlaywrightAutomationWithJS))  
This project is an enterprise-grade end-to-end (E2E) and API test automation framework built with **Playwright**, supporting both **JavaScript** and **TypeScript**. It includes dedicated branches implementing Behavior-Driven Development (BDD) via Cucumber and structured testing patterns inspired by TestNG.

---

## 📂 Repository Branch Architecture

This repository is organized into specialized branches to demonstrate different design patterns and testing frameworks:

1. **`main` (Default Branch)**
   * **Tech Stack:** JavaScript / TypeScript with Playwright.
   * **Design Pattern:** Page Object Model (POM).
   * **Purpose:** Standard E2E component and UI test execution suite.

2. **`cucumber` Branch**
   * **Tech Stack:** Playwright with Cucumber (`@cucumber/cucumber`).
   * **Design Pattern:** Behavior-Driven Development (BDD).
   * **Purpose:** Houses Gherkin feature files (`.feature`), step definitions, and world constructors for readable, business-centric specifications.

3. **`testng` Branch**
   * **Tech Stack:** Playwright with custom suite organization.
   * **Design Pattern:** TestNG-style grouping, prioritization, and setup/teardown configuration management.
   * **Purpose:** Provides structured execution suites analogous to Java-based TestNG test runners.

> **Switching Branches:**
> ```bash
> git checkout <branch_name>  # e.g., git checkout cucumber or git checkout testng
> ```

---

## ⏱️ Smart Waiting & Synchronization Strategies

Playwright inherently eliminates flaky tests by auto-waiting for elements before performing actions, avoiding the need for arbitrary `sleep` or hardcoded timeouts.

* **Auto-Waiting Actions:** Actions like `click()`, `fill()`, and `selectOption()` automatically wait for elements to be:
  * Attached to the DOM
  * Visible and stable (not animating)
  * Enabled and receiving pointer events
* **Web-First Assertions:** Use auto-retrying assertions that poll until the condition is met or times out:
  ```javascript
  // Automatically retries until the element contains the expected text
  await expect(page.locator('.success-banner')).toHaveText('Operation Successful');
  ```
* **Network & Event Waiting:**
  ```javascript
  // Wait for a specific network response after triggering an action
  const responsePromise = page.waitForResponse('**/api/v1/auth/login');
  await page.click('#submit-btn');
  const response = await responsePromise;
  console.log(await response.json());
  ```

---

## 🎭 API Mocking & Network Routing

Playwright allows granular interception of network traffic to mock server responses, simulate error states, or alter live data payloads dynamically.

### 1. Mocking API Responses
Intercept requests matching specific URL glob patterns and return synthetic JSON payloads:
```javascript
test('mock user profile data', async ({ page }) => {
  // Intercept GET request for user profile
  await page.route('**/api/v1/user/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        userId: 101,
        username: 'MockedAbhishek',
        role: 'Administrator'
      }),
    });
  });

  await page.goto('/dashboard');
  await expect(page.locator('#profile-name')).toHaveText('MockedAbhishek');
});
```

### 2. Modifying Network Traffic on the Fly
Fetch the live response, manipulate the JSON data structure, and forward it to the application:
```javascript
test('modify existing api payload', async ({ page }) => {
  await page.route('**/api/v1/products', async (route) => {
    const response = await route.fetch();
    let json = await response.json();
    
    // Inject a custom mock product into the live response
    json.push({ id: 999, name: 'Injected Test Product', price: 0.00 });

    await route.fulfill({
      response,
      body: JSON.stringify(json),
    });
  });

  await page.goto('/shop');
  await expect(page.locator('text=Injected Test Product')).toBeVisible();
});
```

---

## 🛠️ Prerequisites & Installation

* **Node.js** (v16.x or higher recommended)
* **npm** or **yarn**

### Quick Setup:
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Abhishekkumar503/PlaywrightAutomationWithJS.git
   cd PlaywrightAutomationWithJS
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Install Playwright Browsers:**
   ```bash
   npx playwright install
   ```

---

## 🧪 Running Tests

* **Run all tests (Headless mode):**
  ```bash
  npx playwright test
  ```
* **Run tests with Interactive UI Mode:**
  ```bash
  npx playwright test --ui
  ```
* **Run tests in Headed mode (visible browser):**
  ```bash
  npx playwright test --headed
  ```
* **Run a specific test file:**
  ```bash
  npx playwright test tests/login.spec.js
  ```

---

## 📊 Test Reports & Debugging

Playwright provides rich execution reports, trace viewers, and failure artifacts:
* **View HTML Report:**
  ```bash
  npx playwright show-report
  ```
* **Debug tests with Inspector:**
  ```bash
  npx playwright test --debug
  ```

---

## 🤝 Contributing & Feedback

Contributions, pull requests, and suggestions are welcome! Feel free to open issues directly in the [GitHub Repository](https://github.com/Abhishekkumar503/PlaywrightAutomationWithJS/issues).

## 📝 License
This project is licensed under the [MIT License](LICENSE).
