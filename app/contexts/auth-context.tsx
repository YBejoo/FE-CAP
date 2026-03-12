/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import * as authService from "~/services/auth.service";
import type { User } from "~/services/auth.service";
import { TOKEN_KEY } from "~/lib/api";

const isDevelopment = import.meta.env.DEV;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isValidatingRef = useRef(false);

  // Initialize authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem(TOKEN_KEY);
      
      if (isDevelopment) {
        console.log('[AuthContext] Initializing, token exists:', !!token);
      }
      
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          
          if (isDevelopment) {
            console.log('[AuthContext] User authenticated:', currentUser.email);
          }
        } catch (err) {
          // Token invalid or expired
          if (isDevelopment) {
            console.warn('[AuthContext] Token validation failed, clearing');
          }
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    initAuth();

    // Listen for 401 unauthorized events from API interceptor
    const handleUnauthorized = async () => {
      if (typeof window === 'undefined') return;
      
      // Prevent infinite loop if validation itself returns 401
      if (isValidatingRef.current) {
        if (isDevelopment) {
          console.log('[AuthContext] Already validating, skipping');
        }
        return;
      }
      
      const token = localStorage.getItem(TOKEN_KEY);
      
      if (!token) {
        setUser(null);
        return;
      }
      
      // Try to validate token by fetching current user
      isValidatingRef.current = true;
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        
        if (isDevelopment) {
          console.log('[AuthContext] Token re-validated successfully');
        }
      } catch (err) {
        if (isDevelopment) {
          console.warn('[AuthContext] Token validation failed after 401');
        }
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      } finally {
        isValidatingRef.current = false;
      }
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      
      if (isDevelopment) {
        console.log('[AuthContext] Login successful:', response.user.email);
      }
      
      return response.user;
    } catch (err) {
      const errorMessage = (err as any)?.userMessage || (err as Error)?.message || "Login gagal";
      setError(errorMessage);
      
      if (isDevelopment) {
        console.error('[AuthContext] Login failed:', errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      
      if (isDevelopment) {
        console.log('[AuthContext] Logout successful');
      }
    } catch (err) {
      if (isDevelopment) {
        console.error('[AuthContext] Logout error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
    // SSR-safe authentication check
    isAuthenticated: (typeof window !== 'undefined' && !!localStorage.getItem(TOKEN_KEY) && !!user) || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * Must be used within AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
