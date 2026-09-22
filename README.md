# Portfolio — Danil Chugaev

[![Quality checks](https://github.com/DanilChugaev/DanilChugaev.github.io/actions/workflows/quality.yml/badge.svg?branch=master)](https://github.com/DanilChugaev/DanilChugaev.github.io/actions/workflows/quality.yml)
[![Deploy to GitHub Pages](https://github.com/DanilChugaev/DanilChugaev.github.io/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/DanilChugaev/DanilChugaev.github.io/actions/workflows/deploy.yml)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-Vitest%20%2B%20Playwright-6e9f18)](https://vitest.dev/)

Персональный сайт-портфолио с pet-проектами и тестовыми заданиями frontend-разработчика Данила Чугаева.

## Качество и производительность

- Проверки GitHub Actions запускают ESLint, строгую проверку TypeScript, unit-тесты, production-сборку и E2E-тесты в Chromium.
- Lighthouse / PageSpeed Insights: на момент ручной проверки 22 сентября 2026 года сайт получил **100/100** по всем категориям в мобильной и десктопной стратегии; также пройдено **2 из 2** проверок агентного просмотра.
- Повторить измерения можно в [PageSpeed Insights для мобильных устройств](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdanilchugaev.github.io%2F&form_factor=mobile) и [для настольных устройств](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdanilchugaev.github.io%2F&form_factor=desktop).

> Результаты PageSpeed Insights зависят от времени запуска, версии браузера, сети и содержимого сторонних ресурсов. Поэтому число 100 — зафиксированный результат замера, а не постоянная гарантия.

## Технологический стек

| Категория        | Технологии                                                                 |
|------------------|----------------------------------------------------------------------------|
| **Framework**    | Vue 3 (Composition API, `<script setup>`)                                   |
| **Язык**         | TypeScript 6.0                                                           |
| **Bundler**      | Vite 8                                                                   |
| **Стилизация**   | PostCSS + `postcss-nested` + `postcss-custom-media` (`.pcss` файлы)       |
| **PWA**          | vite-plugin-pwa (Service Worker, manifest, офлайн-поддержка)               |
| **Линтинг**      | ESLint 10 + eslint-plugin-vue + eslint-plugin-prettier + @typescript-eslint |
| **Форматирование** | Prettier 3                                                              |
| **Типизация**    | vue-tsc (строгая проверка типов для Vue SFC)                               |

## Структура проекта

```
.
├── .github/workflows/
│   ├── deploy.yml                # Сборка и публикация на GitHub Pages
│   └── quality.yml               # CI: lint, типы, тесты и сборка
├── public/
│   ├── Danil_Chugaev_cv.pdf      # Резюме для скачивания
│   └── portfolio-*               # Иконки и favicon PWA
├── src/
│   ├── App.vue                   # Корневой компонент
│   ├── main.ts                   # Точка входа и подключение глобальных стилей
│   ├── types.ts                  # Общие TypeScript-типы
│   ├── assets/styles/
│   │   ├── colors.pcss           # Цветовые и семантические CSS-переменные
│   │   ├── common.pcss           # Контейнер, секции и focus-стили
│   │   └── main.pcss             # Глобальный reset и базовые стили
│   ├── components/
│   │   ├── layout/               # Шапка, подвал и обёртка секций
│   │   ├── project/              # Карточки, фильтры и модальное окно демо
│   │   └── section/              # Секции одностраничного сайта
│   ├── composables/
│   │   ├── useProjectFilter.ts   # Логика фильтрации проектов
│   │   ├── useProjectFilter.spec.ts
│   │   ├── useScrollToSection.ts # Плавная прокрутка к секциям
│   │   └── useScrollToSection.spec.ts
│   ├── data/                     # Типизированные данные проектов, навыков и контактов
│   └── icons/SvgIcon.vue         # Набор SVG-иконок
├── tests/
│   ├── e2e/                      # E2E-тесты Playwright
│   ├── fixtures/                 # Общие Playwright-фикстуры
│   └── README.md                 # Документация по E2E-тестам
├── playwright.config.ts           # Конфигурация Playwright
├── vite.config.ts                 # Конфигурация Vite и PWA
└── vitest.config.ts               # Конфигурация Vitest
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
| `yarn dev`         | Запустить dev-сервер с HMR                          |
| `yarn build`       | Проверка типов (vue-tsc) + production-сборка        |
| `yarn preview`     | Локальный предпросмотр production-сборки            |
| `yarn lint`        | Запустить ESLint                                   |
| `yarn lint:fix`    | Запустить ESLint с автоисправлением                 |
| `yarn format`      | Отформатировать код через Prettier                  |
| `yarn ts:check`    | Только проверка типов TypeScript                    |
| `yarn test`        | Запустить все тесты (Vitest)                        |
| `yarn test:unit`   | Запустить юнит-тесты                                |
| `yarn test:unit:cov` | Запустить юнит-тесты с отчётом о покрытии          |
| `yarn test:e2e`    | Запустить E2E-тесты (Playwright)                   |
| `yarn test:e2e:chromium` | Запустить E2E-тесты на Chromium              |
| `yarn test:e2e:headed`   | Запустить E2E-тесты в видимом режиме         |
| `yarn test:e2e:report`   | Показать отчёт E2E-тестов                      |

## Тестирование

```bash
# Запустить все юнит-тесты
yarn test:unit

# Запустить юнит-тесты с отчётом о покрытии
yarn test:unit:cov

# Запустить все E2E тесты
yarn test:e2e

# Показать интерактивный отчёт E2E-тестов
yarn test:e2e:report
```

## Особенности

- **PWA** — приложение устанавливается как Progressive Web App с автообновлением Service Worker
- **Тёмная тема** — дизайн построен на CSS-переменных с тёмной цветовой схемой
- **Доступность** — skip-link для навигации с клавиатуры, семантическая разметка, ARIA-роли
- **Фильтрация проектов** — переключение между тестовыми заданиями и pet-проектами через FilterGroup
- **Тестирование** — юнит-тесты (Vitest + jsdom) и E2E-тесты (Playwright)
- **Плавная навигация** — плавная прокрутка к секциям с учётом высоты шапки
- **Typed data layer** — все данные вынесены в отдельные модули с TypeScript типизацией

## Лицензия

[MIT](LICENSE) — Copyright (c) 2026 Danil Chugaev
