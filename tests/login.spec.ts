// Login de Swqag labs

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';

test('la home carga con el título correcto', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
});

test('login con usuario y contraseña correctos', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.login(USERS.standard.username, USERS.standard.password);

 await expect(page).toHaveURL(/inventory\.html/);
});
