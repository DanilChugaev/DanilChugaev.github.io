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

  test('все карточки проектов всегда в DOM (для кеширования изображений)', async ({
    page,
  }) => {
    // Получаем общее количество всех карточек включая скрытые
    const allCards = page.locator('.project-card');
    const totalCount = await allCards.count();

    // Фильтруем по году — используем JS click т.к. input[type="radio"] скрыты CSS
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-year-2024"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
    await page.waitForTimeout(300);

    // Даже с активным фильтром все проекты должны оставаться в DOM
    const totalAfterFilter = await allCards.count();
    expect(totalAfterFilter).toBe(totalCount);

    // Сбрасываем фильтр
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-year-all"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
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

    // Используем JS click т.к. input[type="radio"] скрыты CSS
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-year-2026"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
    await page.waitForTimeout(300);

    // Проверяем что все видимые карточки имеют год 2026
    const allCards = page.locator('.project-card');
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

    // Сбрасываем фильтр
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-year-all"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
  });

  test('фильтр по году — выбор "Все"', async ({ page }) => {
    // Убедимся что фильтр на "все"
    const allInput = page.locator('input[id="filter-year-all"]');
    if (!(await allInput.isChecked())) {
      await page.evaluate(() => {
        const input = document.querySelector(
          'input[id="filter-year-all"]',
        ) as HTMLInputElement;
        if (input) input.click();
      });
    }
    await page.waitForTimeout(300);

    const visibleCards = page.locator('.project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(15); // Должно быть много проектов
  });

  test('фильтр по типу — "Сервисы"', async ({ page }) => {
    // Используем JS click т.к. input[type="radio"] скрыты CSS
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-type-service"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
    await page.waitForTimeout(300);

    // Проверяем что видимые карточки имеют тип "Сервисы" через data-type атрибут
    const allCards = page.locator('.project-card');
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

    // Сбрасываем фильтр
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-type-all"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
  });

  test('фильтр по типу — "Тестовые"', async ({ page }) => {
    const testInput = page.locator('input[id="filter-type-test"]');
    if (await testInput.isVisible()) {
      await page.evaluate(() => {
        const input = document.querySelector(
          'input[id="filter-type-test"]',
        ) as HTMLInputElement;
        if (input) input.click();
      });
      await page.waitForTimeout(300);
    }
  });

  test('фильтр по типу — "Игры"', async ({ page }) => {
    const gameInput = page.locator('input[id="filter-type-game"]');
    if (await gameInput.isVisible()) {
      await page.evaluate(() => {
        const input = document.querySelector(
          'input[id="filter-type-game"]',
        ) as HTMLInputElement;
        if (input) input.click();
      });
      await page.waitForTimeout(300);
    }
  });

  test('фильтр по типу — "Другое"', async ({ page }) => {
    const otherInput = page.locator('input[id="filter-type-other"]');
    if (await otherInput.isVisible()) {
      await page.evaluate(() => {
        const input = document.querySelector(
          'input[id="filter-type-other"]',
        ) as HTMLInputElement;
        if (input) input.click();
      });
      await page.waitForTimeout(300);
    }
  });

  test('комбинированная фильтрация: год + тип', async ({ page }) => {
    // Сначала фильтр по году через JS
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-year-2024"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
    await page.waitForTimeout(300);

    // Затем фильтр по типу через JS
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-type-service"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
    await page.waitForTimeout(300);

    // Проверяем что активные фильтры есть
    const activeFilters = page.locator('.filter-buttons label.active');
    const activeCount = await activeFilters.count();
    expect(activeCount).toBeGreaterThan(1);

    // Сбрасываем фильтры
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-year-all"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });

    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-type-all"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
  });

  test('сброс всех фильтров показывает все проекты', async ({ page }) => {
    // Сбрасываем фильтр через "Все" input
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-year-all"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
    await page.waitForTimeout(300);

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

  test('фильтрация не удаляет карточки из DOM, а скрывает их', async ({
    page,
  }) => {
    // Получаем количество всех карточек
    const allCards = page.locator('.project-card');
    const initialCount = await allCards.count();

    // Применяем фильтр по типу "Сервисы" через JS click
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-type-service"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
    await page.waitForTimeout(300);

    // Количество ВСЕХ карточек в DOM должно остаться тем же
    const countInDom = await allCards.count();
    expect(countInDom).toBe(initialCount);

    // Сбрасываем фильтр
    await page.evaluate(() => {
      const input = document.querySelector(
        'input[id="filter-type-all"]',
      ) as HTMLInputElement;
      if (input) input.click();
    });
  });
});
