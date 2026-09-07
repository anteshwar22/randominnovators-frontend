import axios from 'axios';
import { getStoredToken } from './authService';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/products` : 'http://localhost:5000/api/products';
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'admin-secret-token';

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
