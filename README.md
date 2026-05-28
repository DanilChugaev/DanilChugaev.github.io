# Portfolio — Danil Chugaev

Персональный портфель-сайт, демонстрирующий пет-проекты и тестовые задания фронтенд-разработчика Данила Чугаева.

## 🛠 Технологический стек

| Категория        | Технологии                                                                 |
|------------------|----------------------------------------------------------------------------|
| **Framework**    | Vue 3 (Composition API, `<script setup>`)                                   |
| **Язык**         | TypeScript ~5.9                                                            |
| **Bundler**      | Vite 7                                                                   |
| **Стилизация**   | PostCSS + `postcss-nested` + `postcss-custom-media` (`.pcss` файлы)       |
| **PWA**          | vite-plugin-pwa (service worker, manifest, offline поддержка)              |
| **Линтинг**      | ESLint 10 + eslint-plugin-vue + eslint-plugin-prettier + @typescript-eslint |
| **Форматирование** | Prettier 3                                                              |
| **Типизация**    | vue-tsc (строгая проверка типов для Vue SFC)                               |

## 📂 Структура проекта

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
│   │   └── Filters.vue          # Фильтр проектов (test / pet)
│   └── section/                 # Секции страницы
│       ├── Hero.vue             # Главный экран
│       ├── About.vue            # О себе
│       ├── Skills.vue           # Навыки
│       ├── Projects.vue         # Проекты
│       └── Contacts.vue         # Контакты
├── composables/
│   ├── useProjectFilter.ts      # Логика фильтрации проектов
│   └── useScrollToSection.ts    # Плавная прокрутка к секциям
├── data/
│   ├── contacts.ts              # Данные контактов
│   ├── navigation.ts            # Пункты навигации
│   ├── projects.ts              # Список проектов
│   └── skills.ts                # Список навыков
└── styles/
    ├── main.pcss                # Глобальные стили, CSS-переменные (тёмная тема)
    └── common.pcss              # Общие утилитарные стили
```

## 🚀 Начало работы

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

## 📋 Доступные скрипты

| Команда            | Описание                                           |
|--------------------|----------------------------------------------------|
| `yarn dev`         | Запустить dev-сервер с hot-reload                  |
| `yarn build`       | Типо-проверка (vue-tsc) + production сборка         |
| `yarn preview`     | Локальный предпросмотр production-сборки            |
| `yarn lint`        | Запустить ESLint                                   |
| `yarn lint:fix`    | Запустить ESLint с автоисправлением                 |
| `yarn format`      | Отформатировать код через Prettier                  |
| `yarn ts:check`    | Только проверка типов TypeScript                    |

## 🎨 Особенности

- **PWA** — приложение устанавливается как PWA с автообновлением service worker
- **Тёмная тема** — дизайн построен на CSS-переменных с тёмной цветовой схемой
- **Доступность** — skip-link для навигации с клавиатуры, семантическая разметка, ARIA-роли
- **Фильтрация проектов** — переключение между тестовыми заданиями и пет-проектами
- **Плавная навигация** — smooth scroll к секциям с учётом высоты шапки
- **Typed data layer** — все данные вынесены в отдельные модули с TypeScript типизацией

## 📄 Лицензия

[MIT](LICENSE) — Copyright (c) 2026 Danil Chugaev