self.addEventListener('install', (event) =>{
    event.waitUntil(caches.open('dialogflow-web-v2').then(cache => {
        return cache.addAll([
            '/',
            '/dist/build.js',
            '/assets/manifest_icons/web_hi_res_512',
            'https://fonts.googleapis.com/css?family=Material+Icons',
            'https://fonts.googleapis.com/css?family=Roboto:400,500,700'
        ])
        .catch(err => console.log(err))
    }))
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        return response || fetch(event.request)
    }))
})