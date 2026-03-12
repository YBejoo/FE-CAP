/**
 * GENERIC HOOK TEMPLATE
 * 
 * Template ini bisa digunakan untuk membuat custom hook baru dengan pattern yang konsisten.
 * Copy template ini dan replace [Entity] dengan nama entity yang sesuai.
 * 
 * Example: Replace [Entity] dengan "Prodi", "Kurikulum", "CPL", dll.
 */

import { useState, useEffect, useCallback } from "react";
import * as [entity]Service from "~/services/[entity].service";
import type { [Entity], Create[Entity]Input, Update[Entity]Input } from "~/services/[entity].service";

const isDevelopment = import.meta.env.DEV;

/**
 * Hook for managing [Entity] data
 * @param filters - Optional filters to apply when fetching data
 */
export function use[Entity](filters?: Record<string, any>) {
  const [data, setData] = useState<[Entity][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch [entity] data from backend
   */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await [entity]Service.getAll[Entity]s(filters);
      setData(result);
      
      if (isDevelopment) {
        console.log('[Hook:use[Entity]] Data loaded:', result.length, 'items');
      }
    } catch (err: any) {
      // Don't show error if it's a 401 (auth context will handle redirect)
      if (err?.response?.status === 401) {
        if (isDevelopment) {
          console.log('[Hook:use[Entity]] 401 error, auth will handle');
        }
        return;
      }
      
      const errorMessage = err?.userMessage || err?.response?.data?.message || err?.message || "Gagal memuat data [entity]";
      setError(errorMessage);
      
      if (isDevelopment) {
        console.error('[Hook:use[Entity]] Load error:', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load data on mount and when filters change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Create new [entity]
   */
  const create = useCallback(async (input: Create[Entity]Input): Promise<[Entity]> => {
    try {
      const newItem = await [entity]Service.create[Entity](input);
      
      // Optimistic update: add to list
      setData(prev => [...prev, newItem]);
      
      if (isDevelopment) {
        console.log('[Hook:use[Entity]] Created:', newItem.id);
      }
      
      return newItem;
    } catch (err: any) {
      const errorMessage = err?.userMessage || err?.response?.data?.message || err?.message || "Gagal membuat [entity]";
      
      if (isDevelopment) {
        console.error('[Hook:use[Entity]] Create error:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }
  }, []);

  /**
   * Update existing [entity]
   */
  const update = useCallback(async (id: string, input: Update[Entity]Input): Promise<[Entity]> => {
    try {
      const updated = await [entity]Service.update[Entity](id, input);
      
      // Optimistic update: replace in list
      setData(prev => prev.map(item => item.id === id ? updated : item));
      
      if (isDevelopment) {
        console.log('[Hook:use[Entity]] Updated:', id);
      }
      
      return updated;
    } catch (err: any) {
      const errorMessage = err?.userMessage || err?.response?.data?.message || err?.message || "Gagal memperbarui [entity]";
      
      if (isDevelopment) {
        console.error('[Hook:use[Entity]] Update error:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }
  }, []);

  /**
   * Delete [entity]
   */
  const remove = useCallback(async (id: string): Promise<void> => {
    try {
      await [entity]Service.delete[Entity](id);
      
      // Optimistic update: remove from list
      setData(prev => prev.filter(item => item.id !== id));
      
      if (isDevelopment) {
        console.log('[Hook:use[Entity]] Deleted:', id);
      }
    } catch (err: any) {
      const errorMessage = err?.userMessage || err?.response?.data?.message || err?.message || "Gagal menghapus [entity]";
      
      if (isDevelopment) {
        console.error('[Hook:use[Entity]] Delete error:', errorMessage);
      }
      
      throw new Error(errorMessage);
    }
  }, []);

  /**
   * Refresh data
   */
  const refresh = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refresh,
  };
}

/**
 * Hook for fetching single [Entity] by ID
 * @param id - [Entity] ID
 */
export function use[Entity]ById(id: string | null) {
  const [data, setData] = useState<[Entity] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await [entity]Service.get[Entity]ById(id);
        setData(result);
        
        if (isDevelopment) {
          console.log('[Hook:use[Entity]ById] Data loaded:', id);
        }
      } catch (err: any) {
        const errorMessage = err?.userMessage || err?.response?.data?.message || err?.message || "Gagal memuat [entity]";
        setError(errorMessage);
        
        if (isDevelopment) {
          console.error('[Hook:use[Entity]ById] Load error:', errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
}
