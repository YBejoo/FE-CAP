/**
 * Authentication Service
 * Handles login, register, logout, and user management
 */

import api, { TOKEN_KEY } from "~/lib/api";
import type { ApiResponse } from "~/types";
import { unwrapResponse } from "~/services/utils";

const isDevelopment = import.meta.env.DEV;

// Types
export type User = {
  id: string;
  email: string;
  nama: string;
  role: 'admin' | 'kaprodi' | 'dosen';
  id_prodi?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterPayload = {
  email: string;
  password: string;
  nama: string;
  role?: 'admin' | 'kaprodi' | 'dosen';
  id_prodi?: string;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
};

/**
 * Login user with email and password
 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/login", payload);
    const result = unwrapResponse(data);
    
    // Save token to localStorage
    if (result.token && typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, result.token);
      
      if (isDevelopment) {
        console.log('[Auth] Login successful, token saved');
      }
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Auth] Login failed:', error);
    }
    throw error;
  }
}

/**
 * Register new user
 */
export async function register(payload: RegisterPayload): Promise<LoginResponse> {
  try {
    const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/register", payload);
    const result = unwrapResponse(data);
    
    // Save token to localStorage if provided
    if (result.token && typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, result.token);
      
      if (isDevelopment) {
        console.log('[Auth] Registration successful, token saved');
      }
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Auth] Registration failed:', error);
    }
    throw error;
  }
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    // Ignore logout errors, clear token anyway
    if (isDevelopment) {
      console.warn('[Auth] Logout API failed, clearing token anyway:', error);
    }
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      
      if (isDevelopment) {
        console.log('[Auth] Token removed, user logged out');
      }
    }
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const { data } = await api.get<ApiResponse<User>>("/auth/me");
    const user = unwrapResponse(data);
    
    if (isDevelopment) {
      console.log('[Auth] Current user fetched:', user.email);
    }
    
    return user;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Auth] Failed to fetch current user:', error);
    }
    throw error;
  }
}

/**
 * Refresh authentication token
 */
export async function refreshToken(): Promise<string> {
  try {
    const { data } = await api.post<ApiResponse<{ token: string }>>("/auth/refresh");
    const result = unwrapResponse(data);
    
    if (result.token && typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, result.token);
      
      if (isDevelopment) {
        console.log('[Auth] Token refreshed');
      }
    }
    
    return result.token;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Auth] Token refresh failed:', error);
    }
    throw error;
  }
}

/**
 * Change user password
 */
export async function changePassword(payload: ChangePasswordPayload): Promise<void> {
  try {
    await api.post("/auth/change-password", payload);
    
    if (isDevelopment) {
      console.log('[Auth] Password changed successfully');
    }
  } catch (error) {
    if (isDevelopment) {
      console.error('[Auth] Password change failed:', error);
    }
    throw error;
  }
}
