const CACHE='marycandys-v1.2.0';
const ASSETS=['./','./index.html','./marycandys-v1.1.0.css','./marycandys-v1.1.1.css','./marycandys-v1.1.1.js','./marycandys-v1.2.0.css','./marycandys-v1.2.0-pwa.js','./manifest.webmanifest','./icon-192.svg','./icon-512.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))))});
