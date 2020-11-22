importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox){
	console.log(`Workbox berhasil dimuat`);
	workbox.precaching.precacheAndRoute([
		{ url: '/', revision: '1' },
		{ url: '/manifest.json', revision: '1' },
		{ url: '/navigasi.html', revision: '1' },
		{ url: '/index.html', revision: '1' },
		{ url: '/info.html', revision: '1' },
		// { url: '/halaman/favorit.html', revision: '1' },
		// { url: '/halaman/home.html', revision: '1' },
		// { url: '/halaman/klasmen.html', revision: '1' },
		{ url: '/css/materialize.min.css', revision: '1' },
		{ url: '/js/materialize.min.js', revision: '1' },
		{ url: '/js/main.js', revision: '2' },
		{ url: '/js/data/api.js', revision: '1' },
		{ url: '/js/data/idb.js', revision: '1' },
		{ url: '/js/data/db.js', revision: '1' },
		{ url: '/js/comp/home.js', revision: '1' },
		{ url: '/js/comp/klasmen.js', revision: '1' },
		{ url: '/js/comp/info.js', revision: '1' },
		{ url: '/js/comp/Favorite.js', revision: '1' },
		{ url: '/img/apple-icon-180x180.png', revision: '1' },
		{ url: '/img/favicon-16x16.png', revision: '1' },
		{ url: '/img/favicon-32x32.png', revision: '1' },
		{ url: '/img/icon-512.png', revision: '1' },
	], {
		ignoreUrlParametersMatching: [/.*/],
	});

	workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
	);

	workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'api-images',
		})
	)

	workbox.routing.registerRoute(
		/.*(?:googleapis|gstatic)\.com/,
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'google-fonts-stylesheets',
		})
    );

	workbox.routing.registerRoute(
		/\.(?:js|css)$/,
		new workbox.strategies.StaleWhileRevalidate({
			cacheName: 'static-resources',
		})
	);

	workbox.routing.registerRoute(
		new RegExp('/halaman/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'halaman'
		})
	);

	// workbox.routing.registerRoute(
	// 	new RegExp('/js/'),
	// 	workbox.strategies.staleWhileRevalidate({
	// 		cacheName: 'js'
	// 	})
	// );

	
}else{
	console.log(`Workbox gagal dimuat`);
}

// event push notification
self.addEventListener('push', (event) => {
	console.log('[Service Worker] Push Received.');
	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
	let body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}

	const title = 'Push Notification.';
	const options = {
		body: body,
		icon: 'assets/favicon/favicon-32x32.png',
		vibrate: [100, 50, 100],
		dateOfArrival: Date.now(),
		primaryKey: 1,
	};

	const notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);
});
  
// Klik notifikasi
self.addEventListener('notificationclick', (event) => {
	console.log('[Service Worker] Notification click Received.');

	event.notification.close();

	event.waitUntil(
		clients.openWindow('https://dicoding.com/'),
	);
});