const CACHE_NAME = 'moradam-cache-v2';

// Önbelleğe alınacak kritik dosyalar
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Eğer özel fontlar veya sabit CSS dosyaların varsa buraya ekleyebilirsin
];

// 1. Kurulum (Install): Dosyaları önbelleğe al
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Moradam: Önbellek açıldı, kritik dosyalar yükleniyor...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Yeni versiyonun hemen aktif olmasını sağlar
});

// 2. Aktivasyon (Activate): Eski önbellekleri temizle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Moradam: Eski önbellek siliniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // SW'nin kontrolü hemen ele almasını sağlar
});

// 3. Yakalama (Fetch): İnternet yoksa önbellekten sun
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Önbellekte varsa onu döndür, yoksa ağa git
      return response || fetch(event.request).then((fetchResponse) => {
        // Dinamik olarak yeni sayfaları da önbelleğe eklemek istersen:
        return caches.open(CACHE_NAME).then((cache) => {
          // Sadece kendi sitenizin isteklerini önbelleğe al (güvenlik için)
          if (event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Hem internet yoksa hem önbellekte yoksa (örneğin çevrimdışı hata sayfası)
      if (event.request.mode === 'navigate') {
        return caches.match('/');
      }
    })
  );
});
