const CACHE_NAME_MEDIA = 'spojedy-media-v2';
const CACHE_NAME_IMAGES = 'spojedy-images-v2';

// Keep track of active Blob URLs to avoid duplicate allocations
const activeBlobUrls = new Map();

/**
 * Determine cache name based on type or URL extension
 */
function getCacheName(url, type) {
  if (type === 'image' || type === 'img') return CACHE_NAME_IMAGES;
  if (type === 'audio' || type === 'video' || type === 'media') return CACHE_NAME_MEDIA;

  if (typeof url === 'string') {
    const lower = url.toLowerCase();
    if (lower.match(/\.(mp3|wav|ogg|aac|m4a|mp4|webm|mkv)(\?.*)?$/)) {
      return CACHE_NAME_MEDIA;
    }
    if (lower.match(/\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/)) {
      return CACHE_NAME_IMAGES;
    }
  }
  return CACHE_NAME_MEDIA;
}

export const mediaCache = {
  /**
   * Get a cached Blob URL for a given media URL.
   * If cached, returns blob: URL. If not, fetches, caches, and returns blob: URL.
   * Falls back to original URL on network/CORS error.
   * 
   * @param {string} url - Original media source URL
   * @param {'audio' | 'video' | 'image' | 'auto'} type - Media category
   * @returns {Promise<string>} Blob URL or original URL fallback
   */
  async getMediaUrl(url, type = 'auto') {
    if (!url || typeof url !== 'string') return url;

    const trimmedUrl = url.trim();
    if (trimmedUrl.startsWith('blob:') || trimmedUrl.startsWith('data:')) {
      return trimmedUrl;
    }

    // Return cached Blob URL if already generated in current session
    if (activeBlobUrls.has(trimmedUrl)) {
      return activeBlobUrls.get(trimmedUrl);
    }

    const cacheName = getCacheName(trimmedUrl, type);
    const isMedia = cacheName === CACHE_NAME_MEDIA;

    // For audio/video media, return direct URL immediately to allow native progressive streaming
    // while trigger background prefetching for Service Worker range handling.
    if (isMedia) {
      this.prefetchMedia(trimmedUrl, type);
      return trimmedUrl;
    }

    try {
      if ('caches' in window) {
        const cache = await caches.open(cacheName);
        let response = await cache.match(trimmedUrl);

        if (!response) {
          try {
            const networkResponse = await fetch(trimmedUrl, { mode: 'cors' });
            if (networkResponse.ok || networkResponse.type === 'opaque') {
              await cache.put(trimmedUrl, networkResponse.clone());
              response = networkResponse;
            }
          } catch (fetchErr) {
            console.warn('MediaCache: fetch failed for', trimmedUrl, fetchErr);
          }
        }

        if (response) {
          const blob = await response.blob();
          if (blob && blob.size > 0) {
            const blobUrl = URL.createObjectURL(blob);
            activeBlobUrls.set(trimmedUrl, blobUrl);
            return blobUrl;
          }
        }
      }
    } catch (err) {
      console.warn('MediaCache error:', err);
    }

    return trimmedUrl;
  },

  /**
   * Pre-fetches and caches media URLs in background without blocking
   * 
   * @param {string | string[]} urls - Single URL or array of URLs to pre-cache
   * @param {'audio' | 'video' | 'image' | 'auto'} type 
   */
  prefetchMedia(urls, type = 'auto') {
    if (!urls) return;
    const urlList = Array.isArray(urls) ? urls : [urls];
    urlList.forEach((url) => {
      if (url && typeof url === 'string') {
        this.getMediaUrl(url, type).catch(() => {});
      }
    });
  },

  /**
   * Revoke single Blob URL from memory if no longer needed
   */
  revokeBlobUrl(url) {
    if (activeBlobUrls.has(url)) {
      const blobUrl = activeBlobUrls.get(url);
      URL.revokeObjectURL(blobUrl);
      activeBlobUrls.delete(url);
    }
  },

  /**
   * Clear all media and image caches from Cache Storage
   */
  async clearCache() {
    activeBlobUrls.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    activeBlobUrls.clear();

    if ('caches' in window) {
      await caches.delete(CACHE_NAME_MEDIA);
      await caches.delete(CACHE_NAME_IMAGES);
    }
  }
};
