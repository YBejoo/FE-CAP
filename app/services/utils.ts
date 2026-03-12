import type { ApiResponse } from "~/types";

export function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.error || "Request failed");
  }
  return response.data as T;
}

export function toDate(value?: string | number | Date | null): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  return new Date(value);
}
