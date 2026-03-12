import api from "~/lib/api";
import type { ApiResponse, CPMK, CPMKForm, SubCPMK, SubCPMKForm } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendCpmk = {
  id: string;
  kode_cpmk: string;
  deskripsi_cpmk: string;
  bobot_persentase: number;
  kode_mk?: string;
  id_mk?: string;
  id_cpl: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

type BackendSubCpmk = {
  id: string;
  kode_sub: string;
  deskripsi_sub_cpmk: string;
  indikator: string;
  kriteria_penilaian: string;
  id_cpmk: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapCpmk = (item: BackendCpmk): CPMK => ({
  id_cpmk: item.id,
  kode_cpmk: item.kode_cpmk,
  deskripsi_cpmk: item.deskripsi_cpmk,
  bobot_persentase: item.bobot_persentase,
  kode_mk: item.kode_mk,
  id_mk: item.id_mk,
  id_cpl: item.id_cpl,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

const mapSubCpmk = (item: BackendSubCpmk): SubCPMK => ({
  id_sub_cpmk: item.id,
  kode_sub: item.kode_sub,
  deskripsi_sub_cpmk: item.deskripsi_sub_cpmk,
  indikator: item.indikator,
  kriteria_penilaian: item.kriteria_penilaian,
  id_cpmk: item.id_cpmk,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchCpmkList(params?: { id_mk?: string }): Promise<CPMK[]> {
  const queryParams: any = {};
  if (params?.id_mk) queryParams.id_mk = params.id_mk;
  
  const { data } = await api.get<ApiResponse<BackendCpmk[]>>("/cpmk", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapCpmk);
}

export async function fetchCpmkByMataKuliah(id: string): Promise<CPMK[]> {
  const { data } = await api.get<ApiResponse<BackendCpmk[]>>(`/cpmk/mata-kuliah/${id}`);
  const items = unwrapResponse(data) ?? [];
  return items.map(mapCpmk);
}

export async function createCpmk(payload: CPMKForm): Promise<CPMK> {
  const { data } = await api.post<ApiResponse<BackendCpmk>>("/cpmk", payload);
  return mapCpmk(unwrapResponse(data));
}

export async function updateCpmk(id: string, payload: Partial<CPMKForm>): Promise<CPMK> {
  const { data } = await api.put<ApiResponse<BackendCpmk>>(`/cpmk/${id}`, payload);
  return mapCpmk(unwrapResponse(data));
}

export async function deleteCpmk(id: string): Promise<void> {
  await api.delete(`/cpmk/${id}`);
}

export async function createSubCpmk(idCpmk: string, payload: SubCPMKForm): Promise<SubCPMK> {
  const { data } = await api.post<ApiResponse<BackendSubCpmk>>(`/cpmk/${idCpmk}/sub`, payload);
  return mapSubCpmk(unwrapResponse(data));
}

export async function updateSubCpmk(idCpmk: string, idSub: string, payload: Partial<SubCPMKForm>): Promise<SubCPMK> {
  const { data } = await api.put<ApiResponse<BackendSubCpmk>>(`/cpmk/${idCpmk}/sub/${idSub}`, payload);
  return mapSubCpmk(unwrapResponse(data));
}

export async function deleteSubCpmk(idCpmk: string, idSub: string): Promise<void> {
  await api.delete(`/cpmk/${idCpmk}/sub/${idSub}`);
}
