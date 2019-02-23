importScripts('/worker-polyfill.js')
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open('dialogflow-web-v2').then(function(cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/dist/build.js',
        ])
    }))
})

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        return response || fetch(event.request)
    }))
})