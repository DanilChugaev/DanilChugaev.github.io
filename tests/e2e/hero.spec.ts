import { test, expect } from '../fixtures/base-fixtures';

test.describe('Hero секция', () => {
  test('заголовок hero отображается', async ({ page }) => {
    const heroTitle = page.locator('h1#hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toHaveText('Данил Чугаев');
  });

  test('badge "Senior Frontend Developer" отображается', async ({ page }) => {
    const badge = page.locator('.hero-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('Senior Frontend Developer');
  });

  test('подзаголовок отображается', async ({ page }) => {
    const subtitle = page.locator('.hero-subtitle');
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText('10+ лет опыта');
    await expect(subtitle).toContainText('Эксперт Vue 3 / Nuxt 4 / TypeScript');
  });

  test('метрики отображаются (LCP, DAU, MTTR)', async ({ page }) => {
    const highlights = page.locator('.hero-highlights');
    await expect(highlights).toBeVisible();

    const items = highlights.locator('.highlight-item');
    await expect(items).toHaveCount(3);
    await expect(items.nth(0)).toContainText('LCP');
    await expect(items.nth(0)).toContainText('×2 ускорение');
    await expect(items.nth(1)).toContainText('DAU');
    await expect(items.nth(1)).toContainText('+18%');
    await expect(items.nth(2)).toContainText('MTTR');
    await expect(items.nth(2)).toContainText('3ч → 20мин');
  });

  test('три кнопки в hero секции', async ({ page }) => {
    const buttons = page.locator('.hero-buttons .btn');
    await expect(buttons).toHaveCount(3);
  });

  test('кнопка "Смотреть проекты" — primary стиль', async ({ page }) => {
    const primaryBtn = page.locator('.hero-buttons .btn.primary');
    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toHaveText('Смотреть проекты');
    await expect(primaryBtn).toHaveAttribute('href', '#projects');
  });

  test('кнопка "Обо мне" имеет href="#about"', async ({ page }) => {
    const buttons = page.locator('.hero-buttons .btn');
    // Вторая кнопка — "Обо мне" (не primary)
    const aboutBtn = buttons.nth(1);
    await expect(aboutBtn).toHaveText('Обо мне');
    await expect(aboutBtn).toHaveAttribute('href', '#about');
  });

  test('кнопка "GitHub" ведет на внешний ресурс', async ({ page }) => {
    const buttons = page.locator('.hero-buttons .btn');
    const githubBtn = buttons.nth(2);
    await expect(githubBtn).toHaveText('GitHub');
    await expect(githubBtn).toHaveAttribute(
      'href',
      'https://github.com/DanilChugaev',
    );
    await expect(githubBtn).toHaveAttribute('target', '_blank');
    await expect(githubBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('кнопка "Смотреть проекты" скроллит к проектам', async ({ page }) => {
    const projectsBtn = page.locator('.hero-buttons .btn.primary');
    await projectsBtn.click();

    await page.waitForTimeout(300);
    const projectsSection = page.locator('section#projects');
    const box = await projectsSection.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(-100);
  });

  test('кнопка "Обо мне" скроллит к about', async ({ page }) => {
    const aboutBtn = page.locator('.hero-buttons .btn').nth(1);
    await aboutBtn.click();

    await page.waitForTimeout(300);
    const aboutSection = page.locator('section#about');
    const box = await aboutSection.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(-100);
  });

  test('hero секция занимает весь viewport', async ({ page }) => {
    const hero = page.locator('section#hero');
    await expect(hero).toBeVisible();
    const box = await hero.boundingBox();
    expect(box!.height).toBeGreaterThan(500);
  });

  test('текст hero виден без скролла', async ({ page }) => {
    const heroContent = page.locator('.hero-content');
    await expect(heroContent).toBeInViewport();
  });
});
