// tests/auth.setup.ts

// Se ejecuta una vez antes de los tests: hace login y guarda la sesión para reutilizarla.
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, AUTH_FILE } from '../data/users';

setup('login de standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await page.context().storageState({ path: AUTH_FILE });
});
