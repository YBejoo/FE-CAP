import { dummyMataKuliah, dummyCPMK, dummyCPL, dummyKurikulum } from "~/data/dummy-data";

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
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return dummyMataKuliah.map((mk) => {
    const cpmkList = dummyCPMK.filter((c) => c.kode_mk === mk.kode_mk);
    const uniqueCpl = new Set(cpmkList.map((c) => c.id_cpl));
    const avgBobot = cpmkList.length > 0
      ? cpmkList.reduce((sum, c) => sum + c.bobot_persentase, 0) / cpmkList.length
      : 0;
    
    return {
      kode_mk: mk.kode_mk,
      nama_mk: mk.nama_mk,
      total_cpmk: cpmkList.length,
      total_cpl: uniqueCpl.size,
      rata_rata_bobot: Math.round(avgBobot * 100) / 100,
    };
  });
}

export async function fetchLaporanPerCPL(idKurikulum?: string, idMk?: string): Promise<LaporanPerCPL[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return dummyCPL.map((cpl) => {
    const relatedCpmk = dummyCPMK.filter((c) => c.id_cpl === cpl.id_cpl);
    const uniqueMK = new Set(relatedCpmk.map((c) => c.kode_mk));
    const avgBobot = relatedCpmk.length > 0
      ? relatedCpmk.reduce((sum, c) => sum + c.bobot_persentase, 0) / relatedCpmk.length
      : 0;
    
    return {
      id_cpl: cpl.id_cpl,
      nama_cpl: cpl.deskripsi_cpl,
      bobot: Math.round(avgBobot * 100) / 100,
      total_mk: uniqueMK.size,
    };
  });
}

export async function fetchLaporanPerTahun(idKurikulum?: string): Promise<LaporanPerTahun[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const grouped = dummyKurikulum.reduce((acc, kur) => {
    if (!acc[kur.tahun_berlaku]) {
      acc[kur.tahun_berlaku] = {
        tahun: kur.tahun_berlaku,
        total_kurikulum: 0,
        total_cpl: 0,
        total_mk: 0,
      };
    }
    acc[kur.tahun_berlaku].total_kurikulum++;
    acc[kur.tahun_berlaku].total_cpl += dummyCPL.filter((c) => c.id_kurikulum === kur.id_kurikulum).length;
    acc[kur.tahun_berlaku].total_mk += dummyMataKuliah.filter((m) => m.id_kurikulum === kur.id_kurikulum).length;
    return acc;
  }, {} as Record<number, LaporanPerTahun>);
  
  return Object.values(grouped);
}

export type { LaporanPerMK, LaporanPerCPL, LaporanPerTahun };
