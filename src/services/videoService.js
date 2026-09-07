import axios from 'axios';
import { getStoredToken } from './authService';

import { API_BASE_URL, ADMIN_KEY } from './apiConfig';

const videoApi = axios.create({
  baseURL: `${API_BASE_URL}/videos`,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getAdminHeaders = () => {
  const token = getStoredToken();
  const headers = { 'x-admin-key': ADMIN_KEY };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Extract YouTube Video ID from various URL formats
 */
export const extractYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.trim().match(regExp);
  return (match && match[2] && match[2].length === 11) ? match[2] : null;
};

import { withCache, invalidateCache } from '../utils/cache';

/**
 * Fetch all videos (Public fetches active only; pass all=true for Admin to get all)
 */
export const getVideos = async (all = false, limit, onBackgroundUpdate, signal) => {
  const cacheKey = `randominnovators:videos:all=${all}&limit=${limit || 'none'}`;
  return withCache(
    cacheKey,
    async () => {
      const params = { all: all ? 'true' : 'false' };
      if (limit) params.limit = limit;
      const response = await videoApi.get('', { params, signal }).catch(e => {
        if (e.name === 'CanceledError') throw e;
        return { data: null };
      });
      return response.data;
    },
    onBackgroundUpdate
  );
};

/**
 * Fetch single video by ID
 */
export const getVideoById = async (id) => {
  const response = await videoApi.get(`/${id}`);
  return response.data;
};

/**
 * Create a new YouTube video (Admin protected)
 */
export const createVideo = async (videoData) => {
  const response = await videoApi.post('', videoData, {
    headers: getAdminHeaders()
  });
  if (response.data && response.data.success !== false) invalidateCache('randominnovators:videos');
  return response.data;
};

/**
 * Update an existing video by ID (Admin protected)
 */
export const updateVideo = async (id, videoData) => {
  const response = await videoApi.put(`/${id}`, videoData, {
    headers: getAdminHeaders()
  });
  if (response.data && response.data.success !== false) invalidateCache('randominnovators:videos');
  return response.data;
};

/**
 * Delete a video by ID (Admin protected)
 */
export const deleteVideo = async (id) => {
  const response = await videoApi.delete(`/${id}`, {
    headers: getAdminHeaders()
  });
  if (response.data && response.data.success !== false) invalidateCache('randominnovators:videos');
  return response.data;
};

export default {
  extractYouTubeId,
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo
};
