/* Service Worker - Lista de Mercado
   - La página se pide primero a internet (así las actualizaciones se ven
     al primer intento) y, si no hay conexión, se usa la copia guardada.
   - Íconos y demás archivos: primero la copia guardada.
   - Los datos de la lista siguen en localStorage, en el dispositivo.

   IMPORTANTE: cada vez que publiques cambios, sube el número de versión
   (v19 -> v20...) y también APP_VERSION en index.html.
*/

const CACHE_NAME = 'lista-mercado-v19';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Se guarda archivo por archivo: si falta uno, los demás siguen funcionando
      Promise.all(
        ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn('No se pudo guardar', url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // Página principal: red primero, copia guardada si no hay internet
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copia = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put('./index.html', copia));
          }
          return res;
        })
        .catch(() =>
          caches.match('./index.html').then((r) => r || caches.match('./'))
        )
    );
    return;
  }

  // Demás archivos: copia guardada primero, red si no existe
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copia = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copia));
        }
        return res;
      });
    })
  );
});