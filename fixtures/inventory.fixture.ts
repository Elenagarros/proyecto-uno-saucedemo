// fixtures/inventory.fixture.ts

import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

type InventoryFixtures = {
    inventoryPage: InventoryPage;
};

export const test = base.extend<InventoryFixtures>({
    inventoryPage: [async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
        await use(new InventoryPage(page));
    }, { auto: true }],
});

export { expect };