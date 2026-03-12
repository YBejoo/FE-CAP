import api from "~/lib/api";
import type { ApiResponse } from "~/types";
import { unwrapResponse } from "~/services/utils";

type LaporanPerMK = {
  kode_mk: string;
  nama_mk: string;
  total_cpmk: number;
  total_cpl: number;
  rata_rata_bobot: number;
};

type LaporanPerCPL = {
  id_cpl: string;
  nama_cpl: string;
  bobot: number;
  total_mk: number;
};

type LaporanPerTahun = {
  tahun: number;
  total_kurikulum: number;
  total_cpl: number;
  total_mk: number;
};

export async function fetchLaporanPerMK(idKurikulum?: string): Promise<LaporanPerMK[]> {
  const params = idKurikulum ? { id_kurikulum: idKurikulum } : undefined;
  const { data } = await api.get<ApiResponse<LaporanPerMK[]>>("/laporan/matrix-cpl-mk", { params });
  return unwrapResponse(data) ?? [];
}

export async function fetchLaporanPerCPL(idKurikulum?: string, idMk?: string): Promise<LaporanPerCPL[]> {
  const params: any = {};
  if (idKurikulum) params.id_kurikulum = idKurikulum;
  if (idMk) params.id_mk = idMk;
  
  const { data } = await api.get<ApiResponse<LaporanPerCPL[]>>("/laporan/progress-cpl", {
    params: Object.keys(params).length > 0 ? params : undefined,
  });
  return unwrapResponse(data) ?? [];
}

export async function fetchLaporanPerTahun(idKurikulum?: string): Promise<LaporanPerTahun[]> {
  // Not yet implemented in backend, return empty array
  return [];
}

export type { LaporanPerMK, LaporanPerCPL, LaporanPerTahun };
