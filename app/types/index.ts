// =====================
// ENTITY TYPES - CPL CPMK System
// =====================

// Program Studi
export interface Prodi {
  id_prodi: string;
  nama_prodi: string;
  created_at?: Date;
  updated_at?: Date;
}

// Kurikulum
export interface Kurikulum {
  id_kurikulum: string;
  tahun: number;
  id_prodi: string;
  prodi?: Prodi;
  created_at?: Date;
  updated_at?: Date;
}

// Capaian Pembelajaran Lulusan (CPL)
export interface CPL {
  id_cpl: string;
  nama_cpl: string;
  bobot: number;
  id_kurikulum: string;
  kurikulum?: Kurikulum;
  created_at?: Date;
  updated_at?: Date;
}

// Mata Kuliah (MK)
export interface MataKuliah {
  kode_mk: string;
  nama: string;
  sks: number;
  created_at?: Date;
  updated_at?: Date;
}

// Capaian Pembelajaran Mata Kuliah (CPMK)
export interface CPMK {
  id_cpmk: string;
  id_mk: string;
  nama_cpmk: string;
  id_kurikulum: string;
  mata_kuliah?: MataKuliah;
  kurikulum?: Kurikulum;
  created_at?: Date;
  updated_at?: Date;
}

// Rencana Pembelajaran Semester (RPS)
export interface RPS {
  id_rps: string;
  id_mk: string;
  nama_rps: string;
  mata_kuliah?: MataKuliah;
  created_at?: Date;
  updated_at?: Date;
}

// Supporting CPL (Relasi CPL - RPS)
export interface SCPL {
  id_scpl: string;
  id_cpl: string;
  id_rps: string;
  cpl?: CPL;
  rps?: RPS;
}

// Relasi CPMK (R_CPMK)
export interface RCPMK {
  id_rcpmk: string;
  id_cpl: string;
  id_rps: string;
  bobot: number;
  id_pertemuan: string;
  cpl?: CPL;
  rps?: RPS;
}

// Pertemuan
export interface Pertemuan {
  id_pertemuan: string;
  pertemuan_ke: number;
  id_rps: string;
  id_cpmk: string;
  indikator_pembelajaran: string;
  materi: string;
  metode_mengajar: string;
  alat_bantu: string;
  capaian_pembelajaran: string;
  bobot: number;
  jumlah_unit_ajar: number;
  rps?: RPS;
  cpmk?: CPMK;
  created_at?: Date;
  updated_at?: Date;
}

// Penilaian
export interface Penilaian {
  id_penilaian: string;
  bobot_nilai: number;
  id_rps: string;
  id_pertemuan: string;
  nama_penilaian: string;
  bentuk_penilaian: string;
  rps?: RPS;
  pertemuan?: Pertemuan;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// FORM TYPES
// =====================

export type ProdiForm = Omit<Prodi, 'id_prodi' | 'created_at' | 'updated_at'>;
export type KurikulumForm = Omit<Kurikulum, 'id_kurikulum' | 'prodi' | 'created_at' | 'updated_at'>;
export type CPLForm = Omit<CPL, 'id_cpl' | 'kurikulum' | 'created_at' | 'updated_at'>;
export type MataKuliahForm = Omit<MataKuliah, 'created_at' | 'updated_at'>;
export type CPMKForm = Omit<CPMK, 'id_cpmk' | 'mata_kuliah' | 'kurikulum' | 'created_at' | 'updated_at'>;
export type RPSForm = Omit<RPS, 'id_rps' | 'mata_kuliah' | 'created_at' | 'updated_at'>;
export type PertemuanForm = Omit<Pertemuan, 'id_pertemuan' | 'rps' | 'cpmk' | 'created_at' | 'updated_at'>;
export type PenilaianForm = Omit<Penilaian, 'id_penilaian' | 'rps' | 'pertemuan' | 'created_at' | 'updated_at'>;

// =====================
// API RESPONSE TYPES
// =====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =====================
// DASHBOARD STATS
// =====================

export interface DashboardStats {
  totalProdi: number;
  totalKurikulum: number;
  totalCPL: number;
  totalMataKuliah: number;
  totalCPMK: number;
  totalRPS: number;
}

// =====================
// LAPORAN TYPES
// =====================

export interface LaporanPerMK {
  kode_mk: string;
  nama_mk: string;
  total_cpmk: number;
  total_cpl: number;
  rata_rata_bobot: number;
}

export interface LaporanPerTahun {
  tahun: number;
  total_kurikulum: number;
  total_cpl: number;
  total_mk: number;
}

export interface LaporanPerCPL {
  id_cpl: string;
  nama_cpl: string;
  bobot: number;
  total_mk_terkait: number;
}

export interface LaporanPerCPMK {
  id_cpmk: string;
  nama_cpmk: string;
  kode_mk: string;
  nama_mk: string;
  total_pertemuan: number;
}
