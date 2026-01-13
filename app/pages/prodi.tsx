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

// Dummy data
const initialData: Prodi[] = [
  {
    id_prodi: "1",
    nama_prodi: "Manajemen Informatika",
    created_at: new Date("2024-01-01"),
  },
];

export default function ProdiPage() {
  const [data, setData] = useState<Prodi[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Prodi | null>(null);
  const [formData, setFormData] = useState({ nama_prodi: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(
        data.map((item) =>
          item.id_prodi === editingItem.id_prodi
            ? { ...item, nama_prodi: formData.nama_prodi }
            : item
        )
      );
    } else {
      setData([
        ...data,
        {
          id_prodi: Date.now().toString(),
          nama_prodi: formData.nama_prodi,
          created_at: new Date(),
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: Prodi) => {
    setEditingItem(item);
    setFormData({ nama_prodi: item.nama_prodi });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id_prodi !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ nama_prodi: "" });
  };

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
                <Label htmlFor="nama_prodi">Nama Program Studi</Label>
                <Input
                  id="nama_prodi"
                  value={formData.nama_prodi}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_prodi: e.target.value })
                  }
                  placeholder="Masukkan nama program studi"
                  required
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
