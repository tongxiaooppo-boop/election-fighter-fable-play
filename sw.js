// 選戰風雲 service worker 88d208a1db
const CACHE = "xzfy-88d208a1db";
const PREFIX = "xzfy-";
const FILES = ["./","./assets/clips-Dq2VwamF.bin","./assets/council-DVFlmRjo.webp","./assets/index-CGXX5PgG.js","./assets/nightmarket-BHEmTZR_.webp","./assets/park-ByCbBgEr.webp","./assets/studio-CwUp09rL.webp","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
});

self.addEventListener('message', (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.indexOf(PREFIX) === 0 && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(request).catch((err) => {
        if (request.mode === 'navigate') {
          return caches.match('./index.html').then((fb) => {
            if (fb) return fb;
            throw err;
          });
        }
        throw err;
      });
    }),
  );
});
