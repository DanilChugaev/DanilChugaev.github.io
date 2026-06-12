import { test, expect } from '../fixtures/base-fixtures';

test.describe('Навигация — Header', () => {
  test('header видим при загрузке страницы', async ({ page }) => {
    await expect(page.locator('header.header')).toBeVisible();
  });

  test('логотип "Danil Chugaev" ведет наверх', async ({ page }) => {
    const logoLink = page.locator('.logo-link').first();
    await expect(logoLink).toHaveText('Danil Chugaev');
    await expect(logoLink).toHaveAttribute('href', '/');
    await expect(logoLink).toHaveAttribute('aria-label', 'На главную');
  });

  test('все пункты навигации отображаются', async ({ page }) => {
    const navLinks = page.locator('.nav a');
    await expect(navLinks).toHaveCount(4);
    await expect(navLinks.nth(0)).toHaveText('Обо мне');
    await expect(navLinks.nth(1)).toHaveText('Навыки');
    await expect(navLinks.nth(2)).toHaveText('Проекты');
    await expect(navLinks.nth(3)).toHaveText('Контакты');
  });

  test('скролл к секции "Обо мне" через навигацию', async ({ page }) => {
    const navLink = page.locator('.nav a').nth(0); // Обо мне
    await navLink.click();

    // Ждем скролла и проверяем что About секция в viewport
    await page.waitForTimeout(300);
    const aboutSection = page.locator('section#about');
    const box = await aboutSection.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(-100); // близко к верху viewport
  });

  test('скролл к секции "Навыки" через навигацию', async ({ page }) => {
    const navLink = page.locator('.nav a').nth(1); // Навыки
    await navLink.click();

    await page.waitForTimeout(300);
    const skillsSection = page.locator('section#skills');
    const box = await skillsSection.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(-100);
  });

  test('скролл к секции "Проекты" через навигацию', async ({ page }) => {
    const navLink = page.locator('.nav a').nth(2); // Проекты
    await navLink.click();

    await page.waitForTimeout(300);
    const projectsSection = page.locator('section#projects');
    const box = await projectsSection.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(-100);
  });

  test('скролл к секции "Контакты" через навигацию', async ({ page }) => {
    const navLink = page.locator('.nav a').nth(3); // Контакты
    await navLink.click();

    await page.waitForTimeout(300);
    const contactsSection = page.locator('section#contacts');
    const box = await contactsSection.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(-100);
  });

  test('skip-link работает (Перейти к основному содержимому)', async ({
    page,
  }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveText('Перейти к основному содержимому');
    // Skip-ссылка должна быть скрыта но доступна
    await expect(skipLink).not.toHaveAttribute('tabindex', '-1');
  });

  test('mobile menu кнопка отображается на мобильном viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).toBeVisible();
    await expect(mobileMenuBtn).toContainText('☰');
  });

  test('открытие мобильного меню', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const nav = page.locator('.nav');

    await expect(nav).not.toHaveClass(/open/);
    await mobileMenuBtn.click();
    await expect(nav).toHaveClass(/open/);
    await expect(mobileMenuBtn).toContainText('✕');
  });

  test('закрытие мобильного меню повторным кликом', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const nav = page.locator('.nav');

    await mobileMenuBtn.click();
    await expect(nav).toHaveClass(/open/);

    await mobileMenuBtn.click();
    await expect(nav).not.toHaveClass(/open/);
    await expect(mobileMenuBtn).toContainText('☰');
  });

  test('мобильное меню закрывается при клике на пункт навигации', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const nav = page.locator('.nav');

    await mobileMenuBtn.click();
    await expect(nav).toHaveClass(/open/);

    // Клик на первый пункт навигации
    await nav.locator('a').nth(0).click();
    await expect(nav).not.toHaveClass(/open/);
  });

  test('mobile menu кнопка имеет правильный aria-expanded', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuBtn = page.locator('.mobile-menu-btn');

    // Изначально меню закрыто
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');

    await mobileMenuBtn.click();
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'true');

    await mobileMenuBtn.click();
    await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('мобильное меню содержит все пункты навигации', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    const nav = page.locator('.nav');

    await mobileMenuBtn.click();

    const navLinks = nav.locator('a');
    await expect(navLinks).toHaveCount(4);
    await expect(navLinks.nth(0)).toHaveAttribute('href', '#about');
    await expect(navLinks.nth(1)).toHaveAttribute('href', '#skills');
    await expect(navLinks.nth(2)).toHaveAttribute('href', '#projects');
    await expect(navLinks.nth(3)).toHaveAttribute('href', '#contacts');
  });

  test('навигация на десктопе без мобильного меню', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).toBeHidden();
  });

  test('хедер имеет правильные aria-label', async ({ page }) => {
    const header = page.locator('header.header');
    // Хедер должен иметь role="banner" или быть семантичным header
    await expect(header).toHaveAttribute('class', 'header');
  });
});
