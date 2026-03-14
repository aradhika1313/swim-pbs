const CACHE = 'swim-pbs-v2';
const ASSETS = [
  '/swim-pbs/',
  '/swim-pbs/index.html',
  '/swim-pbs/manifest.json',
  '/swim-pbs/icon-192.png',
  '/swim-pbs/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/swim-pbs/index.html')))
  );
});
