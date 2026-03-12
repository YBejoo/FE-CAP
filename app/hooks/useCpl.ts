import { useCallback, useEffect, useState } from "react";
import type { CPL, CPLForm } from "~/types";
import * as cplService from "~/services/cpl.service";

export function useCpl() {
  const [cplList, setCplList] = useState<CPL[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await cplService.fetchCplList();
      setCplList(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load CPL");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createCpl = useCallback(async (payload: CPLForm) => {
    const created = await cplService.createCpl(payload);
    setCplList((prev) => [...prev, created]);
    return created;
  }, []);

  const updateCpl = useCallback(async (id: string, payload: Partial<CPLForm>) => {
    const updated = await cplService.updateCpl(id, payload);
    setCplList((prev) => prev.map((item) => (item.id_cpl === id ? updated : item)));
    return updated;
  }, []);

  const deleteCpl = useCallback(async (id: string) => {
    await cplService.deleteCpl(id);
    setCplList((prev) => prev.filter((item) => item.id_cpl !== id));
  }, []);

  return {
    cplList,
    loading,
    error,
    refresh,
    createCpl,
    updateCpl,
    deleteCpl,
  };
}
