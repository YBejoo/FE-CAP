export const APP_NAME = "CPL-CPMK";
export const APP_DESCRIPTION = "Aplikasi Pengolahan Data Capaian Pembelajaran Lulusan dan Capaian Pembelajaran Matakuliah";
export const PRODI_NAME = "Prodi Manajemen Informatika Unsri";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
  },
  {
    title: "Master Data",
    icon: "Database",
    children: [
      { title: "Program Studi", href: "/prodi", icon: "Building2" },
      { title: "Kurikulum", href: "/kurikulum", icon: "BookOpen" },
      { title: "CPL", href: "/cpl", icon: "Target" },
      { title: "Mata Kuliah", href: "/mata-kuliah", icon: "Book" },
      { title: "CPMK", href: "/cpmk", icon: "FileCheck" },
    ],
  },
  {
    title: "RPS",
    icon: "FileText",
    children: [
      { title: "Daftar RPS", href: "/rps", icon: "List" },
      { title: "Pertemuan", href: "/pertemuan", icon: "Calendar" },
      { title: "Penilaian", href: "/penilaian", icon: "ClipboardCheck" },
    ],
  },
  {
    title: "Laporan",
    href: "/laporan",
    icon: "BarChart3",
  },
] as const;

export const TAHUN_OPTIONS = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - 5 + i;
  return { value: year.toString(), label: year.toString() };
});

export const METODE_MENGAJAR_OPTIONS = [
  { value: "ceramah", label: "Ceramah" },
  { value: "diskusi", label: "Diskusi" },
  { value: "praktikum", label: "Praktikum" },
  { value: "presentasi", label: "Presentasi" },
  { value: "project", label: "Project Based Learning" },
  { value: "studi_kasus", label: "Studi Kasus" },
  { value: "demonstrasi", label: "Demonstrasi" },
];

export const BENTUK_PENILAIAN_OPTIONS = [
  { value: "uts", label: "UTS" },
  { value: "uas", label: "UAS" },
  { value: "tugas", label: "Tugas" },
  { value: "kuis", label: "Kuis" },
  { value: "praktikum", label: "Praktikum" },
  { value: "project", label: "Project" },
  { value: "presentasi", label: "Presentasi" },
];
