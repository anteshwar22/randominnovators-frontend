let baseUrl = import.meta.env.VITE_API_URL || 'https://randominnovators-backend.vercel.app/api';
// Ensure the URL always points to the /api prefix, in case it was configured without it
if (baseUrl && !baseUrl.endsWith('/api') && !baseUrl.endsWith('/api/')) {
  baseUrl = baseUrl.replace(/\/$/, '') + '/api';
}
export const API_BASE_URL = baseUrl;
export const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'admin-secret-token';
