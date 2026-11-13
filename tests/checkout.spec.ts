// tests/checkout.spec.ts

// Usa el fixture de inventario: cada test arranca logueado en /inventory.html.
import { test, expect } from '../fixtures/inventory.fixture';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {

    test('Checkout 01 - Comprar un producto de punta a punta', async ({ page, inventoryPage }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // Agregar la mochila e ir al carrito
        await inventoryPage.addBackpackButton.click();
        await inventoryPage.cartLink.click();
        await expect(page).toHaveURL(/cart\.html/);
        await expect(cartPage.cartItems).toHaveCount(1);

        // Paso 1: datos del comprador
        await cartPage.checkoutButton.click();
        await expect(page).toHaveURL(/checkout-step-one\.html/);
        await checkoutPage.firstName.fill('Elena');
        await checkoutPage.lastName.fill('Garrós');
        await checkoutPage.postalCode.fill('1000');
        await checkoutPage.continueButton.click();

        // Paso 2: resumen
        await expect(page).toHaveURL(/checkout-step-two\.html/);
        await checkoutPage.finishButton.click();

        // Paso 3: confirmación
        await expect(page).toHaveURL(/checkout-complete\.html/);
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });

    test('Checkout 02 - No se puede continuar sin completar los datos', async ({ page, inventoryPage }) => {
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await inventoryPage.addBackpackButton.click();
        await inventoryPage.cartLink.click();
        await cartPage.checkoutButton.click();
        await checkoutPage.continueButton.click();

        // Sigue en el paso 1 y muestra el error
        await expect(page).toHaveURL(/checkout-step-one\.html/);
        await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    });

});
