var CACHE = "v3"
self.addEventListener('install', (event) => {
    get_cache_no_cors('https://www.google-analytics.com/analytics.js');
    get_cache_no_cors('https://www.googletagmanager.com/gtag/js?id=UA-118359606-1');
    event.waitUntil(caches.open(CACHE).then((cache) => {
        return cache.addAll(['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap.min.css',
         'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
         , 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
             'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
               'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://4battle.ru/homescreen.png', 
                'https://4battle.ru/manifest.json',
                'https://4battle.ru/app.js',
                'https://4battle.ru/worker.js',
                'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
                'https://4battle.ru/game_offline',
                'https://4battle.ru/1'])
    }).then(function() {
        return self.skipWaiting()
    }))
});
self.addEventListener('fetch', function(event) {
    if((event.request.url.indexOf('https://www.google-analytics.com/analytics.js') !== -1)||(event.request.url.indexOf('gtag') !== -1)){
    console.log(event.request.url + ' from cache   (analytics)')
    event.respondWith(fromCache(event.request).catch(error => console.log("analytics blocked")))
    }else if(event.request.url.indexOf('https://www.google-analytics.com/collect') !== -1){
        console.log(event.request.url + ' not from cache')
        event.respondWith(fetch(event.request).catch(error => console.log(error)) )
    }else if((event.request.url.indexOf('homescreen.png') !== -1) || (event.request.url.indexOf('manifest.json') !== -1)){
        console.log(event.request.url + ' from cache')
        event.respondWith(fromCache(event.request).catch(error => console.log("manifest/homescreen error")))
    }else if(event.request.url.indexOf('game_offline') !== -1) {
        console.log(event.request.url + ' from cache')
        event.respondWith(fromCache(event.request).catch(error => console.log("game_offline error")))
    }else if(event.request.url.indexOf('app.js') !== -1) {
        console.log(event.request.url + ' from cache')
        event.respondWith(fromCache(event.request).catch(error => console.log("app.js error")))
    }else if(event.request.url.indexOf('worker.js') !== -1) {
        console.log(event.request.url + ' from cache')
        event.respondWith(fromCache(event.request).catch(error => console.log("worker.js error")))
    }else if((event.request.url.indexOf('4battle.ru') !== -1)){
        console.log(event.request.url + ' not from cache')
        event.respondWith(fetch(event.request).catch(error => fromCache("https://4battle.ru/1")))
    }else{
        console.log(event.request.url + ' from cache')
        event.respondWith(fromCache(event.request).catch(error =>console.log("cant get "+event.request.url+" from cache")))
    }

   })

function fromCache(request) {
    return caches.open(CACHE).then((cache) => cache.match(request).then((matching) => matching || Promise.reject('no-match')))
}

function get_cache_no_cors(url){
  const request = new Request(url, { mode: 'no-cors' });
  fetch(request).then(response => caches.open(CACHE).then((cache) => {cache.put(request, response)})).catch(error=>console.log(error));
}
self.addEventListener('activate', function(event) {
    return self.clients.claim()
})
