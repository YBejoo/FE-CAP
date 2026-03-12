import { useCallback, useEffect, useMemo, useState } from "react";
import type { BahanKajian, CPL, MataKuliah, MataKuliahForm } from "~/types";
import * as mkService from "~/services/mata-kuliah.service";

type EnrichOptions = {
  bahanKajianList?: BahanKajian[];
  cplList?: CPL[];
};

export function useMataKuliah(options: EnrichOptions = {}) {
  const { bahanKajianList = [] } = options;
  const [mataKuliahRaw, setMataKuliahRaw] = useState<MataKuliah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const enrich = useCallback(
    (items: MataKuliah[]) =>
      items.map((mk) => ({
        ...mk,
        bahan_kajian: mk.id_bahan_kajian
          ? bahanKajianList.find((bk) => bk.id_bahan_kajian === mk.id_bahan_kajian)
          : undefined,
        cpl_list: mk.cpl_list?.length
          ? mk.cpl_list
          : mk.cpl_list || [],
      })),
    [bahanKajianList]
  );

  const mataKuliahList = useMemo(() => enrich(mataKuliahRaw), [enrich, mataKuliahRaw]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await mkService.fetchMataKuliahList();
      setMataKuliahRaw(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load mata kuliah");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createMataKuliah = useCallback(
    async (
      payload: MataKuliahForm,
      extras?: { bahan_kajian?: BahanKajian; cpl_list?: CPL[] }
    ) => {
      const created = await mkService.createMataKuliah(payload);
      const merged = { ...created, ...extras };
      setMataKuliahRaw((prev) => [...prev, merged]);
      return merged;
    },
    []
  );

  const updateMataKuliah = useCallback(
    async (
      id: string,
      payload: Partial<MataKuliahForm>,
      extras?: { bahan_kajian?: BahanKajian; cpl_list?: CPL[] }
    ) => {
      const updated = await mkService.updateMataKuliah(id, payload);
      const merged = { ...updated, ...extras };
      setMataKuliahRaw((prev) => prev.map((item) => (item.id_mk === id ? merged : item)));
      return merged;
    },
    []
  );

  const deleteMataKuliah = useCallback(async (id: string) => {
    await mkService.deleteMataKuliah(id);
    setMataKuliahRaw((prev) => prev.filter((item) => item.id_mk !== id));
  }, []);

  return {
    mataKuliahList,
    loading,
    error,
    refresh,
    createMataKuliah,
    updateMataKuliah,
    deleteMataKuliah,
  };
}
