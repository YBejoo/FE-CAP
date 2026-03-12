import { useCallback, useEffect, useState } from "react";
import type { CPMK, CPMKForm, SubCPMK, SubCPMKForm } from "~/types";
import * as cpmkService from "~/services/cpmk.service";

export function useCpmk() {
  const [cpmkList, setCpmkList] = useState<CPMK[]>([]);
  const [subCpmkList, setSubCpmkList] = useState<SubCPMK[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await cpmkService.fetchCpmkList();
      setCpmkList(items);
      setSubCpmkList([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load CPMK");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createCpmk = useCallback(async (payload: CPMKForm) => {
    const created = await cpmkService.createCpmk(payload);
    setCpmkList((prev) => [...prev, created]);
    return created;
  }, []);

  const updateCpmk = useCallback(async (id: string, payload: Partial<CPMKForm>) => {
    const updated = await cpmkService.updateCpmk(id, payload);
    setCpmkList((prev) => prev.map((item) => (item.id_cpmk === id ? updated : item)));
    return updated;
  }, []);

  const deleteCpmk = useCallback(async (id: string) => {
    await cpmkService.deleteCpmk(id);
    setCpmkList((prev) => prev.filter((item) => item.id_cpmk !== id));
    setSubCpmkList((prev) => prev.filter((item) => item.id_cpmk !== id));
  }, []);

  const createSubCpmk = useCallback(async (idCpmk: string, payload: SubCPMKForm) => {
    const created = await cpmkService.createSubCpmk(idCpmk, payload);
    setSubCpmkList((prev) => [...prev, created]);
    return created;
  }, []);

  const updateSubCpmk = useCallback(
    async (idCpmk: string, idSub: string, payload: Partial<SubCPMKForm>) => {
      const updated = await cpmkService.updateSubCpmk(idCpmk, idSub, payload);
      setSubCpmkList((prev) => prev.map((item) => (item.id_sub_cpmk === idSub ? updated : item)));
      return updated;
    },
    []
  );

  const deleteSubCpmk = useCallback(async (idCpmk: string, idSub: string) => {
    await cpmkService.deleteSubCpmk(idCpmk, idSub);
    setSubCpmkList((prev) => prev.filter((item) => item.id_sub_cpmk !== idSub));
  }, []);

  return {
    cpmkList,
    subCpmkList,
    loading,
    error,
    refresh,
    createCpmk,
    updateCpmk,
    deleteCpmk,
    createSubCpmk,
    updateSubCpmk,
    deleteSubCpmk,
  };
}
