import { useCallback, useEffect, useState } from "react";
import type { Penilaian, PenilaianForm } from "~/types";
import * as penilaianService from "~/services/penilaian.service";

export function usePenilaian() {
  const [data, setData] = useState<Penilaian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await penilaianService.fetchPenilaianList();
      setData(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load penilaian");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createPenilaian = useCallback(async (payload: PenilaianForm) => {
    const created = await penilaianService.createPenilaian(payload);
    setData((prev) => [...prev, created]);
    return created;
  }, []);

  const updatePenilaian = useCallback(async (id: string, payload: Partial<PenilaianForm>) => {
    const updated = await penilaianService.updatePenilaian(id, payload);
    setData((prev) => prev.map((item) => (item.id_penilaian === id ? updated : item)));
    return updated;
  }, []);

  const deletePenilaian = useCallback(async (id: string) => {
    await penilaianService.deletePenilaian(id);
    setData((prev) => prev.filter((item) => item.id_penilaian !== id));
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    createPenilaian,
    updatePenilaian,
    deletePenilaian,
  };
}
