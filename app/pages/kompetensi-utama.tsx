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
import type { KompetensiUtamaLulusan, AspekKUL } from "~/types";
import { ASPEK_KUL_OPTIONS } from "~/lib/constants";
import { useKompetensiUtama } from "~/hooks/useKompetensiUtama";


// Aspek Badge Component dengan warna sesuai kategori
function AspekBadge({ aspek }: { aspek: AspekKUL }) {
  const colors: Record<AspekKUL, string> = {
    S: "bg-blue-100 text-blue-700",
    P: "bg-purple-100 text-purple-700",
    KU: "bg-amber-100 text-amber-700",
    KK: "bg-green-100 text-green-700",
  };
  
  const labels: Record<AspekKUL, string> = {
    S: "Sikap",
    P: "Pengetahuan",
    KU: "Keterampilan Umum",
    KK: "Keterampilan Khusus",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[aspek]}`} title={labels[aspek]}>
      {aspek}
    </span>
  );
}

export default function KompetensiUtamaPage() {
  const {
    kulList,
    loading,
    createKul,
    updateKul,
    deleteKul,
  } = useKompetensiUtama();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAspek, setFilterAspek] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKUL, setEditingKUL] = useState<KompetensiUtamaLulusan | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingKUL, setDeletingKUL] = useState<KompetensiUtamaLulusan | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    kode_kul: "",
    kompetensi_lulusan: "",
    aspek: "S" as AspekKUL,
  });

  // Filter KUL
  const filteredKUL = kulList.filter((k) => {
    const matchSearch =
      k.kompetensi_lulusan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.kode_kul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAspek = filterAspek === "all" || k.aspek === filterAspek;
    return matchSearch && matchAspek;
  });

  // Group by aspek for stats
  const aspekStats = ASPEK_KUL_OPTIONS.map((opt) => ({
    aspek: opt.label,
    value: opt.value,
    count: kulList.filter((k) => k.aspek === opt.value).length,
  }));

  // Handle form submit
  const handleSubmit = async () => {
    if (editingKUL) {
      await updateKul(editingKUL.id_kul, {
        kode_kul: formData.kode_kul,
        kompetensi_lulusan: formData.kompetensi_lulusan,
        aspek: formData.aspek,
      });
    } else {
      await createKul({
        kode_kul: formData.kode_kul,
        kompetensi_lulusan: formData.kompetensi_lulusan,
        aspek: formData.aspek,
        id_kurikulum: "1",
      });
    }
    handleCloseDialog();
  };

  // Handle delete
  const handleDelete = async () => {
    if (deletingKUL) {
      await deleteKul(deletingKUL.id_kul);
      setIsDeleteDialogOpen(false);
      setDeletingKUL(null);
    }
  };

  // Open dialog
  const openDialog = (kul?: KompetensiUtamaLulusan) => {
    if (kul) {
      setEditingKUL(kul);
      setFormData({
        kode_kul: kul.kode_kul,
        kompetensi_lulusan: kul.kompetensi_lulusan,
        aspek: kul.aspek,
      });
    } else {
      setEditingKUL(null);
      // Generate next code based on selected aspek
      setFormData({
        kode_kul: "",
        kompetensi_lulusan: "",
        aspek: "S",
      });
    }
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingKUL(null);
    setFormData({
      kode_kul: "",
      kompetensi_lulusan: "",
      aspek: "S",
    });
  };

  // Auto generate kode based on aspek
  const generateKode = (aspek: AspekKUL) => {
    const existingCodes = kulList.filter(k => k.aspek === aspek).map(k => k.kode_kul);
    let num = 1;
    let newCode = `${aspek}${num}`;
    while (existingCodes.includes(newCode)) {
      num++;
      newCode = `${aspek}${num}`;
    }
    return newCode;
  };

  if (loading) {
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
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total KUL</p>
                <p className="text-2xl font-bold">{kulList.length}</p>
              </div>
              <Icons.Award className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        {aspekStats.map((stat) => (
          <Card key={stat.value}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.value}</p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
                <AspekBadge aspek={stat.value as AspekKUL} />
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
                  placeholder="Cari kompetensi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterAspek} onValueChange={setFilterAspek}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter Aspek" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Aspek</SelectItem>
                  {ASPEK_KUL_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => openDialog()}>
              <Icons.Plus size={16} className="mr-2" />
              Tambah KUL
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-muted-foreground">Keterangan Aspek:</span>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm">
                <AspekBadge aspek="S" /> Sikap
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm">
                <AspekBadge aspek="P" /> Pengetahuan
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm">
                <AspekBadge aspek="KU" /> Keterampilan Umum
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm">
                <AspekBadge aspek="KK" /> Keterampilan Khusus
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kompetensi Utama Lulusan</CardTitle>
          <CardDescription>
            Total {filteredKUL.length} kompetensi utama lulusan ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Kode</TableHead>
                <TableHead className="w-28">Aspek</TableHead>
                <TableHead>Kompetensi Lulusan</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKUL.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Icons.Award size={40} className="opacity-50" />
                      <p>Tidak ada data kompetensi utama lulusan</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredKUL.map((kul) => (
                  <TableRow key={kul.id_kul}>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
                        {kul.kode_kul}
                      </span>
                    </TableCell>
                    <TableCell>
                      <AspekBadge aspek={kul.aspek} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {kul.kompetensi_lulusan}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openDialog(kul)}
                        >
                          <Icons.Edit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => {
                            setDeletingKUL(kul);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Icons.Trash size={14} />
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingKUL ? "Edit Kompetensi Utama Lulusan" : "Tambah KUL Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingKUL
                ? "Ubah informasi kompetensi utama lulusan yang sudah ada"
                : "Tambahkan kompetensi utama lulusan baru ke dalam kurikulum"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aspek">Aspek</Label>
                <Select
                  value={formData.aspek}
                  onValueChange={(value) => {
                    const aspek = value as AspekKUL;
                    setFormData((prev) => ({
                      ...prev,
                      aspek,
                      kode_kul: editingKUL ? prev.kode_kul : generateKode(aspek),
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih aspek" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASPEK_KUL_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kode_kul">Kode KUL</Label>
                <Input
                  id="kode_kul"
                  placeholder="S1, P1, KU1, KK1"
                  value={formData.kode_kul}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kode_kul: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kompetensi_lulusan">Kompetensi Lulusan</Label>
              <Textarea
                id="kompetensi_lulusan"
                placeholder="Deskripsi kompetensi lulusan..."
                rows={4}
                value={formData.kompetensi_lulusan}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    kompetensi_lulusan: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.kode_kul.trim() || !formData.kompetensi_lulusan.trim()}
            >
              {editingKUL ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Kompetensi Utama Lulusan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus KUL "{deletingKUL?.kode_kul}"? Tindakan ini tidak dapat dibatalkan.
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
