import api from "~/lib/api";
import type { ApiResponse, KompetensiUtamaLulusan, KompetensiUtamaLulusanForm, AspekKUL } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendKul = {
  id: string;
  kode_kul: string;
  kompetensi_lulusan: string;
  aspek: AspekKUL;
  id_kurikulum: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapKul = (item: BackendKul): KompetensiUtamaLulusan => ({
  id_kul: item.id,
  kode_kul: item.kode_kul,
  kompetensi_lulusan: item.kompetensi_lulusan,
  aspek: item.aspek,
  id_kurikulum: item.id_kurikulum,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchKulList(params?: { id_kurikulum?: string }): Promise<KompetensiUtamaLulusan[]> {
  const queryParams: any = {};
  if (params?.id_kurikulum) queryParams.id_kurikulum = params.id_kurikulum;
  
  const { data } = await api.get<ApiResponse<BackendKul[]>>("/kul", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapKul);
}

export async function createKul(payload: KompetensiUtamaLulusanForm): Promise<KompetensiUtamaLulusan> {
  const { data } = await api.post<ApiResponse<BackendKul>>("/kul", payload);
  return mapKul(unwrapResponse(data));
}

export async function updateKul(id: string, payload: Partial<KompetensiUtamaLulusanForm>): Promise<KompetensiUtamaLulusan> {
  const { data } = await api.put<ApiResponse<BackendKul>>(`/kul/${id}`, payload);
  return mapKul(unwrapResponse(data));
}

export async function deleteKul(id: string): Promise<void> {
  await api.delete(`/kul/${id}`);
}
