import { useCallback, useEffect, useState } from "react";
import type { Kurikulum, KurikulumForm } from "~/types";
import * as kurikulumService from "~/services/kurikulum.service";

export function useKurikulum() {
  const [kurikulums, setKurikulums] = useState<Kurikulum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await kurikulumService.fetchKurikulumList();
      setKurikulums(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load kurikulum");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createKurikulum = useCallback(async (payload: KurikulumForm) => {
    const created = await kurikulumService.createKurikulum(payload);
    setKurikulums((prev) => [...prev, created]);
    return created;
  }, []);

  const updateKurikulum = useCallback(async (id: string, payload: Partial<KurikulumForm>) => {
    const updated = await kurikulumService.updateKurikulum(id, payload);
    setKurikulums((prev) => prev.map((item) => (item.id_kurikulum === id ? updated : item)));
    return updated;
  }, []);

  const activateKurikulum = useCallback(async (id: string) => {
    const updated = await kurikulumService.activateKurikulum(id);
    setKurikulums((prev) => prev.map((item) => (item.id_kurikulum === id ? updated : item)));
    return updated;
  }, []);

  const deleteKurikulum = useCallback(async (id: string) => {
    await kurikulumService.deleteKurikulum(id);
    setKurikulums((prev) => prev.filter((item) => item.id_kurikulum !== id));
  }, []);

  return {
    kurikulums,
    loading,
    error,
    refresh,
    createKurikulum,
    updateKurikulum,
    activateKurikulum,
    deleteKurikulum,
  };
}
