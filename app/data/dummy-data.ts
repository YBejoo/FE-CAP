import type {
  Prodi,
  Kurikulum,
  ProfilLulusan,
  KompetensiUtamaLulusan,
  CPL,
  BahanKajian,
  MataKuliah,
  Dosen,
  CPMK,
  SubCPMK,
  RPS,
  Pertemuan,
  Mahasiswa,
  NilaiMahasiswa,
  Penilaian,
  DashboardStats,
} from "~/types";

// =====================
// 1. PRODI DATA
// =====================
export const dummyProdi: Prodi[] = [
  {
    id_prodi: "prodi-1",
    kode_prodi: "TIF",
    nama_prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    jenjang: "S1",
    akreditasi: "A",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id_prodi: "prodi-2",
    kode_prodi: "SI",
    nama_prodi: "Sistem Informasi",
    fakultas: "Fakultas Teknik",
    jenjang: "S1",
    akreditasi: "B",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
];

// =====================
// 2. KURIKULUM DATA
// =====================
export const dummyKurikulum: Kurikulum[] = [
  {
    id_kurikulum: "kur-1",
    nama_kurikulum: "Kurikulum 2024 - Teknik Informatika",
    tahun_berlaku: 2024,
    is_active: true,
    id_prodi: "prodi-1",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
  },
  {
    id_kurikulum: "kur-2",
    nama_kurikulum: "Kurikulum 2022 - Teknik Informatika",
    tahun_berlaku: 2022,
    is_active: false,
    id_prodi: "prodi-1",
    created_at: new Date("2022-01-10"),
    updated_at: new Date("2024-01-10"),
  },
];

// =====================
// 3. PROFIL LULUSAN DATA
// =====================
export const dummyProfilLulusan: ProfilLulusan[] = [
  {
    id_profil: "pl-1",
    kode_profil: "PL-01",
    profil_lulusan: "Software Engineer",
    deskripsi: "Mampu merancang, mengembangkan, dan memelihara aplikasi perangkat lunak berkualitas tinggi",
    sumber: "Kebutuhan Industri IT & Asosiasi Profesi",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-20"),
    updated_at: new Date("2024-01-20"),
  },
  {
    id_profil: "pl-2",
    kode_profil: "PL-02",
    profil_lulusan: "Data Scientist",
    deskripsi: "Mampu menganalisis data kompleks dan membangun model machine learning untuk solusi bisnis",
    sumber: "Tren Industri 4.0 & Big Data",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-20"),
    updated_at: new Date("2024-01-20"),
  },
  {
    id_profil: "pl-3",
    kode_profil: "PL-03",
    profil_lulusan: "System Analyst",
    deskripsi: "Mampu menganalisis kebutuhan sistem dan merancang arsitektur solusi teknologi informasi",
    sumber: "Framework TOGAF & Kebutuhan Enterprise",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-20"),
    updated_at: new Date("2024-01-20"),
  },
  {
    id_profil: "pl-4",
    kode_profil: "PL-04",
    profil_lulusan: "IT Consultant",
    deskripsi: "Mampu memberikan konsultasi dan solusi teknologi informasi untuk organisasi",
    sumber: "Kebutuhan Konsultan IT & Best Practices",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-20"),
    updated_at: new Date("2024-01-20"),
  },
];

// =====================
// 4. KOMPETENSI UTAMA LULUSAN (KUL) DATA
// =====================
export const dummyKompetensiUtamaLulusan: KompetensiUtamaLulusan[] = [
  {
    id_kul: "kul-1",
    kode_kul: "S1",
    kompetensi_lulusan: "Bertaqwa kepada Tuhan Yang Maha Esa dan mampu menunjukkan sikap religius",
    aspek: "S",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id_kul: "kul-2",
    kode_kul: "S2",
    kompetensi_lulusan: "Menjunjung tinggi nilai kemanusiaan dalam menjalankan tugas",
    aspek: "S",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id_kul: "kul-3",
    kode_kul: "P1",
    kompetensi_lulusan: "Menguasai konsep teoritis bidang pengetahuan teknologi informasi secara umum",
    aspek: "P",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id_kul: "kul-4",
    kode_kul: "P2",
    kompetensi_lulusan: "Menguasai konsep dan prinsip pemrograman, struktur data, dan algoritma",
    aspek: "P",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id_kul: "kul-5",
    kode_kul: "KU1",
    kompetensi_lulusan: "Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif",
    aspek: "KU",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id_kul: "kul-6",
    kode_kul: "KU2",
    kompetensi_lulusan: "Mampu bekerja sama dalam tim dan berkomunikasi efektif",
    aspek: "KU",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id_kul: "kul-7",
    kode_kul: "KK1",
    kompetensi_lulusan: "Mampu merancang dan mengembangkan sistem perangkat lunak",
    aspek: "KK",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
  {
    id_kul: "kul-8",
    kode_kul: "KK2",
    kompetensi_lulusan: "Mampu menganalisis dan memecahkan masalah kompleks menggunakan teknologi informasi",
    aspek: "KK",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-22"),
    updated_at: new Date("2024-01-22"),
  },
];

// =====================
// 5. CPL (Capaian Pembelajaran Lulusan) DATA
// =====================
export const dummyCPL: CPL[] = [
  {
    id_cpl: "cpl-1",
    kode_cpl: "CPL-S1",
    deskripsi_cpl: "Mampu menunjukkan sikap bertanggung jawab atas pekerjaan di bidang keahliannya secara mandiri",
    aspek: "S",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-2",
    kode_cpl: "CPL-S2",
    deskripsi_cpl: "Mampu bekerja sama dan memiliki kepekaan sosial serta kepedulian terhadap masyarakat",
    aspek: "S",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-3",
    kode_cpl: "CPL-P1",
    deskripsi_cpl: "Menguasai konsep teoritis ilmu komputer dan pemrograman",
    aspek: "P",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-4",
    kode_cpl: "CPL-P2",
    deskripsi_cpl: "Menguasai prinsip rekayasa perangkat lunak dan manajemen proyek",
    aspek: "P",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-5",
    kode_cpl: "CPL-KU1",
    deskripsi_cpl: "Mampu berkomunikasi secara efektif baik lisan maupun tulisan",
    aspek: "KU",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-6",
    kode_cpl: "CPL-KU2",
    deskripsi_cpl: "Mampu menggunakan teknologi informasi untuk mengolah data dan informasi",
    aspek: "KU",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-7",
    kode_cpl: "CPL-KK1",
    deskripsi_cpl: "Mampu mengembangkan aplikasi berbasis web dan mobile",
    aspek: "KK",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-8",
    kode_cpl: "CPL-KK2",
    deskripsi_cpl: "Mampu merancang dan mengimplementasikan basis data",
    aspek: "KK",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
  {
    id_cpl: "cpl-9",
    kode_cpl: "CPL-KK3",
    deskripsi_cpl: "Mampu menganalisis dan merancang sistem informasi",
    aspek: "KK",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-01-25"),
    updated_at: new Date("2024-01-25"),
  },
];

// =====================
// 6. BAHAN KAJIAN DATA
// =====================
export const dummyBahanKajian: BahanKajian[] = [
  {
    id_bahan_kajian: "bk-1",
    kode_bk: "BK-01",
    nama_bahan_kajian: "Pemrograman Dasar",
    aspek: "P",
    ranah_keilmuan: "Ilmu Komputer - Programming Fundamentals",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
  {
    id_bahan_kajian: "bk-2",
    kode_bk: "BK-02",
    nama_bahan_kajian: "Struktur Data dan Algoritma",
    aspek: "P",
    ranah_keilmuan: "Ilmu Komputer - Data Structures & Algorithms",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
  {
    id_bahan_kajian: "bk-3",
    kode_bk: "BK-03",
    nama_bahan_kajian: "Basis Data",
    aspek: "KK",
    ranah_keilmuan: "Sistem Informasi - Database Management",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
  {
    id_bahan_kajian: "bk-4",
    kode_bk: "BK-04",
    nama_bahan_kajian: "Rekayasa Perangkat Lunak",
    aspek: "KK",
    ranah_keilmuan: "Software Engineering - SDLC & Methodologies",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
  {
    id_bahan_kajian: "bk-5",
    kode_bk: "BK-05",
    nama_bahan_kajian: "Pemrograman Web",
    aspek: "KK",
    ranah_keilmuan: "Web Development - Frontend & Backend",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
  {
    id_bahan_kajian: "bk-6",
    kode_bk: "BK-06",
    nama_bahan_kajian: "Kecerdasan Buatan",
    aspek: "KK",
    ranah_keilmuan: "Artificial Intelligence - Machine Learning",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
  {
    id_bahan_kajian: "bk-7",
    kode_bk: "BK-07",
    nama_bahan_kajian: "Jaringan Komputer",
    aspek: "P",
    ranah_keilmuan: "Computer Networks - Protocols & Architecture",
    id_kurikulum: "kur-1",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
  },
];

// =====================
// 7. DOSEN DATA
// =====================
export const dummyDosen: Dosen[] = [
  {
    id_dosen: "dsn-1",
    nip: "198501012010121001",
    nama_dosen: "Dr. Budi Santoso, S.Kom., M.Kom.",
    email: "budi.santoso@univ.ac.id",
    bidang_keahlian: "Rekayasa Perangkat Lunak",
    jabatan_fungsional: "Lektor Kepala",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-10"),
  },
  {
    id_dosen: "dsn-2",
    nip: "198703152012122001",
    nama_dosen: "Dr. Siti Nurhaliza, S.T., M.T.",
    email: "siti.nurhaliza@univ.ac.id",
    bidang_keahlian: "Kecerdasan Buatan",
    jabatan_fungsional: "Lektor",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-10"),
  },
  {
    id_dosen: "dsn-3",
    nip: "199001202015041001",
    nama_dosen: "Ahmad Fauzi, S.Kom., M.Kom.",
    email: "ahmad.fauzi@univ.ac.id",
    bidang_keahlian: "Basis Data",
    jabatan_fungsional: "Asisten Ahli",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-10"),
  },
  {
    id_dosen: "dsn-4",
    nip: "198805102013051002",
    nama_dosen: "Prof. Dr. Ir. Dewi Kusuma, M.T.",
    email: "dewi.kusuma@univ.ac.id",
    bidang_keahlian: "Jaringan Komputer",
    jabatan_fungsional: "Guru Besar",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-10"),
  },
];

// =====================
// 8. MATA KULIAH DATA
// =====================
export const dummyMataKuliah: MataKuliah[] = [
  {
    id_mk: "mk-1",
    kode_mk: "TIF101",
    nama_mk: "Pemrograman Dasar",
    sks: 3,
    semester: 1,
    sifat: "Wajib",
    deskripsi: "Mata kuliah ini membahas konsep dasar pemrograman menggunakan bahasa Python",
    id_kurikulum: "kur-1",
    id_bahan_kajian: "bk-1",
    created_at: new Date("2024-02-05"),
    updated_at: new Date("2024-02-05"),
  },
  {
    id_mk: "mk-2",
    kode_mk: "TIF102",
    nama_mk: "Struktur Data",
    sks: 3,
    semester: 2,
    sifat: "Wajib",
    deskripsi: "Mata kuliah ini membahas berbagai struktur data dan algoritma dasar",
    id_kurikulum: "kur-1",
    id_bahan_kajian: "bk-2",
    created_at: new Date("2024-02-05"),
    updated_at: new Date("2024-02-05"),
  },
  {
    id_mk: "mk-3",
    kode_mk: "TIF201",
    nama_mk: "Basis Data",
    sks: 3,
    semester: 3,
    sifat: "Wajib",
    deskripsi: "Mata kuliah ini membahas konsep database relasional dan SQL",
    id_kurikulum: "kur-1",
    id_bahan_kajian: "bk-3",
    created_at: new Date("2024-02-05"),
    updated_at: new Date("2024-02-05"),
  },
  {
    id_mk: "mk-4",
    kode_mk: "TIF301",
    nama_mk: "Rekayasa Perangkat Lunak",
    sks: 3,
    semester: 5,
    sifat: "Wajib",
    deskripsi: "Mata kuliah ini membahas metodologi pengembangan perangkat lunak",
    id_kurikulum: "kur-1",
    id_bahan_kajian: "bk-4",
    created_at: new Date("2024-02-05"),
    updated_at: new Date("2024-02-05"),
  },
  {
    id_mk: "mk-5",
    kode_mk: "TIF302",
    nama_mk: "Pemrograman Web",
    sks: 3,
    semester: 5,
    sifat: "Wajib",
    deskripsi: "Mata kuliah ini membahas pengembangan aplikasi web modern",
    id_kurikulum: "kur-1",
    id_bahan_kajian: "bk-5",
    created_at: new Date("2024-02-05"),
    updated_at: new Date("2024-02-05"),
  },
  {
    id_mk: "mk-6",
    kode_mk: "TIF401",
    nama_mk: "Kecerdasan Buatan",
    sks: 3,
    semester: 7,
    sifat: "Pilihan",
    deskripsi: "Mata kuliah ini membahas konsep AI dan machine learning",
    id_kurikulum: "kur-1",
    id_bahan_kajian: "bk-6",
    created_at: new Date("2024-02-05"),
    updated_at: new Date("2024-02-05"),
  },
];

// =====================
// 9. CPMK DATA
// =====================
export const dummyCPMK: CPMK[] = [
  // CPMK untuk Pemrograman Dasar (TIF101)
  {
    id_cpmk: "cpmk-1",
    kode_cpmk: "M1",
    deskripsi_cpmk: "Mahasiswa mampu memahami konsep dasar pemrograman",
    bobot_persentase: 25,
    kode_mk: "TIF101",
    id_mk: "mk-1",
    id_cpl: "cpl-3",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  {
    id_cpmk: "cpmk-2",
    kode_cpmk: "M2",
    deskripsi_cpmk: "Mahasiswa mampu membuat program sederhana dengan Python",
    bobot_persentase: 35,
    kode_mk: "TIF101",
    id_mk: "mk-1",
    id_cpl: "cpl-7",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  {
    id_cpmk: "cpmk-3",
    kode_cpmk: "M3",
    deskripsi_cpmk: "Mahasiswa mampu menerapkan logika pemrograman dalam menyelesaikan masalah",
    bobot_persentase: 40,
    kode_mk: "TIF101",
    id_mk: "mk-1",
    id_cpl: "cpl-7",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  // CPMK untuk Struktur Data (TIF102)
  {
    id_cpmk: "cpmk-4",
    kode_cpmk: "M1",
    deskripsi_cpmk: "Mahasiswa mampu memahami berbagai struktur data",
    bobot_persentase: 30,
    kode_mk: "TIF102",
    id_mk: "mk-2",
    id_cpl: "cpl-3",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  {
    id_cpmk: "cpmk-5",
    kode_cpmk: "M2",
    deskripsi_cpmk: "Mahasiswa mampu mengimplementasikan algoritma sorting dan searching",
    bobot_persentase: 35,
    kode_mk: "TIF102",
    id_mk: "mk-2",
    id_cpl: "cpl-7",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  {
    id_cpmk: "cpmk-6",
    kode_cpmk: "M3",
    deskripsi_cpmk: "Mahasiswa mampu menganalisis kompleksitas algoritma",
    bobot_persentase: 35,
    kode_mk: "TIF102",
    id_mk: "mk-2",
    id_cpl: "cpl-9",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  // CPMK untuk Basis Data (TIF201)
  {
    id_cpmk: "cpmk-7",
    kode_cpmk: "M1",
    deskripsi_cpmk: "Mahasiswa mampu merancang basis data relasional",
    bobot_persentase: 40,
    kode_mk: "TIF201",
    id_mk: "mk-3",
    id_cpl: "cpl-8",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  {
    id_cpmk: "cpmk-8",
    kode_cpmk: "M2",
    deskripsi_cpmk: "Mahasiswa mampu mengimplementasikan query SQL",
    bobot_persentase: 35,
    kode_mk: "TIF201",
    id_mk: "mk-3",
    id_cpl: "cpl-8",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  {
    id_cpmk: "cpmk-9",
    kode_cpmk: "M3",
    deskripsi_cpmk: "Mahasiswa mampu mengoptimalkan performa database",
    bobot_persentase: 25,
    kode_mk: "TIF201",
    id_mk: "mk-3",
    id_cpl: "cpl-9",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
];

// =====================
// 10. SUB-CPMK DATA
// =====================
export const dummySubCPMK: SubCPMK[] = [
  // Sub-CPMK untuk CPMK-1 (M1 - Pemrograman Dasar)
  {
    id_sub_cpmk: "sub-1",
    kode_sub: "L1.1",
    deskripsi_sub_cpmk: "Mahasiswa mampu menjelaskan konsep variabel dan tipe data",
    indikator: "Dapat membedakan berbagai tipe data dan penggunaannya",
    kriteria_penilaian: "Ketepatan dalam menjelaskan konsep (80% benar)",
    id_cpmk: "cpmk-1",
    created_at: new Date("2024-02-12"),
    updated_at: new Date("2024-02-12"),
  },
  {
    id_sub_cpmk: "sub-2",
    kode_sub: "L1.2",
    deskripsi_sub_cpmk: "Mahasiswa mampu memahami struktur kontrol",
    indikator: "Dapat menggunakan if-else dan loop dengan benar",
    kriteria_penilaian: "Implementasi struktur kontrol yang tepat",
    id_cpmk: "cpmk-1",
    created_at: new Date("2024-02-12"),
    updated_at: new Date("2024-02-12"),
  },
  // Sub-CPMK untuk CPMK-2 (M2 - Pemrograman Dasar)
  {
    id_sub_cpmk: "sub-3",
    kode_sub: "L2.1",
    deskripsi_sub_cpmk: "Mahasiswa mampu membuat fungsi sederhana",
    indikator: "Dapat mendefinisikan dan memanggil fungsi",
    kriteria_penilaian: "Fungsi bekerja sesuai spesifikasi",
    id_cpmk: "cpmk-2",
    created_at: new Date("2024-02-12"),
    updated_at: new Date("2024-02-12"),
  },
];

// =====================
// 11. RPS DATA
// =====================
export const dummyRPS: RPS[] = [
  {
    id_rps: "rps-1",
    kode_mk: "TIF101",
    id_mk: "mk-1",
    versi: 1,
    tgl_penyusunan: new Date("2024-08-01"),
    dosen_pengampu: "Dr. Budi Santoso, S.Kom., M.Kom.",
    koordinator_rmk: "Dr. Siti Nurhaliza, S.T., M.T.",
    kaprodi: "Prof. Dr. Ir. Dewi Kusuma, M.T.",
    deskripsi_mk: "Mata kuliah ini membahas konsep dasar pemrograman menggunakan bahasa Python, mencakup variabel, tipe data, struktur kontrol, fungsi, dan pemrograman berorientasi objek dasar.",
    pustaka_utama: "Gaddis, T. (2021). Starting Out with Python (5th ed.). Pearson.",
    pustaka_pendukung: "Lutz, M. (2013). Learning Python (5th ed.). O'Reilly Media.",
    media_pembelajaran: "Laptop, Proyektor, Python IDE, Google Classroom",
    status: "Terbit",
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-15"),
  },
  {
    id_rps: "rps-2",
    kode_mk: "TIF102",
    id_mk: "mk-2",
    versi: 1,
    tgl_penyusunan: new Date("2024-08-05"),
    dosen_pengampu: "Ahmad Fauzi, S.Kom., M.Kom.",
    koordinator_rmk: "Dr. Budi Santoso, S.Kom., M.Kom.",
    kaprodi: "Prof. Dr. Ir. Dewi Kusuma, M.T.",
    deskripsi_mk: "Mata kuliah ini membahas berbagai struktur data seperti array, linked list, stack, queue, tree, dan graph beserta algoritma yang terkait.",
    pustaka_utama: "Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2013). Data Structures and Algorithms in Python. Wiley.",
    pustaka_pendukung: "Cormen, T. H., et al. (2009). Introduction to Algorithms (3rd ed.). MIT Press.",
    media_pembelajaran: "Laptop, Whiteboard, Python IDE, LMS",
    status: "Terbit",
    created_at: new Date("2024-08-05"),
    updated_at: new Date("2024-08-20"),
  },
  {
    id_rps: "rps-3",
    kode_mk: "TIF201",
    id_mk: "mk-3",
    versi: 1,
    tgl_penyusunan: new Date("2024-08-10"),
    dosen_pengampu: "Ahmad Fauzi, S.Kom., M.Kom.",
    koordinator_rmk: "Dr. Budi Santoso, S.Kom., M.Kom.",
    kaprodi: "Prof. Dr. Ir. Dewi Kusuma, M.T.",
    deskripsi_mk: "Mata kuliah ini membahas konsep database relasional, normalisasi, SQL, dan manajemen database.",
    pustaka_utama: "Elmasri, R., & Navathe, S. B. (2016). Fundamentals of Database Systems (7th ed.). Pearson.",
    pustaka_pendukung: "Connolly, T., & Begg, C. (2014). Database Systems (6th ed.). Pearson.",
    media_pembelajaran: "Laptop, MySQL, PostgreSQL, ERD Tools",
    status: "Menunggu Validasi",
    created_at: new Date("2024-08-10"),
    updated_at: new Date("2024-08-25"),
  },
  {
    id_rps: "rps-4",
    kode_mk: "TIF302",
    id_mk: "mk-5",
    versi: 1,
    tgl_penyusunan: new Date("2024-09-01"),
    dosen_pengampu: "Dr. Budi Santoso, S.Kom., M.Kom.",
    status: "Draft",
    created_at: new Date("2024-09-01"),
    updated_at: new Date("2024-09-01"),
  },
];

// =====================
// 12. PERTEMUAN DATA
// =====================
export const dummyPertemuan: Pertemuan[] = [
  // Pertemuan untuk RPS-1 (Pemrograman Dasar)
  {
    id_pertemuan: "prt-1",
    id_rps: "rps-1",
    pertemuan_ke: 1,
    sub_cpmk_ids: ["sub-1"],
    bahan_kajian: "Pengenalan Python dan Konsep Dasar Pemrograman",
    bentuk_pembelajaran: "Ceramah, Diskusi, Praktikum",
    estimasi_waktu: 150,
    pengalaman_belajar: "Mahasiswa menginstal Python, membuat program hello world, dan memahami sintaks dasar",
    indikator_penilaian: "Mampu membuat program sederhana dengan Python",
    bobot_penilaian: 5,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
  {
    id_pertemuan: "prt-2",
    id_rps: "rps-1",
    pertemuan_ke: 2,
    sub_cpmk_ids: ["sub-1"],
    bahan_kajian: "Variabel, Tipe Data, dan Operator",
    bentuk_pembelajaran: "Ceramah, Praktikum",
    estimasi_waktu: 150,
    pengalaman_belajar: "Mahasiswa membuat program dengan berbagai tipe data dan operator",
    indikator_penilaian: "Ketepatan penggunaan variabel dan operator",
    bobot_penilaian: 5,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
  {
    id_pertemuan: "prt-3",
    id_rps: "rps-1",
    pertemuan_ke: 3,
    sub_cpmk_ids: ["sub-2"],
    bahan_kajian: "Struktur Kontrol: If-Else",
    bentuk_pembelajaran: "Ceramah, Praktikum, Studi Kasus",
    estimasi_waktu: 150,
    pengalaman_belajar: "Mahasiswa membuat program dengan percabangan",
    indikator_penilaian: "Implementasi percabangan yang benar",
    bobot_penilaian: 10,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
  {
    id_pertemuan: "prt-4",
    id_rps: "rps-1",
    pertemuan_ke: 4,
    sub_cpmk_ids: ["sub-2"],
    bahan_kajian: "Struktur Kontrol: Loop (For dan While)",
    bentuk_pembelajaran: "Ceramah, Praktikum",
    estimasi_waktu: 150,
    pengalaman_belajar: "Mahasiswa membuat program dengan perulangan",
    indikator_penilaian: "Implementasi loop yang efisien",
    bobot_penilaian: 10,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
  {
    id_pertemuan: "prt-5",
    id_rps: "rps-1",
    pertemuan_ke: 5,
    sub_cpmk_ids: ["sub-3"],
    bahan_kajian: "Fungsi dan Modularitas",
    bentuk_pembelajaran: "Ceramah, Praktikum",
    estimasi_waktu: 150,
    pengalaman_belajar: "Mahasiswa membuat program modular dengan fungsi",
    indikator_penilaian: "Kemampuan membuat fungsi yang reusable",
    bobot_penilaian: 10,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
];

// =====================
// 13. MAHASISWA DATA
// =====================
export const dummyMahasiswa: Mahasiswa[] = [
  {
    id_mahasiswa: "mhs-1",
    nim: "2024010001",
    nama_mahasiswa: "Andi Pratama",
    angkatan: 2024,
    prodi: "Teknik Informatika",
    email: "andi.pratama@student.univ.ac.id",
    created_at: new Date("2024-08-15"),
    updated_at: new Date("2024-08-15"),
  },
  {
    id_mahasiswa: "mhs-2",
    nim: "2024010002",
    nama_mahasiswa: "Budi Setiawan",
    angkatan: 2024,
    prodi: "Teknik Informatika",
    email: "budi.setiawan@student.univ.ac.id",
    created_at: new Date("2024-08-15"),
    updated_at: new Date("2024-08-15"),
  },
  {
    id_mahasiswa: "mhs-3",
    nim: "2024010003",
    nama_mahasiswa: "Citra Dewi",
    angkatan: 2024,
    prodi: "Teknik Informatika",
    email: "citra.dewi@student.univ.ac.id",
    created_at: new Date("2024-08-15"),
    updated_at: new Date("2024-08-15"),
  },
  {
    id_mahasiswa: "mhs-4",
    nim: "2024010004",
    nama_mahasiswa: "Dian Kusuma",
    angkatan: 2024,
    prodi: "Teknik Informatika",
    email: "dian.kusuma@student.univ.ac.id",
    created_at: new Date("2024-08-15"),
    updated_at: new Date("2024-08-15"),
  },
  {
    id_mahasiswa: "mhs-5",
    nim: "2024010005",
    nama_mahasiswa: "Eka Putri",
    angkatan: 2024,
    prodi: "Teknik Informatika",
    email: "eka.putri@student.univ.ac.id",
    created_at: new Date("2024-08-15"),
    updated_at: new Date("2024-08-15"),
  },
];

// =====================
// 14. NILAI MAHASISWA DATA
// =====================
export const dummyNilaiMahasiswa: NilaiMahasiswa[] = [
  // Nilai untuk Pemrograman Dasar (TIF101)
  { id_nilai: "nilai-1", nim: "2024010001", kode_mk: "TIF101", id_cpmk: "cpmk-1", nilai: 85, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-2", nim: "2024010001", kode_mk: "TIF101", id_cpmk: "cpmk-2", nilai: 88, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-3", nim: "2024010001", kode_mk: "TIF101", id_cpmk: "cpmk-3", nilai: 90, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  
  { id_nilai: "nilai-4", nim: "2024010002", kode_mk: "TIF101", id_cpmk: "cpmk-1", nilai: 78, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-5", nim: "2024010002", kode_mk: "TIF101", id_cpmk: "cpmk-2", nilai: 82, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-6", nim: "2024010002", kode_mk: "TIF101", id_cpmk: "cpmk-3", nilai: 80, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },

  { id_nilai: "nilai-7", nim: "2024010003", kode_mk: "TIF101", id_cpmk: "cpmk-1", nilai: 92, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-8", nim: "2024010003", kode_mk: "TIF101", id_cpmk: "cpmk-2", nilai: 95, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-9", nim: "2024010003", kode_mk: "TIF101", id_cpmk: "cpmk-3", nilai: 93, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },

  { id_nilai: "nilai-10", nim: "2024010004", kode_mk: "TIF101", id_cpmk: "cpmk-1", nilai: 65, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-11", nim: "2024010004", kode_mk: "TIF101", id_cpmk: "cpmk-2", nilai: 70, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-12", nim: "2024010004", kode_mk: "TIF101", id_cpmk: "cpmk-3", nilai: 68, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },

  { id_nilai: "nilai-13", nim: "2024010005", kode_mk: "TIF101", id_cpmk: "cpmk-1", nilai: 88, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-14", nim: "2024010005", kode_mk: "TIF101", id_cpmk: "cpmk-2", nilai: 86, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
  { id_nilai: "nilai-15", nim: "2024010005", kode_mk: "TIF101", id_cpmk: "cpmk-3", nilai: 87, semester: "2024/2025 Ganjil", created_at: new Date("2024-12-01"), updated_at: new Date("2024-12-01") },
];

// =====================
// 15. PENILAIAN DATA
// =====================
export const dummyPenilaian: Penilaian[] = [
  {
    id_penilaian: "pen-1",
    id_rps: "rps-1",
    id_pertemuan: "prt-1",
    nama_penilaian: "Quiz 1",
    bentuk_penilaian: "Quiz",
    bobot_nilai: 5,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
  {
    id_penilaian: "pen-2",
    id_rps: "rps-1",
    id_pertemuan: "prt-3",
    nama_penilaian: "Tugas Percabangan",
    bentuk_penilaian: "Tugas",
    bobot_nilai: 10,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
  {
    id_penilaian: "pen-3",
    id_rps: "rps-1",
    id_pertemuan: "prt-5",
    nama_penilaian: "UTS",
    bentuk_penilaian: "Ujian",
    bobot_nilai: 30,
    created_at: new Date("2024-08-01"),
    updated_at: new Date("2024-08-01"),
  },
];

// =====================
// 16. DASHBOARD STATS DATA
// =====================
export const dummyDashboardStats: DashboardStats = {
  totalKurikulum: 2,
  totalProfilLulusan: 4,
  totalCPL: 9,
  totalMataKuliah: 6,
  totalCPMK: 9,
  totalRPS: 4,
  rpsSelesai: 2,
  rpsDraft: 1,
  kkm: 75,
  kurikulumAktif: [dummyKurikulum[0]],
};

// =====================
// HELPER FUNCTIONS
// =====================

// Get MataKuliah by ID
export function getMataKuliahById(id: string): MataKuliah | undefined {
  return dummyMataKuliah.find((mk) => mk.id_mk === id);
}

// Get MataKuliah by Kode
export function getMataKuliahByKode(kode: string): MataKuliah | undefined {
  return dummyMataKuliah.find((mk) => mk.kode_mk === kode);
}

// Get CPMK by Mata Kuliah
export function getCPMKByMataKuliah(kode_mk: string): CPMK[] {
  return dummyCPMK.filter((cpmk) => cpmk.kode_mk === kode_mk);
}

// Get RPS by Mata Kuliah
export function getRPSByMataKuliah(kode_mk: string): RPS | undefined {
  return dummyRPS.find((rps) => rps.kode_mk === kode_mk);
}

// Get Pertemuan by RPS
export function getPertemuanByRPS(id_rps: string): Pertemuan[] {
  return dummyPertemuan.filter((p) => p.id_rps === id_rps);
}

// Get Nilai by Mahasiswa
export function getNilaiByMahasiswa(nim: string): NilaiMahasiswa[] {
  return dummyNilaiMahasiswa.filter((n) => n.nim === nim);
}

// Get Nilai by Mata Kuliah
export function getNilaiByMataKuliah(kode_mk: string): NilaiMahasiswa[] {
  return dummyNilaiMahasiswa.filter((n) => n.kode_mk === kode_mk);
}

// Calculate rata-rata nilai per CPMK
export function getRataRataNilaiCPMK(id_cpmk: string): number {
  const nilai = dummyNilaiMahasiswa.filter((n) => n.id_cpmk === id_cpmk);
  if (nilai.length === 0) return 0;
  const total = nilai.reduce((sum, n) => sum + n.nilai, 0);
  return Math.round((total / nilai.length) * 100) / 100;
}

// Calculate rata-rata nilai mahasiswa per MK
export function getRataRataNilaiMahasiswaPerMK(nim: string, kode_mk: string): number {
  const nilai = dummyNilaiMahasiswa.filter((n) => n.nim === nim && n.kode_mk === kode_mk);
  if (nilai.length === 0) return 0;
  const total = nilai.reduce((sum, n) => sum + n.nilai, 0);
  return Math.round((total / nilai.length) * 100) / 100;
}
