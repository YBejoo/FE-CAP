import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";
const timeout = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000);
const tokenKey = import.meta.env.VITE_AUTH_TOKEN_KEY ?? "token";

const api = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menambahkan token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem(tokenKey);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;