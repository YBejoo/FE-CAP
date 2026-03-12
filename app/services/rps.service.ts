import api from "~/lib/api";
import type { ApiResponse, RPS } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendRps = {
  id: string;
  id_mk?: string;
  kode_mk?: string;
  versi: number;
  tgl_penyusunan?: string | number | Date | null;
  dosen_pengampu: string;
  status: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapRps = (item: BackendRps): RPS => ({
  id_rps: item.id,
  id_mk: item.id_mk,
  kode_mk: item.kode_mk,
  versi: item.versi,
  tgl_penyusunan: toDate(item.tgl_penyusunan),
  dosen_pengampu: item.dosen_pengampu,
  status: item.status,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchRpsList(params?: {
  id_mk?: string;
  id_kurikulum?: string;
  status?: string;
}): Promise<RPS[]> {
  const queryParams: any = {};
  if (params?.id_mk) queryParams.id_mk = params.id_mk;
  if (params?.id_kurikulum) queryParams.id_kurikulum = params.id_kurikulum;
  if (params?.status) queryParams.status = params.status;
  
  const { data } = await api.get<ApiResponse<BackendRps[]>>("/rps", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapRps);
}
