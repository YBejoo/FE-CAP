import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Badge,
} from "~/components/ui";
import type { DashboardStats, RecentRPSUpdate } from "~/types";

// Dummy data - nanti diganti dengan data dari API
const stats: DashboardStats = {
  totalKurikulum: 3,
  totalProfilLulusan: 5,
  totalCPL: 15,
  totalMataKuliah: 142,
  totalCPMK: 350,
  totalRPS: 120,
  rpsSelesai: 98,
  rpsDraft: 22,
  kurikulumAktif: {
    id_kurikulum: "1",
    nama_kurikulum: "Kurikulum OBE 2024",
    tahun_berlaku: 2024,
    is_active: true,
  },
};

// Data distribusi CPL per aspek
const cplDistribution = [
  { aspek: "Sikap", jumlah: 4, color: "bg-blue-500" },
  { aspek: "Pengetahuan", jumlah: 3, color: "bg-purple-500" },
  { aspek: "Keterampilan Umum", jumlah: 4, color: "bg-amber-500" },
  { aspek: "Keterampilan Khusus", jumlah: 4, color: "bg-green-500" },
];

// Data status RPS
const rpsStatus = [
  { status: "Terbit", jumlah: 82, color: "bg-green-500" },
  { status: "Menunggu Validasi", jumlah: 16, color: "bg-yellow-500" },
  { status: "Draft", jumlah: 22, color: "bg-gray-400" },
];

// RPS yang baru diupdate
const recentRPS: RecentRPSUpdate[] = [
  {
    id_rps: "1",
    nama_mk: "Pemrograman Web",
    dosen_pengampu: "Dr. Andi Wijaya",
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 jam lalu
  },
  {
    id_rps: "2",
    nama_mk: "Basis Data",
    dosen_pengampu: "Ir. Budi Santoso, M.Kom",
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 jam lalu
  },
  {
    id_rps: "3",
    nama_mk: "Struktur Data",
    dosen_pengampu: "Dr. Citra Dewi",
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 hari lalu
  },
  {
    id_rps: "4",
    nama_mk: "Jaringan Komputer",
    dosen_pengampu: "Dian Pratama, M.T.",
    updated_at: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 hari lalu
  },
];

// Alerts untuk MK yang belum lengkap
const alerts = [
  { id: 1, message: "5 Mata Kuliah belum memiliki CPMK", type: "warning" },
  { id: 2, message: "3 RPS menunggu validasi dari Kaprodi", type: "info" },
];

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Baru saja";
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return "1 hari lalu";
  return `${diffDays} hari lalu`;
}

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
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
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

// Simple Bar Chart Component
function SimpleBarChart({
  data,
  maxValue,
}: {
  data: { label: string; value: number; color: string }[];
  maxValue: number;
}) {
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium">{item.value} MK</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${item.color} rounded-full transition-all`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple Pie/Donut visualization
function SimpleDonut({
  data,
  total,
}: {
  data: { label: string; value: number; color: string }[];
  total: number;
}) {
  return (
    <div className="flex items-center gap-6">
      {/* Simple Circle */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const prevPercentages = data
              .slice(0, index)
              .reduce((sum, d) => sum + (d.value / total) * 100, 0);
            const strokeDasharray = `${percentage * 2.51} ${251 - percentage * 2.51}`;
            const strokeDashoffset = -prevPercentages * 2.51;

            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                className={item.color.replace("bg-", "stroke-")}
                strokeWidth="12"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-medium ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const progressPercentage = Math.round(
    (stats.rpsSelesai / stats.totalRPS) * 100
  );

  return (
    <div className="space-y-6">
        {/* Row 1: Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            value={stats.kurikulumAktif?.nama_kurikulum || "-"}
            subtitle={`Tahun ${stats.kurikulumAktif?.tahun_berlaku || "-"}`}
            icon={Icons.BookOpen}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
          />
          <StatCard
            title="Progres RPS"
            value={`${progressPercentage}%`}
            subtitle={`${stats.rpsSelesai} dari ${stats.totalRPS} selesai`}
            icon={Icons.FileText}
            iconColor="text-green-600"
            iconBgColor="bg-green-50"
          />
          <StatCard
            title="Total CPL"
            value={stats.totalCPL}
            subtitle="Capaian Pembelajaran Lulusan"
            icon={Icons.Target}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-50"
          />
        </div>

        {/* Row 2: Charts */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Bar Chart - CPL Distribution (60%) */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Distribusi CPL pada Mata Kuliah</CardTitle>
              <CardDescription>
                Jumlah mata kuliah yang berkontribusi pada setiap aspek CPL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleBarChart
                data={cplDistribution.map((item) => ({
                  label: item.aspek,
                  value: item.jumlah * 10, // Simulasi jumlah MK
                  color: item.color,
                }))}
                maxValue={50}
              />
            </CardContent>
          </Card>

          {/* Pie Chart - RPS Status (40%) */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Status Kelengkapan RPS</CardTitle>
              <CardDescription>Progres penyusunan dokumen RPS</CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleDonut
                data={rpsStatus.map((item) => ({
                  label: item.status,
                  value: item.jumlah,
                  color: item.color,
                }))}
                total={stats.totalRPS}
              />
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Recent Activity & Alerts */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent RPS Updates */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>RPS Terbaru Diupdate</CardTitle>
              <CardDescription>Aktivitas terkini penyusunan RPS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRPS.map((rps) => (
                  <div
                    key={rps.id_rps}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icons.FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{rps.nama_mk}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {rps.dosen_pengampu}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icons.Clock size={14} />
                      <span>{formatTimeAgo(rps.updated_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Quick Actions */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      alert.type === "warning"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-blue-50 text-blue-800"
                    }`}
                  >
                    <Icons.AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/rps/new"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Icons.FilePlus size={18} className="text-primary" />
                  <span className="text-sm font-medium">Buat RPS Baru</span>
                </a>
                <a
                  href="/matrix-cpl-mk"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Icons.Grid3X3 size={18} className="text-green-600" />
                  <span className="text-sm font-medium">Matrix CPL-MK</span>
                </a>
                <a
                  href="/laporan"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Icons.BarChart3 size={18} className="text-purple-600" />
                  <span className="text-sm font-medium">Lihat Laporan</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
