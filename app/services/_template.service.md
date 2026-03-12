/**
 * GENERIC SERVICE TEMPLATE
 * 
 * Template ini bisa digunakan untuk membuat service baru dengan pattern yang konsisten.
 * Copy template ini dan replace [Entity] dengan nama entity yang sesuai.
 * 
 * Example: Replace [Entity] dengan "Prodi", "Kurikulum", "CPL", dll.
 */

import api from "~/lib/api";
import type { ApiResponse } from "~/types";
import { unwrapResponse } from "~/services/utils";

const isDevelopment = import.meta.env.DEV;

/**
 * [Entity] Type Definition
 * TODO: Import from ~/types or define here
 */
export type [Entity] = {
  // Define your entity properties
  id: string;
  // ...other properties
};

export type Create[Entity]Input = Omit<[Entity], 'id' | 'created_at' | 'updated_at'>;
export type Update[Entity]Input = Partial<Create[Entity]Input>;

/**
 * Get all [Entity]s
 * @param filters - Optional filter parameters
 */
export async function getAll[Entity]s(filters?: Record<string, any>): Promise<[Entity][]> {
  try {
    const { data } = await api.get<ApiResponse<[Entity][]>>("/[entity-endpoint]", { params: filters });
    const result = unwrapResponse(data);
    
    if (isDevelopment) {
      console.log('[Service:[Entity]] Fetched all [entity]s:', result.length);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:[Entity]] Failed to fetch [entity]s:', error);
    }
    throw error;
  }
}

/**
 * Get single [Entity] by ID
 * @param id - [Entity] ID
 */
export async function get[Entity]ById(id: string): Promise<[Entity]> {
  try {
    const { data } = await api.get<ApiResponse<[Entity]>>(`/[entity-endpoint]/${id}`);
    const result = unwrapResponse(data);
    
    if (isDevelopment) {
      console.log('[Service:[Entity]] Fetched [entity]:', id);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:[Entity]] Failed to fetch [entity]:', error);
    }
    throw error;
  }
}

/**
 * Create new [Entity]
 * @param input - [Entity] data
 */
export async function create[Entity](input: Create[Entity]Input): Promise<[Entity]> {
  try {
    const { data } = await api.post<ApiResponse<[Entity]>>("/[entity-endpoint]", input);
    const result = unwrapResponse(data);
    
    if (isDevelopment) {
      console.log('[Service:[Entity]] Created [entity]:', result.id);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:[Entity]] Failed to create [entity]:', error);
    }
    throw error;
  }
}

/**
 * Update existing [Entity]
 * @param id - [Entity] ID
 * @param input - Updated [entity] data
 */
export async function update[Entity](id: string, input: Update[Entity]Input): Promise<[Entity]> {
  try {
    const { data } = await api.put<ApiResponse<[Entity]>>(`/[entity-endpoint]/${id}`, input);
    const result = unwrapResponse(data);
    
    if (isDevelopment) {
      console.log('[Service:[Entity]] Updated [entity]:', id);
    }
    
    return result;
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:[Entity]] Failed to update [entity]:', error);
    }
    throw error;
  }
}

/**
 * Delete [Entity]
 * @param id - [Entity] ID
 */
export async function delete[Entity](id: string): Promise<void> {
  try {
    await api.delete(`/[entity-endpoint]/${id}`);
    
    if (isDevelopment) {
      console.log('[Service:[Entity]] Deleted [entity]:', id);
    }
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:[Entity]] Failed to delete [entity]:', error);
    }
    throw error;
  }
}

// ============================================
// ADDITIONAL METHODS (if needed)
// ============================================

/**
 * Example: Bulk operations
 */
export async function bulkCreate[Entity]s(inputs: Create[Entity]Input[]): Promise<[Entity][]> {
  try {
    const { data } = await api.post<ApiResponse<[Entity][]>>("/[entity-endpoint]/bulk", { items: inputs });
    return unwrapResponse(data);
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:[Entity]] Bulk create failed:', error);
    }
    throw error;
  }
}

/**
 * Example: Search
 */
export async function search[Entity]s(query: string): Promise<[Entity][]> {
  try {
    const { data } = await api.get<ApiResponse<[Entity][]>>("/[entity-endpoint]/search", {
      params: { q: query }
    });
    return unwrapResponse(data);
  } catch (error) {
    if (isDevelopment) {
      console.error('[Service:[Entity]] Search failed:', error);
    }
    throw error;
  }
}
