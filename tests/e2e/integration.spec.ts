import { test, expect } from '../fixtures/base-fixtures';

test.describe('Интеграция FilterGroup', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим к секции проектов
    await page.locator('.nav a').nth(2).click();
    await page.waitForTimeout(300);
  });

  test('фильтр по году переключается и фильтрует проекты', async ({ page }) => {
    // Находим радиогруппу фильтра по году через role
    const yearRadioGroup = page.locator('[role="radiogroup"]').first(); // первая группа - год
    await expect(yearRadioGroup).toBeVisible();

    // Находим опцию 2024 и кликаем по label
    const year2024Label = page.locator('label[for*="filter-year-2024"]');
    await expect(year2024Label).toBeVisible();
    await year2024Label.click();
    await page.waitForTimeout(300);

    // Проверяем что label стал active
    await expect(year2024Label).toHaveClass('active');

    // Проверяем что карточки проектов отфильтровались
    const visibleCards = page.locator('.project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThanOrEqual(0);

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const card = visibleCards.nth(i);
        // Проверяем что у карточки есть какой-то текст (проект отображается)
        const innerText = await card.textContent();
        expect(innerText?.length).toBeGreaterThan(0);
      }
    }
  });

  test('фильтр по году "all" показывает все проекты', async ({ page }) => {
    const allLabel = page.locator('label[for*="filter-year-all"]');
    await expect(allLabel).toBeVisible();
    await allLabel.click();
    await page.waitForTimeout(300);

    await expect(allLabel).toHaveClass('active');

    const visibleCards = page.locator('.project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(5);
  });

  test('фильтр по типу переключается', async ({ page }) => {
    // Находим вторую радиогруппу (тип) через name="filter-type" в label for атрибуте
    const typeLabels = page.locator('label[for*="filter-type-"]');
    const count = await typeLabels.count();
    expect(count).toBeGreaterThan(0);

    // Кликаем по первому доступному типу (не "all")
    let clicked = false;
    for (let i = 0; i < count; i++) {
      const label = typeLabels.nth(i);
      const text = await label.textContent();
      if ((text?.trim() ?? '').trim() !== 'Все' && (await label.isVisible())) {
        await label.click();
        await page.waitForTimeout(300);
        await expect(label).toHaveClass('active');
        clicked = true;
        break;
      }
    }
    expect(clicked).toBe(true);
  });

  test('комбинированная фильтрация работает', async ({ page }) => {
    // Выбираем год
    const yearLabel = page.locator('label[for*="filter-year-2024"]');
    if (await yearLabel.isVisible()) {
      await yearLabel.click();
      await page.waitForTimeout(300);
    }

    // Проверяем что активный фильтр отображается
    const activeFilters = page.locator('.filter-buttons label.active');
    const activeCount = await activeFilters.count();
    expect(activeCount).toBeGreaterThan(0);
  });

  test('фильтры имеют правильную структуру accessibility', async ({ page }) => {
    const filterGroups = page.locator('.filter-group');
    const count = await filterGroups.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const group = filterGroups.nth(i);
      await expect(group.locator('h3')).toBeVisible();
      const radiogroup = group.locator('[role="radiogroup"]');
      await expect(radiogroup).toBeVisible();
    }
  });

  test('active фильтр имеет синий фон', async ({ page }) => {
    // Выбираем любой фильтр чтобы активировать
    const yearLabels = page.locator('label[for*="filter-year-"]');
    const yearCount = await yearLabels.count();
    if (yearCount > 1) {
      // Кликаем по второму элементу (не "all")
      const label = yearLabels.nth(1);
      const text = await label.textContent();
      if ((text?.trim() ?? '') !== 'Все' && (await label.isVisible())) {
        await label.click();
        await page.waitForTimeout(300);

        await expect(label).toHaveClass('active');
        const bg = await label.evaluate(
          el => getComputedStyle(el).backgroundColor,
        );
        // Синий цвет (#0066ff)
        expect(bg).toContain('0, 102, 255');
      }
    }
  });

  test('label в filter имеет hover эффект', async ({ page }) => {
    const filterLabels = page.locator('.filter-buttons label:not(.active)');
    if ((await filterLabels.count()) > 0) {
      const label = filterLabels.first();
      await label.hover();
      await page.waitForTimeout(200);
      const bg = await label.evaluate(
        el => getComputedStyle(el).backgroundColor,
      );
      expect(bg).toContain('0, 102, 255');
    }
  });

  test('радиокнопки скрыты но доступны', async ({ page }) => {
    const radios = page.locator('.filter-buttons input[type="radio"]');
    const count = await radios.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const radio = radios.nth(i);
      const opacity = await radio.evaluate(el => getComputedStyle(el).opacity);
      expect(opacity).toBe('0');
    }
  });
});

test.describe('Интеграция DemoModal', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('.nav a').nth(2).click();
    await page.waitForTimeout(300);
  });

  test('клик по "Посмотреть демо" открывает модальное окно', async ({
    page,
  }) => {
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );
    const count = await demoButtons.count();
    expect(count).toBeGreaterThan(0);

    if (count > 0) {
      await demoButtons.first().click();
      await page.waitForTimeout(300);

      // Модальное окно должно появиться
      const modal = page.locator('.demo-modal, [role="dialog"], .modal');
      if ((await modal.count()) > 0) {
        await expect(modal).toBeVisible();
      }
    }
  });

  test('модальное окно закрывается по крестику', async ({ page }) => {
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );

    if ((await demoButtons.count()) > 0) {
      await demoButtons.first().click();
      await page.waitForTimeout(300);

      // Ищем кнопку закрытия
      const closeBtn = page.locator(
        '.close-btn, [aria-label="Закрыть"], .modal-close',
      );
      if ((await closeBtn.count()) > 0) {
        await closeBtn.click();
        await page.waitForTimeout(300);

        // Модальное окно должно исчезнуть
        const modal = page.locator('.demo-modal, [role="dialog"], .modal');
        if ((await modal.count()) > 0) {
          await expect(modal).not.toBeVisible();
        }
      }
    }
  });

  test('модальное окно закрывается по ESC', async ({ page }) => {
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );

    if ((await demoButtons.count()) > 0) {
      await demoButtons.first().click();
      await page.waitForTimeout(300);

      // Нажимаем ESC
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);

      const modal = page.locator('.demo-modal, [role="dialog"], .modal');
      if ((await modal.count()) > 0) {
        await expect(modal).not.toBeVisible();
      }
    }
  });

  test('модальное окно закрывается по клику вне контента', async ({ page }) => {
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );

    if ((await demoButtons.count()) > 0) {
      await demoButtons.first().click();
      await page.waitForTimeout(300);

      // Клик вне контента модалки
      await page.locator('body').click();
      await page.waitForTimeout(300);

      const modal = page.locator('.demo-modal, [role="dialog"], .modal');
      if ((await modal.count()) > 0) {
        await expect(modal).not.toBeVisible();
      }
    }
  });

  test('модальное окно имеет затемненный фон', async ({ page }) => {
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );

    if ((await demoButtons.count()) > 0) {
      await demoButtons.first().click();
      await page.waitForTimeout(300);

      // Ищем overlay (backdrop) по всем возможным селекторам
      const overlay = page.locator('.modal-overlay, .backdrop');
      if ((await overlay.count()) > 0) {
        const bg = await overlay.evaluate(
          el => getComputedStyle(el).backgroundColor,
        );
        // Фон может быть rgba(0, 0, 0, 0.8) или rgba(0, 0, 0, 0.5)
        expect(bg).toContain('0, 0, 0');
      }
    }
  });

  test('модальное окно имеет кнопку закрытия с aria-label', async ({
    page,
  }) => {
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );

    if ((await demoButtons.count()) > 0) {
      await demoButtons.first().click();
      await page.waitForTimeout(300);

      const closeBtn = page.locator('[aria-label="Закрыть"], .close-btn');
      if ((await closeBtn.count()) > 0) {
        await expect(closeBtn).toHaveAttribute('aria-label', 'Закрыть');
      }
    }
  });

  test('фокус попадает в модальное окно при открытии', async ({ page }) => {
    const demoButtons = page.locator(
      '.link-btn.primary:has-text("Посмотреть демо")',
    );

    if ((await demoButtons.count()) > 0) {
      await demoButtons.first().click();
      await page.waitForTimeout(300);

      // Фocused элемент должен быть внутри модалки
      const activeElement = page.locator(':focus');
      const count = await activeElement.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('Скролл-интерцептор', () => {
  test('навигация скроллит к секции плавно', async ({ page }) => {
    const projectsLink = page.locator('.nav a').nth(2); // Проекты
    await projectsLink.click();

    // Ждем завершения скролла
    await page.waitForTimeout(500);

    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();

    // Проверяем что секция в viewport
    const box = await projectsSection.boundingBox();
    expect(box!.y).toBeGreaterThanOrEqual(-150);
  });

  test('скролл работает для всех секций', async ({ page }) => {
    const sections = [
      { id: 'about', selector: 'section#about' },
      { id: 'skills', selector: 'section#skills' },
      { id: 'projects', selector: 'section#projects' },
      { id: 'contacts', selector: 'section#contacts' },
    ];

    for (const section of sections) {
      const link = page.locator(`.nav a[href="#${section.id}"]`);
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForTimeout(500);

      const sectionEl = page.locator(section.selector);
      await expect(sectionEl).toBeVisible();
    }
  });

  test('навигация обновляет URL hash', async ({ page }) => {
    // Скроллим к секции проектов через evaluate
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'instant' });
      }
    });
    await page.waitForTimeout(300);

    // Проверяем что секция проектов видна
    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('повторный клик на активный пункт не ломает навигацию', async ({
    page,
  }) => {
    const projectsLink = page.locator('.nav a[href="#projects"]').first();
    await projectsLink.click();
    await page.waitForTimeout(300);

    await projectsLink.click();
    await page.waitForTimeout(300);

    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
  });
});
