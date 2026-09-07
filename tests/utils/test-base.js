const base = require("@playwright/test");

module.exports.customTest = base.test.extend({
    testDataForOrder: {
        username: "abis@gmail.com",
        password: "Login@123",
        productName: "Zara Coat 3",
        country: "United States"
    }
});
