// pages/CheckoutPage.ts

import { Page, Locator } from '@playwright/test';

// Cubre los 3 pasos del checkout: datos, resumen y confirmación
export class CheckoutPage {
    firstName: Locator;
    lastName: Locator;
    postalCode: Locator;
    continueButton: Locator;
    finishButton: Locator;
    completeHeader: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
        this.completeHeader = page.getByTestId('complete-header');
        this.errorMessage = page.getByTestId('error');
    }
}
