import { test, expect } from '../fixtures/base-fixtures';

async function setFilter(
  page: import('@playwright/test').Page,
  filterLabel: string,
  optionLabel: string,
) {
  const filter = page.locator('.filter-group').filter({ hasText: filterLabel });
  const trigger = filter.locator('.filter-trigger');
  await trigger.click();
  await filter
    .locator('.filter-option')
    .filter({ hasText: optionLabel })
    .click();
}

async function clearFilter(
  page: import('@playwright/test').Page,
  filterLabel: string,
) {
  const filter = page.locator('.filter-group').filter({ hasText: filterLabel });
  const checkedOptions = filter.locator('.filter-option input:checked');

  if ((await checkedOptions.count()) === 0) return;

  await filter.locator('.filter-trigger').click();
  while ((await checkedOptions.count()) > 0) {
    await checkedOptions.first().click();
  }
}

test.describe('Projects секция', () => {
  test('секция проектов отображается', async ({ page }) => {
    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('блок избранных проектов содержит пять выбранных работ', async ({
    page,
  }) => {
    const featuredProjects = page.locator('.featured-projects');
    await expect(featuredProjects).toBeVisible();
    await expect(featuredProjects.locator('.project-card')).toHaveCount(5);

    for (const title of [
      'Prompt Architect',
      'TODOS Daily',
      'Voice-to-Text Obsidian Plugin',
      'Labyrinth',
      'Хакатон в Островке',
    ]) {
      await expect(featuredProjects).toContainText(title);
    }
  });

  test('карточки проектов отображаются', async ({ page }) => {
    const projectCards = page.locator('.all-projects .project-card');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('нет текста "Нет таких" когда проекты есть', async ({ page }) => {
    const emptyText = page.locator('.projects-empty');
    await expect(emptyText).not.toBeVisible();
  });

  test('все карточки проектов всегда в DOM (для кеширования изображений)', async ({
    page,
  }) => {
    // Получаем общее количество всех карточек включая скрытые
    const allCards = page.locator('.all-projects .project-card');
    const totalCount = await allCards.count();

    await setFilter(page, 'Год', '2024');
    await page.waitForTimeout(300);

    // Даже с активным фильтром все проекты должны оставаться в DOM
    const totalAfterFilter = await allCards.count();
    expect(totalAfterFilter).toBe(totalCount);

    await clearFilter(page, 'Год');
  });

  test('каждая карточка содержит заголовок проекта', async ({ page }) => {
    const projectCards = page.locator('.all-projects .project-card');
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
    const projectCards = page.locator('.all-projects .project-card');
    const count = await projectCards.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const desc = card.locator('.project-description');
      await expect(desc).toBeVisible();
    }
  });

  test('каждая карточка содержит год', async ({ page }) => {
    const projectCards = page.locator('.all-projects .project-card');
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
    const projectCards = page.locator('.all-projects .project-card');
    const count = await projectCards.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const card = projectCards.nth(i);
      const techTags = card.locator('.tech-tag');
      const tagCount = await techTags.count();
      expect(tagCount).toBeGreaterThan(0);
    }
  });

  test('каждая карточка содержит ссылку на GitHub', async ({ page }) => {
    const projectCards = page.locator('.all-projects .project-card');
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
    const projectsLink = page.locator('.nav a').nth(3);
    await projectsLink.click();
    await page.waitForTimeout(300);

    await setFilter(page, 'Год', '2026');
    await page.waitForTimeout(300);

    // Проверяем что все видимые карточки имеют год 2026
    const allCards = page.locator('.all-projects .project-card');
    const totalCards = await allCards.count();

    let visibleCount = 0;
    for (let i = 0; i < totalCards; i++) {
      const card = allCards.nth(i);
      const isDisplayed = await card.evaluate(
        el => el.style.display !== 'none',
      );
      if (isDisplayed) {
        const yearBadge = card.locator('.year-badge');
        const yearText = await yearBadge.textContent();
        expect(yearText).toBe('2026');
        visibleCount++;
      }
    }

    expect(visibleCount).toBeGreaterThan(0);

    await clearFilter(page, 'Год');
  });

  test('фильтр по году — выбор "Все"', async ({ page }) => {
    await clearFilter(page, 'Год');
    await page.waitForTimeout(300);

    const visibleCards = page.locator('.all-projects .project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(15); // Должно быть много проектов
  });

  test('фильтр по типу — "Сервисы"', async ({ page }) => {
    await setFilter(page, 'Тип проекта', 'Сервисы');
    await page.waitForTimeout(300);

    // Проверяем что видимые карточки имеют тип "Сервисы" через data-type атрибут
    const allCards = page.locator('.all-projects .project-card');
    const totalCards = await allCards.count();

    let visibleCount = 0;
    for (let i = 0; i < totalCards; i++) {
      const card = allCards.nth(i);
      const isDisplayed = await card.evaluate(
        el => el.style.display !== 'none',
      );
      if (isDisplayed) {
        const typeAttr = await card.getAttribute('data-type');
        expect(typeAttr).toBe('service');
        visibleCount++;
      }
    }

    expect(visibleCount).toBeGreaterThan(0);

    await clearFilter(page, 'Тип проекта');
  });

  test('фильтр по типу — "Тестовые"', async ({ page }) => {
    await setFilter(page, 'Тип проекта', 'Тестовые');
    await expect(
      page
        .locator('.filter-group')
        .filter({ hasText: 'Тип проекта' })
        .locator('.filter-trigger'),
    ).toHaveText('Тестовые');
  });

  test('фильтр по типу — "Игры"', async ({ page }) => {
    await setFilter(page, 'Тип проекта', 'Игры');
    await expect(
      page
        .locator('.filter-group')
        .filter({ hasText: 'Тип проекта' })
        .locator('.filter-trigger'),
    ).toHaveText('Игры');
  });

  test('фильтр по типу — "Другое"', async ({ page }) => {
    await setFilter(page, 'Тип проекта', 'Другое');
    await expect(
      page
        .locator('.filter-group')
        .filter({ hasText: 'Тип проекта' })
        .locator('.filter-trigger'),
    ).toHaveText('Другое');
  });

  test('комбинированная фильтрация: год + тип', async ({ page }) => {
    await setFilter(page, 'Год', '2024');
    await page.waitForTimeout(300);

    await setFilter(page, 'Тип проекта', 'Сервисы');
    await page.waitForTimeout(300);

    await expect(
      page
        .locator('.filter-group')
        .filter({ hasText: 'Год' })
        .locator('.filter-trigger'),
    ).toHaveText('2024');
    await expect(
      page
        .locator('.filter-group')
        .filter({ hasText: 'Тип проекта' })
        .locator('.filter-trigger'),
    ).toHaveText('Сервисы');

    await clearFilter(page, 'Год');
    await clearFilter(page, 'Тип проекта');
  });

  test('сброс всех фильтров показывает все проекты', async ({ page }) => {
    await clearFilter(page, 'Год');
    await page.waitForTimeout(300);

    const visibleCards = page.locator('.all-projects .project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(5);
  });

  test('при наведении на карточку есть hover эффект', async ({ page }) => {
    const projectCards = page.locator('.all-projects .project-card');
    const firstCard = projectCards.first();

    const initialBox = await firstCard.boundingBox();
    await firstCard.hover();
    await page.waitForTimeout(200);
    const hoveredBox = await firstCard.boundingBox();

    // Карточка должна сдвинуться вверх (translateY(-5px))
    expect(initialBox!.y).not.toEqual(hoveredBox!.y);
  });

  test('карточки отображаются в grid', async ({ page }) => {
    const projectsGrid = page.locator('.all-projects .projects-grid');
    await expect(projectsGrid).toBeVisible();
  });

  test('фильтрация не удаляет карточки из DOM, а скрывает их', async ({
    page,
  }) => {
    // Получаем количество всех карточек
    const allCards = page.locator('.all-projects .project-card');
    const initialCount = await allCards.count();

    await setFilter(page, 'Тип проекта', 'Сервисы');
    await page.waitForTimeout(300);

    // Количество ВСЕХ карточек в DOM должно остаться тем же
    const countInDom = await allCards.count();
    expect(countInDom).toBe(initialCount);

    await clearFilter(page, 'Тип проекта');
  });
});
