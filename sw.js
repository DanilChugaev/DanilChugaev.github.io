/* KILL-SWITCH v1 — 2026-10-17.
   Живёт в корне портфолио, чтобы снять старый workbox-СВ у всех посетителей.
   Через 2–3 недели после деплоя этот файл можно удалить совсем. */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      // хочешь сохранить кэш учебника — замени на filter(k => !k.includes('go-book'))
      await Promise.all(keys.map(k => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      for (const c of clients) {
        try {
          await c.navigate(c.url);
        } catch {}
      }
    })(),
  );
});
// fetch-хендлера нет — сеть больше не перехватываем
