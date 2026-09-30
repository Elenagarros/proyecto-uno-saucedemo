// tests/home.spec.ts

import { test, expect } from '@playwright/test';

test('la home carga con el título correcto', async ({ page }) => {

  await page.goto('/');

  await expect(page).toHaveTitle('Swag Labs');

});
