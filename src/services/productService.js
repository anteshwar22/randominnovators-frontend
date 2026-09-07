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

export const getProducts = async () => {
  try {
    const response = await productAxios.get('/');
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await productAxios.post('/', productData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await productAxios.put(`/${id}`, productData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await productAxios.delete(`/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};
