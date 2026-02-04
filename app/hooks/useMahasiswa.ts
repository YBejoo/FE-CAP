import { useCallback, useEffect, useState } from "react";
import type { Mahasiswa } from "~/types";
import { fetchMahasiswaList } from "~/services/mahasiswa.service";

export function useMahasiswa() {
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchMahasiswaList();
      setMahasiswaList(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load mahasiswa");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    mahasiswaList,
    loading,
    error,
    refresh,
  };
}
