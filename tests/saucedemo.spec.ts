import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('SauceDemo', () => {
  test('la home carga con el título correcto', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('login con usuario y contraseña correctos', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test.describe('Inventory', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('/');
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Inventory 01 - El titulo de la pagina es el correcto', async ({ page }) => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page).toHaveTitle('Swag Labs');
    });

    test('Inventory 02 - Products es visible en la página', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.title).toHaveText('Products');
    });

    test('Inventory 03 - Verificar que la hamburguesa este visible', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.burgerButton).toBeVisible();
    });

    test('Inventory 04 - Verificar que el carrito de compras sea visible', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.cartLink).toBeVisible();
    });

    test('Inventory 05 - Verificar que el sorting sea visible', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.sortContainer).toBeVisible();
    });

    test('Inventory 06 - Verificar que el sorting de Z a A funcione', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.sortContainer.selectOption('za');
      await expect(inventoryPage.itemNames.first()).toContainText('Test.allTheThings() T-Shirt (Red)');
    });

    test('Inventory 07 - Verificar que el sorting de A a Z funcione', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.sortContainer.selectOption('az');
      await expect(inventoryPage.itemNames.first()).toContainText('Sauce Labs Backpack');
    });

    test('Inventory 08 - Verificar que haya 6 productos en el catálogo', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.itemDescriptions).toHaveCount(6);
    });

    test('Inventory 09 - Verificar que se puede agregar un producto al carrito', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.addBackpackButton).toBeVisible();
      await inventoryPage.addBackpackButton.click();
      await expect(inventoryPage.cartBadge).toMatchAriaSnapshot(`- text: "1"`);
      await expect(inventoryPage.removeBackpackButton).toBeVisible();
      await expect(inventoryPage.addBackpackButton).not.toBeVisible();
    });

    test('Inventory 10 - Verificar que se puede quitar un producto del carrito', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.addBackpackButton).toBeVisible();
      await inventoryPage.addBackpackButton.click();
      await inventoryPage.removeBackpackButton.click();
      await expect(inventoryPage.cartBadge).not.toBeVisible();
    });

    test('Inventory 11 - Verificar el sorting de precio de menor a mayor', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.sortContainer).toBeVisible();
      await inventoryPage.sortContainer.selectOption('lohi');
      await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Onesie');
    });

    test('Inventory 12 - Verificar el sorting de precio de mayor a menor', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.sortContainer).toBeVisible();
      await inventoryPage.sortContainer.selectOption('hilo');
      await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Fleece Jacket');
    });

    test('Inventory 13 - Verificar que el menu hamburguesa se abre', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.openMenuButton).toBeVisible();
      await inventoryPage.openMenuButton.click();
      await expect(inventoryPage.sidebarPanel).toBeVisible();
      await expect(inventoryPage.inventorySidebarLink).toBeVisible();
      await expect(inventoryPage.dynamicCatalogSidebarLink).toBeVisible();
      await expect(inventoryPage.aboutSidebarLink).toBeVisible();
      await expect(inventoryPage.logoutSidebarLink).toBeVisible();
      await expect(inventoryPage.resetSidebarLink).toBeVisible();
    });

    test('Inventory 14 - Verificar que al hacer click en un producto se abre su detalle', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.itemNames.first().click();
      await expect(inventoryPage.itemNames).toHaveText('Sauce Labs Backpack');
    });

    test('Inventory 15 - Verificar que el carrito lleva a la pagina del carrito', async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.cartLink).toBeVisible();
      await inventoryPage.cartLink.click();
      await expect(page).toHaveURL(/cart\.html/);
    });
  });
});
