const API_BASE_URL = 'http://localhost:3000/api';

export const apiService = {
  async getAlbums() {
    try {
      const response = await fetch(`${API_BASE_URL}/albums`);
      if (!response.ok) throw new Error('Failed to fetch albums');
      return await response.json();
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  },

  async getAlbumById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/albums/${id}`);
      if (!response.ok) throw new Error('Failed to fetch album');
      return await response.json();
    } catch (error) {
      console.error('Error fetching album:', error);
      return null;
    }
  },

  async getSongs() {
    try {
      const response = await fetch(`${API_BASE_URL}/songs`);
      if (!response.ok) throw new Error('Failed to fetch songs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }
  },

  async getSongById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch song');
      return await response.json();
    } catch (error) {
      console.error('Error fetching song:', error);
      return null;
    }
  },

  async getMusicVideos() {
    try {
      const response = await fetch(`${API_BASE_URL}/musicVideos`);
      if (!response.ok) throw new Error('Failed to fetch music videos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching music videos:', error);
      return [];
    }
  },

  async getMusicVideoById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${id}`);
      if (!response.ok) throw new Error('Failed to fetch music video');
      return await response.json();
    } catch (error) {
      console.error('Error fetching music video:', error);
      return null;
    }
  },

  /**
   * Get the current user's profile (JWT-protected).
   */
  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
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
   * Update the current user's profile (JWT-protected).
   * @param {FormData} formData - Must contain optional `username` and/or `profilePicture` (File).
   */
  async updateProfile(formData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { ok: false, status: 500, data: { message: 'Network error' } };
    }
  },

  /**
   * Create a new playlist (JWT-protected).
   * @param {FormData} formData - Must contain `name`, optional `description` and `cover` (File).
   */
  async createPlaylist(formData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/playlists`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      console.error('Error creating playlist:', error);
      return { ok: false, status: 500, data: { message: 'Network error' } };
    }
  },
};
