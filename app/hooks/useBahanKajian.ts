import { useCallback, useEffect, useState } from "react";
import type { BahanKajian, BahanKajianForm } from "~/types";
import * as bkService from "~/services/bahan-kajian.service";

export function useBahanKajian() {
  const [bkList, setBkList] = useState<BahanKajian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await bkService.fetchBahanKajianList();
      setBkList(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bahan kajian");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createBahanKajian = useCallback(async (payload: BahanKajianForm) => {
    const created = await bkService.createBahanKajian(payload);
    setBkList((prev) => [...prev, created]);
    return created;
  }, []);

  const updateBahanKajian = useCallback(async (id: string, payload: Partial<BahanKajianForm>) => {
    const updated = await bkService.updateBahanKajian(id, payload);
    setBkList((prev) => prev.map((item) => (item.id_bahan_kajian === id ? updated : item)));
    return updated;
  }, []);

  const deleteBahanKajian = useCallback(async (id: string) => {
    await bkService.deleteBahanKajian(id);
    setBkList((prev) => prev.filter((item) => item.id_bahan_kajian !== id));
  }, []);

  return {
    bkList,
    loading,
    error,
    refresh,
    createBahanKajian,
    updateBahanKajian,
    deleteBahanKajian,
  };
}
