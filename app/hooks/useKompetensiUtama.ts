import { useCallback, useEffect, useState } from "react";
import type { KompetensiUtamaLulusan, KompetensiUtamaLulusanForm } from "~/types";
import * as kulService from "~/services/kul.service";

export function useKompetensiUtama() {
  const [kulList, setKulList] = useState<KompetensiUtamaLulusan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await kulService.fetchKulList();
      setKulList(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load kompetensi utama");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createKul = useCallback(async (payload: KompetensiUtamaLulusanForm) => {
    const created = await kulService.createKul(payload);
    setKulList((prev) => [...prev, created]);
    return created;
  }, []);

  const updateKul = useCallback(async (id: string, payload: Partial<KompetensiUtamaLulusanForm>) => {
    const updated = await kulService.updateKul(id, payload);
    setKulList((prev) => prev.map((item) => (item.id_kul === id ? updated : item)));
    return updated;
  }, []);

  const deleteKul = useCallback(async (id: string) => {
    await kulService.deleteKul(id);
    setKulList((prev) => prev.filter((item) => item.id_kul !== id));
  }, []);

  return {
    kulList,
    loading,
    error,
    refresh,
    createKul,
    updateKul,
    deleteKul,
  };
}
