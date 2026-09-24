import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Danil Chugaev — Portfolio',
        short_name: 'Danil Chugaev',
        description:
          'Публичное техническое портфолио: pet-проекты, тестовые задания и open source.',
        display: 'standalone',
        theme_color: '#1e1e1e',
        icons: [
          {
            src: 'portfolio-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'portfolio-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        // Портфолио публикуется в корне домена и его Service Worker контролирует
        // также страницы демо в подпапках. Не подменяем их index.html портфолио.
        navigateFallbackDenylist: [/^\/.+/],
      },
    }),
  ],
});
