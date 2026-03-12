/**
 * Dashboard Service
 * Handles dashboard statistics and analytics
 */

import api from "~/lib/api";
import type { ApiResponse } from "~/types";
import { unwrapResponse } from "~/services/utils";

const isDevelopment = import.meta.env.DEV;

/**
 * Dashboard Statistics Response Type from Backend
 */
export type DashboardStats = {
  kurikulum: {
    total: number;
    selected_id: string | null;
  };
  summary: {
    total_profil_lulusan: number;
    total_kompetensi_utama: number;
    total_cpl: number;
    total_bahan_kajian: number;
    total_mata_kuliah: number;
    total_dosen: number;
    total_cpmk: number;
    total_rps: number;
    total_sks: number;
  };
  statistics: {
    cpl_by_aspek: Record<string, number>;
    kul_by_aspek?: Record<string, number>;
    bk_by_aspek?: Record<string, number>;
    mk_by_semester: Array<{ semester: number; total: number }>;
    mk_by_sifat: Record<string, number>;
    rps_by_status: Record<string, number>;
    dosen_by_jabatan?: Record<string, number>;
  };
  matrix: {
    total_cpl_pl: number;
    total_cpl_bk: number;
    total_cpl_mk: number;
  };
};

/**
 * Recent Activity Type
 */
export type RecentActivity = {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
};

/**
 * Fetch dashboard statistics from backend
 * @param id_kurikulum - Optional kurikulum ID to filter stats
 */
export async function fetchDashboardStats(id_kurikulum?: string): Promise<DashboardStats> {
  try {
    console.log('🟢 [Dashboard Service] ========== FETCH START ==========');
    console.log('📋 [Dashboard Service] Request params:', { id_kurikulum });
    
    const params = id_kurikulum ? { id_kurikulum } : undefined;
    console.log('🌐 [Dashboard Service] Calling API: GET /dashboard');
    
    const { data } = await api.get<ApiResponse<DashboardStats>>("/dashboard", { params });
    
    console.log('📦 [Dashboard Service] Raw API response:', data);
    console.log('🔍 [Dashboard Service] Response success:', data.success);
    console.log('📊 [Dashboard Service] Response data exists:', !!data.data);
    
    const result = unwrapResponse(data);
    
    console.log('✅ [Dashboard Service] Unwrapped result:', result);
    console.log('📈 [Dashboard Service] Stats structure:', {
      has_kurikulum: !!result?.kurikulum,
      has_summary: !!result?.summary,
      has_statistics: !!result?.statistics,
      has_matrix: !!result?.matrix
    });
    console.log('🔢 [Dashboard Service] Summary values:', result?.summary);
    console.log('🟢 [Dashboard Service] ========== FETCH SUCCESS ==========\n');
    
    return result;
  } catch (error) {
    console.error('❌ [Dashboard Service] ========== FETCH ERROR ==========');
    console.error('💥 [Dashboard Service] Error details:', error);
    if (error instanceof Error) {
      console.error('📛 [Dashboard Service] Error message:', error.message);
      console.error('📚 [Dashboard Service] Error stack:', error.stack);
    }
    console.error('❌ [Dashboard Service] ========== ERROR END ==========\n');
    throw error;
  }
}

/**
 * Fetch recent activities
 * @param limit - Number of activities to fetch
 */
export async function fetchRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
  try {
    console.log('🔔 [Activities Service] Fetching recent activities...');
    console.log('🔔 [Activities Service] Limit:', limit);
    
    const { data } = await api.get<ApiResponse<RecentActivity[]>>("/dashboard/recent", {
      params: { limit },
    });
    
    console.log('🔔 [Activities Service] Response:', data);
    const result = unwrapResponse(data);
    console.log('✅ [Activities Service] Activities count:', result?.length || 0);
    
    return result;
  } catch (error) {
    console.warn('⚠️ [Activities Service] Failed to fetch activities:', error);
    console.log('🔔 [Activities Service] Returning empty array (endpoint might not be implemented)');
    // Return empty array if not implemented
    return [];
  }
}
