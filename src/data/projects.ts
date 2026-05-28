import type { Project } from '@/types.ts';

export const projects: Project[] = [
  // ==================== ТЕСТОВЫЕ ЗАДАНИЯ ====================
  {
    id: 3,
    title: 'Koshelek Crypto Market',
    description:
      'Тестовое задание для Кошелек.ру — современный крипто-маркет с реал-тайм данными.',
    year: 2025,
    type: 'test',
    technologies: ['Vue 3', 'TypeScript', 'Pinia', 'Vite'],
    github: 'https://github.com/DanilChugaev/koshelek-crypto-market',
    image: '/src/assets/img/koshelek.jpg',
  },
  {
    id: 4,
    title: 'Wisebits Test Task',
    description:
      'Тестовое задание для Wisebits — SSR/CSR архитектура с высокой производительностью.',
    year: 2024,
    type: 'test',
    technologies: ['Vue 3', 'TypeScript', 'Vite'],
    github: 'https://github.com/DanilChugaev/wisebits-test',
    image: '/src/assets/img/wisebits.jpg',
  },
  {
    id: 5,
    title: 'Rest API Client',
    description:
      'Универсальный клиент для работы с REST API с удобным интерфейсом.',
    year: 2025,
    type: 'test',
    technologies: ['Vue 3', 'TypeScript'],
    github: 'https://github.com/DanilChugaev/rest-api-client',
    image: '/src/assets/img/rest-api.jpg',
  },
  {
    id: 6,
    title: 'KMTT Admin Panel',
    description:
      'Тестовое задание для Комитета — удобная административная панель.',
    year: 2024,
    type: 'test',
    technologies: ['Vue 3', 'TypeScript', 'Pinia'],
    github: 'https://github.com/DanilChugaev/kmtt-admin',
    image: '/src/assets/img/kmtt.jpg',
  },

  // ==================== ПЕТ-ПРОЕКТЫ ====================
  {
    id: 7,
    title: 'Marketing Forms',
    description:
      'Набор современных и конверсионных форм для маркетинга и лендингов.',
    year: 2025,
    type: 'pet',
    technologies: ['Vue 3', 'TypeScript', 'Vite'],
    github: 'https://github.com/DanilChugaev/marketing-forms',
    image: '/src/assets/img/marketing-forms.jpg',
  },
  {
    id: 8,
    title: 'Sapper (Сапёр)',
    description:
      'Современная версия классической игры Сапёр с красивым дизайном и несколькими уровнями сложности.',
    year: 2025,
    type: 'pet',
    technologies: ['Vue 3', 'TypeScript', 'Vite'],
    github: 'https://github.com/DanilChugaev/sapper',
    image: '/src/assets/img/sapper.jpg',
  },
  {
    id: 9,
    title: 'Labyrinth',
    description:
      'Procedural генерация уровней. Игра-лабиринт, где каждый уровень уникальный.',
    year: 2025,
    type: 'pet',
    technologies: ['Vue 3', 'TypeScript', 'Canvas'],
    github: 'https://github.com/DanilChugaev/labyrinth',
    image: '/src/assets/img/labyrinth.jpg',
  },
  {
    id: 10,
    title: 'Voice-to-Text Obsidian Plugin',
    description: 'Плагин для Obsidian — преобразование голоса в текст.',
    year: 2025,
    type: 'pet',
    technologies: ['TypeScript', 'Web Speech API'],
    github: 'https://github.com/DanilChugaev/voice-to-text-obsidian-plugin',
    image: '/src/assets/img/voice-to-text.jpg',
  },
];
