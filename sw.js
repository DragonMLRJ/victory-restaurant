// Victory Restaurant - Service Worker for PWA Support

const CACHE_NAME = 'victory-restaurant-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/README.md'
];

// Install Service Worker
self.addEventListener('install', function(event) {
  console.log('Victory Restaurant Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Victory Restaurant Service Worker: Caching files...');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Victory Restaurant Service Worker: Cache failed', error);
      })
  );
});

// Fetch Event - Serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          console.log('Victory Restaurant Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('Victory Restaurant Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request).catch(function() {
          // If both cache and network fail, return a custom offline page
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      }
    )
  );
});

// Activate Service Worker - Clean up old caches
self.addEventListener('activate', function(event) {
  console.log('Victory Restaurant Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Victory Restaurant Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background Sync (for offline order submission)
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    console.log('Victory Restaurant Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline orders when connection is restored
  return new Promise(function(resolve) {
    console.log('Victory Restaurant Service Worker: Processing offline orders...');
    // In a real app, this would sync offline orders to the server
    resolve();
  });
}

// Push notifications (for order updates)
self.addEventListener('push', function(event) {
  console.log('Victory Restaurant Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle mise à jour de Victory Restaurant!',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏆</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏆</text></svg>',
    tag: 'victory-restaurant',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'Voir'
      },
      {
        action: 'dismiss',
        title: 'Ignorer'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Victory Restaurant', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  console.log('Victory Restaurant Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('Victory Restaurant Service Worker: Loaded successfully! 🏆');
