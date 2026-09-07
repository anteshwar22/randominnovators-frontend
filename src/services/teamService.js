import axios from 'axios';
import { getStoredToken } from './authService';

import { API_BASE_URL, ADMIN_KEY } from './apiConfig';

// NOTE: this admin key is sent from the browser, so it is visible to anyone
// who opens dev tools — fine for a local/demo project, but for a real
// deployment put the admin dashboard behind a proper login (e.g. a
// server-issued session token) instead of a hardcoded shared secret.

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-admin-key': ADMIN_KEY
  }
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

import { withCache, invalidateCache } from '../utils/cache';

/**
 * Get all team members
 */
export const getTeamMembers = async (onBackgroundUpdate, signal) => {
  return withCache(
    'randominnovators:team',
    async () => {
      const response = await api.get('/team', { signal }).catch(e => {
        if (e.name === 'CanceledError') throw e;
        return { data: null };
      });
      return response.data;
    },
    onBackgroundUpdate
  );
};

/**
 * Get team members by category ('team', 'mentor', 'employee', 'admin')
 */
export const getTeamMembersByCategory = async (category, onBackgroundUpdate, signal) => {
  const cacheKey = category ? `randominnovators:team:${category}` : 'randominnovators:team';
  return withCache(
    cacheKey,
    async () => {
      const response = await api.get('/team', { params: { category }, signal }).catch(e => {
        if (e.name === 'CanceledError') throw e;
        return { data: null };
      });
      return response.data;
    },
    onBackgroundUpdate
  );
};

/**
 * Create a new team member (supports FormData for image upload)
 */
export const createTeamMember = async (memberData) => {
  const isFormData = memberData instanceof FormData;
  const response = await api.post('/team', memberData, {
    headers: isFormData ? { 'Content-Type': undefined } : {}
  });
  if (response.data && response.data.success !== false) invalidateCache('randominnovators:team');
  return response.data;
};

/**
 * Update an existing team member by ID (supports FormData for image update)
 */
export const updateTeamMember = async (id, memberData) => {
  const isFormData = memberData instanceof FormData;
  const response = await api.put(`/team/${id}`, memberData, {
    headers: isFormData ? { 'Content-Type': undefined } : {}
  });
  if (response.data && response.data.success !== false) invalidateCache('randominnovators:team');
  return response.data;
};

/**
 * Delete a team member by ID
 */
export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team/${id}`);
  if (response.data && response.data.success !== false) invalidateCache('randominnovators:team');
  return response.data;
};

export default {
  getTeamMembers,
  getTeamMembersByCategory,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};
