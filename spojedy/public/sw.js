const CACHE_NAME_IMAGES = 'spojedy-images-v2';
const CACHE_NAME_MEDIA = 'spojedy-media-v2';

const CACHE_VERSIONS = [CACHE_NAME_IMAGES, CACHE_NAME_MEDIA];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!CACHE_VERSIONS.includes(cacheName) && (cacheName.startsWith('spojedy-'))) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

async function handleRangeRequest(request, cacheName) {
  const cache = await caches.open(cacheName);
  let cachedResponse = await cache.match(request.url);

  if (!cachedResponse) {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.status === 200) {
        cache.put(request.url, networkResponse.clone());
      }
      return networkResponse;
    } catch (err) {
      console.warn('[SW] Range request network fetch failed:', err);
      return new Response('Network error', { status: 503 });
    }
  }

  const rangeHeader = request.headers.get('range');
  if (!rangeHeader) {
    return cachedResponse;
  }

  const arrayBuffer = await cachedResponse.arrayBuffer();
  const totalSize = arrayBuffer.byteLength;
  const parts = rangeHeader.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

  if (isNaN(start) || start >= totalSize) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${totalSize}` },
    });
  }

  const chunk = arrayBuffer.slice(start, end + 1);
  const contentType = cachedResponse.headers.get('content-type') || 'media/unknown';

  return new Response(chunk, {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Type': contentType,
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Content-Length': chunk.byteLength,
      'Accept-Ranges': 'bytes',
    },
  });
}

async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME_IMAGES);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok || networkResponse.type === 'opaque') {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    console.warn('[SW] Image fetch failed:', request.url, err);
    return cachedResponse || new Response('Image unavailable', { status: 404 });
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (!url.protocol.startsWith('http')) return;

  const destination = event.request.destination;
  const path = url.pathname.toLowerCase();

  const isMedia = destination === 'audio' || destination === 'video' ||
    path.match(/\.(mp3|wav|ogg|aac|m4a|mp4|webm|mkv)$/);

  const isImage = destination === 'image' ||
    path.match(/\.(png|jpe?g|webp|gif|svg|avif|ico)$/);

  if (isMedia) {
    event.respondWith(handleRangeRequest(event.request, CACHE_NAME_MEDIA));
  } else if (isImage) {
    event.respondWith(handleImageRequest(event.request));
  }
});
