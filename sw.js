const CACHE_NAME = 'mathwar-v2';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './audio/battle-march.mp3',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Cache-first, falling back to network, then caching whatever the network
// returns (this also picks up the Google Fonts requests at runtime so the
// game keeps its pixel font offline after the first successful load).
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            try { cache.put(event.request, copy); } catch (e) { /* ignore */ }
          });
          return response;
        })
        .catch(() => cached);
    })
  );
});
