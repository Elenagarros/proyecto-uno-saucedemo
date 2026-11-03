import { test, expect } from './fixtures/inventory.fixture';

test.describe('Inventory', () => {

    test('Inventory 01 - El titulo de la pagina es el correcto', async ({ page }) => {
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('Inventory 02 - Products es visible en la página', async ({ inventoryPage }) => {
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('Inventory 03 - Verificar que la hamburguesa este visible', async ({ inventoryPage }) => {
        await expect(inventoryPage.burgerButton).toBeVisible();
    });

    test('Inventory 04 - Verificar que el carrito de compras sea visible', async ({ inventoryPage }) => {
        await expect(inventoryPage.cartLink).toBeVisible();
    });

    test('Inventory 05 - Verificar que el sorting sea visible', async ({ inventoryPage }) => {
        await expect(inventoryPage.sortContainer).toBeVisible();
    });

    test('Inventory 06 - Verificar que el sorting de Z a A funcione', async ({ inventoryPage }) => {
        await inventoryPage.sortContainer.selectOption('za');
        await expect(inventoryPage.itemNames.first()).toContainText('Test.allTheThings() T-Shirt (Red)');
    });

    test('Inventory 07 - Verificar que el sorting de A a Z funcione', async ({ inventoryPage }) => {
        await inventoryPage.sortContainer.selectOption('az');
        await expect(inventoryPage.itemNames.first()).toContainText('Sauce Labs Backpack');
    });

    test('Inventory 08 - Verificar que haya 6 productos en el catálogo', async ({ inventoryPage }) => {
        await expect(inventoryPage.itemDescriptions).toHaveCount(6);
    });

    test('Inventory 09 - Verificar que se puede agregar un producto al carrito', async ({ inventoryPage }) => {
        await expect(inventoryPage.addBackpackButton).toBeVisible();
        await inventoryPage.addBackpackButton.click();
        await expect(inventoryPage.cartBadge).toMatchAriaSnapshot(`- text: "1"`);
        await expect(inventoryPage.removeBackpackButton).toBeVisible();
        await expect(inventoryPage.addBackpackButton).not.toBeVisible();
    });

    test('Inventory 10 - Verificar que se puede quitar un producto del carrito', async ({ inventoryPage }) => {
        await expect(inventoryPage.addBackpackButton).toBeVisible();
        await inventoryPage.addBackpackButton.click();
        await inventoryPage.removeBackpackButton.click();
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

    test('Inventory 11 - Verificar el sorting de precio de menor a mayor', async ({ inventoryPage }) => {
        await expect(inventoryPage.sortContainer).toBeVisible();
        await inventoryPage.sortContainer.selectOption('lohi');
        await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Onesie');
    });

    test('Inventory 12 - Verificar el sorting de precio de mayor a menor', async ({ inventoryPage }) => {
        await expect(inventoryPage.sortContainer).toBeVisible();
        await inventoryPage.sortContainer.selectOption('hilo');
        await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Fleece Jacket');
    });

    test('Inventory 13 - Verificar que el menu hamburguesa se abre', async ({ inventoryPage }) => {
        await expect(inventoryPage.openMenuButton).toBeVisible();
        await inventoryPage.openMenuButton.click();
        await expect(inventoryPage.sidebarPanel).toBeVisible();
        await expect(inventoryPage.inventorySidebarLink).toBeVisible();
        await expect(inventoryPage.dynamicCatalogSidebarLink).toBeVisible();
        await expect(inventoryPage.aboutSidebarLink).toBeVisible();
        await expect(inventoryPage.logoutSidebarLink).toBeVisible();
        await expect(inventoryPage.resetSidebarLink).toBeVisible();
    });

    test('Inventory 14 - Verificar que al hacer click en un producto se abre su detalle', async ({ inventoryPage }) => {
        await inventoryPage.itemNames.first().click();
        await expect(inventoryPage.itemNames).toHaveText('Sauce Labs Backpack');
    });

    test('Inventory 15 - Verificar que el carrito lleva a la pagina del carrito', async ({ page, inventoryPage }) => {
        await expect(inventoryPage.cartLink).toBeVisible();
        await inventoryPage.cartLink.click();
        await expect(page).toHaveURL(/cart\.html/);
    });

});