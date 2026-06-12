# Portfolio — Danil Chugaev

Персональный портфель-сайт, демонстрирующий пет-проекты и тестовые задания фронтенд-разработчика Данила Чугаева.

## Технологический стек

| Категория        | Технологии                                                                 |
|------------------|----------------------------------------------------------------------------|
| **Framework**    | Vue 3 (Composition API, `<script setup>`)                                   |
| **Язык**         | TypeScript 6.0                                                           |
| **Bundler**      | Vite 8                                                                   |
| **Стилизация**   | PostCSS + `postcss-nested` + `postcss-custom-media` (`.pcss` файлы)       |
| **PWA**          | vite-plugin-pwa (service worker, manifest, offline поддержка)              |
| **Линтинг**      | ESLint 10 + eslint-plugin-vue + eslint-plugin-prettier + @typescript-eslint |
| **Форматирование** | Prettier 3                                                              |
| **Типизация**    | vue-tsc (строгая проверка типов для Vue SFC)                               |

## Структура проекта

```
src/
├── App.vue                      # Корневой компонент
├── main.ts                      # Точка входа
├── types.ts                     # Общие TypeScript типы
├── components/
│   ├── layout/                  # Компоненты разметки
│   │   ├── Header.vue           # Шапка с навигацией
│   │   ├── Footer.vue           # Подвал
│   │   └── Section.vue          # Обёртка секции
│   ├── project/                 # Компоненты проектов
│   │   ├── Card.vue             # Карточка проекта
│   │   ├── DemoModal.vue        # Модальное окно демо
│   │   └── FilterGroup.vue      # Группа фильтров проектов
│   └── section/                 # Секции страницы
│       ├── Hero.vue             # Главный экран
│       ├── About.vue            # О себе
│       ├── Skills.vue           # Навыки
│       ├── Projects.vue         # Проекты
│       └── Contacts.vue         # Контакты
├── composables/
│   ├── useProjectFilter.ts      # Логика фильтрации проектов
│   ├── useScrollToSection.ts    # Плавная прокрутка к секциям
├── data/
│   ├── contacts.ts              # Данные контактов
│   ├── navigation.ts            # Пункты навигации
│   ├── projects.ts              # Список проектов
│   └── skills.ts                # Список навыков
├── assets/
│   └── styles/
│       ├── main.pcss            # Глобальные стили, CSS-переменные (тёмная тема)
│       ├── common.pcss          # Общие утилитарные стили
│       └── colors.pcss          # Переменные цветов
```

## Начало работы

### Требования

- Node.js >= 18
- yarn (рекомендуется) или npm / pnpm

### Установка и запуск

```bash
# Клонировать репозиторий
git clone git@github.com:DanilChugaev/DanilChugaev.github.io.git
cd DanilChugaev.github.io

# Установить зависимости
yarn install

# Запустить dev-сервер
yarn dev

# Собрать production-версию
yarn build

# Предпросмотр production-сборки
yarn preview
```

## Доступные скрипты

| Команда            | Описание                                           |
|--------------------|----------------------------------------------------|
| `yarn dev`         | Запустить dev-сервер с hot-reload                  |
| `yarn build`       | Типо-проверка (vue-tsc) + production сборка         |
| `yarn preview`     | Локальный предпросмотр production-сборки            |
| `yarn lint`        | Запустить ESLint                                   |
| `yarn lint:fix`    | Запустить ESLint с автоисправлением                 |
| `yarn format`      | Отформатировать код через Prettier                  |
| `yarn ts:check`    | Только проверка типов TypeScript                    |
| `yarn test`        | Запустить все тесты (Vitest)                        |
| `yarn test:unit`   | Запустить юнит-тесты с покрытием                    |
| `yarn test:unit:cov` | Запустить юнит-тесты с отчётом о покрытии          |
| `yarn test:e2e`    | Запустить E2E тесты (Playwright)                    |
| `yarn test:e2e:chromium` | Запустить E2E тесты на Chromium               |
| `yarn test:e2e:headed`   | Запустить E2E тесты в видимом режиме          |
| `yarn test:e2e:report`   | Показать отчёт E2E тестов                        |

## Тестирование

```bash
# Запустить все юнит-тесты
yarn test:unit

# Запустить юнит-тесты с отчётом о покрытии
yarn test:unit:cov

# Запустить все E2E тесты
yarn test:e2e

# Показать интерактивный отчет E2E тестов
yarn test:e2e:report
```

## Особенности

- **PWA** — приложение устанавливается как Progressive Web App с автообновлением service worker
- **Тёмная тема** — дизайн построен на CSS-переменных с тёмной цветовой схемой
- **Доступность** — skip-link для навигации с клавиатуры, семантическая разметка, ARIA-роли
- **Фильтрация проектов** — переключение между тестовыми заданиями и пет-проектами через FilterGroup
- **Тестирование** — юнит-тесты (Vitest + jsdom) + E2E тесты (Playwright)
- **Плавная навигация** — smooth scroll к секциям с учётом высоты шапки
- **Typed data layer** — все данные вынесены в отдельные модули с TypeScript типизацией

## Лицензия

[MIT](LICENSE) — Copyright (c) 2026 Danil Chugaev