# Тестирование проекта DanilChugaev.github.io

Этот проект использует **Playwright** для e2e (end-to-end) и интеграционного тестирования.

## Структура

```
tests/
├── e2e/                    # Файлы e2e тестов
│   ├── navigation.spec.ts  # Тесты навигации (header, мобильное меню, скролл)
│   ├── hero.spec.ts        # Тесты Hero секции
│   ├── projects.spec.ts    # Тесты Projects секции и фильтрации
│   ├── sections.spec.ts    # Тесты About/Skills/Contacts + Responsiveness
│   └── integration.spec.ts # Интеграционные тесты (FilterGroup, DemoModal)
├── fixtures/
│   └── base-fixtures.ts    # Базовые фикстуры для всех тестов
├── pages/
│   └── page-objects.ts     # Page Object Model для переиспользуемых элементов
└── README.md               # Этот файл
```

## Запуск тестов

### Установка Playwright браузеров (первый раз)
```bash
npx playwright install
```

### Запуск всех тестов
```bash
npm test
```

### Запуск в headed режиме (видите что происходит)
```bash
npm test -- --headed
```

### Запуск в режиме отладки (с Chromium DevTools)
```bash
npm test -- --debug
```

### Запуск конкретного тест-файла
```bash
npm test tests/e2e/navigation.spec.ts
npm test tests/e2e/hero.spec.ts
npm test tests/e2e/projects.spec.ts
npm test tests/e2e/sections.spec.ts
npm test tests/e2e/integration.spec.ts
```

### Запуск конкретного теста
```bash
npm test -- -g "заголовок секции"
```

## Что тестируется

### 1. Навигация (navigation.spec.ts)
- **Header** — видимость, логотип, пункты навигации
- **Скролл к секциям** — клик на пункт навигации скроллит к нужной секции
- **Skip-link** — доступность для клавиатурной навигации
- **Мобильное меню** — открытие/закрытие, aria-expanded, контент

### 2. Hero секция (hero.spec.ts)
- Заголовок, бейдж, подзаголовок
- Метрики (LCP, DAU, MTTR)
- Кнопки (Смотреть проекты, Обо мне, GitHub)
- Скролл к секциям через кнопки hero

### 3. Projects секция (projects.spec.ts)
- Карточки проектов — заголовок, описание, год, теги, ссылка на GitHub
- Демо кнопки
- Фильтрация по году
- Фильтрация по типу (Сервисы/Тестовые/Игры/Другое)
- Комбинированная фильтрация
- Hover эффекты карточек

### 4. About/Skills/Contacts секции (sections.spec.ts)
- **About** — текст, город, опыт, английский, формат работы
- **Skills** — три категории, навыки как pills
- **Contacts** — контактные ссылки, иконки, hover эффект
- **Responsiveness** — мобильный (375px), планшетный (768px) layout

### 5. Интеграционные тесты (integration.spec.ts)
- **FilterGroup** — переключение фильтров, active состояние, доступность
- **DemoModal** — открытие/закрытие (крестик, ESC, клик вне), фокус, overlay
- **Скролл-интерцептор** — плавный скролл к секциям, обновление URL hash

## Архитектура тестов

### Page Object Model
Все переиспользуемые селекторы и элементы находятся в `tests/pages/page-objects.ts`.

### Базовые фикстуры
`tests/fixtures/base-fixtures.ts` содержит базовую фикстуру `test`, которая:
- Автоматически загружает главную страницу (`/`)
- Ждет network idle
- Проверяет видимость всех основных секций (hero, about, skills, projects, contacts)

Каждый тест автоматически начинает с загруженной главной страницы.

## Стиль написания тестов

### Используем описательные названия на русском:
```ts
test('заголовок "Обо мне" отображается', async ({ page }) => {
  // ...
});
```

### Проверки через `expect`:
```ts
await expect(element).toBeVisible();
await expect(element).toHaveText('текст');
await expect(element).toHaveAttribute('href', '#value');
await expect(element).toHaveCount(3);
```

### Асинхронные проверки:
```ts
const text = await element.textContent();
expect(text).toContain('подстрока');

const count = await items.count();
expect(count).toBeGreaterThan(0);
```

## Troubleshooting

### Тесты падают из-за таймаута
- Увеличьте `timeout` в `playwright.config.ts`:
  ```ts
  timeout: 30000 // 30 секунд
  ```

### Тесты не видят элементы
- Добавьте явное ожидание:
  ```ts
  await page.waitForSelector('.element-class', { state: 'visible' });
  ```

### Запуск с визуализацией
```bash
npm test -- --headed --project=chromium
```

### Экспорт отчетов (HTML)
```bash
npx playwright show-report