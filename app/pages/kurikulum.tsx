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
import type { Kurikulum } from "~/types";
import { TAHUN_OPTIONS } from "~/lib/constants";
import { useKurikulum } from "~/hooks/useKurikulum";
import { useProdi } from "~/hooks/useProdi";


// Status Badge Component
function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge variant={isActive ? "default" : "secondary"}>
      {isActive ? "Aktif" : "Arsip"}
    </Badge>
  );
}

export default function KurikulumPage() {
  const {
    kurikulums,
    loading,
    createKurikulum,
    updateKurikulum,
    activateKurikulum,
    deleteKurikulum,
  } = useKurikulum();
  const { data: prodiList, loading: prodiLoading } = useProdi();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingKurikulum, setEditingKurikulum] = useState<Kurikulum | null>(null);
  const [deletingKurikulum, setDeletingKurikulum] = useState<Kurikulum | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nama_kurikulum: "",
    tahun_berlaku: new Date().getFullYear().toString(),
    id_prodi: "",
  });

  // Filter kurikulum
  const filteredKurikulums = kurikulums.filter((k) => {
    const matchSearch = k.nama_kurikulum
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && k.is_active) ||
      (filterStatus === "archive" && !k.is_active);
    return matchSearch && matchStatus;
  });

  // Handle form submit
  const handleSubmit = async () => {
    console.log("handleSubmit called", formData);
    
    if (!formData.nama_kurikulum.trim()) {
      alert("Nama kurikulum harus diisi.");
      return;
    }
    
    const prodiId = formData.id_prodi || prodiList[0]?.id_prodi;
    if (!prodiId) {
      alert("Pilih Program Studi terlebih dahulu. Tambahkan data Prodi jika belum ada.");
      return;
    }
    
    try {
      if (editingKurikulum) {
        await updateKurikulum(editingKurikulum.id_kurikulum, {
          nama_kurikulum: formData.nama_kurikulum,
          tahun_berlaku: parseInt(formData.tahun_berlaku),
          id_prodi: prodiId,
        });
      } else {
        await createKurikulum({
          nama_kurikulum: formData.nama_kurikulum,
          tahun_berlaku: parseInt(formData.tahun_berlaku),
          is_active: false,
          id_prodi: prodiId,
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // Handle toggle active (bisa lebih dari 1 kurikulum aktif)
  const handleToggleActive = async (id: string) => {
    console.log("handleToggleActive called with id:", id);
    const target = kurikulums.find((k) => k.id_kurikulum === id);
    if (!target) return;
    if (!target.is_active) {
      await activateKurikulum(id);
    } else {
      await updateKurikulum(id, { is_active: false });
    }
  };

  // Handle copy/duplicate
  const handleCopy = async (kurikulum: Kurikulum) => {
    console.log("handleCopy called with:", kurikulum);
    await createKurikulum({
      nama_kurikulum: `${kurikulum.nama_kurikulum} (Copy)`,
      tahun_berlaku: new Date().getFullYear(),
      is_active: false,
      id_prodi: kurikulum.id_prodi,
    });
  };

  // Handle delete
  const handleDelete = async () => {
    console.log("handleDelete called");
    if (deletingKurikulum) {
      await deleteKurikulum(deletingKurikulum.id_kurikulum);
      setIsDeleteDialogOpen(false);
      setDeletingKurikulum(null);
    }
  };

  // Open dialog for add/edit
  const openDialog = (kurikulum?: Kurikulum) => {
    console.log("openDialog called with:", kurikulum);
    if (kurikulum) {
      setEditingKurikulum(kurikulum);
      setFormData({
        nama_kurikulum: kurikulum.nama_kurikulum,
        tahun_berlaku: kurikulum.tahun_berlaku.toString(),
        id_prodi: kurikulum.id_prodi || "",
      });
    } else {
      setEditingKurikulum(null);
      setFormData({
        nama_kurikulum: "",
        tahun_berlaku: new Date().getFullYear().toString(),
        id_prodi: prodiList[0]?.id_prodi || "",
      });
    }
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingKurikulum(null);
    setFormData({
      nama_kurikulum: "",
      tahun_berlaku: new Date().getFullYear().toString(),
      id_prodi: prodiList[0]?.id_prodi || "",
    });
  };

  if (loading || prodiLoading) {
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
    <div className="space-y-4">
        {/* Action Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari kurikulum..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Filter Status */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-45">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="archive">Arsip</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Add Button */}
              <Button 
                type="button" 
                onClick={() => {
                  console.log("Tambah Kurikulum clicked, prodiList:", prodiList);
                  if (prodiList.length === 0) {
                    alert("Silakan tambahkan data Program Studi terlebih dahulu di menu Prodi.");
                    return;
                  }
                  openDialog();
                }}
              >
                <Icons.Plus size={16} className="mr-2" />
                Tambah Kurikulum
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Kurikulum</CardTitle>
            <CardDescription>
              Total {filteredKurikulums.length} kurikulum ditemukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kurikulum</TableHead>
                  <TableHead className="w-25">Tahun</TableHead>
                  <TableHead className="w-25">Status</TableHead>
                  <TableHead className="w-50 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKurikulums.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Icons.Database size={40} className="opacity-50" />
                        <p>Tidak ada data kurikulum</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredKurikulums.map((kurikulum) => (
                    <TableRow key={kurikulum.id_kurikulum}>
                      <TableCell className="font-medium">
                        {kurikulum.nama_kurikulum}
                      </TableCell>
                      <TableCell>{kurikulum.tahun_berlaku}</TableCell>
                      <TableCell>
                        <StatusBadge isActive={kurikulum.is_active} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2" style={{ position: 'relative', zIndex: 1 }}>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Edit button clicked");
                              openDialog(kurikulum);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Icons.Edit size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Copy button clicked");
                              handleCopy(kurikulum);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Icons.Copy size={14} className="mr-1" />
                            Salin
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className={kurikulum.is_active ? "text-green-600 hover:text-green-700" : "text-orange-600 hover:text-orange-700"}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Toggle active button clicked");
                              handleToggleActive(kurikulum.id_kurikulum);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Icons.Power size={14} className="mr-1" />
                            {kurikulum.is_active ? "Nonaktifkan" : "Aktifkan"}
                          </Button>
                          {!kurikulum.is_active && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("Delete button clicked");
                                setDeletingKurikulum(kurikulum);
                                setIsDeleteDialogOpen(true);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Icons.Trash size={14} />
                            </Button>
                          )}
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
              {editingKurikulum ? "Edit Kurikulum" : "Tambah Kurikulum Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingKurikulum
                ? "Ubah informasi kurikulum yang sudah ada"
                : "Tambahkan kurikulum baru ke dalam sistem"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nama_kurikulum">Nama Kurikulum</Label>
              <Input
                id="nama_kurikulum"
                placeholder="Contoh: Kurikulum OBE 2024"
                value={formData.nama_kurikulum}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nama_kurikulum: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tahun_berlaku">Tahun Berlaku</Label>
              <Select
                value={formData.tahun_berlaku}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, tahun_berlaku: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                  {TAHUN_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Program Studi</Label>
              <Select
                value={formData.id_prodi}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, id_prodi: value }))
                }
                disabled={prodiList.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Prodi" />
                </SelectTrigger>
                <SelectContent>
                  {prodiList.map((prodi) => (
                    <SelectItem key={prodi.id_prodi} value={prodi.id_prodi}>
                      {prodi.nama_prodi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {prodiList.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Tambahkan data prodi terlebih dahulu.
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.nama_kurikulum.trim() || !formData.id_prodi}
            >
              {editingKurikulum ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Kurikulum</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kurikulum "
              {deletingKurikulum?.nama_kurikulum}"? Tindakan ini tidak dapat
              dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
