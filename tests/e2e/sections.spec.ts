import { test, expect } from '../fixtures/base-fixtures';

test.describe('About секция', () => {
  test('заголовок секции "Обо мне" отображается', async ({ page }) => {
    // Скроллим к About вместо клика по навигации
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const aboutSection = page.locator('section#about');
    await expect(aboutSection).toBeVisible();
  });

  test('текст Senior Frontend Developer отображается', async ({ page }) => {
    const aboutTexts = page.locator('.about-text p');
    const found = await aboutTexts.first().textContent();
    expect(found).toContain('Senior Frontend Developer');
  });

  test('информация о 10-летнем опыте отображается', async ({ page }) => {
    const aboutTexts = page.locator('.about-text p');
    const found = await aboutTexts.first().textContent();
    expect(found).toContain('10-летним опытом');
  });

  test('город "Новосибирск" отображается', async ({ page }) => {
    const aboutInfo = page.locator('.about-info');
    const found = await aboutInfo.textContent();
    expect(found).toContain('Новосибирск');
  });

  test('уровень английского B2 отображается', async ({ page }) => {
    const aboutInfo = page.locator('.about-info');
    const found = await aboutInfo.textContent();
    expect(found).toContain('B2');
  });

  test('формат "Удалённо" отображается', async ({ page }) => {
    const aboutInfo = page.locator('.about-info');
    const found = await aboutInfo.textContent();
    expect(found).toContain('удалённо');
  });

  test('секция содержит информацию об опыте 10+ лет', async ({ page }) => {
    const aboutInfo = page.locator('.about-info');
    const found = await aboutInfo.textContent();
    expect(found).toContain('10+ лет');
  });
});

test.describe('Skills секция', () => {
  test('заголовок секции "Ключевые навыки" отображается', async ({ page }) => {
    // Скроллим к Skills секции
    await page.locator('.nav').evaluate(nav => {
      const links = nav.querySelectorAll<HTMLLinkElement>('a[href="#skills"]');
      if (links.length > 0) {
        links[0].click();
      } else {
        // Если навигация скрыта, скроллим вручную
        window.scrollTo(0, document.body.scrollHeight * 0.3);
      }
    });
    await page.waitForTimeout(300);

    const skillsSection = page.locator('section#skills');
    await expect(skillsSection).toBeVisible();
  });

  test('три категории навыков отображаются', async ({ page }) => {
    const categories = page.locator('.skill-category');
    await expect(categories).toHaveCount(3);
  });

  test('категория "Core" содержит навыки', async ({ page }) => {
    const coreCategory = page.locator('.skill-category').nth(0);
    const text = await coreCategory.textContent();
    expect(text).toContain('Core');
    const skills = coreCategory.locator('.skill-tags span');
    const count = await skills.count();
    expect(count).toBeGreaterThan(0);
  });

  test('категория "Инструменты и практики" содержит навыки', async ({
    page,
  }) => {
    const toolsCategory = page.locator('.skill-category').nth(1);
    const text = await toolsCategory.textContent();
    expect(text).toContain('Инструменты и практики');
    const skills = toolsCategory.locator('.skill-tags span');
    const count = await skills.count();
    expect(count).toBeGreaterThan(0);
  });

  test('категория "Дополнительно" содержит навыки', async ({ page }) => {
    const additionalCategory = page.locator('.skill-category').nth(2);
    const text = await additionalCategory.textContent();
    expect(text).toContain('Дополнительно');
    const skills = additionalCategory.locator('.skill-tags span');
    const count = await skills.count();
    expect(count).toBeGreaterThan(0);
  });

  test('навыки отображаются как pills', async ({ page }) => {
    const skillTags = page.locator('.skill-tags span').first();
    await expect(skillTags).toBeVisible();
    const background = await skillTags.evaluate(
      el => getComputedStyle(el).backgroundColor,
    );
    expect(background).toBeTruthy();
  });
});

test.describe('Contacts секция', () => {
  test('заголовок секции "Контакты" отображается', async ({ page }) => {
    // Скроллим к Contacts секции через evaluate если навигация скрыта
    await page.locator('section#contacts').evaluate(el => {
      el.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(300);

    const contactsSection = page.locator('section#contacts');
    await expect(contactsSection).toBeVisible();
  });

  test('контактные ссылки отображаются', async ({ page }) => {
    const contactLinks = page.locator('.contact-item');
    const count = await contactLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('первая контактная ссылка кликабельна и имеет href', async ({
    page,
  }) => {
    const contactLinks = page.locator('.contact-item');
    const firstContact = contactLinks.first();
    await expect(firstContact).toHaveAttribute('href');
  });

  test('иконки контактов отображаются', async ({ page }) => {
    const icons = page.locator('.contact-item .icon');
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('адрес отображается в contact-note', async ({ page }) => {
    const contactNote = page.locator('.contact-note');
    await expect(contactNote).toBeVisible();
  });

  test('секция контактов имеет темный фон', async ({ page }) => {
    const contactsSection = page.locator('section#contacts.contact-section');
    await expect(contactsSection).toHaveCSS(
      'background-color',
      'rgb(10, 10, 10)',
    );
  });

  test('contact-item имеет hover эффект', async ({ page }) => {
    const contactItems = page.locator('.contact-item');
    if ((await contactItems.count()) > 0) {
      const firstItem = contactItems.first();
      const initialBox = await firstItem.boundingBox();
      await firstItem.hover();
      await page.waitForTimeout(200);
      const hoveredBox = await firstItem.boundingBox();
      expect(initialBox!.y).not.toEqual(hoveredBox!.y);
    }
  });
});

test.describe('Responsiveness', () => {
  test('mobile layout для hero секции (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hero = page.locator('section#hero');
    await expect(hero).toBeVisible();
  });

  test('mobile layout для skills секции (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    // Скроллим к Skills через evaluate (навигация скрыта на мобильных)
    await page.evaluate(() => {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        skillsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(500);

    const skillsSection = page.locator('section#skills');
    await expect(skillsSection).toBeVisible();
  });

  test('mobile layout для projects секции (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    // Скроллим к Projects через evaluate (навигация скрыта на мобильных)
    await page.evaluate(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(500);

    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('mobile layout для contacts секции (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    // Скроллим к Contacts через evaluate (навигация скрыта на мобильных)
    await page.evaluate(() => {
      const contactsSection = document.getElementById('contacts');
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(500);

    const contactsSection = page.locator('section#contacts');
    await expect(contactsSection).toBeVisible();
  });

  test('tablet layout (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const hero = page.locator('section#hero');
    await expect(hero).toBeVisible();

    const projectsSection = page.locator('section#projects');
    await expect(projectsSection).toBeVisible();
  });
});
