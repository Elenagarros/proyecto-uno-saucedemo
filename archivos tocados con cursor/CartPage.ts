// pages/CartPage.ts

import { Page, Locator } from '@playwright/test';

export class CartPage {
    title: Locator;
    cartItems: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.cartItems = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
    }
}
