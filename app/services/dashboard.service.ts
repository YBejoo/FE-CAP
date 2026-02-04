import type {
  DashboardStats,
  MahasiswaBawahKKMData,
  CPMKRataRataData,
  NilaiMahasiswaPerMK,
} from "~/types";
import { dummyDashboardStats, dummyCPMK, dummyNilaiMahasiswa, dummyMahasiswa } from "~/data/dummy-data";

// Using dummy data for now
export async function fetchDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyDashboardStats;
}

export async function fetchNilaiMahasiswa(): Promise<Record<string, Record<string, NilaiMahasiswaPerMK>>> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Transform dummy data to expected format
  const result: Record<string, Record<string, NilaiMahasiswaPerMK>> = {};
  
  dummyNilaiMahasiswa.forEach((nilai) => {
    if (!result[nilai.kode_mk]) {
      result[nilai.kode_mk] = {};
    }
    
    if (!result[nilai.kode_mk][nilai.nim]) {
      const mhs = dummyMahasiswa.find(m => m.nim === nilai.nim);
      const cpmkList = dummyCPMK.filter(c => c.kode_mk === nilai.kode_mk);
      const nilaiPerCpmk = cpmkList.map(cpmk => {
        const nilaiData = dummyNilaiMahasiswa.find(n => n.nim === nilai.nim && n.id_cpmk === cpmk.id_cpmk);
        return {
          kode_cpmk: cpmk.kode_cpmk,
          nilai: nilaiData?.nilai || 0
        };
      });
      
      const nilaiAkhir = nilaiPerCpmk.reduce((sum, n) => sum + n.nilai, 0) / nilaiPerCpmk.length;
      
      result[nilai.kode_mk][nilai.nim] = {
        nim: nilai.nim,
        nama_mahasiswa: mhs?.nama_mahasiswa || "Unknown",
        angkatan: mhs?.angkatan || 2024,
        nilai_per_cpmk: nilaiPerCpmk,
        nilai_akhir: Math.round(nilaiAkhir * 100) / 100,
        status: nilaiAkhir >= 75 ? "Lulus" : "Tidak Lulus"
      };
    }
  });
  
  return result;
}

export async function fetchMahasiswaBawahKKM(): Promise<Record<string, MahasiswaBawahKKMData[]>> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Calculate students below KKM (75)
  const result: Record<string, MahasiswaBawahKKMData[]> = {};
  const kkm = 75;
  
  // Group by kode_mk
  const mkMap = new Map<string, { total: number; belowKKM: number; nama: string }>();
  
  dummyNilaiMahasiswa.forEach((nilai) => {
    if (!mkMap.has(nilai.kode_mk)) {
      mkMap.set(nilai.kode_mk, { total: 0, belowKKM: 0, nama: "" });
    }
  });
  
  return {};
}

export async function fetchCpmkRataRata(): Promise<Record<string, CPMKRataRataData[]>> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const result: Record<string, CPMKRataRataData[]> = {};
  
  // Group by kode_mk
  dummyCPMK.forEach((cpmk) => {
    if (!result[cpmk.kode_mk]) {
      result[cpmk.kode_mk] = [];
    }
    
    const nilaiCpmk = dummyNilaiMahasiswa.filter(n => n.id_cpmk === cpmk.id_cpmk);
    const rataRata = nilaiCpmk.length > 0 
      ? nilaiCpmk.reduce((sum, n) => sum + n.nilai, 0) / nilaiCpmk.length 
      : 0;
    
    result[cpmk.kode_mk].push({
      kode_cpmk: cpmk.kode_cpmk,
      rata_rata: Math.round(rataRata * 100) / 100,
      jumlah_mahasiswa: nilaiCpmk.length
    });
  });
  
  return result;
}
