import { Page, Locator } from '@playwright/test';   // tipos de Playwright que necesita la ficha

export class LoginPage {                            // la ficha de la página de login
  username: Locator;                                // datos que tiene la ficha
  password: Locator;
  loginButton: Locator;
  errorMessage: Locator;

  constructor(page: Page) {                         // se ejecuta al crear la ficha (new LoginPage(page))
    this.username = page.locator('[data-test="username"]');         // tu locator, igual
    this.password = page.locator('[data-test="password"]');         // tu locator, igual
    this.loginButton = page.locator('[data-test="login-button"]');  // tu locator, igual
    this.errorMessage = page.locator('[data-test="error"]');        // mensaje rojo cuando el login falla
  }

  async login(user: string, pass: string) {         // la "receta": iniciar sesión
    await this.username.fill(user);                 // tu línea 1
    await this.password.fill(pass);                 // tu línea 2
    await this.loginButton.click();                 // tu línea 3
  }
}