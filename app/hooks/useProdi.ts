import { useCallback, useEffect, useState } from "react";
import type { Prodi, ProdiForm } from "~/types";
import * as prodiService from "~/services/prodi.service";

export function useProdi() {
  const [data, setData] = useState<Prodi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await prodiService.fetchProdiList();
      setData(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prodi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createProdi = useCallback(async (payload: ProdiForm) => {
    const created = await prodiService.createProdi(payload);
    setData((prev) => [...prev, created]);
    return created;
  }, []);

  const updateProdi = useCallback(async (id: string, payload: Partial<ProdiForm>) => {
    const updated = await prodiService.updateProdi(id, payload);
    setData((prev) => prev.map((item) => (item.id_prodi === id ? updated : item)));
    return updated;
  }, []);

  const deleteProdi = useCallback(async (id: string) => {
    await prodiService.deleteProdi(id);
    setData((prev) => prev.filter((item) => item.id_prodi !== id));
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    createProdi,
    updateProdi,
    deleteProdi,
  };
}
