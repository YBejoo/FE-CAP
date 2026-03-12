import api from "~/lib/api";
import type { ApiResponse, BahanKajian, BahanKajianForm, AspekKUL } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendBahanKajian = {
  id: string;
  kode_bk: string;
  nama_bahan_kajian: string;
  aspek: AspekKUL;
  ranah_keilmuan: string;
  id_kurikulum: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapBahanKajian = (item: BackendBahanKajian): BahanKajian => ({
  id_bahan_kajian: item.id,
  kode_bk: item.kode_bk,
  nama_bahan_kajian: item.nama_bahan_kajian,
  aspek: item.aspek,
  ranah_keilmuan: item.ranah_keilmuan,
  id_kurikulum: item.id_kurikulum,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchBahanKajianList(params?: {
  id_kurikulum?: string;
  aspek?: string;
  enrich?: boolean;
}): Promise<BahanKajian[]> {
  const queryParams: any = {};
  if (params?.id_kurikulum) queryParams.id_kurikulum = params.id_kurikulum;
  if (params?.aspek) queryParams.aspek = params.aspek;
  if (params?.enrich) queryParams.enrich = 'true';
  
  const { data } = await api.get<ApiResponse<BackendBahanKajian[]>>("/bahan-kajian", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapBahanKajian);
}

export async function createBahanKajian(payload: BahanKajianForm): Promise<BahanKajian> {
  const { data } = await api.post<ApiResponse<BackendBahanKajian>>("/bahan-kajian", payload);
  return mapBahanKajian(unwrapResponse(data));
}

export async function updateBahanKajian(id: string, payload: Partial<BahanKajianForm>): Promise<BahanKajian> {
  const { data } = await api.put<ApiResponse<BackendBahanKajian>>(`/bahan-kajian/${id}`, payload);
  return mapBahanKajian(unwrapResponse(data));
}

export async function deleteBahanKajian(id: string): Promise<void> {
  await api.delete(`/bahan-kajian/${id}`);
}
