const cacheName = 'v3';

const assets = [
    '/',
    '/index.html',
    '/manifest.json',
    '/vite.svg',
    '/logo192.png',
    '/logo512.png',

];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assets)
                .then(() => console.log('Assets cached successfully'))
                .catch((err) => console.error('Cache addAll failed:', err));
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== cacheName).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith( // ✅ التصحيح هنا
        caches.match(event.request).then((res) => {
            return res || fetch(event.request);
        })
    );
});

self.addEventListener('push', (event) => {
    event.waitUntil(
        self.registration.showNotification()
    )
})
