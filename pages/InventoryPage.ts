// pages/InventoryPage.ts

import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page
    readonly inventoryItems: Locator;
    readonly inventoryTitle: Locator;
    readonly shoppingCart: Locator;
    




    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryTitle = page.locator('.title');
        this.shoppingCart = page.locator('.shopping_cart_link');
    }

    async getInventoryItemsCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    // Pages/InventoryPage.ts
    async goto() {
        await this.page.goto('/');
    }

} 
