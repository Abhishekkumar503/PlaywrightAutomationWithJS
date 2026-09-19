import { DashboardPage } from './DashboardPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { OrderPlacedPage } from './OrderPlacedPage';

class POManager
{

    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.orderPlacedPage = new OrderPlacedPage(page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getOrderPlacedPage()
    {
        return this.orderPlacedPage;
    }
}

module.exports = { POManager }
