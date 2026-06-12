import { test as base } from '@playwright/test';

/**
 * Базовые фикстуры для всех e2e тестов.
 * Гарантирует загрузку страницы и готовность DOM.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Ждем рендеринга основных секций
    await page.waitForSelector('section#hero', { state: 'visible' });
    await page.waitForSelector('section#about', { state: 'visible' });
    await page.waitForSelector('section#skills', { state: 'visible' });
    await page.waitForSelector('section#projects', { state: 'visible' });
    await page.waitForSelector('section#contacts', { state: 'visible' });
    await use(page);
  },
});

export { expect } from '@playwright/test';
