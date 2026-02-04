import { useCallback, useEffect, useState } from "react";
import type { ProfilLulusan, ProfilLulusanForm } from "~/types";
import * as profilService from "~/services/profil-lulusan.service";

export function useProfilLulusan() {
  const [profilList, setProfilList] = useState<ProfilLulusan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await profilService.fetchProfilLulusanList();
      setProfilList(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profil lulusan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createProfil = useCallback(async (payload: ProfilLulusanForm) => {
    const created = await profilService.createProfilLulusan(payload);
    setProfilList((prev) => [...prev, created]);
    return created;
  }, []);

  const updateProfil = useCallback(async (id: string, payload: Partial<ProfilLulusanForm>) => {
    const updated = await profilService.updateProfilLulusan(id, payload);
    setProfilList((prev) => prev.map((item) => (item.id_profil === id ? updated : item)));
    return updated;
  }, []);

  const deleteProfil = useCallback(async (id: string) => {
    await profilService.deleteProfilLulusan(id);
    setProfilList((prev) => prev.filter((item) => item.id_profil !== id));
  }, []);

  return {
    profilList,
    loading,
    error,
    refresh,
    createProfil,
    updateProfil,
    deleteProfil,
  };
}
