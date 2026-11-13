// pages/InventoryPage.ts

import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    title: Locator;
    openMenuButton: Locator;
    sidebarPanel: Locator;
    cartLink: Locator;
    cartBadge: Locator;
    sortContainer: Locator;
    itemNames: Locator;
    itemDescriptions: Locator;
    addBackpackButton: Locator;
    removeBackpackButton: Locator;
    inventorySidebarLink: Locator;
    dynamicCatalogSidebarLink: Locator;
    aboutSidebarLink: Locator;
    logoutSidebarLink: Locator;
    resetSidebarLink: Locator;

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.sidebarPanel = page.locator('.bm-menu-wrap');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.sortContainer = page.getByTestId('product-sort-container');
        this.itemNames = page.getByTestId('inventory-item-name');
        this.itemDescriptions = page.getByTestId('inventory-item-description');
        this.addBackpackButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.removeBackpackButton = page.getByTestId('remove-sauce-labs-backpack');
        this.inventorySidebarLink = page.getByTestId('inventory-sidebar-link');
        this.dynamicCatalogSidebarLink = page.getByTestId('dynamic-catalog-sidebar-link');
        this.aboutSidebarLink = page.getByTestId('about-sidebar-link');
        this.logoutSidebarLink = page.getByTestId('logout-sidebar-link');
        this.resetSidebarLink = page.getByTestId('reset-sidebar-link');
    }
}