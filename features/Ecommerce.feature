Feature: Ecommerce Validations

    @Regression
    Scenario Outline: Placing the Order
        Given a login to ecommerce application with "abis@gmail.com" and "Login@123"
        When Add "<productName>" to the cart
        Then Verify "<productName>" is displayed in the cart
        When enter "india" detail and place the order
        Then Order is present in the orderHistory

        Examples:
            | productName   |
            | "Zara Coat 3" |


        