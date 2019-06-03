/* jshint esversion:6 */

let CACHE_NAME = 'site-cache';
let urlsToCache = [
  '.',
  'offline.manifest',
  'index.html',
  'script.js',
  'style.css',
  'tetromino.jpg',
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Using content from SW cache');
      //console.log(urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
