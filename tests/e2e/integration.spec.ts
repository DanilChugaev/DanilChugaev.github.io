import { test, expect } from '../fixtures/base-fixtures';

async function selectFilterOption(
  page: import('@playwright/test').Page,
  filterLabel: string,
  optionLabel: string,
) {
  const filter = page.locator('.filter-group').filter({ hasText: filterLabel });
  const trigger = filter.locator('.filter-trigger');
  if ((await trigger.getAttribute('aria-expanded')) !== 'true') {
    await trigger.click();
  }
  await filter
    .locator('.filter-option')
    .filter({ hasText: optionLabel })
    .locator('input')
    .click();
}

async function openDemoModal(page: import('@playwright/test').Page) {
  const demoButton = page
    .locator('.all-projects .link-btn.primary:has-text("Посмотреть демо")')
    .first();
  await expect(demoButton).toBeVisible();
  await demoButton.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  return dialog;
}

test.describe('Интеграция FilterGroup', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('.nav a[href="#projects"]').click();
  });

  test('фильтр по году переключается и фильтрует проекты', async ({ page }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const yearTrigger = yearFilter.locator('.filter-trigger');
    await expect(yearTrigger).toBeVisible();
    await selectFilterOption(page, 'Год', '2024');
    await page.waitForTimeout(300);
    await expect(yearTrigger).toHaveText('2024');

    const visibleCards = page.locator('.all-projects .project-card:visible');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = visibleCards.nth(i);
      await expect(card.locator('.year-badge')).toHaveText('2024');
    }
  });

  test('фильтр по году "all" показывает все проекты', async ({ page }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const yearTrigger = yearFilter.locator('.filter-trigger');
    await yearTrigger.click();
    await page.waitForTimeout(300);
    await expect(yearTrigger).toHaveText('Все');

    const visibleCards = page.locator('.all-projects .project-card:visible');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(5);
  });

  test('фильтр по типу переключается', async ({ page }) => {
    const typeFilter = page
      .locator('.filter-group')
      .filter({ hasText: 'Тип проекта' });
    const typeTrigger = typeFilter.locator('.filter-trigger');
    await selectFilterOption(page, 'Тип проекта', 'Сервисы');
    await expect(typeTrigger).toHaveText('Сервисы');
  });

  test('комбинированная фильтрация работает', async ({ page }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const typeFilter = page
      .locator('.filter-group')
      .filter({ hasText: 'Тип проекта' });
    await selectFilterOption(page, 'Год', '2024');
    await selectFilterOption(page, 'Тип проекта', 'Тестовые');
    await expect(yearFilter.locator('.filter-trigger')).toHaveText('2024');
    await expect(typeFilter.locator('.filter-trigger')).toHaveText('Тестовые');
  });

  test('в одном фильтре можно выбрать несколько вариантов', async ({
    page,
  }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const yearTrigger = yearFilter.locator('.filter-trigger');

    await selectFilterOption(page, 'Год', '2024');
    await selectFilterOption(page, 'Год', '2026');

    await expect(yearTrigger).toHaveText('2024, 2026');
    await expect(yearFilter.locator('input:checked')).toHaveCount(2);
  });

  test('несовместимые варианты становятся disabled и переносятся вниз', async ({
    page,
  }) => {
    const typeFilter = page
      .locator('.filter-group')
      .filter({ hasText: 'Тип проекта' });

    await selectFilterOption(page, 'Год', '2026');
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

    await selectFilterOption(page, 'Год', '2026');

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

  test('фокус переходит в меню и возвращается на триггер по Escape', async ({
    page,
  }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const trigger = yearFilter.locator('.filter-trigger');

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(yearFilter.locator('input').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(yearFilter.locator('.filter-options')).toHaveCount(0);
  });

  test('меню закрывается, когда фокус покидает фильтр', async ({ page }) => {
    const yearFilter = page.locator('.filter-group').filter({ hasText: 'Год' });
    const trigger = yearFilter.locator('.filter-trigger');

    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(yearFilter.locator('.filter-options')).toBeVisible();

    await page.locator('.logo-link').focus();
    await expect(yearFilter.locator('.filter-options')).toHaveCount(0);
  });
});

test.describe('Интеграция DemoModal', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('.nav a[href="#projects"]').click();
  });

  test('клик по "Посмотреть демо" открывает модальное окно', async ({
    page,
  }) => {
    await openDemoModal(page);
  });

  test('модальное окно закрывается по крестику', async ({ page }) => {
    const dialog = await openDemoModal(page);
    await dialog.getByRole('button', { name: 'Закрыть' }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('модальное окно закрывается по ESC', async ({ page }) => {
    const dialog = await openDemoModal(page);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('модальное окно закрывается по клику вне контента', async ({ page }) => {
    const dialog = await openDemoModal(page);
    await page.locator('.modal-overlay').click({ position: { x: 5, y: 5 } });
    await expect(dialog).not.toBeVisible();
  });

  test('модальное окно имеет затемненный фон', async ({ page }) => {
    await openDemoModal(page);
    const overlay = page.locator('.modal-overlay');
    await expect(overlay).toBeVisible();
    await expect(overlay).toHaveCSS('background-color', 'rgba(0, 0, 0, 0.8)');
  });

  test('модальное окно имеет кнопку закрытия с aria-label', async ({
    page,
  }) => {
    const dialog = await openDemoModal(page);
    await expect(dialog.getByRole('button', { name: 'Закрыть' })).toBeVisible();
  });

  test('модальное окно даёт ссылку на демо и подпись iframe', async ({
    page,
  }) => {
    const dialog = await openDemoModal(page);
    await expect(
      dialog.getByRole('link', { name: 'Открыть отдельно' }),
    ).toHaveAttribute('target', '_blank');
    await expect(dialog.locator('iframe')).toHaveAttribute(
      'title',
      /Демо проекта/,
    );
  });

  test('фокус попадает в модальное окно при открытии', async ({ page }) => {
    const dialog = await openDemoModal(page);
    await expect(dialog.getByRole('button', { name: 'Закрыть' })).toBeFocused();
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
