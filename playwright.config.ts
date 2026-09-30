import { defineConfig, devices } from '@playwright/test';

/**
* Playwright Config Template por [ Elena Garrós]
* Documentación: https://playwright.dev/docs/test-configuration
*/
export default defineConfig({
// Carpeta donde buscará los tests
testDir: './tests',

// Ejecutar tests en paralelo para ahorrar tiempo
fullyParallel: true,

// Fallar el build en CI si olvidaste un "test.only" en el código
forbidOnly: !!process.env.CI,

// Reintentar test fallidos (1 vez en local, 2 veces en Servidor de Integración Continua)
retries: process.env.CI ? 2 : 1,

// Número de trabajadores (workers) para ejecutar tests en paralelo
workers: process.env.CI ? 1 : undefined,

// Formato del reporte de resultados
reporter: [
['html', { open: 'never' }], // Genera reporte HTML pero no lo abre automáticamente
['list'] // Muestra progreso amigable en la consola
],

// Configuración global para todos los proyectos (navegadores)
use: {
// URL base para no escribirla completa en cada test (ej: await page.goto('/login'))
baseURL: 'https://saudedemo.com',

// Capturar trazas para debuguear sólo cuando un test falla
trace: 'retain-on-failure',

// Tomar captura de pantalla solo si el test falla
screenshot: 'only-on-failure',

// Grabar video solo si el test falla
video: 'retain-on-failure',

// Ignorar errores de HTTPS/SSL (útil para entornos de prueba locales)
ignoreHTTPSErrors: true,
},

/* Configuración de los Navegadores a probar */
projects: [
{
name: 'chromium',
use: { ...devices['Desktop Chrome'] },
},
/*{
name: 'firefox',
use: { ...devices['Desktop Firefox'] },
},
{
name: 'webkit',
use: { ...devices['Desktop Safari'] },
},*/

/* Configuración para móviles (descomenta si lo necesitas) */
// {
// name: 'Mobile Chrome',
// use: { ...devices['Pixel 5'] },
// },
],
});