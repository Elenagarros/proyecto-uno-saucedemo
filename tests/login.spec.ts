// Login de Swqag labs

import { test, expect } from '@playwright/test';

test('la home carga con el título correcto', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');

});

test('login con usuario y contraseña correctos', async ({ page }) => {
    await page.goto('/');
    const username = page.getByPlaceholder('Username');
    const password = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});


