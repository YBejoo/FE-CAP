import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Button,
  Badge,
  Input,
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui";
import type { RPS } from "~/types";
import { STATUS_RPS_OPTIONS } from "~/lib/constants";
import { useRps } from "~/hooks/useRps";
import { useMataKuliah } from "~/hooks/useMataKuliah";


// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { variant: "default" | "secondary" | "outline"; className: string }> = {
    Terbit: { variant: "default", className: "bg-green-500 hover:bg-green-600" },
    "Menunggu Validasi": { variant: "secondary", className: "bg-yellow-500 text-white hover:bg-yellow-600" },
    Draft: { variant: "outline", className: "" },
  };

  const config = variants[status] || variants.Draft;

  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
}

export default function RPSListPage() {
  const { rpsList, loading } = useRps();
  const { mataKuliahList, loading: mkLoading } = useMataKuliah();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const rpsListWithMK = useMemo<RPS[]>(() => {
    return rpsList.map((rps) => {
      if (rps.mata_kuliah) return rps;
      const mk = mataKuliahList.find((item) => item.kode_mk === rps.kode_mk);
      return mk ? { ...rps, mata_kuliah: mk } : rps;
    });
  }, [rpsList, mataKuliahList]);

  // Filter RPS
  const filteredRPS = rpsListWithMK.filter((rps) => {
    const matchSearch =
      rps.mata_kuliah?.nama_mk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rps.kode_mk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rps.dosen_pengampu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || rps.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Stats
  const stats = {
    total: rpsListWithMK.length,
    terbit: rpsListWithMK.filter((r) => r.status === "Terbit").length,
    validasi: rpsListWithMK.filter((r) => r.status === "Menunggu Validasi").length,
    draft: rpsListWithMK.filter((r) => r.status === "Draft").length,
  };

  if (loading || mkLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icons.Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total RPS</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Icons.FileText className="h-8 w-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Terbit</p>
                  <p className="text-2xl font-bold text-green-600">{stats.terbit}</p>
                </div>
                <Icons.Check className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Menunggu Validasi</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.validasi}</p>
                </div>
                <Icons.Clock className="h-8 w-8 text-yellow-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Draft</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                </div>
                <Icons.Edit className="h-8 w-8 text-gray-400/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari RPS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-45">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    {STATUS_RPS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <a href="/rps/new">
                <Button>
                  <Icons.FilePlus size={16} className="mr-2" />
                  Buat RPS Baru
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar RPS</CardTitle>
            <CardDescription>
              Total {filteredRPS.length} RPS ditemukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">Kode MK</TableHead>
                  <TableHead>Mata Kuliah</TableHead>
                  <TableHead>Dosen Pengampu</TableHead>
                  <TableHead className="w-20 text-center">Versi</TableHead>
                  <TableHead className="w-35">Status</TableHead>
                  <TableHead className="w-30">Tanggal</TableHead>
                  <TableHead className="w-37.5 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRPS.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Icons.FileText size={40} className="opacity-50" />
                        <p>Tidak ada data RPS</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRPS.map((rps) => (
                    <TableRow key={rps.id_rps}>
                      <TableCell className="font-mono text-sm font-medium">
                        {rps.kode_mk}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{rps.mata_kuliah?.nama_mk}</p>
                          <p className="text-xs text-muted-foreground">
                            {rps.mata_kuliah?.sks} SKS • Semester {rps.mata_kuliah?.semester}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{rps.dosen_pengampu}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">v{rps.versi}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={rps.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {rps.tgl_penyusunan.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <a href={`/rps/${rps.id_rps}`}>
                            <Button variant="ghost" size="icon">
                              <Icons.Eye size={16} />
                            </Button>
                          </a>
                          <a href={`/rps/${rps.id_rps}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Icons.Edit size={16} />
                            </Button>
                          </a>
                          <Button variant="ghost" size="icon">
                            <Icons.Download size={16} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Icons.Printer size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
