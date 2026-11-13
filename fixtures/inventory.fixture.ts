// fixtures/inventory.fixture.ts

import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { AUTH_FILE } from '../data/users';

type InventoryFixtures = {
    inventoryPage: InventoryPage;
};

export const test = base.extend<InventoryFixtures>({
    // Arranca cada test con la sesión que guardó auth.setup.ts, sin escribir usuario y contraseña
    storageState: AUTH_FILE,
    inventoryPage: [async ({ page }, use) => {
        await page.goto('/inventory.html');
        await use(new InventoryPage(page));
    }, { auto: true }],
});

export { expect };
