// This file is a fixture for the InventoryPage in Playwright tests. It sets up the necessary context for tests that require the InventoryPage, including logging in as a standard user before each test. The fixture is defined using Playwright's test.extend method, 
// allowing tests to access the InventoryPage instance easily.

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