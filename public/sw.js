// Basic Service Worker for PWA
const CACHE_NAME = 'symptom-check-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Always bypass cache for Vercel API and Vite assets (which change names every build)
  if (event.request.url.includes('/api/') || event.request.url.includes('/assets/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For everything else, use Network-First strategy (fallback to cache if offline)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache the new response for future offline use (optional, but good for PWA)
        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network fails, try the cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If offline and not in cache, let it fail naturally
          throw new Error('Network and cache both failed');
        });
      })
  );
});
