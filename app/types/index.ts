// =====================
// ENTITY TYPES - Sistem RPS & CPMK (OBE)
// =====================

// Enum untuk aspek CPL
export type AspekCPL = 'Sikap' | 'Pengetahuan' | 'Keterampilan Umum' | 'Keterampilan Khusus';

// Enum untuk sifat mata kuliah
export type SifatMK = 'Wajib' | 'Pilihan';

// Enum untuk status kurikulum
export type StatusKurikulum = 'Aktif' | 'Arsip';

// =====================
// 1. KURIKULUM - Root/Container Utama
// =====================
export interface Kurikulum {
  id_kurikulum: string;
  nama_kurikulum: string;
  tahun_berlaku: number;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 2. PROFIL LULUSAN
// =====================
export interface ProfilLulusan {
  id_profil: string;
  kode_profil: string;     // PL-01, PL-02, dst
  peran: string;           // Software Engineer, Data Scientist
  deskripsi: string;
  id_kurikulum: string;
  kurikulum?: Kurikulum;
  cpl_terkait?: string[];  // Array ID/Kode CPL
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 3. CAPAIAN PEMBELAJARAN LULUSAN (CPL)
// =====================
export interface CPL {
  id_cpl: string;
  kode_cpl: string;        // S1, P1, KK1, KU1
  aspek: AspekCPL;
  deskripsi_cpl: string;
  id_kurikulum: string;
  kurikulum?: Kurikulum;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 4. KOMPETENSI UTAMA LULUSAN
// =====================
export interface KompetensiUtama {
  id_kompetensi: string;
  nama_kompetensi: string;
  level_kkni: number;      // 1-9
  id_profil: string;
  profil?: ProfilLulusan;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 5. BAHAN KAJIAN
// =====================
export interface BahanKajian {
  id_bahan_kajian: string;
  nama_bahan_kajian: string;
  deskripsi?: string;
  bobot_min?: number;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 6. MATA KULIAH (MK)
// =====================
export interface MataKuliah {
  kode_mk: string;
  nama_mk: string;
  sks: number;
  semester: number;        // 1-8
  sifat: SifatMK;
  deskripsi?: string;
  id_kurikulum: string;
  kurikulum?: Kurikulum;
  bahan_kajian?: BahanKajian[];
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 7. CAPAIAN PEMBELAJARAN MATA KULIAH (CPMK)
// =====================
export interface CPMK {
  id_cpmk: string;
  kode_cpmk: string;       // M1, M2, dst
  deskripsi_cpmk: string;
  bobot_persentase: number;
  kode_mk: string;
  id_cpl: string;          // Relasi ke CPL
  mata_kuliah?: MataKuliah;
  cpl?: CPL;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 8. SUB-CPMK
// =====================
export interface SubCPMK {
  id_sub_cpmk: string;
  kode_sub: string;        // L1.1, L1.2
  deskripsi_sub_cpmk: string;
  indikator: string;
  kriteria_penilaian: string;
  id_cpmk: string;
  cpmk?: CPMK;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// 9. RENCANA PEMBELAJARAN STUDI (RPS)
// =====================
export interface RPS {
  id_rps: string;
  kode_mk: string;
  versi: number;
  tgl_penyusunan: Date;
  dosen_pengampu: string;
  koordinator_rmk?: string;
  kaprodi?: string;
  deskripsi_mk?: string;
  pustaka_utama?: string;
  pustaka_pendukung?: string;
  media_pembelajaran?: string;
  status: 'Draft' | 'Menunggu Validasi' | 'Terbit';
  mata_kuliah?: MataKuliah;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// PIVOT/JUNCTION TABLES
// =====================

// Relasi Profil Lulusan - CPL (Many to Many)
export interface ProfilCPL {
  id_profil: string;
  id_cpl: string;
}

// Relasi CPL - Bahan Kajian (Many to Many)
export interface CPLBahanKajian {
  id_cpl: string;
  id_bahan_kajian: string;
}

// Relasi Mata Kuliah - Bahan Kajian (Many to Many)
export interface MKBahanKajian {
  kode_mk: string;
  id_bahan_kajian: string;
}

// Relasi CPL - Mata Kuliah / Matrix Mapping (Many to Many)
export interface CPLMataKuliah {
  id_cpl: string;
  kode_mk: string;
  kontribusi?: 'High' | 'Medium' | 'Low';
}

// Sub-CPMK - Pertemuan RPS (Many to Many)
export interface SubCPMKPertemuan {
  id_sub_cpmk: string;
  id_pertemuan: string;
}

// =====================
// PERTEMUAN (Detail RPS per Minggu)
// =====================
export interface Pertemuan {
  id_pertemuan: string;
  id_rps: string;
  pertemuan_ke: number;    // 1-16
  sub_cpmk_ids?: string[];
  bahan_kajian?: string;
  bentuk_pembelajaran: string;
  estimasi_waktu: number;  // dalam menit
  pengalaman_belajar?: string;
  indikator_penilaian?: string;
  bobot_penilaian: number;
  rps?: RPS;
  created_at?: Date;
  updated_at?: Date;
}

// =====================
// FORM TYPES
// =====================
export type KurikulumForm = Omit<Kurikulum, 'id_kurikulum' | 'created_at' | 'updated_at'>;
export type ProfilLulusanForm = Omit<ProfilLulusan, 'id_profil' | 'kurikulum' | 'cpl_terkait' | 'created_at' | 'updated_at'>;
export type CPLForm = Omit<CPL, 'id_cpl' | 'kurikulum' | 'created_at' | 'updated_at'>;
export type KompetensiUtamaForm = Omit<KompetensiUtama, 'id_kompetensi' | 'profil' | 'created_at' | 'updated_at'>;
export type BahanKajianForm = Omit<BahanKajian, 'id_bahan_kajian' | 'created_at' | 'updated_at'>;
export type MataKuliahForm = Omit<MataKuliah, 'kurikulum' | 'bahan_kajian' | 'created_at' | 'updated_at'>;
export type CPMKForm = Omit<CPMK, 'id_cpmk' | 'mata_kuliah' | 'cpl' | 'created_at' | 'updated_at'>;
export type SubCPMKForm = Omit<SubCPMK, 'id_sub_cpmk' | 'cpmk' | 'created_at' | 'updated_at'>;
export type RPSForm = Omit<RPS, 'id_rps' | 'mata_kuliah' | 'created_at' | 'updated_at'>;
export type PertemuanForm = Omit<Pertemuan, 'id_pertemuan' | 'rps' | 'created_at' | 'updated_at'>;

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
  totalKurikulum: number;
  totalProfilLulusan: number;
  totalCPL: number;
  totalMataKuliah: number;
  totalCPMK: number;
  totalRPS: number;
  rpsSelesai: number;
  rpsDraft: number;
  kurikulumAktif?: Kurikulum;
}

// =====================
// CHART DATA TYPES
// =====================
export interface CPLDistributionData {
  kode_cpl: string;
  aspek: AspekCPL;
  jumlah_mk: number;
}

export interface RPSStatusData {
  status: string;
  jumlah: number;
}

export interface RecentRPSUpdate {
  id_rps: string;
  nama_mk: string;
  dosen_pengampu: string;
  updated_at: Date;
}
