import api from "~/lib/api";
import type { ApiResponse, Kurikulum, KurikulumForm } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendKurikulum = {
  id: string;
  nama_kurikulum: string;
  tahun_berlaku: number;
  is_active: boolean;
  id_prodi?: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapKurikulum = (item: BackendKurikulum): Kurikulum => ({
  id_kurikulum: item.id,
  nama_kurikulum: item.nama_kurikulum,
  tahun_berlaku: item.tahun_berlaku,
  is_active: item.is_active,
  id_prodi: item.id_prodi,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchKurikulumList(params?: { id_prodi?: string; is_active?: boolean }): Promise<Kurikulum[]> {
  const queryParams: any = {};
  if (params?.id_prodi) queryParams.id_prodi = params.id_prodi;
  if (params?.is_active !== undefined) queryParams.is_active = params.is_active;
  
  const { data } = await api.get<ApiResponse<BackendKurikulum[]>>("/kurikulum", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapKurikulum);
}

export async function createKurikulum(payload: KurikulumForm): Promise<Kurikulum> {
  const { data } = await api.post<ApiResponse<BackendKurikulum>>("/kurikulum", payload);
  return mapKurikulum(unwrapResponse(data));
}

export async function updateKurikulum(id: string, payload: Partial<KurikulumForm>): Promise<Kurikulum> {
  const { data } = await api.put<ApiResponse<BackendKurikulum>>(`/kurikulum/${id}`, payload);
  return mapKurikulum(unwrapResponse(data));
}

export async function activateKurikulum(id: string): Promise<Kurikulum> {
  const { data } = await api.patch<ApiResponse<BackendKurikulum>>(`/kurikulum/${id}/activate`);
  return mapKurikulum(unwrapResponse(data));
}

export async function deleteKurikulum(id: string): Promise<void> {
  await api.delete(`/kurikulum/${id}`);
}
