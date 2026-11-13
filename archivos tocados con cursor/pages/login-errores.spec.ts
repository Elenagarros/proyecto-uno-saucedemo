// tests/login-errores.spec.ts

// Usa el fixture loginPage: entrega el LoginPage ya creado, sin hacer new en cada test.
import { test, expect } from '../fixtures/login.fixture';
import { USERS } from '../data/users';

test.describe('Login con errores', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Login 01 - Usuario bloqueado muestra error', async ({ page, loginPage }) => {
        await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
        await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
        await expect(page).not.toHaveURL(/inventory\.html/);
    });

    test('Login 02 - Contraseña incorrecta muestra error', async ({ page, loginPage }) => {
        await loginPage.login(USERS.standard.username, 'contraseña_incorrecta');
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
        await expect(page).not.toHaveURL(/inventory\.html/);
    });

    test('Login 03 - Usuario vacío muestra error', async ({ loginPage }) => {
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toContainText('Username is required');
    });

});
