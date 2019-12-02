importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`)

workbox.precaching.precacheAndRoute([
  {  url: '/index.html', revision: '1'},
  {  url: '/navigation.html', revision: '1'},
  {  url: '/teams.html', revision: '1'},
  {  url: '/pages/standing.html', revision: '1'},
  {  url: '/favorit.html', revision: '1'},
  {  url:'/css/materialize.css', revision: '1'},
  {  url: '/js/call-service-worker.js', revision: '1'},
  {  url:'/js/materialize.js', revision: '1'},
  {  url:'/js/navigation.js', revision: '1'},
  {  url:'js/api.js', revision: '1'},
  {  url:'assets/soccer-ball192px.png', revision: '1'},
  {  url:'assets/soccer-ball512px.png', revision: '1'},
  {  url:'/manifest.json', revision: '1'},
  {  url:'js/idb.js', revision: '1'},
  {  url:'js/db.js', revision: '1'},
  {  url:'/favicon.ico', revision: '1'},
]);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'index'
  })
);
workbox.routing.registerRoute(
  new RegExp('/page/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'index'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.networkFirst({
    cacheName: "json-data"
  })
);
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google"
  })
);
workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'js'
  })
);
workbox.routing.registerRoute(
  new RegExp('/assets/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'assets'
  })
);
self.addEventListener('push', function(event) {
  console.log("push notification diterima");
  var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Notifikasi';
    }
    var options = {
      body: body,
      icon: '/assets/soccer-ball192px.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Notifikasi', options)
    );
  });
  
