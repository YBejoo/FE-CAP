import { TOKEN_KEY } from "./api";

/**
 * Utility functions for localStorage token management
 * Ensures consistent token handling across the app
 */

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  console.log(`[Storage] Setting token with key: ${TOKEN_KEY}`);
  localStorage.setItem(TOKEN_KEY, token);
  
  // Verify it was saved
  const saved = localStorage.getItem(TOKEN_KEY);
  if (saved === token) {
    console.log(`[Storage] Token saved successfully`);
  } else {
    console.error(`[Storage] ERROR: Token save failed!`);
  }
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  console.log(`[Storage] Removing token`);
  localStorage.removeItem(TOKEN_KEY);
}

export function hasToken(): boolean {
  return !!getToken();
}
