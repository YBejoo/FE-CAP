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
import { useDashboard } from "~/hooks/useDashboard";

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
  // State untuk Kurikulum selection
  const [selectedKurikulum, setSelectedKurikulum] = useState<string | undefined>(undefined);
  
  // Fetch data from backend
  const {
    stats,
    activities,
    loading,
    error,
    refresh,
  } = useDashboard(selectedKurikulum);
  
  // Log data received in component
  console.log('\ud83d\uddc4\ufe0f [Dashboard Page] Component data:', {
    stats,
    loading,
    error,
    activities_count: activities?.length || 0,
    stats_exists: !!stats,
    stats_structure: stats ? {
      kurikulum: stats.kurikulum,
      summary: stats.summary,
      statistics_keys: stats.statistics ? Object.keys(stats.statistics) : [],
      matrix: stats.matrix
    } : null
  });
  
  // Default/fallback data untuk backward compatibility
  const profilLulusanData: ProfilLulusanChartData[] = [];
  const cplData: CPLChartData[] = [];
  const bahanKajianData: BahanKajianChartData[] = [];
  const mataKuliahList: MataKuliah[] = [];
  const mahasiswaList: Mahasiswa[] = [];
  const nilaiMahasiswaPerMK: Record<string, Record<string, NilaiMahasiswaPerMK>> = {};
  const mahasiswaBawahKKMPerMK: Record<string, MahasiswaBawahKKMData[]> = {};
  const cpmkRataRataPerMK: Record<string, CPMKRataRataData[]> = {};

  // State untuk KKM
  const [kkm, setKkm] = useState(75);
  const [inputKkm, setInputKkm] = useState(75);
  const [showKkmDialog, setShowKkmDialog] = useState(false);

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

  // Compute grafik berdasarkan KKM
  // Chart data temporarily disabled - will be re-enabled after further refactoring
  const profilLulusanWithKKM = [];
  const cplWithKKM = [];
  const bkWithKKM = [];

  // Debug: Log loading and error states
  console.log('\ud83d\uddc4\ufe0f [Dashboard Page] Render state:', {
    loading,
    error,
    hasStats: !!stats,
    statsPreview: stats ? {
      kurikulum_total: stats.kurikulum?.total,
      total_mk: stats.summary?.total_mata_kuliah,
      total_cpl: stats.summary?.total_cpl,
      total_cpmk: stats.summary?.total_cpmk
    } : 'NO STATS'
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icons.Spinner className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-sm text-muted-foreground">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icons.X className="w-8 h-8 mx-auto mb-2 text-destructive" />
          <p className="text-sm text-muted-foreground mb-4">Gagal memuat data: {error}</p>
          <Button onClick={refresh}>Coba Lagi</Button>
        </div>
      </div>
    );
  }

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
          <Select value={selectedKurikulum || ''} onValueChange={setSelectedKurikulum}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kurikulum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Kurikulum</SelectItem>
              {/* TODO: Fetch from kurikulum service when implemented */}
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
          value={stats?.summary?.total_mata_kuliah || 0}
          subtitle="Semester Genap 2024/2025"
          icon={Icons.Book}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Kurikulum Aktif"
          value={stats?.kurikulum?.total || 0}
          subtitle="Kurikulum dalam sistem"
          icon={Icons.BookOpen}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
        />
        <StatCard
          title="Total CPL"
          value={stats?.summary?.total_cpl || 0}
          subtitle="Capaian Pembelajaran Lulusan"
          icon={Icons.Target}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
        />
        <StatCard
          title="Total CPMK"
          value={stats?.summary?.total_cpmk || 0}
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
          {profilLulusanWithKKM.length > 0 ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center h-[350px] text-center space-y-3">
              <Icons.AlertCircle className="w-12 h-12 text-muted-foreground/50" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data visualisasi belum tersedia</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Fitur ini akan diaktifkan setelah refactor selesai</p>
              </div>
            </div>
          )}
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
            {cplWithKKM.length > 0 ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-3">
                <Icons.AlertCircle className="w-12 h-12 text-muted-foreground/50" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data visualisasi belum tersedia</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Fitur ini akan diaktifkan setelah refactor selesai</p>
                </div>
              </div>
            )}
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
            {bkWithKKM.length > 0 ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-3">
                <Icons.AlertCircle className="w-12 h-12 text-muted-foreground/50" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data visualisasi belum tersedia</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">Fitur ini akan diaktifkan setelah refactor selesai</p>
                </div>
              </div>
            )}
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