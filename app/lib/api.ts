import axios from "axios";

// Backend API Configuration
const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8787/api";
const timeout = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000);
const isDevelopment = import.meta.env.DEV;

// Use consistent token key - always "token"
export const TOKEN_KEY = "token";

// Standardized error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
  UNAUTHORIZED: 'Sesi Anda telah berakhir. Silakan login kembali.',
  FORBIDDEN: 'Anda tidak memiliki akses untuk melakukan aksi ini.',
  NOT_FOUND: 'Data tidak ditemukan.',
  VALIDATION_ERROR: 'Data yang Anda masukkan tidak valid.',
  SERVER_ERROR: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
  TIMEOUT: 'Permintaan timeout. Silakan coba lagi.',
} as const;

const api = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menambahkan token
api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  
  const token = localStorage.getItem(TOKEN_KEY);
  
  // Debug logging only in development
  if (isDevelopment) {
    console.log(`\n🌐 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
    console.log('🔑 [API Request] Has Token:', !!token);
    if (config.params) {
      console.log('📋 [API Request] Params:', config.params);
    }
    if (config.data) {
      console.log('📦 [API Request] Body:', config.data);
    }
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => {
    // Debug logging only in development
    if (isDevelopment) {
      console.log(`\n✅ [API Response] ${response.config.url}`);
      console.log('📈 [API Response] Status:', response.status);
      console.log('📦 [API Response] Data:', response.data);
      console.log('✅ [API Response] Success\n');
    }
    return response;
  },
  (error) => {
    // Handle different error types
    if (!error.response) {
      // Network error
      if (isDevelopment) console.error('[API] Network Error:', error.message);
      error.userMessage = ERROR_MESSAGES.NETWORK_ERROR;
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = error.config?.url;
    const isLoginRequest = url?.includes('/auth/login');
    const isGetCurrentUser = url?.includes('/auth/me');

    // Handle specific status codes
    switch (status) {
      case 401:
        if (typeof window !== 'undefined') {
          if (isDevelopment) {
            console.log(`[API] 401 Unauthorized:`, url);
          }
          
          if (!isLoginRequest && !isGetCurrentUser) {
            // Clear token and notify app
            localStorage.removeItem(TOKEN_KEY);
            window.dispatchEvent(new CustomEvent('auth:unauthorized'));
            error.userMessage = ERROR_MESSAGES.UNAUTHORIZED;
          } else {
            error.userMessage = error.response?.data?.message || 'Email atau password salah';
          }
        }
        break;

      case 403:
        error.userMessage = ERROR_MESSAGES.FORBIDDEN;
        break;

      case 404:
        error.userMessage = ERROR_MESSAGES.NOT_FOUND;
        break;

      case 422:
      case 400:
        error.userMessage = error.response?.data?.message || ERROR_MESSAGES.VALIDATION_ERROR;
        break;

      case 500:
      case 502:
      case 503:
        error.userMessage = ERROR_MESSAGES.SERVER_ERROR;
        break;

      default:
        error.userMessage = error.response?.data?.message || 'Terjadi kesalahan yang tidak diketahui';
    }

    if (isDevelopment) {
      console.error('[API] Error:', {
        status,
        url,
        message: error.userMessage,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);

export default api;