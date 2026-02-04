import { useCallback, useEffect, useState } from "react";
import {
  fetchLaporanPerCPL,
  fetchLaporanPerMK,
  fetchLaporanPerTahun,
  type LaporanPerCPL,
  type LaporanPerMK,
  type LaporanPerTahun,
} from "~/services/laporan.service";

export function useLaporan() {
  const [laporanPerMK, setLaporanPerMK] = useState<LaporanPerMK[]>([]);
  const [laporanPerCPL, setLaporanPerCPL] = useState<LaporanPerCPL[]>([]);
  const [laporanPerTahun, setLaporanPerTahun] = useState<LaporanPerTahun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [mk, cpl, tahun] = await Promise.all([
        fetchLaporanPerMK(),
        fetchLaporanPerCPL(),
        fetchLaporanPerTahun(),
      ]);
      setLaporanPerMK(mk);
      setLaporanPerCPL(cpl);
      setLaporanPerTahun(tahun);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load laporan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    laporanPerMK,
    laporanPerCPL,
    laporanPerTahun,
    loading,
    error,
    refresh,
  };
}
