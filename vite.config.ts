import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '️Portfolio',
        short_name: '️Portfolio',
        description: 'Danil Chugaev`s Pet Projects',
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
      },
    }),
  ],
});
