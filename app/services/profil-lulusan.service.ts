import api from "~/lib/api";
import type { ApiResponse, ProfilLulusan, ProfilLulusanForm } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendProfilLulusan = {
  id: string;
  kode_profil: string;
  profil_lulusan: string;
  deskripsi: string;
  sumber: string;
  id_kurikulum: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapProfilLulusan = (item: BackendProfilLulusan): ProfilLulusan => ({
  id_profil: item.id,
  kode_profil: item.kode_profil,
  profil_lulusan: item.profil_lulusan,
  deskripsi: item.deskripsi,
  sumber: item.sumber,
  id_kurikulum: item.id_kurikulum,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchProfilLulusanList(params?: { id_kurikulum?: string }): Promise<ProfilLulusan[]> {
  const queryParams: any = {};
  if (params?.id_kurikulum) queryParams.id_kurikulum = params.id_kurikulum;
  
  const { data } = await api.get<ApiResponse<BackendProfilLulusan[]>>("/profil-lulusan", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapProfilLulusan);
}

export async function createProfilLulusan(payload: ProfilLulusanForm): Promise<ProfilLulusan> {
  const { data } = await api.post<ApiResponse<BackendProfilLulusan>>("/profil-lulusan", payload);
  return mapProfilLulusan(unwrapResponse(data));
}

export async function updateProfilLulusan(id: string, payload: Partial<ProfilLulusanForm>): Promise<ProfilLulusan> {
  const { data } = await api.put<ApiResponse<BackendProfilLulusan>>(`/profil-lulusan/${id}`, payload);
  return mapProfilLulusan(unwrapResponse(data));
}

export async function deleteProfilLulusan(id: string): Promise<void> {
  await api.delete(`/profil-lulusan/${id}`);
}
