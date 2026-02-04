import { useCallback, useEffect, useState } from "react";
import type { Dosen } from "~/types";
import { fetchDosenList } from "~/services/dosen.service";

export function useDosen() {
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchDosenList();
      setDosenList(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dosen");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    dosenList,
    loading,
    error,
    refresh,
  };
}
