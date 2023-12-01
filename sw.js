// service worker 
const PATH_ROOT = '/davinci/aplicaciones_web_progresivas/parcial/pwa-parcial-2-dwn3av-vigliaccio-sofia/';
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  PATH_ROOT+'index.html',
  PATH_ROOT+'css/styles.css',
  PATH_ROOT+'img/favicon/favicon.ico',
  PATH_ROOT+'scripts/main.js',
  PATH_ROOT+'scripts/vue.js',
  PATH_ROOT+'scripts/vue2-filters.js',
  PATH_ROOT+'scripts/app.js',
  PATH_ROOT+'sw.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js',
  // Agrega aquí otros recursos estáticos como CSS, imágenes, etc.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Verifica si el esquema de la solicitud es 'chrome-extension'
  if (requestUrl.protocol === 'chrome-extension:') {
    // Maneja lógica específica para extensiones de Chrome
    // En este caso, simplemente devolvemos una respuesta predeterminada
    event.respondWith(new Response('\'Recurso de extensión de Chrome no compatible\''));
    return;
  }

  event.respondWith(
      // Primero se intenta recuperar la respuesta del network
      fetch(event.request)
        .then(networkResponse => {
          // Si la respuesta del network esta ok, almacena la respuesta en la caché
          if (networkResponse.ok) {
            const clonedResponse = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clonedResponse));
          }
  
          // Devuelve la respuesta del network
          return networkResponse;
        })
        .catch(async () => {
          // Si la conexión de red falla, intenta usar la data de la caché
          return caches.match(event.request)
            .then(cachedResponse => cachedResponse || new Response('\'Sin conexión a internet\''));
        })
    );
  });
