import { test, expect } from '../fixtures/base-fixtures';

test.describe('Мобильный smoke-набор', () => {
  test('навигация открывает меню и переводит к проектам', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Открыть меню' });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const projectsLink = page.locator('.nav a[href="#projects"]');
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('фильтрация проектов работает', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();

    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    await yearFilter.locator('.filter-trigger').click();
    await yearFilter
      .locator('.filter-option')
      .filter({ hasText: '2026' })
      .locator('input')
      .click();

    const visibleCards = page.locator('.all-projects .project-card:visible');
    await expect(visibleCards).toHaveCount(6);
    await expect(visibleCards.locator('.year-badge')).toHaveText([
      '2026',
      '2026',
      '2026',
      '2026',
      '2026',
      '2026',
    ]);
  });

  test('демо открывается и закрывается по Escape', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();

    const demoButton = page
      .locator('.all-projects .link-btn.primary:has-text("Посмотреть демо")')
      .first();
    await demoButton.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
