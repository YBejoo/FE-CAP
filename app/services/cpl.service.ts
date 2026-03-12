import api from "~/lib/api";
import type { ApiResponse, CPL, CPLForm, AspekCPL } from "~/types";
import { toDate, unwrapResponse } from "~/services/utils";

type BackendCpl = {
  id: string;
  kode_cpl: string;
  deskripsi_cpl: string;
  aspek: AspekCPL;
  id_kurikulum: string;
  created_at?: string | number | Date | null;
  updated_at?: string | number | Date | null;
};

const mapCpl = (item: BackendCpl): CPL => ({
  id_cpl: item.id,
  kode_cpl: item.kode_cpl,
  deskripsi_cpl: item.deskripsi_cpl,
  aspek: item.aspek,
  id_kurikulum: item.id_kurikulum,
  created_at: toDate(item.created_at),
  updated_at: toDate(item.updated_at),
});

export async function fetchCplList(params?: {
  id_kurikulum?: string;
  aspek?: string;
  enrich?: boolean;
}): Promise<CPL[]> {
  const queryParams: any = {};
  if (params?.id_kurikulum) queryParams.id_kurikulum = params.id_kurikulum;
  if (params?.aspek) queryParams.aspek = params.aspek;
  if (params?.enrich) queryParams.enrich = 'true';
  
  const { data } = await api.get<ApiResponse<BackendCpl[]>>("/cpl", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  const items = unwrapResponse(data) ?? [];
  return items.map(mapCpl);
}

export async function createCpl(payload: CPLForm): Promise<CPL> {
  const { data } = await api.post<ApiResponse<BackendCpl>>("/cpl", payload);
  return mapCpl(unwrapResponse(data));
}

export async function updateCpl(id: string, payload: Partial<CPLForm>): Promise<CPL> {
  const { data } = await api.put<ApiResponse<BackendCpl>>(`/cpl/${id}`, payload);
  return mapCpl(unwrapResponse(data));
}

export async function deleteCpl(id: string): Promise<void> {
  await api.delete(`/cpl/${id}`);
}
