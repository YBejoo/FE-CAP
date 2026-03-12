import api from "~/lib/api";
import type { ApiResponse, Dosen } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendDosen = {
  id: string;
  nip: string;
  nama_dosen: string;
  email?: string;
  bidang_keahlian?: string;
  jabatan_fungsional?: string;
  id_prodi?: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapDosen = (item: BackendDosen): Dosen => ({
  id_dosen: item.id,
  nip: item.nip,
  nama_dosen: item.nama_dosen,
  email: item.email,
  bidang_keahlian: item.bidang_keahlian,
  jabatan_fungsional: item.jabatan_fungsional,
  id_prodi: item.id_prodi,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchDosenList(params?: { id_prodi?: string }): Promise<Dosen[]> {
  const queryParams: any = {};
  if (params?.id_prodi) queryParams.id_prodi = params.id_prodi;
  
  const { data } = await api.get<ApiResponse<BackendDosen[]>>("/dosen", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapDosen);
}
