import { useState } from "react";
import { Header } from "~/components/header";
import {
  Badge,
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
import type { MataKuliah } from "~/types";

// Dummy data
const initialData: MataKuliah[] = [
  { kode_mk: "MI101", nama: "Algoritma dan Pemrograman", sks: 3 },
  { kode_mk: "MI102", nama: "Basis Data", sks: 3 },
  { kode_mk: "MI103", nama: "Pemrograman Web", sks: 3 },
  { kode_mk: "MI104", nama: "Jaringan Komputer", sks: 3 },
  { kode_mk: "MI105", nama: "Sistem Operasi", sks: 2 },
  { kode_mk: "MI201", nama: "Pemrograman Berorientasi Objek", sks: 3 },
  { kode_mk: "MI202", nama: "Analisis dan Perancangan Sistem", sks: 3 },
  { kode_mk: "MI203", nama: "Pemrograman Mobile", sks: 3 },
  { kode_mk: "MI204", nama: "Data Mining", sks: 3 },
  { kode_mk: "MI301", nama: "Kecerdasan Buatan", sks: 3 },
  { kode_mk: "MI302", nama: "Keamanan Sistem Informasi", sks: 2 },
  { kode_mk: "MI303", nama: "Proyek Akhir", sks: 6 },
];

export default function MataKuliahPage() {
  const [data, setData] = useState<MataKuliah[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MataKuliah | null>(null);
  const [formData, setFormData] = useState({
    kode_mk: "",
    nama: "",
    sks: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.kode_mk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSKS = data.reduce((sum, item) => sum + item.sks, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(
        data.map((item) =>
          item.kode_mk === editingItem.kode_mk
            ? {
                kode_mk: formData.kode_mk,
                nama: formData.nama,
                sks: parseInt(formData.sks),
              }
            : item
        )
      );
    } else {
      setData([
        ...data,
        {
          kode_mk: formData.kode_mk,
          nama: formData.nama,
          sks: parseInt(formData.sks),
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: MataKuliah) => {
    setEditingItem(item);
    setFormData({
      kode_mk: item.kode_mk,
      nama: item.nama,
      sks: item.sks.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (kode: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.kode_mk !== kode));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ kode_mk: "", nama: "", sks: "" });
  };

  return (
    <div>
      <Header
        title="Mata Kuliah"
        description="Kelola data mata kuliah"
      />

      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>Daftar Mata Kuliah</CardTitle>
              <Badge variant="secondary">
                Total: {data.length} MK | {totalSKS} SKS
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari mata kuliah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Icons.Plus size={18} className="mr-2" />
                Tambah MK
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead className="w-32">Kode MK</TableHead>
                  <TableHead>Nama Mata Kuliah</TableHead>
                  <TableHead className="w-24 text-center">SKS</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.kode_mk}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {item.kode_mk}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell className="text-center">
                      <Badge>{item.sks}</Badge>
                    </TableCell>
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
                          onClick={() => handleDelete(item.kode_mk)}
                        >
                          <Icons.Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {searchQuery ? "Tidak ada mata kuliah yang ditemukan" : "Belum ada data mata kuliah"}
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
              {editingItem ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="kode_mk">Kode Mata Kuliah</Label>
                <Input
                  id="kode_mk"
                  value={formData.kode_mk}
                  onChange={(e) =>
                    setFormData({ ...formData, kode_mk: e.target.value })
                  }
                  placeholder="Contoh: MI101"
                  disabled={!!editingItem}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Mata Kuliah</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  placeholder="Masukkan nama mata kuliah"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sks">Jumlah SKS</Label>
                <Input
                  id="sks"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.sks}
                  onChange={(e) =>
                    setFormData({ ...formData, sks: e.target.value })
                  }
                  placeholder="Masukkan jumlah SKS"
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
