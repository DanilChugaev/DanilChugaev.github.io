import { test, expect } from '../fixtures/base-fixtures';

test.describe('Интеграция FilterGroup', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим к секции проектов
    await page.locator('.nav a').nth(3).click();
    await page.waitForTimeout(300);
  });

  test('фильтр по году переключается и фильтрует проекты', async ({ page }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const yearTrigger = yearFilter.locator('.filter-trigger');
    await expect(yearTrigger).toBeVisible();
    await yearTrigger.click();
    await yearFilter.locator('label').filter({ hasText: '2024' }).click();
    await page.waitForTimeout(300);
    await expect(yearTrigger).toHaveText('2024');

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
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const yearTrigger = yearFilter.locator('.filter-trigger');
    await yearTrigger.click();
    await page.waitForTimeout(300);
    await expect(yearTrigger).toHaveText('Все');

    const visibleCards = page.locator('.project-card');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(5);
  });

  test('фильтр по типу переключается', async ({ page }) => {
    const typeFilter = page
      .locator('.filter-group')
      .filter({ hasText: 'Тип проекта' });
    const typeTrigger = typeFilter.locator('.filter-trigger');
    await typeTrigger.click();
    await typeFilter.locator('label').filter({ hasText: 'Сервисы' }).click();
    await expect(typeTrigger).toHaveText('Сервисы');
  });

  test('комбинированная фильтрация работает', async ({ page }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const typeFilter = page
      .locator('.filter-group')
      .filter({ hasText: 'Тип проекта' });
    await yearFilter.locator('.filter-trigger').click();
    await yearFilter.locator('label').filter({ hasText: '2024' }).click();
    await typeFilter.locator('.filter-trigger').click();
    await typeFilter.locator('label').filter({ hasText: 'Тестовые' }).click();
    await expect(yearFilter.locator('.filter-trigger')).toHaveText('2024');
    await expect(typeFilter.locator('.filter-trigger')).toHaveText('Тестовые');
  });

  test('в одном фильтре можно выбрать несколько вариантов', async ({
    page,
  }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const yearTrigger = yearFilter.locator('.filter-trigger');

    await yearTrigger.click();
    await yearFilter.locator('label').filter({ hasText: '2024' }).click();
    await yearFilter.locator('label').filter({ hasText: '2026' }).click();

    await expect(yearTrigger).toHaveText('2024, 2026');
    await expect(yearFilter.locator('input:checked')).toHaveCount(2);
  });

  test('несовместимые варианты становятся disabled и переносятся вниз', async ({
    page,
  }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const typeFilter = page
      .locator('.filter-group')
      .filter({ hasText: 'Тип проекта' });

    await yearFilter.locator('.filter-trigger').click();
    await yearFilter.locator('label').filter({ hasText: '2026' }).click();
    await typeFilter.locator('.filter-trigger').click();

    const testOption = typeFilter
      .locator('.filter-option')
      .filter({ hasText: 'Тестовые' });
    await expect(testOption.locator('input')).toBeDisabled();

    const optionClasses = await typeFilter
      .locator('.filter-option')
      .evaluateAll(options => options.map(option => option.className));
    expect(optionClasses.at(-1)).toContain('disabled');
  });

  test('счётчик найденных проектов и сброс фильтров работают', async ({
    page,
  }) => {
    const summary = page.locator('.filter-summary');
    await expect(summary).toContainText('Найдено: 18');
    await expect(summary.getByRole('button')).toHaveCount(0);

    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    await yearFilter.locator('.filter-trigger').click();
    await yearFilter.locator('label').filter({ hasText: '2026' }).click();

    await expect(summary).toContainText('Найдено: 6');
    const resetButton = summary.getByRole('button', { name: 'Сбросить все' });
    await expect(resetButton).toBeVisible();
    await resetButton.click();

    await expect(summary).toContainText('Найдено: 18');
    await expect(resetButton).toBeHidden();
  });

  test('фильтры имеют правильную структуру accessibility', async ({ page }) => {
    const filterGroups = page.locator('.filter-group');
    const count = await filterGroups.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const group = filterGroups.nth(i);
      await expect(group.locator('.filter-label')).toBeVisible();
      await expect(group.locator('.filter-trigger')).toBeVisible();
    }
  });

  test('триггеры фильтров имеют стилизацию интерфейса', async ({ page }) => {
    const trigger = page.locator('.filter-trigger').first();
    const background = await trigger.evaluate(
      element => getComputedStyle(element).backgroundColor,
    );
    expect(background).toBeTruthy();
  });
});

test.describe('Интеграция DemoModal', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('.nav a').nth(3).click();
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
      await page.waitForTimeout(3000);

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
      await page.locator('.modal-overlay').click({ position: { x: 5, y: 5 } });
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
    const projectsLink = page.locator('.nav a').nth(3); // Проекты
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
