// Login de Swqag labs

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('la home carga con el título correcto', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveTitle('Swag Labs');
});

test('login con usuario y contraseña correctos', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

 await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});