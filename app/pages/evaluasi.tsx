import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Badge,
  Input,
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import {
  mataKuliahList,
  mahasiswaDibawahKKMData,
  cpmkRataRataPerMK,
  mahasiswaList,
  nilaiMahasiswaPerMK,
  COLORS,
  KKM,
} from "~/data/evaluasi-data";

export default function EvaluasiPage() {
  const [selectedMK, setSelectedMK] = useState(mataKuliahList[0].kode_mk);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(mahasiswaList[0].nim);
  const [searchMK, setSearchMK] = useState("");
  const [searchMhs, setSearchMhs] = useState("");

  const filteredMK = mataKuliahList.filter(
    (mk) =>
      mk.nama_mk.toLowerCase().includes(searchMK.toLowerCase()) ||
      mk.kode_mk.toLowerCase().includes(searchMK.toLowerCase())
  );

  const filteredMhs = mahasiswaList.filter(
    (mhs) =>
      mhs.nama_mahasiswa.toLowerCase().includes(searchMhs.toLowerCase()) ||
      mhs.nim.includes(searchMhs)
  );

  const selectedMKData = mataKuliahList.find((mk) => mk.kode_mk === selectedMK);
  const selectedMhsData = mahasiswaList.find((mhs) => mhs.nim === selectedMahasiswa);
  const kkData = mahasiswaDibawahKKMData[selectedMK] || { diatas: 0, dibawah: 0, total: 0 };
  const cpmkData = cpmkRataRataPerMK[selectedMK] || [];
  const nilaiMhsData = nilaiMahasiswaPerMK[selectedMahasiswa] || [];

  // Data untuk grafik distribusi mahasiswa selected MK
  const kkSelectedChartData = [
    { kategori: "Di Atas KKM", jumlah: kkData.diatas },
    { kategori: "Di Bawah KKM", jumlah: kkData.dibawah },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Evaluasi Pembelajaran</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Analisis nilai mahasiswa per mata kuliah dan per mahasiswa
        </p>
      </div>

      {/* Section 1: Evaluasi Per Mata Kuliah */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border-2">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <Icons.BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Evaluasi Per Mata Kuliah</CardTitle>
              <CardDescription>Analisis performa mahasiswa per mata kuliah</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dropdown MK */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
              Pilih Mata Kuliah
            </label>
            <Select value={selectedMK} onValueChange={setSelectedMK}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Mata Kuliah" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Cari mata kuliah..."
                    value={searchMK}
                    onChange={(e) => setSearchMK(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredMK.map((mk) => (
                    <SelectItem key={mk.kode_mk} value={mk.kode_mk}>
                      {mk.kode_mk} - {mk.nama_mk}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                    <Icons.BarChart3 className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">Di Atas KKM</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{kkData.diatas}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                    <Icons.TrendingDown className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">Di Bawah KKM</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">{kkData.dibawah}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <Icons.Users className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Mahasiswa</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{kkData.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                    <Icons.Target className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Persentase Lulus</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {kkData.total > 0 ? Math.round((kkData.diatas / kkData.total) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grafik Rata-rata CPMK per MK */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Icons.BarChart3 className="text-blue-600" size={18} />
                  Rata-rata Nilai per CPMK
                </CardTitle>
                <CardDescription className="text-xs">
                  {selectedMKData?.nama_mk}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={cpmkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="kode_cpmk" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <ReferenceLine y={KKM} stroke="#ef4444" strokeDasharray="3 3" label="KKM" />
                    <Bar dataKey="rata_rata" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grafik Distribusi Mahasiswa */}
            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Icons.PieChart className="text-purple-600" size={18} />
                  Distribusi Mahasiswa
                </CardTitle>
                <CardDescription className="text-xs">
                  Perbandingan Lulus vs Tidak Lulus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={kkSelectedChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="kategori" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="jumlah" radius={[8, 8, 0, 0]}>
                      {kkSelectedChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.kategori === "Di Atas KKM" ? "#10b981" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Evaluasi Per Mahasiswa */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border-2">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              <Icons.User className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Evaluasi Per Mahasiswa</CardTitle>
              <CardDescription>Analisis nilai mahasiswa di semua mata kuliah</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dropdown Mahasiswa */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
              Pilih Mahasiswa
            </label>
            <Select value={selectedMahasiswa} onValueChange={setSelectedMahasiswa}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Mahasiswa" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Cari mahasiswa..."
                    value={searchMhs}
                    onChange={(e) => setSearchMhs(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredMhs.map((mhs) => (
                    <SelectItem key={mhs.nim} value={mhs.nim}>
                      {mhs.nim} - {mhs.nama_mahasiswa}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Info Mahasiswa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <Icons.Hash className="text-blue-600 dark:text-blue-400" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">NIM</p>
                    <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{selectedMhsData?.nim}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                    <Icons.User className="text-purple-600 dark:text-purple-400" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Nama</p>
                    <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{selectedMhsData?.nama_mahasiswa}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                    <Icons.Calendar className="text-amber-600 dark:text-amber-400" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Angkatan</p>
                    <p className="text-lg font-bold text-amber-900 dark:text-amber-100">{selectedMhsData?.angkatan}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grafik Nilai per MK & Detail Nilai - Digabung dalam 1 Card */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardTitle className="flex items-center gap-2">
                <Icons.TrendingUp className="text-blue-600" size={20} />
                Analisis Nilai Mahasiswa
              </CardTitle>
              <CardDescription>
                Grafik dan detail nilai per mata kuliah
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Grafik */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <Icons.BarChart3 size={16} />
                    Grafik Nilai Per Mata Kuliah
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={nilaiMhsData} layout="vertical" margin={{ left: 80, right: 30, top: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="kode_mk" width={70} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-background border rounded-lg shadow-lg p-3 space-y-1">
                                <p className="font-bold text-sm">{data.kode_mk}</p>
                                <p className="text-xs text-muted-foreground">{data.nama_mk}</p>
                                <p className="text-sm mt-2">Nilai Akhir: <span className="font-semibold">{data.nilai_akhir}</span></p>
                                <Badge variant={data.nilai_akhir >= KKM ? "default" : "destructive"}>
                                  {data.nilai_akhir >= KKM ? "Lulus" : "Tidak Lulus"}
                                </Badge>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine x={KKM} stroke="#ef4444" strokeDasharray="3 3" label="KKM" />
                      <Bar dataKey="nilai_akhir" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                        {nilaiMhsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.nilai_akhir >= KKM ? "#10b981" : "#ef4444"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 dark:border-slate-700 my-6" />

                {/* Tabel Detail Nilai */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <Icons.Table className="text-blue-600" size={16} />
                    Detail Nilai
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Kode MK</th>
                          <th className="text-left p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Mata Kuliah</th>
                          <th className="text-center p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Nilai Akhir</th>
                          <th className="text-center p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nilaiMhsData.map((nilai, index) => (
                          <tr 
                            key={index} 
                            className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="p-3 text-sm font-medium text-slate-900 dark:text-white">{nilai.kode_mk}</td>
                            <td className="p-3 text-sm text-slate-700 dark:text-slate-300">{nilai.nama_mk}</td>
                            <td className="p-3 text-center">
                              <Badge 
                                variant={nilai.nilai_akhir >= KKM ? "default" : "destructive"}
                                className="font-semibold"
                              >
                                {nilai.nilai_akhir}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Badge variant={nilai.status === "Lulus" ? "default" : "destructive"}>
                                {nilai.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                        {nilaiMhsData.length === 0 && (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-500 dark:text-slate-400">
                              <div className="flex flex-col items-center gap-2">
                                <Icons.AlertCircle size={32} className="text-slate-400" />
                                <p>Belum ada data nilai</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
