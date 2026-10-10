import { mediaCache } from '@/utils/mediaCache';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

let isRedirecting = false;

const apiCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

function getCachedData(key) {
  if (apiCache.has(key)) {
    const { data, timestamp } = apiCache.get(key);
    if (Date.now() - timestamp < CACHE_TTL_MS) {
      return data;
    }
    apiCache.delete(key);
  }
  return null;
}

function setCachedData(key, data) {
  apiCache.set(key, { data, timestamp: Date.now() });
}

function handleAuthError() {
  if (isRedirecting) return;
  isRedirecting = true;

  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('profilePicture');

  window.location.href = '/login';
}

function isAuthError(status) {
  return status === 401 || status === 403;
}

export const apiService = {
  async getAlbums() {
    const cacheKey = 'albums';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_BASE_URL}/albums`);
      if (!response.ok) throw new Error('Failed to fetch albums');
      const data = await response.json();

      if (Array.isArray(data)) {
        data.forEach(album => album.cover && mediaCache.prefetchMedia(album.cover, 'image'));
      }

      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  },

  async getAlbumById(id) {
    const cacheKey = `album_${id}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_BASE_URL}/albums/${id}`);
      if (!response.ok) throw new Error('Failed to fetch album');
      const data = await response.json();

      if (data && data.cover) mediaCache.prefetchMedia(data.cover, 'image');

      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching album:', error);
      return null;
    }
  },

  async getSongs() {
    const cacheKey = 'songs';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_BASE_URL}/songs`);
      if (!response.ok) throw new Error('Failed to fetch songs');
      const data = await response.json();

      if (Array.isArray(data)) {
        data.forEach(song => song.cover && mediaCache.prefetchMedia(song.cover, 'image'));
      }

      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }
  },

  async getSongById(id) {
    const cacheKey = `song_${id}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_BASE_URL}/songs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch song');
      const data = await response.json();

      if (data && data.cover) mediaCache.prefetchMedia(data.cover, 'image');

      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching song:', error);
      return null;
    }
  },

  async getMusicVideos() {
    const cacheKey = 'musicVideos';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_BASE_URL}/musicVideos`);
      if (!response.ok) throw new Error('Failed to fetch music videos');
      const data = await response.json();

      if (Array.isArray(data)) {
        data.forEach(video => video.cover && mediaCache.prefetchMedia(video.cover, 'image'));
      }

      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching music videos:', error);
      return [];
    }
  },

  async getMusicVideoById(id) {
    const cacheKey = `video_${id}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`);
      if (!response.ok) throw new Error('Failed to fetch music video');
      const data = await response.json();

      if (data && data.cover) mediaCache.prefetchMedia(data.cover, 'image');

      setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error fetching music video:', error);
      return null;
    }
  },

  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (isAuthError(response.status)) {
        handleAuthError();
        return null;
      }
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to fetch profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  /**
    @param {FormData} formData
   */
  async updateProfile(formData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (isAuthError(response.status)) {
        handleAuthError();
        return { ok: false, status: response.status, data: { message: 'Session expired. Redirecting to login...' } };
      }
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { ok: false, status: 500, data: { message: 'Network error' } };
    }
  },

  /**
   * @param {FormData} formData 
   */
  async createPlaylist(formData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/playlists`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (isAuthError(response.status)) {
        handleAuthError();
        return { ok: false, status: response.status, data: { message: 'Session expired. Redirecting to login...' } };
      }
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error('Error creating playlist:', error);
      return { ok: false, status: 500, data: { message: 'Network error' } };
    }
  },

  async getPlaylists() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/playlists`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (isAuthError(response.status)) {
        handleAuthError();
        return [];
      }
      if (!response.ok) throw new Error('Failed to fetch playlists');
      const data = await response.json();

      if (Array.isArray(data)) {
        data.forEach(pl => pl.cover && mediaCache.prefetchMedia(pl.cover, 'image'));
      }

      return data;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  },

  async getPlaylistById(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/playlists/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (isAuthError(response.status)) {
        handleAuthError();
        return null;
      }
      if (!response.ok) throw new Error('Failed to fetch playlist');
      const data = await response.json();

      if (data && data.cover) mediaCache.prefetchMedia(data.cover, 'image');

      return data;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return null;
    }
  },

  async addSongToPlaylist(playlistId, songId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/songs`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId }),
      });
      if (isAuthError(response.status)) {
        handleAuthError();
        return { ok: false, status: response.status, data: { message: 'Session expired.' } };
      }
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      return { ok: false, status: 500, data: { message: 'Network error' } };
    }
  },

  async removeSongFromPlaylist(playlistId, songId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (isAuthError(response.status)) {
        handleAuthError();
        return { ok: false, status: response.status, data: { message: 'Session expired.' } };
      }
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      return { ok: false, status: 500, data: { message: 'Network error' } };
    }
  },
};

