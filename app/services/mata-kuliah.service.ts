import api from "~/lib/api";
import type { ApiResponse, MataKuliah, MataKuliahForm } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendMataKuliah = {
  id: string;
  kode_mk: string;
  nama_mk: string;
  sks: number;
  semester: number;
  sifat: string;
  deskripsi?: string;
  id_kurikulum: string;
  id_bahan_kajian?: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
  bahan_kajian?: any;
  cpl_list?: any[];
  dosen_pengampu?: any[];
};

const mapMataKuliah = (item: BackendMataKuliah): MataKuliah => ({
  id_mk: item.id,
  kode_mk: item.kode_mk,
  nama_mk: item.nama_mk,
  sks: item.sks,
  semester: item.semester,
  sifat: item.sifat,
  deskripsi: item.deskripsi,
  id_kurikulum: item.id_kurikulum,
  id_bahan_kajian: item.id_bahan_kajian,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchMataKuliahList(params?: {
  id_kurikulum?: string;
  semester?: number;
  sifat?: string;
  enrich?: boolean;
}): Promise<MataKuliah[]> {
  const queryParams: any = {};
  if (params?.id_kurikulum) queryParams.id_kurikulum = params.id_kurikulum;
  if (params?.semester) queryParams.semester = params.semester;
  if (params?.sifat) queryParams.sifat = params.sifat;
  if (params?.enrich) queryParams.enrich = 'full';
  
  const { data } = await api.get<ApiResponse<BackendMataKuliah[]>>("/mata-kuliah", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapMataKuliah);
}

export async function createMataKuliah(payload: MataKuliahForm): Promise<MataKuliah> {
  const { data } = await api.post<ApiResponse<BackendMataKuliah>>("/mata-kuliah", payload);
  return mapMataKuliah(unwrapResponse(data));
}

export async function updateMataKuliah(id: string, payload: Partial<MataKuliahForm>): Promise<MataKuliah> {
  const { data } = await api.put<ApiResponse<BackendMataKuliah>>(`/mata-kuliah/${id}`, payload);
  return mapMataKuliah(unwrapResponse(data));
}

export async function deleteMataKuliah(id: string): Promise<void> {
  await api.delete(`/mata-kuliah/${id}`);
}
