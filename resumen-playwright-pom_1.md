# Resumen de referencia: Playwright + Page Object (saucedemo)

## 1. Mi estilo

- **PO:** solo locators. El único método es `login()` en `LoginPage`, porque junta varios pasos.
- **Test:** las acciones (`click`, `selectOption`, `fill`) y los `expect`.
- **`goto('/')`:** va en el `beforeEach`, no en el PO.
- **Fixtures:** más adelante, para no repetir el `new` en cada test.

## 2. Locators y `const`

- Un **locator** es la descripción de cómo encontrar un elemento. No busca nada hasta que hacés una acción (`click`, `fill`, `selectOption`) o una aserción (`expect`).
- `const` = **ponerle nombre a algo para reutilizarlo**. No va en cada acción, solo cuando guardás algo.
- `const` si no se reasigna, `let` solo si el valor va a cambiar.

```typescript
// Sin const: se usa una sola vez
await page.goto('/');

// Con const: se reutiliza
const sort = page.getByTestId('product-sort-container');
await expect(sort).toBeVisible();
await sort.selectOption('lohi');
```

## 3. Reglas de `expect` y acciones

- Los matchers se encadenan sobre `expect(...)`, nunca sobre el locator: `await expect(locator).toBeVisible()`.
- `selectOption` es una **acción**, no una aserción. El resultado se verifica con `toHaveValue` o mirando el primer producto.
- En un `<select>` nativo no se hace `click()` sobre las `<option>`: se usa `selectOption`.
- Todo lo que devuelve una Promise lleva `await`.

## 4. `async` y `await`

- `await` va delante de toda acción del navegador (`click`, `fill`, `goto`).
- `async` va en la función que contiene un `await`.
- Por eso `login()` es `async`: adentro tiene 3 `await`.
- En el constructor no hace falta, porque armar un locator no toca el navegador.

## 5. `data-test` vs `data-testid`

Saucedemo usa el atributo `data-test`. `getByTestId` busca `data-testid` por defecto. Para que `getByTestId` funcione con saucedemo hay que configurarlo:

```typescript
// playwright.config.ts
use: {
  baseURL: 'https://www.saucedemo.com',
  testIdAttribute: 'data-test',
},
```

Alternativa sin tocar el config: locator CSS.

```typescript
page.locator('[data-test="product-sort-container"]');
```

## 6. Estructura del proyecto

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

## 7. Mi `LoginPage`

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  username: Locator;
  password: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
}
```

| Palabra | Significado |
|---|---|
| `class` | El molde de la página |
| `constructor` | Se ejecuta una vez al hacer `new`, y deja los locators listos |
| `this` | Esta instancia de la clase |
| `async` / `await` | Esperar a que termine antes de seguir |

**Por qué no guarda `page`:** `page` solo se usa dentro del constructor para armar los locators. Se guarda (`page: Page;` y `this.page = page;`) únicamente si un método del PO lo usa después, por ejemplo `this.page.goto(...)`.

El PO guarda locators. Si una acción junta varios pasos, esa acción es un método (una acción: “hacé esto”, va siempre CON parentesis).
LoginPage tiene 3 locators y un método login(), porque son 3 pasos seguidos (usuario, password, click). Por eso lleva async.

InventoryPage tiene solo locators (datos, sin parentesis), porque todo lo que hacés ahí es de un solo paso (click, selectOption). Por eso no lleva async.

Un async en un PO no es una excepción rara, es la consecuencia de esa regla: hay método, hay async. Si no hay método, no hay async.

## 8. Mi `InventoryPage` (solo locators)

```typescript
import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    title: Locator;
    cartLink: Locator;
    sortContainer: Locator;
    itemNames: Locator;
    // ...el resto de los locators

    constructor(page: Page) {
        this.title = page.getByTestId('title');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.sortContainer = page.getByTestId('product-sort-container');
        this.itemNames = page.getByTestId('inventory-item-name');
        // ...el resto de los locators
    }
}
```

## 9. La línea que cuesta: `new LoginPage(page)`

```typescript
const loginPage = new LoginPage(page);
```

| Parte | Qué hace |
|---|---|
| `new LoginPage(page)` | **Arma** una página de login real, conectada a la pestaña `page` |
| `=` | **Guarda** lo que armó |
| `const loginPage` | **El nombre** con el que lo guardás |

> "Armá la página de login sobre esta pestaña y guardala con el nombre `loginPage`."

- `LoginPage.ts` es el **molde**: sin `new`, no se puede usar.
- `(page)` es la pestaña. Los locators necesitan saber dónde buscar.
- Se escribe **una vez por PO, en cada lugar donde lo usás** (en el `beforeEach` o al principio del test). Después usás todo lo que tiene adentro sin más `const`.

```typescript
const inventoryPage = new InventoryPage(page);              // 1 vez: armar

await expect(inventoryPage.title).toHaveText('Products');   // usar
await inventoryPage.cartLink.click();                       // usar
```

## 10. El `beforeEach`, línea por línea

```typescript
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
});
```

| Línea | Qué hace |
|---|---|
| `test.beforeEach(` | "Antes de cada test, hacé esto" |
| `async ({ page }) => {` | La función que corre. `page` es la pestaña que Playwright da lista |
| `const loginPage = new LoginPage(page);` | Arma la página de login y la guarda (solo prepara, no abre nada) |
| `await page.goto('/');` | Abre la web (usa el `baseURL` del config) |
| `await loginPage.login(...)` | Ejecuta la receta: escribe usuario, escribe password, click en Login |

## 11. Un test usando el PO

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Inventory 06 - Sorting de Z a A', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortContainer.selectOption('za');
        await expect(inventoryPage.itemNames.first()).toContainText('Test.allTheThings() T-Shirt (Red)');
    });

});
```

## 12. Reglas de oro

1. Locators en el PO, acciones y `expect` en el test.
2. Un PO por página.
3. Nombres claros para los locators (`cartLink`, no `button1`).
4. El método en el PO solo cuando la acción tiene varios pasos (`login`).
5. Para no repetir el login: `beforeEach`. Para no repetir el `new`: fixtures.

## 13. Errores frecuentes

| Error | Causa | Solución |
|---|---|---|
| `element(s) not found` con `getByTestId` | Busca `data-testid` y el sitio usa `data-test` | `testIdAttribute: 'data-test'` en el config, o locator CSS |
| `Cannot find module '../pages/LoginPage'` | El import no coincide con el nombre real del archivo | Que carpeta, archivo e import coincidan exacto |
| El PO guardado como `login.spec.ts` | Nombre de test para una clase | Renombrar a `LoginPage.ts` |
| Paréntesis mal cerrados en `expect(...selectOption().toBeVisible())` | Mezcla de acción y aserción | Separarlas en líneas distintas |
| El test sigue antes de que ocurra la acción | Falta un `await` | Poner `await` delante de la acción |

## 14. Comandos útiles

```bash
npx playwright test                              # todos los tests
npx playwright test tests/login.spec.ts          # un archivo
npx playwright test tests/inventory.spec.ts:80   # un test por línea
npx playwright test --debug                      # inspector con "Pick locator"
npx playwright show-trace trace.zip              # ver un trace
```

## 15. Próximo paso: fixtures

En lugar de hacer `new LoginPage(page)` y `new InventoryPage(page)` en cada test, una fixture te entrega el PO ya creado. Los PO no cambian, solo cambia cómo se instancian.
