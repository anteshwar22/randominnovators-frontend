import axios from 'axios';
import { getStoredToken } from './authService';

import { API_BASE_URL, ADMIN_KEY } from './apiConfig';

const API_URL = `${API_BASE_URL}/products`;

const productAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-admin-key': ADMIN_KEY
  }
});

productAxios.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

import { withCache, invalidateCache } from '../utils/cache';

export const getProducts = async (onBackgroundUpdate, signal) => {
  return withCache(
    'randominnovators:products',
    async () => {
      try {
        const response = await productAxios.get('/', { signal });
        return response.data;
      } catch (error) {
        if (error.name === 'CanceledError') throw error;
        return error.response?.data || { success: false, message: 'Network error' };
      }
    },
    onBackgroundUpdate
  );
};

export const createProduct = async (productData) => {
  try {
    const response = await productAxios.post('/', productData);
    if (response.data && response.data.success !== false) invalidateCache('randominnovators:products');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await productAxios.put(`/${id}`, productData);
    if (response.data && response.data.success !== false) invalidateCache('randominnovators:products');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await productAxios.delete(`/${id}`);
    if (response.data && response.data.success !== false) invalidateCache('randominnovators:products');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};
