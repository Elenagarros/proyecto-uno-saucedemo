// Test en crudo de Inventory

import { test, expect } from '@playwright/test';

test('Inventory 01 - El titulo de la pagina es el correcto', async ({ page }) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el titulo sea Swag Labs
    await expect(page).toHaveURL(/inventory\.html/);   // solo es cierta si entró a productos
    await expect(page).toHaveTitle('Swag Labs'); // pestaña
});

test('Inventory 02 - Products es visible en la página', async ({ page }) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que Products sea visible
    await expect(page.getByTestId('title')).toHaveText('Products'); // elemento
});

test('Inventory 03 - Verificar que la hamburguesa este visible', async ({ page }) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que la hamburguesa sea visible  
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();  // Recordar que el locator va adentro del paréntesis
});

test('Inventory 04 - Verificar que el carrito de compras sea visible', async ({ page }) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el carrito sea visible
    await expect(page.getByTestId('shopping-cart-link')).toBeVisible();  
});

test('Inventory 05 - Verificar que el sorting sea visible', async ({ page }) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el sorting sea visible
    await expect(page.getByTestId('product-sort-container')).toBeVisible();  
});

test('Inventory 06 - Verificar que el sorting de Z a A funcione', async ({ page }) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el sorting de Z a A funcione correctamente
    await page.getByTestId('product-sort-container').selectOption('za');
    // Verificar que el primer producto sea Test.allTheThings() T-Shirt (Red)
    await expect(page.getByTestId('inventory-item-name').first()).toContainText('Test.allTheThings() T-Shirt (Red)');
});

test('Inventory 07 - Verificar que el sorting de A a Z funcione', async ({ page }) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el sorting de A a Z funcione correctamente
    await page.getByTestId('product-sort-container').selectOption('az');
    // Verificar que el primer producto sea Sauce Labs Backpack
    await expect(page.getByTestId('inventory-item-name').first()).toContainText('Sauce Labs Backpack');
});

test('Inventory 08 - Verificar que haya 6 productos en el catálogo', async ({ page}) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que haya 6 elementos 
    await expect(page.getByTestId('inventory-item-description')).toHaveCount(6);
});

test('Inventory 09 - Verificar que se puede agregar un producto al carrito', async ({ page}) => {
// Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el boton de Add to cart es visible y hacer click en él
    await expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).toBeVisible();
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    // Verificar que el badge del carrito muestre ´'1' 
    await expect(page.getByTestId('shopping-cart-badge')).toMatchAriaSnapshot(`- text: "1"`);
    // Verificar que el botón cambió a "Remove"
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
    await expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).not.toBeVisible();
});

test('Inventory 10 - Verificar que se puede quitar un producto del carrito', async ({ page}) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el boton de Add to cart es visible y hacer click en él
    await expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).toBeVisible();
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    // Hacer click en el boton de remove
    await page.getByTestId('remove-sauce-labs-backpack').click();
    // Verificar que el badge de '1' ya no sea visible 
    await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
});

test('Inventory 11 - Verificar el sorting de precio de menor a mayor', async ({ page}) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el sorting sea visible
    const sort = page.getByTestId('product-sort-container');
    await expect(sort).toBeVisible();
    // Verificar que la primera opcion sea Sauce Labs Onesie
    await sort.selectOption('lohi');
    await expect(page.getByTestId('inventory-item-name').first()).toHaveText('Sauce Labs Onesie');
});

test('Inventory 12 - Verificar el sorting de precio de mayor a menor', async ({ page}) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que el sorting sea visible
    const sort = page.getByTestId('product-sort-container');
    await expect(sort).toBeVisible();
    // Verificar que la primera opcion sea Sauce Labs Fleece Jacket
    await sort.selectOption('hilo');
    await expect(page.getByTestId('inventory-item-name').first()).toHaveText('Sauce Labs Fleece Jacket');
});

test('Inventory 13 - Verificar que el menu hamburguesa se abre', async ({ page}) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Verificar que la hamburguesa es visible y hacer click en la hamburguesa
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    // Verificar que el contenedor del panel lateral sea visible
    await expect(page.locator('div').filter({ hasText: /^All ItemsDynamic CatalogAboutLogoutReset App State$/ })).toBeVisible();
    // Verificar que aparecen las opciones del menú 
    await expect(page.getByTestId('inventory-sidebar-link')).toBeVisible();
    await expect(page.getByTestId('dynamic-catalog-sidebar-link')).toBeVisible();
    await expect(page.getByTestId('about-sidebar-link')).toBeVisible();
    await expect(page.getByTestId('logout-sidebar-link')).toBeVisible();
    await expect(page.getByTestId('reset-sidebar-link')).toBeVisible();
});

test('Inventory 14 - Verificar que al hacer click en un producto se abre su detalle', async ({ page}) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Seleccionar un producto y abrirlo
    await page.getByTestId('inventory-item-name').first().click();
    // Verificar que aparece el detalle del producto seleccionado
    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
});

test('Inventory 15 - Verificar que el carrito lleva a la pagina del carrito', async ({ page}) => {
    // Abrir la web y Login
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // No voy a verificar que sea visible porque ya lo hice en un test previo - Verificar el click en él
    await expect(page.getByTestId('shopping-cart-link')).toBeVisible();  
    // Verificar la URL del carrito 
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
