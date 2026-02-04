import { useCallback, useEffect, useState } from "react";
import type { RPS } from "~/types";
import { fetchRpsList } from "~/services/rps.service";

export function useRps() {
  const [rpsList, setRpsList] = useState<RPS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchRpsList();
      setRpsList(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load RPS");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    rpsList,
    loading,
    error,
    refresh,
  };
}
