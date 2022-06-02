const url = "https://walacesoares.github.io/Ajax-Pwa/"
const CACHE_NAME = "ajax-pwa-v8";
const assets = [
    '${url}',
    '${url}index.html',
    '${url}manifest.json',
    '${url}js/instalar.js',
    '${url}js/app.js',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(assets);
      })
    );
  });

// self.addEventListener("fetch", fetchEvent => {
//     fetchEvent.respondWith(
//         caches.match(fetchEvent.request).then(res => {
//             return res || fetch(fetchEvent.request)
//         })
//     )
// })

self.addEventListener('fetch', event => {
  event.respondWith( // busca conteudo em cache ou retorna resultado da request
    caches.match(event.request).then(response => {
      if (response) return response;
      const requestClone = event.request.clone(); 
      return fetch(requestClone).then((response) => {        
        const responseCache = response.clone(); 
        caches.open(CACHE_NAME).then((cache) => { 
          cache.put(event.request, responseCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
