// Inventory - Swag Labs

import { test, expect } from '@playwright/test';

// Esto se ejecuta antes de cada prueba para NO REPETIR el login }

test.beforeEach( async ({ page }) => {
    // 1. Entrar a la web de Swag Labs
    await page.goto('/');

    // 2. Hacer login con usuario y contraseña correctos y hacer click
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // 3. Verificar que la URL es la correcta
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// Comienzo de las pruebas de la página Inventory

test('Prueba 1: Verificar que el catálogo de productos carga con el título correcto', async ({ page }) => {
  // Verificar que la página de inventory.html carga con el título correcto
  await expect(page).toHaveTitle('Swag Labs');
  
  // Verificar que el título de la página es "Products"
    const pageTitle = page.locator('.title');
    await expect(pageTitle).toHaveText('Products');

  // Verificar que el carrito de compras es visible
    const cartIcon = page.locator('.shopping_cart_link');
    await expect(cartIcon).toBeVisible();
  
});

test('Prueba 2: Verificar que haya 6 productos en el catálogo', async ({ page }) => {
    // Buscamos todos los elementos que tengan el test id "inventory-item" 
  const products = page.locator('[data-test="inventory-item"]');
    
   // Verificamos que haya 6 elementos
  await expect(products).toHaveCount(6);
});

test('Prueba 3: Verificar que se puede agregar items al carrito de compras', async ({ page }) => {
    // Hacer click en el botón de agregar al carrito del primer producto
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Verificar que el carrito tenga un circulo rojo y muestre un 1 
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
    
    // Verificar que el boton de agregar al carrito del primer producto cambió a "Remove"
    const removeButton = page.getByRole('button', { name: 'Remove' }).first();
    await expect(removeButton).toBeVisible();
});

test('Prueba 4:Verificar que se puede eliminar items del carrito de compras', async ({ page }) => {
    // Hacer click en el botón de agregar al carrito del primer producto
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');  
    
    // Hacer click en el boton de remover del primer producto
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Verificar que el 1 rojo ya no es visible
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
   }); 

test('Prueba 5: Verificar que se puede filtrar los productos por nombre de A-Z y Z-A', async ({ page }) => {
    // Click en el select de filtrado y seleccionar "Name (A to Z)"
    await expect(page.getByText('Name (A to Z)Name (A to Z)')).toBeVisible();
    await page.getByText('Name (A to Z)Name (A to Z)').click();
    
    // Verificar que el primer producto es "Sauce Labs Backpack"
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText('Sauce Labs Backpack');


});