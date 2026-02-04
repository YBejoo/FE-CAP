import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  BahanKajianChartData,
  CPLChartData,
  DashboardStats,
  Mahasiswa,
  MahasiswaBawahKKMData,
  MataKuliah,
  NilaiMahasiswaPerMK,
  ProfilLulusan,
  ProfilLulusanChartData,
  CPMKRataRataData,
} from "~/types";
import { fetchMataKuliahList } from "~/services/mata-kuliah.service";
import { fetchProfilLulusanList } from "~/services/profil-lulusan.service";
import { fetchCplList } from "~/services/cpl.service";
import { fetchBahanKajianList } from "~/services/bahan-kajian.service";
import { fetchMahasiswaList } from "~/services/mahasiswa.service";
import {
  fetchCpmkRataRata,
  fetchDashboardStats,
  fetchMahasiswaBawahKKM,
  fetchNilaiMahasiswa,
} from "~/services/dashboard.service";

export function useDashboard() {
  const [profilLulusan, setProfilLulusan] = useState<ProfilLulusan[]>([]);
  const [cplList, setCplList] = useState([] as { kode_cpl: string; deskripsi_cpl: string }[]);
  const [bahanKajianList, setBahanKajianList] = useState([] as { kode_bk: string; nama_bahan_kajian: string }[]);
  const [mataKuliahList, setMataKuliahList] = useState<MataKuliah[]>([]);
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [dashboardSnapshot, setDashboardSnapshot] = useState<{
    totalMataKuliah?: number;
    totalCPL?: number;
    totalMahasiswa?: number;
  } | null>(null);
  const [nilaiMahasiswaPerMK, setNilaiMahasiswaPerMK] = useState<Record<string, Record<string, NilaiMahasiswaPerMK>>>({});
  const [mahasiswaBawahKKMPerMK, setMahasiswaBawahKKMPerMK] = useState<Record<string, MahasiswaBawahKKMData[]>>({});
  const [cpmkRataRataPerMK, setCpmkRataRataPerMK] = useState<Record<string, CPMKRataRataData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [profil, cpl, bahan, mk, mahasiswa, nilai, kkm, cpmk, dashboard] = await Promise.all([
        fetchProfilLulusanList(),
        fetchCplList(),
        fetchBahanKajianList(),
        fetchMataKuliahList(),
        fetchMahasiswaList(),
        fetchNilaiMahasiswa(),
        fetchMahasiswaBawahKKM(),
        fetchCpmkRataRata(),
        fetchDashboardStats(),
      ]);

      setProfilLulusan(profil);
      setCplList(cpl.map((item) => ({ kode_cpl: item.kode_cpl, deskripsi_cpl: item.deskripsi_cpl })));
      setBahanKajianList(bahan.map((item) => ({ kode_bk: item.kode_bk, nama_bahan_kajian: item.nama_bahan_kajian })));
      setMataKuliahList(mk);
      setMahasiswaList(mahasiswa);
      setNilaiMahasiswaPerMK(nilai);
      setMahasiswaBawahKKMPerMK(kkm);
      setCpmkRataRataPerMK(cpmk);
      setDashboardSnapshot(dashboard?.stats ?? null);

      return dashboard;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const profilLulusanData: ProfilLulusanChartData[] = useMemo(
    () =>
      profilLulusan.map((item) => ({
        kode: item.kode_profil,
        nama: item.profil_lulusan,
        jumlah_cpl: 0,
        persentase: 0,
      })),
    [profilLulusan]
  );

  const cplData: CPLChartData[] = useMemo(
    () =>
      cplList.map((item) => ({
        kode: item.kode_cpl,
        nama: item.deskripsi_cpl,
        rata_rata: 0,
        jumlah_mk: 0,
      })),
    [cplList]
  );

  const bahanKajianData: BahanKajianChartData[] = useMemo(
    () =>
      bahanKajianList.map((item) => ({
        kode: item.kode_bk,
        nama: item.nama_bahan_kajian,
        rata_rata: 0,
        jumlah_mahasiswa: 0,
      })),
    [bahanKajianList]
  );

  const stats: DashboardStats = useMemo(
    () => ({
      totalKurikulum: 0,
      totalProfilLulusan: profilLulusan.length,
      totalCPL: dashboardSnapshot?.totalCPL ?? cplList.length,
      totalMataKuliah: dashboardSnapshot?.totalMataKuliah ?? mataKuliahList.length,
      totalCPMK: 0,
      totalRPS: 0,
      rpsSelesai: 0,
      rpsDraft: 0,
      kkm: 70,
    }),
    [profilLulusan.length, cplList.length, mataKuliahList.length, dashboardSnapshot]
  );

  return {
    profilLulusanData,
    cplData,
    bahanKajianData,
    mataKuliahList,
    mahasiswaList,
    nilaiMahasiswaPerMK,
    mahasiswaBawahKKMPerMK,
    cpmkRataRataPerMK,
    stats,
    loading,
    error,
    refresh,
  };
}
