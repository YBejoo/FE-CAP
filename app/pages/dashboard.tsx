import { Header } from "~/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
} from "~/components/ui";
import type { DashboardStats } from "~/types";

// Dummy data - nanti diganti dengan data dari API
const stats: DashboardStats = {
  totalProdi: 1,
  totalKurikulum: 3,
  totalCPL: 12,
  totalMataKuliah: 45,
  totalCPMK: 120,
  totalRPS: 38,
};

const recentActivities = [
  { id: 1, action: "RPS Pemrograman Web ditambahkan", time: "2 jam lalu" },
  { id: 2, action: "CPL-7 diperbarui", time: "5 jam lalu" },
  { id: 3, action: "Mata Kuliah Basis Data ditambahkan", time: "1 hari lalu" },
  { id: 4, action: "Kurikulum 2024 dibuat", time: "2 hari lalu" },
];

export default function DashboardPage() {
  return (
    <div>
      <Header
        title="Dashboard"
        description="Selamat datang di Sistem CPL-CPMK"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Program Studi</CardTitle>
              <Icons.Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProdi}</div>
              <p className="text-xs text-muted-foreground">Manajemen Informatika</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kurikulum</CardTitle>
              <Icons.BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalKurikulum}</div>
              <p className="text-xs text-muted-foreground">Aktif tahun 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPL</CardTitle>
              <Icons.Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCPL}</div>
              <p className="text-xs text-muted-foreground">Capaian Pembelajaran</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mata Kuliah</CardTitle>
              <Icons.Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMataKuliah}</div>
              <p className="text-xs text-muted-foreground">Total MK</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPMK</CardTitle>
              <Icons.FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCPMK}</div>
              <p className="text-xs text-muted-foreground">Capaian MK</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RPS</CardTitle>
              <Icons.FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRPS}</div>
              <p className="text-xs text-muted-foreground">Rencana Pembelajaran</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Menu pintasan untuk akses cepat</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <a
                href="/rps"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
              >
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icons.FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Buat RPS Baru</p>
                  <p className="text-sm text-muted-foreground">
                    Tambahkan rencana pembelajaran semester
                  </p>
                </div>
                <Icons.ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </a>

              <a
                href="/cpl"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
              >
                <div className="rounded-lg bg-green-500/10 p-2">
                  <Icons.Target className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Kelola CPL</p>
                  <p className="text-sm text-muted-foreground">
                    Atur capaian pembelajaran lulusan
                  </p>
                </div>
                <Icons.ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </a>

              <a
                href="/laporan"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
              >
                <div className="rounded-lg bg-blue-500/10 p-2">
                  <Icons.BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Lihat Laporan</p>
                  <p className="text-sm text-muted-foreground">
                    Analisis dan grafik capaian
                  </p>
                </div>
                <Icons.ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </a>

              <a
                href="/mata-kuliah"
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors"
              >
                <div className="rounded-lg bg-orange-500/10 p-2">
                  <Icons.Book className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium">Daftar Mata Kuliah</p>
                  <p className="text-sm text-muted-foreground">
                    Kelola data mata kuliah
                  </p>
                </div>
                <Icons.ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </a>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Perubahan data terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 border-b pb-3 last:border-0"
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      <Icons.FileCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <Icons.Target size={20} />
                CPL (Capaian Pembelajaran Lulusan)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-600">
                Rumusan kemampuan yang harus dicapai oleh lulusan program studi, 
                meliputi sikap, pengetahuan, dan keterampilan.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <Icons.FileCheck size={20} />
                CPMK (Capaian Pembelajaran MK)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">
                Rumusan kemampuan yang harus dicapai mahasiswa setelah menempuh 
                suatu mata kuliah tertentu.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="text-orange-700 flex items-center gap-2">
                <Icons.FileText size={20} />
                RPS (Rencana Pembelajaran Semester)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-600">
                Dokumen perencanaan pembelajaran yang disusun untuk setiap mata 
                kuliah dalam satu semester.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
