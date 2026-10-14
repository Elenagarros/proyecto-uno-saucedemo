# Resumen de referencia: Playwright + Page Object Model (saucedemo)

## 1. Locators y `const`

- Un **locator** es la descripción de cómo encontrar un elemento. No busca nada hasta que hacés una acción (`click`, `fill`, `selectOption`) o una aserción (`expect`).
- Se guarda en una `const` para no repetir el selector y cambiarlo en un solo lugar.
- Si guardás un **dato** (`await ...allTextContents()`), la const queda con el valor de ese momento. Si la página cambia, hay que volver a leerlo.
- `const` si no se reasigna, `let` solo si el valor va a cambiar.

## 2. Reglas de `expect` y acciones

- Los matchers se encadenan sobre `expect(...)`, nunca sobre el locator: `await expect(locator).toBeVisible()`.
- `selectOption` es una **acción**, no una aserción. Se verifica el resultado con `toHaveValue`.
- En un `<select>` nativo no se hace `click()` sobre las `<option>`: se usa `selectOption`.
- Todo lo que devuelve una Promise lleva `await`.

## 3. `data-test` vs `data-testid`

Saucedemo usa `data-test`. `getByTestId` busca `data-testid` por defecto, por eso daba `element(s) not found`. Dos soluciones:

```typescript
// Opción A: playwright.config.ts
use: {
  baseURL: 'https://www.saucedemo.com',
  testIdAttribute: 'data-test',
},

// Opción B: locator CSS
page.locator('[data-test="product-sort-container"]');
```

## 4. Qué es un Page Object

Una clase que representa una página. Es el "control remoto" de esa página:

- **Locators** en el constructor (dónde está cada elemento).
- **Métodos** con nombres de negocio (qué se puede hacer): `login`, `sortBy`, `addToCart`.
- El test no conoce selectores, solo llama métodos.
- Si cambia un selector, se arregla en un solo archivo.

## 5. Estructura del proyecto

```
tu-proyecto/
  pages/
    LoginPage.ts
    InventoryPage.ts
  tests/
    login.spec.ts
    inventory.spec.ts
  playwright.config.ts
```

- Los archivos de `pages/` **no** terminan en `.spec.ts` (Playwright los tomaría como tests).
- Los imports deben coincidir exacto con el nombre de carpeta y archivo, incluidas las mayúsculas.
- Los imports van **sin extensión**: `'../pages/LoginPage'`.
- `../` sube de `tests/` a la raíz.

## 6. Plantilla de un PO

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, password: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

| Palabra | Significado |
|---|---|
| `class` | Molde de la página |
| `constructor` | Se ejecuta una vez al hacer `new`, deja todo listo |
| `this` | Esta instancia de la clase |
| `readonly` | Se asigna una vez y no se reasigna |
| `async` / `await` | Esperar a que termine antes de seguir |

## 7. Cómo se usa en el test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login correcto', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory\.html/);
});
```

## 8. Reglas de oro del POM

1. Locators en el constructor, acciones en métodos.
2. **Los `expect` van en el test, no en el PO.** El PO dice *cómo* interactuar; el test decide *qué* validar.
3. Un PO por página, y cada método hace una sola cosa.
4. Nombres de negocio (`addToCart`), no técnicos (`clickButton1`).
5. `goto()` solo en las páginas a las que se entra por URL.
6. Para reutilizar: `beforeEach` con login, o fixtures.

## 9. Errores que tuviste y su causa

| Error | Causa | Solución |
|---|---|---|
| `expect(...).toBeVisible() failed ... element(s) not found` | `getByTestId` busca `data-testid` y el sitio usa `data-test` | `testIdAttribute: 'data-test'` o locator CSS |
| `Cannot find module '../pages/login.page'` | El import no coincide con el nombre real del archivo | Que carpeta, archivo e import coincidan exacto |
| El PO guardado como `login.spec.ts` | Nombre de test para una clase | Renombrar a `LoginPage.ts` |
| Paréntesis mal cerrados en `expect(...selectOption().toBeVisible())` | Mezcla de acción y aserción | Separarlas en líneas distintas |

## 10. Comandos útiles

```bash
npx playwright test                              # todos los tests
npx playwright test tests/login.spec.ts          # un archivo
npx playwright test tests/inventory.spec.ts:80   # un test por línea
npx playwright test --headed --debug             # inspector con "Pick locator"
npx playwright show-trace                        # ver el trace
```

## 11. Próximo paso: fixtures

En lugar de hacer `new LoginPage(page)` en cada test o `beforeEach`, las fixtures te entregan el PO ya creado. La clase del PO no cambia, solo cambia cómo se instancia.
