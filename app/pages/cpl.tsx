import { useState } from "react";
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
  Label,
  Textarea,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui";
import type { CPL, AspekCPL } from "~/types";
import { ASPEK_CPL_OPTIONS } from "~/lib/constants";

// Dummy CPL data
const initialCPLs: CPL[] = [
  { id_cpl: "1", kode_cpl: "S1", aspek: "Sikap", deskripsi_cpl: "Bertakwa kepada Tuhan YME dan mampu menunjukkan sikap religius", id_kurikulum: "1" },
  { id_cpl: "2", kode_cpl: "S2", aspek: "Sikap", deskripsi_cpl: "Menjunjung tinggi nilai kemanusiaan dalam menjalankan tugas berdasarkan agama, moral, dan etika", id_kurikulum: "1" },
  { id_cpl: "3", kode_cpl: "P1", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai konsep teoritis bidang teknologi informasi secara umum dan konsep teoritis bagian khusus dalam bidang pengetahuan tersebut secara mendalam", id_kurikulum: "1" },
  { id_cpl: "4", kode_cpl: "P2", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai prinsip-prinsip rekayasa perangkat lunak dan metodologi pengembangan sistem", id_kurikulum: "1" },
  { id_cpl: "5", kode_cpl: "KU1", aspek: "Keterampilan Umum", deskripsi_cpl: "Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan atau implementasi ilmu pengetahuan dan teknologi", id_kurikulum: "1" },
  { id_cpl: "6", kode_cpl: "KU2", aspek: "Keterampilan Umum", deskripsi_cpl: "Mampu menunjukkan kinerja mandiri, bermutu, dan terukur", id_kurikulum: "1" },
  { id_cpl: "7", kode_cpl: "KK1", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu merancang dan mengembangkan sistem informasi yang efisien untuk memenuhi kebutuhan organisasi", id_kurikulum: "1" },
  { id_cpl: "8", kode_cpl: "KK2", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu mengembangkan aplikasi berbasis web dan mobile dengan menggunakan framework modern", id_kurikulum: "1" },
  { id_cpl: "9", kode_cpl: "KK3", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu mengelola basis data dan melakukan analisis data untuk pengambilan keputusan", id_kurikulum: "1" },
];

// Category Badge Component
function CategoryBadge({ aspek }: { aspek: AspekCPL }) {
  const colors: Record<AspekCPL, string> = {
    Sikap: "bg-blue-100 text-blue-700",
    Pengetahuan: "bg-purple-100 text-purple-700",
    "Keterampilan Umum": "bg-amber-100 text-amber-700",
    "Keterampilan Khusus": "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[aspek]}`}>
      {aspek.toUpperCase()}
    </span>
  );
}

export default function CPLPage() {
  const [cplList, setCplList] = useState<CPL[]>(initialCPLs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAspek, setFilterAspek] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCPL, setEditingCPL] = useState<CPL | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingCPL, setDeletingCPL] = useState<CPL | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    kode_cpl: "",
    aspek: "Sikap" as AspekCPL,
    deskripsi_cpl: "",
  });

  // Filter CPL
  const filteredCPL = cplList.filter((c) => {
    const matchSearch =
      c.kode_cpl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.deskripsi_cpl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAspek = filterAspek === "all" || c.aspek === filterAspek;
    return matchSearch && matchAspek;
  });

  // Group by aspek for stats
  const aspekStats = ASPEK_CPL_OPTIONS.map((opt) => ({
    aspek: opt.label,
    count: cplList.filter((c) => c.aspek === opt.value).length,
  }));

  // Handle form submit
  const handleSubmit = () => {
    if (editingCPL) {
      setCplList((prev) =>
        prev.map((c) =>
          c.id_cpl === editingCPL.id_cpl ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCPL: CPL = {
        id_cpl: Date.now().toString(),
        ...formData,
        id_kurikulum: "1",
      };
      setCplList((prev) => [...prev, newCPL]);
    }
    handleCloseDialog();
  };

  // Handle delete
  const handleDelete = () => {
    if (deletingCPL) {
      setCplList((prev) => prev.filter((c) => c.id_cpl !== deletingCPL.id_cpl));
      setIsDeleteDialogOpen(false);
      setDeletingCPL(null);
    }
  };

  // Open dialog
  const openDialog = (cpl?: CPL) => {
    if (cpl) {
      setEditingCPL(cpl);
      setFormData({
        kode_cpl: cpl.kode_cpl,
        aspek: cpl.aspek,
        deskripsi_cpl: cpl.deskripsi_cpl,
      });
    } else {
      setEditingCPL(null);
      setFormData({
        kode_cpl: "",
        aspek: "Sikap",
        deskripsi_cpl: "",
      });
    }
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCPL(null);
    setFormData({
      kode_cpl: "",
      aspek: "Sikap",
      deskripsi_cpl: "",
    });
  };

  return (
    <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {aspekStats.map((stat) => (
            <Card key={stat.aspek}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.aspek}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                  <Icons.Target className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari CPL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterAspek} onValueChange={setFilterAspek}>
                  <SelectTrigger className="w-full sm:w-50">
                    <SelectValue placeholder="Filter Aspek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Aspek</SelectItem>
                    {ASPEK_CPL_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => openDialog()}>
                <Icons.Plus size={16} className="mr-2" />
                Tambah CPL
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Capaian Pembelajaran Lulusan (CPL)</CardTitle>
            <CardDescription>
              Total {filteredCPL.length} CPL ditemukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Kode</TableHead>
                  <TableHead className="w-45">Kategori</TableHead>
                  <TableHead>Deskripsi CPL</TableHead>
                  <TableHead className="w-25 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCPL.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Icons.Target size={40} className="opacity-50" />
                        <p>Tidak ada data CPL</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCPL.map((cpl) => (
                    <TableRow key={cpl.id_cpl}>
                      <TableCell className="font-mono font-bold text-primary">
                        {cpl.kode_cpl}
                      </TableCell>
                      <TableCell>
                        <CategoryBadge aspek={cpl.aspek} />
                      </TableCell>
                      <TableCell className="text-sm">
                        {cpl.deskripsi_cpl}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog(cpl)}
                          >
                            <Icons.Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setDeletingCPL(cpl);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Icons.Trash size={16} />
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCPL ? "Edit CPL" : "Tambah CPL Baru"}
            </DialogTitle>
            <DialogDescription>
              Tentukan kode, aspek, dan deskripsi capaian pembelajaran lulusan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kode_cpl">Kode CPL</Label>
                <Input
                  id="kode_cpl"
                  placeholder="Contoh: S1, P1, KK1"
                  value={formData.kode_cpl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kode_cpl: e.target.value.toUpperCase(),
                    }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  S = Sikap, P = Pengetahuan, KU = Keterampilan Umum, KK = Keterampilan Khusus
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aspek">Aspek</Label>
                <Select
                  value={formData.aspek}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, aspek: value as AspekCPL }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih aspek" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASPEK_CPL_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi_cpl">Deskripsi CPL</Label>
              <Textarea
                id="deskripsi_cpl"
                placeholder="Deskripsi lengkap tentang capaian pembelajaran lulusan..."
                value={formData.deskripsi_cpl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    deskripsi_cpl: e.target.value,
                  }))
                }
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                !formData.kode_cpl.trim() || !formData.deskripsi_cpl.trim()
              }
            >
              {editingCPL ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus CPL</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus CPL "{deletingCPL?.kode_cpl}"?
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
