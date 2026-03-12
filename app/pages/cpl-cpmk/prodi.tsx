import { useState } from "react";
import { Header } from "~/components/header";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icons,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui";
import type { Prodi } from "~/types";
import { useProdi } from "~/hooks/useProdi";

export default function ProdiPage() {
  const {
    data,
    loading,
    createProdi,
    updateProdi,
    deleteProdi,
  } = useProdi();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Prodi | null>(null);
  const [formData, setFormData] = useState({
    kode_prodi: "",
    nama_prodi: "",
    fakultas: "",
    jenjang: "",
    akreditasi: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      await updateProdi(editingItem.id_prodi, {
        kode_prodi: formData.kode_prodi,
        nama_prodi: formData.nama_prodi,
        fakultas: formData.fakultas,
        jenjang: formData.jenjang,
        akreditasi: formData.akreditasi || undefined,
      });
    } else {
      await createProdi({
        kode_prodi: formData.kode_prodi,
        nama_prodi: formData.nama_prodi,
        fakultas: formData.fakultas,
        jenjang: formData.jenjang,
        akreditasi: formData.akreditasi || undefined,
      });
    }
    handleCloseDialog();
  };

  const handleEdit = (item: Prodi) => {
    setEditingItem(item);
    setFormData({
      kode_prodi: item.kode_prodi || "",
      nama_prodi: item.nama_prodi,
      fakultas: item.fakultas || "",
      jenjang: item.jenjang || "",
      akreditasi: item.akreditasi || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      await deleteProdi(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      kode_prodi: "",
      nama_prodi: "",
      fakultas: "",
      jenjang: "",
      akreditasi: "",
    });
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
    <div>
      <Header
        title="Program Studi"
        description="Kelola data program studi"
      />

      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Program Studi</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Icons.Plus size={18} className="mr-2" />
              Tambah Prodi
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>ID Prodi</TableHead>
                  <TableHead>Nama Program Studi</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id_prodi}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-mono">{item.id_prodi}</TableCell>
                    <TableCell className="font-medium">{item.nama_prodi}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item)}
                        >
                          <Icons.Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id_prodi)}
                        >
                          <Icons.Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      Belum ada data program studi
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Program Studi" : "Tambah Program Studi"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="kode_prodi">Kode Prodi</Label>
                <Input
                  id="kode_prodi"
                  value={formData.kode_prodi}
                  onChange={(e) =>
                    setFormData({ ...formData, kode_prodi: e.target.value })
                  }
                  placeholder="TI"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama_prodi">Nama Program Studi</Label>
                <Input
                  id="nama_prodi"
                  value={formData.nama_prodi}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_prodi: e.target.value })
                  }
                  placeholder="Teknik Informatika"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fakultas">Fakultas</Label>
                <Input
                  id="fakultas"
                  value={formData.fakultas}
                  onChange={(e) =>
                    setFormData({ ...formData, fakultas: e.target.value })
                  }
                  placeholder="Fakultas Teknik"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenjang">Jenjang</Label>
                <Input
                  id="jenjang"
                  value={formData.jenjang}
                  onChange={(e) =>
                    setFormData({ ...formData, jenjang: e.target.value })
                  }
                  placeholder="S1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="akreditasi">Akreditasi</Label>
                <Input
                  id="akreditasi"
                  value={formData.akreditasi}
                  onChange={(e) =>
                    setFormData({ ...formData, akreditasi: e.target.value })
                  }
                  placeholder="A"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Batal
              </Button>
              <Button type="submit">
                {editingItem ? "Simpan Perubahan" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
