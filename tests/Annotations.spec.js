const {test, expect} = require('@playwright/test');

test.beforeAll(async () => {
    console.log("Before all tests");
});

test.afterAll(async () => {
    console.log("After all tests");
});

test.beforeEach(async () => {
    console.log("Before each test");
});

test.afterEach(async () => {
    console.log("After each test");
});


test('API test', async ({request}) => {
    console.log("API test started");
});

test.skip('Skipped test', async ({page}) => {
    console.log("This test is skipped");
});

test('Another test', async ({page}) => {
    console.log("Another test started");
});

/**
 * Running 3 tests using 3 workers
[chromium] › tests/WebAPIPart1.spec.js:28:1 › Another test
Before all tests
[chromium] › tests/WebAPIPart1.spec.js:20:1 › API test
Before all tests
[chromium] › tests/WebAPIPart1.spec.js:28:1 › Another test
Before each test
[chromium] › tests/WebAPIPart1.spec.js:20:1 › API test
Before each test
API test started
After each test
After all tests
[chromium] › tests/WebAPIPart1.spec.js:28:1 › Another test
Another test started
After each test
After all tests
  1 skipped
  2 passed (507ms)

To open last HTML report run:

 */