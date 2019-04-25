self.addEventListener('install', (event) =>{
    event.waitUntil(caches.open('dialogflow-web-v2').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/dist/build.js',
            '/assets/manifest_icons/web_hi_res_512',
            'https://fonts.gstatic.com/s/materialicons/v42/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
            'https://fonts.googleapis.com/css?family=Roboto:400,500,700'
        ])
    }))
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        return response || fetch(event.request)
    }))
})