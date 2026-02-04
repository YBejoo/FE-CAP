import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Badge,
  Input,
  Label,
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "~/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type {
  DashboardStats,
  ProfilLulusanChartData,
  CPLChartData,
  BahanKajianChartData,
  MahasiswaBawahKKMData,
  CPMKRataRataData,
  Mahasiswa,
  MataKuliah,
  MahasiswaNilaiChartItem,
  NilaiMahasiswaPerMK,
} from "~/types";

// =====================
// =====================
// DUMMY DATA
// =====================

// Data Profil Lulusan
const profilLulusanData: ProfilLulusanChartData[] = [
  { kode: "PL1", nama: "Software Engineer", jumlah_cpl: 8, persentase: 85 },
  { kode: "PL2", nama: "Data Analyst", jumlah_cpl: 6, persentase: 78 },
  { kode: "PL3", nama: "System Administrator", jumlah_cpl: 5, persentase: 72 },
  { kode: "PL4", nama: "IT Consultant", jumlah_cpl: 7, persentase: 80 },
  { kode: "PL5", nama: "Project Manager", jumlah_cpl: 4, persentase: 68 },
];

// Data CPL (Bahan Kajian)
const cplData: CPLChartData[] = [
  { kode: "BK1", nama: "Pemrograman Dasar", rata_rata: 82, jumlah_mk: 12 },
  { kode: "BK2", nama: "Basis Data", rata_rata: 78, jumlah_mk: 8 },
  { kode: "BK3", nama: "Jaringan Komputer", rata_rata: 75, jumlah_mk: 6 },
  { kode: "BK4", nama: "Sistem Informasi", rata_rata: 80, jumlah_mk: 10 },
  { kode: "BK5", nama: "Kecerdasan Buatan", rata_rata: 72, jumlah_mk: 5 },
  { kode: "BK6", nama: "Keamanan Siber", rata_rata: 76, jumlah_mk: 4 },
  { kode: "BK7", nama: "Mobile Development", rata_rata: 79, jumlah_mk: 7 },
];

// Data Bahan Kajian (Mata Kuliah)
const bahanKajianData: BahanKajianChartData[] = [
  { kode: "MK1", nama: "Algoritma & Pemrograman", rata_rata: 78, jumlah_mahasiswa: 120 },
  { kode: "MK2", nama: "Struktur Data", rata_rata: 72, jumlah_mahasiswa: 115 },
  { kode: "MK3", nama: "Basis Data", rata_rata: 80, jumlah_mahasiswa: 110 },
  { kode: "MK4", nama: "Pemrograman Web", rata_rata: 85, jumlah_mahasiswa: 108 },
  { kode: "MK5", nama: "Jaringan Komputer", rata_rata: 68, jumlah_mahasiswa: 105 },
  { kode: "MK6", nama: "Sistem Operasi", rata_rata: 74, jumlah_mahasiswa: 102 },
  { kode: "MK7", nama: "Rekayasa Perangkat Lunak", rata_rata: 82, jumlah_mahasiswa: 98 },
  { kode: "MK8", nama: "Machine Learning", rata_rata: 70, jumlah_mahasiswa: 45 },
];

// Data Mata Kuliah untuk dropdown
const mataKuliahList: MataKuliah[] = [
  { kode_mk: "MK001", nama_mk: "Algoritma & Pemrograman", sks: 3, semester: 1, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "MK002", nama_mk: "Struktur Data", sks: 3, semester: 2, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "MK003", nama_mk: "Basis Data", sks: 3, semester: 3, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "MK004", nama_mk: "Pemrograman Web", sks: 3, semester: 4, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "MK005", nama_mk: "Jaringan Komputer", sks: 3, semester: 5, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "MK006", nama_mk: "Sistem Operasi", sks: 3, semester: 3, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "MK007", nama_mk: "Rekayasa Perangkat Lunak", sks: 3, semester: 5, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "MK008", nama_mk: "Machine Learning", sks: 3, semester: 6, sifat: "Pilihan", id_kurikulum: "1" },
];

// Data Mahasiswa dibawah KKM per semester
const mahasiswaBawahKKMPerMK: Record<string, MahasiswaBawahKKMData[]> = {
  MK001: [
    { kode_mk: "Sem 1", nama_mk: "2021/2022 Ganjil", jumlah_dibawah_kkm: 15, total_mahasiswa: 120, persentase: 12.5 },
    { kode_mk: "Sem 2", nama_mk: "2021/2022 Genap", jumlah_dibawah_kkm: 12, total_mahasiswa: 118, persentase: 10.2 },
    { kode_mk: "Sem 3", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 18, total_mahasiswa: 125, persentase: 14.4 },
    { kode_mk: "Sem 4", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 10, total_mahasiswa: 122, persentase: 8.2 },
    { kode_mk: "Sem 5", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 8, total_mahasiswa: 130, persentase: 6.2 },
    { kode_mk: "Sem 6", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 14, total_mahasiswa: 128, persentase: 10.9 },
  ],
  MK002: [
    { kode_mk: "Sem 1", nama_mk: "2021/2022 Ganjil", jumlah_dibawah_kkm: 20, total_mahasiswa: 115, persentase: 17.4 },
    { kode_mk: "Sem 2", nama_mk: "2021/2022 Genap", jumlah_dibawah_kkm: 18, total_mahasiswa: 112, persentase: 16.1 },
    { kode_mk: "Sem 3", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 22, total_mahasiswa: 120, persentase: 18.3 },
    { kode_mk: "Sem 4", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 15, total_mahasiswa: 118, persentase: 12.7 },
    { kode_mk: "Sem 5", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 12, total_mahasiswa: 125, persentase: 9.6 },
    { kode_mk: "Sem 6", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 16, total_mahasiswa: 122, persentase: 13.1 },
  ],
  MK003: [
    { kode_mk: "Sem 1", nama_mk: "2021/2022 Ganjil", jumlah_dibawah_kkm: 10, total_mahasiswa: 110, persentase: 9.1 },
    { kode_mk: "Sem 2", nama_mk: "2021/2022 Genap", jumlah_dibawah_kkm: 8, total_mahasiswa: 108, persentase: 7.4 },
    { kode_mk: "Sem 3", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 12, total_mahasiswa: 115, persentase: 10.4 },
    { kode_mk: "Sem 4", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 6, total_mahasiswa: 112, persentase: 5.4 },
    { kode_mk: "Sem 5", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 9, total_mahasiswa: 120, persentase: 7.5 },
    { kode_mk: "Sem 6", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 11, total_mahasiswa: 118, persentase: 9.3 },
  ],
  MK004: [
    { kode_mk: "Sem 1", nama_mk: "2021/2022 Ganjil", jumlah_dibawah_kkm: 5, total_mahasiswa: 108, persentase: 4.6 },
    { kode_mk: "Sem 2", nama_mk: "2021/2022 Genap", jumlah_dibawah_kkm: 7, total_mahasiswa: 105, persentase: 6.7 },
    { kode_mk: "Sem 3", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 8, total_mahasiswa: 112, persentase: 7.1 },
    { kode_mk: "Sem 4", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 4, total_mahasiswa: 110, persentase: 3.6 },
    { kode_mk: "Sem 5", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 6, total_mahasiswa: 115, persentase: 5.2 },
    { kode_mk: "Sem 6", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 9, total_mahasiswa: 118, persentase: 7.6 },
  ],
  MK005: [
    { kode_mk: "Sem 1", nama_mk: "2021/2022 Ganjil", jumlah_dibawah_kkm: 25, total_mahasiswa: 105, persentase: 23.8 },
    { kode_mk: "Sem 2", nama_mk: "2021/2022 Genap", jumlah_dibawah_kkm: 22, total_mahasiswa: 102, persentase: 21.6 },
    { kode_mk: "Sem 3", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 28, total_mahasiswa: 110, persentase: 25.5 },
    { kode_mk: "Sem 4", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 18, total_mahasiswa: 108, persentase: 16.7 },
    { kode_mk: "Sem 5", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 15, total_mahasiswa: 112, persentase: 13.4 },
    { kode_mk: "Sem 6", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 20, total_mahasiswa: 115, persentase: 17.4 },
  ],
  MK006: [
    { kode_mk: "Sem 1", nama_mk: "2021/2022 Ganjil", jumlah_dibawah_kkm: 18, total_mahasiswa: 102, persentase: 17.6 },
    { kode_mk: "Sem 2", nama_mk: "2021/2022 Genap", jumlah_dibawah_kkm: 15, total_mahasiswa: 100, persentase: 15.0 },
    { kode_mk: "Sem 3", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 20, total_mahasiswa: 108, persentase: 18.5 },
    { kode_mk: "Sem 4", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 12, total_mahasiswa: 105, persentase: 11.4 },
    { kode_mk: "Sem 5", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 10, total_mahasiswa: 110, persentase: 9.1 },
    { kode_mk: "Sem 6", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 14, total_mahasiswa: 112, persentase: 12.5 },
  ],
  MK007: [
    { kode_mk: "Sem 1", nama_mk: "2021/2022 Ganjil", jumlah_dibawah_kkm: 8, total_mahasiswa: 98, persentase: 8.2 },
    { kode_mk: "Sem 2", nama_mk: "2021/2022 Genap", jumlah_dibawah_kkm: 6, total_mahasiswa: 95, persentase: 6.3 },
    { kode_mk: "Sem 3", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 10, total_mahasiswa: 102, persentase: 9.8 },
    { kode_mk: "Sem 4", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 5, total_mahasiswa: 100, persentase: 5.0 },
    { kode_mk: "Sem 5", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 7, total_mahasiswa: 105, persentase: 6.7 },
    { kode_mk: "Sem 6", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 9, total_mahasiswa: 108, persentase: 8.3 },
  ],
  MK008: [
    { kode_mk: "Sem 1", nama_mk: "2022/2023 Ganjil", jumlah_dibawah_kkm: 12, total_mahasiswa: 45, persentase: 26.7 },
    { kode_mk: "Sem 2", nama_mk: "2022/2023 Genap", jumlah_dibawah_kkm: 10, total_mahasiswa: 42, persentase: 23.8 },
    { kode_mk: "Sem 3", nama_mk: "2023/2024 Ganjil", jumlah_dibawah_kkm: 8, total_mahasiswa: 48, persentase: 16.7 },
    { kode_mk: "Sem 4", nama_mk: "2023/2024 Genap", jumlah_dibawah_kkm: 6, total_mahasiswa: 50, persentase: 12.0 },
  ],
};

// Data CPMK rata-rata per MK
const cpmkRataRataPerMK: Record<string, CPMKRataRataData[]> = {
  MK001: [
    { kode_cpmk: "CPMK1", rata_rata: 82, jumlah_mahasiswa: 120 },
    { kode_cpmk: "CPMK2", rata_rata: 75, jumlah_mahasiswa: 120 },
    { kode_cpmk: "CPMK3", rata_rata: 78, jumlah_mahasiswa: 120 },
    { kode_cpmk: "CPMK4", rata_rata: 85, jumlah_mahasiswa: 120 },
  ],
  MK002: [
    { kode_cpmk: "CPMK1", rata_rata: 70, jumlah_mahasiswa: 115 },
    { kode_cpmk: "CPMK2", rata_rata: 72, jumlah_mahasiswa: 115 },
    { kode_cpmk: "CPMK3", rata_rata: 68, jumlah_mahasiswa: 115 },
  ],
  MK003: [
    { kode_cpmk: "CPMK1", rata_rata: 80, jumlah_mahasiswa: 110 },
    { kode_cpmk: "CPMK2", rata_rata: 78, jumlah_mahasiswa: 110 },
    { kode_cpmk: "CPMK3", rata_rata: 82, jumlah_mahasiswa: 110 },
    { kode_cpmk: "CPMK4", rata_rata: 76, jumlah_mahasiswa: 110 },
    { kode_cpmk: "CPMK5", rata_rata: 79, jumlah_mahasiswa: 110 },
  ],
  MK004: [
    { kode_cpmk: "CPMK1", rata_rata: 88, jumlah_mahasiswa: 108 },
    { kode_cpmk: "CPMK2", rata_rata: 85, jumlah_mahasiswa: 108 },
    { kode_cpmk: "CPMK3", rata_rata: 82, jumlah_mahasiswa: 108 },
  ],
  MK005: [
    { kode_cpmk: "CPMK1", rata_rata: 65, jumlah_mahasiswa: 105 },
    { kode_cpmk: "CPMK2", rata_rata: 68, jumlah_mahasiswa: 105 },
    { kode_cpmk: "CPMK3", rata_rata: 70, jumlah_mahasiswa: 105 },
    { kode_cpmk: "CPMK4", rata_rata: 66, jumlah_mahasiswa: 105 },
  ],
  MK006: [
    { kode_cpmk: "CPMK1", rata_rata: 72, jumlah_mahasiswa: 102 },
    { kode_cpmk: "CPMK2", rata_rata: 74, jumlah_mahasiswa: 102 },
    { kode_cpmk: "CPMK3", rata_rata: 76, jumlah_mahasiswa: 102 },
  ],
  MK007: [
    { kode_cpmk: "CPMK1", rata_rata: 84, jumlah_mahasiswa: 98 },
    { kode_cpmk: "CPMK2", rata_rata: 80, jumlah_mahasiswa: 98 },
    { kode_cpmk: "CPMK3", rata_rata: 82, jumlah_mahasiswa: 98 },
    { kode_cpmk: "CPMK4", rata_rata: 78, jumlah_mahasiswa: 98 },
  ],
  MK008: [
    { kode_cpmk: "CPMK1", rata_rata: 68, jumlah_mahasiswa: 45 },
    { kode_cpmk: "CPMK2", rata_rata: 72, jumlah_mahasiswa: 45 },
    { kode_cpmk: "CPMK3", rata_rata: 70, jumlah_mahasiswa: 45 },
  ],
};

// Data Mahasiswa
const mahasiswaList: Mahasiswa[] = [
  { nim: "2021001", nama_mahasiswa: "Ahmad Fauzi", angkatan: 2021, prodi: "Teknik Informatika", email: "ahmad@mail.com" },
  { nim: "2021002", nama_mahasiswa: "Budi Santoso", angkatan: 2021, prodi: "Teknik Informatika", email: "budi@mail.com" },
  { nim: "2021003", nama_mahasiswa: "Citra Dewi", angkatan: 2021, prodi: "Teknik Informatika", email: "citra@mail.com" },
  { nim: "2021004", nama_mahasiswa: "Dian Pratama", angkatan: 2021, prodi: "Teknik Informatika", email: "dian@mail.com" },
  { nim: "2022001", nama_mahasiswa: "Eka Putra", angkatan: 2022, prodi: "Teknik Informatika", email: "eka@mail.com" },
  { nim: "2022002", nama_mahasiswa: "Fitri Handayani", angkatan: 2022, prodi: "Teknik Informatika", email: "fitri@mail.com" },
  { nim: "2022003", nama_mahasiswa: "Gilang Ramadhan", angkatan: 2022, prodi: "Teknik Informatika", email: "gilang@mail.com" },
  { nim: "2023001", nama_mahasiswa: "Hana Permata", angkatan: 2023, prodi: "Teknik Informatika", email: "hana@mail.com" },
  { nim: "2023002", nama_mahasiswa: "Irfan Maulana", angkatan: 2023, prodi: "Teknik Informatika", email: "irfan@mail.com" },
];

// Data Nilai Mahasiswa per MK
const nilaiMahasiswaPerMK: Record<string, Record<string, NilaiMahasiswaPerMK>> = {
  "2021001": {
    MK001: {
      nim: "2021001",
      nama_mahasiswa: "Ahmad Fauzi",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 85 },
        { kode_cpmk: "CPMK2", nilai: 78 },
        { kode_cpmk: "CPMK3", nilai: 82 },
        { kode_cpmk: "CPMK4", nilai: 88 },
      ],
      nilai_akhir: 83.25,
      status: "Lulus",
    },
    MK002: {
      nim: "2021001",
      nama_mahasiswa: "Ahmad Fauzi",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 72 },
        { kode_cpmk: "CPMK2", nilai: 68 },
        { kode_cpmk: "CPMK3", nilai: 75 },
      ],
      nilai_akhir: 71.67,
      status: "Lulus",
    },
    MK003: {
      nim: "2021001",
      nama_mahasiswa: "Ahmad Fauzi",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 90 },
        { kode_cpmk: "CPMK2", nilai: 85 },
        { kode_cpmk: "CPMK3", nilai: 88 },
      ],
      nilai_akhir: 87.67,
      status: "Lulus",
    },
    MK004: {
      nim: "2021001",
      nama_mahasiswa: "Ahmad Fauzi",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 92 },
        { kode_cpmk: "CPMK2", nilai: 88 },
        { kode_cpmk: "CPMK3", nilai: 85 },
      ],
      nilai_akhir: 88.33,
      status: "Lulus",
    },
  },
  "2021002": {
    MK001: {
      nim: "2021002",
      nama_mahasiswa: "Budi Santoso",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 65 },
        { kode_cpmk: "CPMK2", nilai: 70 },
        { kode_cpmk: "CPMK3", nilai: 68 },
        { kode_cpmk: "CPMK4", nilai: 72 },
      ],
      nilai_akhir: 68.75,
      status: "Tidak Lulus",
    },
    MK002: {
      nim: "2021002",
      nama_mahasiswa: "Budi Santoso",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 60 },
        { kode_cpmk: "CPMK2", nilai: 65 },
        { kode_cpmk: "CPMK3", nilai: 62 },
      ],
      nilai_akhir: 62.33,
      status: "Tidak Lulus",
    },
  },
  "2021003": {
    MK001: {
      nim: "2021003",
      nama_mahasiswa: "Citra Dewi",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 78 },
        { kode_cpmk: "CPMK2", nilai: 82 },
        { kode_cpmk: "CPMK3", nilai: 80 },
        { kode_cpmk: "CPMK4", nilai: 85 },
      ],
      nilai_akhir: 81.25,
      status: "Lulus",
    },
    MK003: {
      nim: "2021003",
      nama_mahasiswa: "Citra Dewi",
      angkatan: 2021,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 75 },
        { kode_cpmk: "CPMK2", nilai: 78 },
        { kode_cpmk: "CPMK3", nilai: 72 },
      ],
      nilai_akhir: 75.0,
      status: "Lulus",
    },
  },
  "2022001": {
    MK001: {
      nim: "2022001",
      nama_mahasiswa: "Eka Putra",
      angkatan: 2022,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 88 },
        { kode_cpmk: "CPMK2", nilai: 85 },
        { kode_cpmk: "CPMK3", nilai: 90 },
        { kode_cpmk: "CPMK4", nilai: 92 },
      ],
      nilai_akhir: 88.75,
      status: "Lulus",
    },
  },
  "2022002": {
    MK001: {
      nim: "2022002",
      nama_mahasiswa: "Fitri Handayani",
      angkatan: 2022,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 72 },
        { kode_cpmk: "CPMK2", nilai: 75 },
        { kode_cpmk: "CPMK3", nilai: 70 },
        { kode_cpmk: "CPMK4", nilai: 78 },
      ],
      nilai_akhir: 73.75,
      status: "Lulus",
    },
    MK002: {
      nim: "2022002",
      nama_mahasiswa: "Fitri Handayani",
      angkatan: 2022,
      nilai_per_cpmk: [
        { kode_cpmk: "CPMK1", nilai: 68 },
        { kode_cpmk: "CPMK2", nilai: 65 },
        { kode_cpmk: "CPMK3", nilai: 70 },
      ],
      nilai_akhir: 67.67,
      status: "Tidak Lulus",
    },
  },
};

// Stats
const stats: DashboardStats = {
  totalKurikulum: 3,
  totalProfilLulusan: 5,
  totalCPL: 15,
  totalMataKuliah: 142,
  totalCPMK: 350,
  totalRPS: 120,
  rpsSelesai: 98,
  rpsDraft: 22,
  kurikulumAktif: [
    { id_kurikulum: "1", nama_kurikulum: "Kurikulum OBE 2024", tahun_berlaku: 2024, is_active: true },
    { id_kurikulum: "2", nama_kurikulum: "Kurikulum KKNI 2020", tahun_berlaku: 2020, is_active: true },
  ],
  kkm: 70,
};

// Warna untuk chart
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f97316"];

// =====================
// COMPONENTS
// =====================

// Stat Card Component
function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  iconColor?: string;
  iconBgColor?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${iconBgColor}`}>
            <Icon className={iconColor} size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Searchable Select Component
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  labelKey,
  valueKey,
}: {
  options: any[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  labelKey: string;
  valueKey: string;
}) {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt[labelKey].toLowerCase().includes(search.toLowerCase()) ||
    opt[valueKey].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground text-center">
              Tidak ditemukan
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <SelectItem key={opt[valueKey]} value={opt[valueKey]}>
                {opt[valueKey]} - {opt[labelKey]}
              </SelectItem>
            ))
          )}
        </div>
      </SelectContent>
    </Select>
  );
}

export default function DashboardPage() {
  // State untuk KKM
  const [kkm, setKkm] = useState(75);
  const [inputKkm, setInputKkm] = useState(75);
  const [showKkmDialog, setShowKkmDialog] = useState(false);

  // State untuk dropdown Kurikulum
  const [selectedKurikulum, setSelectedKurikulum] = useState("1");

  // Handler untuk menampilkan dialog konfirmasi
  const handleShowKkmDialog = () => {
    if (inputKkm !== kkm && inputKkm >= 0 && inputKkm <= 100) {
      setShowKkmDialog(true);
    }
  };

  // Konfirmasi perubahan KKM
  const confirmKkmChange = () => {
    setKkm(inputKkm);
    setShowKkmDialog(false);
  };

  // Batalkan perubahan KKM
  const cancelKkmChange = () => {
    setInputKkm(kkm);
    setShowKkmDialog(false);
  };

  // Stats dummy
  const stats: DashboardStats = {
    totalMataKuliah: mataKuliahList.length,
    totalCPL: 12,
    totalCPMK: 48,
    totalMahasiswa: mahasiswaList.length,
    kurikulumAktif: [
      { id_kurikulum: "1", nama_kurikulum: "Kurikulum 2024", tahun_ajaran: "2024/2025" }
    ],
    kkm: 75,
  };

  // Compute grafik berdasarkan KKM
  const profilLulusanWithKKM = useMemo(() => {
    return profilLulusanData.map((pl) => ({
      ...pl,
      status: pl.persentase >= kkm ? "Lulus" : "Tidak Lulus",
    }));
  }, [kkm]);

  const cplWithKKM = useMemo(() => {
    return cplData.map((cpl) => ({
      ...cpl,
      status: cpl.rata_rata >= kkm ? "Lulus" : "Tidak Lulus",
    }));
  }, [kkm]);

  const bkWithKKM = useMemo(() => {
    return bahanKajianData.map((bk) => ({
      ...bk,
      status: bk.rata_rata >= kkm ? "Lulus" : "Tidak Lulus",
    }));
  }, [kkm]);

  return (
    <div className="space-y-6">
      {/* Header with Kurikulum Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Analisis Capaian Pembelajaran dan Evaluasi Kurikulum
          </p>
        </div>
        <div className="w-full sm:w-80">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Pilih Kurikulum
          </label>
          <Select value={selectedKurikulum} onValueChange={setSelectedKurikulum}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kurikulum" />
            </SelectTrigger>
            <SelectContent>
              {stats.kurikulumAktif && stats.kurikulumAktif.length > 0 ? (
                stats.kurikulumAktif.map((kur) => (
                  <SelectItem key={kur.id_kurikulum} value={kur.id_kurikulum}>
                    {kur.nama_kurikulum} ({kur.tahun_ajaran})
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="1">Kurikulum 2024</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 1: KKM Setting & Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* KKM Input Card */}
        <Card className="lg:col-span-1 border-2 border-primary/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-2">
              <Label htmlFor="kkm" className="text-sm font-medium flex items-center gap-2">
                <Icons.Settings size={16} className="text-primary" />
                Batas KKM
              </Label>
              <div className="flex gap-2">
                <Input
                  id="kkm"
                  type="number"
                  min={0}
                  max={100}
                  value={inputKkm}
                  onChange={(e) => setInputKkm(Number(e.target.value))}
                  className="text-lg font-bold text-center flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleShowKkmDialog}
                  disabled={inputKkm === kkm || inputKkm < 0 || inputKkm > 100}
                  className="px-3"
                  title="Terapkan perubahan KKM"
                >
                  <Icons.Check size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                KKM Aktif: <span className="font-bold text-foreground">{kkm}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <StatCard
          title="Total Mata Kuliah"
          value={stats.totalMataKuliah}
          subtitle="Semester Genap 2024/2025"
          icon={Icons.Book}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Kurikulum Aktif"
          value={stats.kurikulumAktif?.length || 0}
          subtitle={stats.kurikulumAktif?.map((k) => k.nama_kurikulum).join(", ") || "-"}
          icon={Icons.BookOpen}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
        />
        <StatCard
          title="Total CPL"
          value={stats.totalCPL}
          subtitle="Capaian Pembelajaran Lulusan"
          icon={Icons.Target}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Total CPMK"
          value={stats.totalCPMK}
          subtitle="Capaian Pembelajaran MK"
          icon={Icons.CheckCircle}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
        />
      </div>

      {/* Row 2: Grafik Profil Lulusan (Bar Chart - Horizontal) */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border-2">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <Icons.Users size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            Grafik Profil Lulusan
          </CardTitle>
          <CardDescription>
            Persentase pencapaian setiap Profil Lulusan | KKM: {kkm}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={profilLulusanWithKKM} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="kode" width={70} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ProfilLulusanChartData;
                    return (
                      <div className="bg-background border rounded-lg shadow-lg p-3 space-y-1">
                        <p className="font-bold">{data.nama}</p>
                        <p className="text-sm">Persentase: <span className="font-semibold">{data.persentase}%</span></p>
                        <p className="text-sm">Jumlah CPL: {data.jumlah_cpl}</p>
                        <Badge variant={data.persentase >= kkm ? "default" : "destructive"}>
                          {data.persentase >= kkm ? "Di Atas KKM" : "Di Bawah KKM"}
                        </Badge>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                content={() => (
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#3b82f6" }} />
                      <span className="text-sm">Di Atas KKM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }} />
                      <span className="text-sm">Di Bawah KKM</span>
                    </div>
                  </div>
                )}
              />
              <ReferenceLine x={kkm} stroke="#ef4444" strokeDasharray="5 5" label={{ value: `KKM: ${kkm}`, fill: '#ef4444', fontSize: 12 }} />
              <Bar
                dataKey="persentase"
                name="Persentase Pencapaian (%)"
                radius={[0, 4, 4, 0]}
              >
                {profilLulusanWithKKM.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.persentase >= kkm ? "#3b82f6" : "#ef4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Row 3: Grafik CPL */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border-2">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <Icons.Target size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              Grafik Capaian Pembelajaran Lulusan
            </CardTitle>
            <CardDescription>
              Rata-rata nilai per Bahan Kajian | KKM: {kkm}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart 
                data={cplWithKKM} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="kode" width={70} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as CPLChartData;
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3 space-y-1">
                          <p className="font-bold">{data.nama}</p>
                          <p className="text-sm">Rata-rata: <span className="font-semibold">{data.rata_rata}</span></p>
                          <p className="text-sm">Jumlah MK: {data.jumlah_mk}</p>
                          <Badge variant={data.rata_rata >= kkm ? "default" : "destructive"}>
                            {data.rata_rata >= kkm ? "Di Atas KKM" : "Di Bawah KKM"}
                          </Badge>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  content={() => (
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: "#10b981" }} />
                        <span className="text-sm">Di Atas KKM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }} />
                        <span className="text-sm">Di Bawah KKM</span>
                      </div>
                    </div>
                  )}
                />
                <ReferenceLine x={kkm} stroke="#ef4444" strokeDasharray="5 5" />
                <Bar dataKey="rata_rata" name="Rata-rata Nilai" radius={[0, 4, 4, 0]}>
                  {cplWithKKM.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.rata_rata >= kkm ? "#10b981" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      {/* Row 4: Grafik Bahan Kajian */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border-2">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-b">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <Icons.Book size={20} className="text-green-600 dark:text-green-400" />
              </div>
              Grafik Bahan Kajian (Mata Kuliah)
            </CardTitle>
            <CardDescription>
              Rata-rata nilai per Mata Kuliah | KKM: {kkm}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart 
                data={bkWithKKM} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 160, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="kode" width={70} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as BahanKajianChartData;
                      return (
                        <div className="bg-background border rounded-lg shadow-lg p-3 space-y-1">
                          <p className="font-bold">{data.nama}</p>
                          <p className="text-sm">Rata-rata: <span className="font-semibold">{data.rata_rata}</span></p>
                          <p className="text-sm">Jumlah Mahasiswa: {data.jumlah_mahasiswa}</p>
                          <Badge variant={data.rata_rata >= kkm ? "default" : "destructive"}>
                            {data.rata_rata >= kkm ? "Di Atas KKM" : "Di Bawah KKM"}
                          </Badge>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  content={() => (
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: "#10b981" }} />
                        <span className="text-sm">Di Atas KKM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }} />
                        <span className="text-sm">Di Bawah KKM</span>
                      </div>
                    </div>
                  )}
                />
                <ReferenceLine x={kkm} stroke="#ef4444" strokeDasharray="5 5" />
                <Bar dataKey="rata_rata" name="Rata-rata Nilai" radius={[0, 4, 4, 0]}>
                  {bkWithKKM.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.rata_rata >= kkm ? "#10b981" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      {/* Dialog Konfirmasi Perubahan KKM */}
      <Dialog open={showKkmDialog} onOpenChange={setShowKkmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icons.AlertCircle className="text-amber-500" size={24} />
              Konfirmasi Perubahan KKM
            </DialogTitle>
            <DialogDescription>
              Anda akan mengubah nilai KKM dari <span className="font-bold text-foreground">{kkm}</span> menjadi <span className="font-bold text-foreground">{inputKkm}</span>.
              <br />
              Perubahan ini akan mempengaruhi semua grafik di dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={cancelKkmChange}
            >
              Tidak
            </Button>
            <Button
              onClick={confirmKkmChange}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Ya, Ubah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}