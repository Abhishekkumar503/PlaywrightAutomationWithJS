import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
    country: string;
}

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder}>
({
    testDataForOrder: {
        username: "abis@gmail.com",
        password: "Login@123",
        productName: "Zara Coat 3",
        country: "United States"
    }
});
