/**
 * Prodi (Program Studi) Service
 * Handles CRUD operations for Program Studi
 */

import api from "~/lib/api";
import type { ApiResponse, Prodi } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

const isDevelopment = import.meta.env.DEV;

/**
 * Backend Prodi type (from API response)
 */
type BackendProdi = {
  id: string;
  kode_prodi?: string;
  nama_prodi: string;
  fakultas?: string;
  jenjang?: 'D3' | 'S1' | 'S2' | 'S3';
  akreditasi?: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

export type CreateProdiInput = {
  kode_prodi: string;
  nama_prodi: string;
  fakultas?: string;
  jenjang: 'D3' | 'S1' | 'S2' | 'S3';
  akreditasi?: string;
};

export type UpdateProdiInput = Partial<CreateProdiInput>;

/**
 * Map backend Prodi to frontend Prodi type
 */
const mapProdi = (item: BackendProdi): Prodi => ({
  id_prodi: item.id,
  kode_prodi: item.kode_prodi,
  nama_prodi: item.nama_prodi,
  fakultas: item.fakultas,
  jenjang: item.jenjang,
  akreditasi: item.akreditasi,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

/**
 * Get all Prodi
 */
export async function getAllProdis(): Promise<Prodi[]> {
  try {
    const { data } = await api.get<ApiResponse<BackendProdi[]>>("/prodi");
    const items = unwrapResponse(data) ?? [];
    const result = items.map(mapProdi);
    
    if (isDevelopment) {
      console.log('[Service:Prodi] Fetched all prodis:', result.length);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:Prodi] Failed to fetch prodis:', error);
    }
    throw error;
  }
}

/**
 * Get single Prodi by ID
 */
export async function getProdiById(id: string): Promise<Prodi> {
  try {
    const { data } = await api.get<ApiResponse<BackendProdi>>(`/prodi/${id}`);
    const result = mapProdi(unwrapResponse(data));
    
    if (isDevelopment) {
      console.log('[Service:Prodi] Fetched prodi:', id);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:Prodi] Failed to fetch prodi:', error);
    }
    throw error;
  }
}

/**
 * Create new Prodi
 */
export async function createProdi(input: CreateProdiInput): Promise<Prodi> {
  try {
    const { data } = await api.post<ApiResponse<BackendProdi>>("/prodi", input);
    const result = mapProdi(unwrapResponse(data));
    
    if (isDevelopment) {
      console.log('[Service:Prodi] Created prodi:', result.id_prodi);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:Prodi] Failed to create prodi:', error);
    }
    throw error;
  }
}

/**
 * Update existing Prodi
 */
export async function updateProdi(id: string, input: UpdateProdiInput): Promise<Prodi> {
  try {
    const { data } = await api.put<ApiResponse<BackendProdi>>(`/prodi/${id}`, input);
    const result = mapProdi(unwrapResponse(data));
    
    if (isDevelopment) {
      console.log('[Service:Prodi] Updated prodi:', id);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:Prodi] Failed to update prodi:', error);
    }
    throw error;
  }
}

/**
 * Delete Prodi
 */
export async function deleteProdi(id: string): Promise<void> {
  try {
    await api.delete(`/prodi/${id}`);
    
    if (isDevelopment) {
      console.log('[Service:Prodi] Deleted prodi:', id);
    }
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:Prodi] Failed to delete prodi:', error);
    }
    throw error;
  }
}

// Legacy exports for backward compatibility
export const fetchProdiList = getAllProdis;
