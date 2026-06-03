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
};
