const CACHE = 'plano-nutricao-v17';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install: cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for app shell, network fallback for the rest (fonts)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        // Cache Google Fonts for offline use
        if (e.request.url.includes('fonts.g')) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});

// Notification click: "Feito" abre o app, "Soneca" agenda +30min via postMessage
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'snooze') {
    const tag = e.notification.tag; // 'meal-~16h30' etc
    const snoozeKey = 'plano_snooze_' + tag.replace('meal-', '');
    const snoozeAt = Date.now() + 30 * 60 * 1000;
    // Notify all open clients to save the snooze time and reschedule
    e.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(c => c.postMessage({ type: 'snooze', snoozeKey, snoozeAt }));
      })
    );
    return;
  }
  // 'done' or default tap: focus/open the app
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      const focused = clients.find(c => c.focused);
      if (focused) return focused.focus();
      const open = clients.find(c => c.url.includes(self.location.origin));
      if (open) return open.focus();
      return self.clients.openWindow('./');
    })
  );
});
