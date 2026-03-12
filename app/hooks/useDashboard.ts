/**
 * Dashboard Hook
 * Manages dashboard state and data fetching
 */

import { useCallback, useEffect, useState } from "react";
import { fetchDashboardStats, fetchRecentActivities, type DashboardStats, type RecentActivity } from "~/services/dashboard.service";

const isDevelopment = import.meta.env.DEV;

export function useDashboard(id_kurikulum?: string) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch dashboard data from backend
   */
  const fetchData = useCallback(async () => {
    try {
      console.log('\n🎯 [useDashboard Hook] ========== HOOK START ==========');
      console.log('🎯 [useDashboard Hook] Kurikulum ID:', id_kurikulum || 'ALL');
      
      setLoading(true);
      setError(null);

      // Fetch dashboard stats
      console.log('🎯 [useDashboard Hook] Calling fetchDashboardStats...');
      const dashboardStats = await fetchDashboardStats(id_kurikulum);
      
      console.log('🎯 [useDashboard Hook] Stats received:', dashboardStats);
      console.log('🎯 [useDashboard Hook] Setting stats to state...');
      setStats(dashboardStats);
      console.log('✅ [useDashboard Hook] Stats set successfully');

      // Fetch recent activities (optional, might not be implemented yet)
      try {
        console.log('🎯 [useDashboard Hook] Calling fetchRecentActivities...');
        const recentActivities = await fetchRecentActivities(10);
        console.log('🎯 [useDashboard Hook] Activities received:', recentActivities?.length || 0);
        setActivities(recentActivities);
      } catch (err) {
        // Activities endpoint might not be implemented yet
        console.warn('⚠️ [useDashboard Hook] Activities not available');
        setActivities([]);
      }

      console.log('✅ [useDashboard Hook] ========== HOOK SUCCESS ==========\n');
    } catch (err: any) {
      console.log('\n❌ [useDashboard Hook] ========== HOOK ERROR ==========');
      
      // Don't show error if it's a 401 (auth context will handle redirect)
      if (err?.response?.status === 401) {
        console.log('🔐 [useDashboard Hook] 401 Unauthorized - auth will handle redirect');
        console.log('❌ [useDashboard Hook] ========== ERROR END ==========\n');
        return;
      }

      const errorMessage = err?.userMessage || err?.response?.data?.message || err?.message || "Gagal memuat data dashboard";
      console.error('💥 [useDashboard Hook] Error message:', errorMessage);
      console.error('💥 [useDashboard Hook] Full error:', err);
      
      setError(errorMessage);
      console.log('❌ [useDashboard Hook] ========== ERROR END ==========\n');
    } finally {
      setLoading(false);
      console.log('🏁 [useDashboard Hook] Loading state set to false');
    }
  }, [id_kurikulum]);

  // Load data on mount and when kurikulum changes
  useEffect(() => {
    console.log('🔄 [useDashboard Hook] Component mounted/updated, triggering fetch...');
    fetchData();
  }, [fetchData]);

  /**
   * Refresh dashboard data
   */
  const refresh = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    stats,
    activities,
    loading,
    error,
    refresh,
  };
}
