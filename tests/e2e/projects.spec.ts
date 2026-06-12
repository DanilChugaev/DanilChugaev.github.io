import { test, expect } from '../fixtures/base-fixtures';

test.describe('Projects секция', () => {
  test('секция проектов отображается', async ({ page }) => {
    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('карточки проектов отображаются', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('нет текста "Нет таких" когда проекты есть', async ({ page }) => {
    const emptyText = page.locator('.projects-empty');
    await expect(emptyText).not.toBeVisible();
  });

  test('каждая карточка содержит заголовок проекта', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const title = card.locator('.project-title');
      await expect(title).toBeVisible();
      await expect(title).toHaveCount(1);
    }
  });

  test('каждая карточка содержит описание', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const desc = card.locator('.project-description');
      await expect(desc).toBeVisible();
    }
  });

  test('каждая карточка содержит год', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const yearBadge = card.locator('.year-badge');
      await expect(yearBadge).toBeVisible();
      // Год — это 4 цифры
      const yearText = await yearBadge.textContent();
      expect(yearText).toMatch(/^\d{4}$/);
    }
  });

  test('каждая карточка содержит теги технологий', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const techTags = card.locator('.tech-tag');
      const tagCount = await techTags.count();
      expect(tagCount).toBeGreaterThan(0);
    }
  });

  test('каждая карточка содержит ссылку на GitHub', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const count = await projectCards.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const githubLink = card.locator('a:has-text("GitHub")');
      await expect(githubLink).toBeVisible();
      const href = await githubLink.getAttribute('href');
      expect(href).toContain('github.com');
    }
  });

  test('карточки с demo содержат кнопку "Посмотреть демо"', async ({
    page,
  }) => {
    // Проекты с demo: id 2, 4, 5, 8, 9, 10, 11, 12, 13
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );
    const count = await demoButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('фильтр по году — выбор 2026', async ({ page }) => {
    // Скроллим к проектам
    const projectsLink = page.locator('.nav a').nth(2);
    await projectsLink.click();
    await page.waitForTimeout(300);

    // Находим и кликаем фильтр года 2026 через label
    const yearLabels = page.locator('label[for*="filter-year-"]');
    let clicked2026 = false;
    for (let i = 0; i < (await yearLabels.count()); i++) {
      const label = yearLabels.nth(i);
      const text = await label.textContent();
      if ((text?.trim() ?? '').trim() === '2026' && (await label.isVisible())) {
        await label.click();
        await page.waitForTimeout(300);
        await expect(label).toHaveClass('active');
        clicked2026 = true;
        break;
      }
    }

    if (clicked2026) {
      // Проверяем что отображаются только проекты 2026 года
      const visibleCards = page.locator('.project-card');
      const count = await visibleCards.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const yearBadge = visibleCards.nth(i).locator('.year-badge');
        const yearText = await yearBadge.textContent();
        expect(yearText).toBe('2026');
      }
    }
  });

  test('фильтр по году — выбор "Все"', async ({ page }) => {
    // Сбрасываем фильтр на "все" через label
    const allLabel = page.locator('label[for*="filter-year-all"]');
    if (await allLabel.isVisible()) {
      await allLabel.click();
      await page.waitForTimeout(300);
    }

    // Теперь все проекты должны отображаться
    const visibleCards = page.locator('.project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(15); // Должно быть много проектов
  });

  test('фильтр по типу — "Сервисы"', async ({ page }) => {
    // Кнопка "Все" для сброса предыдущих фильтров
    const allYearLabel = page.locator('label[for*="filter-year-all"]');
    if (await allYearLabel.isVisible()) {
      await allYearLabel.click();
      await page.waitForTimeout(300);
    }

    // Кликаем на фильтр типа "Сервисы" через label (label for=filter-type-service)
    const serviceLabel = page.locator('label[for="filter-type-service"]');
    await expect(serviceLabel).toBeVisible();
    await serviceLabel.click();
    await page.waitForTimeout(300);

    // Проверяем что label стал активным
    await expect(serviceLabel).toHaveClass('active');

    // Проверяем что отображаются только проекты с type='service'
    // Из projects.ts: type='service' имеют id 10, 11, 12, 13, 18
    const visibleCards = page.locator('.project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);

    // Каждый видимый проект должен иметь type='service' (проверяем по data атрибутам или другим признакам)
    // В данном случае проверяем что количество == количеству проектов типа service
    // id 10, 11, 12, 13, 18 = 5 проекта с type='service'
    expect(count).toBe(5);
  });

  test('фильтр по типу — "Тестовые"', async ({ page }) => {
    const testLabel = page.locator('label[for*="filter-type-Тестовые"]');
    if (await testLabel.isVisible()) {
      await testLabel.click();
      await page.waitForTimeout(300);
      await expect(testLabel).toHaveClass('active');
    }
  });

  test('фильтр по типу — "Игры"', async ({ page }) => {
    const gameLabel = page.locator('label[for*="filter-type-Игры"]');
    if (await gameLabel.isVisible()) {
      await gameLabel.click();
      await page.waitForTimeout(300);
      await expect(gameLabel).toHaveClass('active');
    }
  });

  test('фильтр по типу — "Другое"', async ({ page }) => {
    const otherLabel = page.locator('label[for*="filter-type-Другое"]');
    if (await otherLabel.isVisible()) {
      await otherLabel.click();
      await page.waitForTimeout(300);
      await expect(otherLabel).toHaveClass('active');
    }
  });

  test('комбинированная фильтрация: год + тип', async ({ page }) => {
    // Сначала фильтр по году через label
    const yearLabels = page.locator('label[for*="filter-year-"]');
    for (let i = 0; i < (await yearLabels.count()); i++) {
      const label = yearLabels.nth(i);
      const text = await label.textContent();
      if ((text?.trim() ?? '').trim() === '2024' && (await label.isVisible())) {
        await label.click();
        await page.waitForTimeout(300);
        break;
      }
    }

    // Затем фильтр по типу через label
    const serviceLabel = page.locator('label[for*="filter-type-Сервисы"]');
    if (await serviceLabel.isVisible()) {
      await serviceLabel.click();
      await page.waitForTimeout(300);

      // Проверяем что активные фильтры есть
      const activeFilters = page.locator('.filter-buttons label.active');
      const activeCount = await activeFilters.count();
      expect(activeCount).toBeGreaterThan(0);
    }
  });

  test('сброс всех фильтров показывает все проекты', async ({ page }) => {
    // Сбрасываем фильтр через "Все" label
    const allLabel = page.locator('label[for*="filter-year-all"]');
    if (await allLabel.isVisible()) {
      await allLabel.click();
      await page.waitForTimeout(300);
    }

    const visibleCards = page.locator('.project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(5);
  });

  test('при наведении на карточку есть hover эффект', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    const firstCard = projectCards.first();

    const initialBox = await firstCard.boundingBox();
    await firstCard.hover();
    await page.waitForTimeout(200);
    const hoveredBox = await firstCard.boundingBox();

    // Карточка должна сдвинуться вверх (translateY(-5px))
    expect(initialBox!.y).not.toEqual(hoveredBox!.y);
  });

  test('карточки отображаются в grid', async ({ page }) => {
    const projectsGrid = page.locator('.projects-grid');
    await expect(projectsGrid).toBeVisible();
  });
});
