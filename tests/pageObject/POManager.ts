import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { OrderPlacedPage } from './OrderPlacedPage';
import { Page } from '@playwright/test';

export class POManager
{

    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    orderPlacedPage : OrderPlacedPage;
    page : Page;

    constructor(page : any)
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
