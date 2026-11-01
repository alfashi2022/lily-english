const CACHE = "lily-english-v19";
const FILES = ["./index.html", "./styles.css?v=19", "./app.js?v=19", "./content.js?v=19", "./textbook.js?v=19", "./extra.js?v=19", "./phonetics.js?v=19", "./manifest.json", "./icon.png?v=19", "./images/coco.jpg?v=19"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
