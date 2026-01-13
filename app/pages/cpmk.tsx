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
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "~/components/ui";
import type { CPMK } from "~/types";

// Dummy data
const mataKuliahOptions = [
  { value: "MI101", label: "MI101 - Algoritma dan Pemrograman" },
  { value: "MI102", label: "MI102 - Basis Data" },
  { value: "MI103", label: "MI103 - Pemrograman Web" },
  { value: "MI104", label: "MI104 - Jaringan Komputer" },
  { value: "MI201", label: "MI201 - Pemrograman Berorientasi Objek" },
  { value: "MI202", label: "MI202 - Analisis dan Perancangan Sistem" },
  { value: "MI203", label: "MI203 - Pemrograman Mobile" },
];

const kurikulumOptions = [
  { value: "K2020", label: "Kurikulum 2020" },
  { value: "K2022", label: "Kurikulum 2022" },
  { value: "K2024", label: "Kurikulum 2024" },
];

const initialData: CPMK[] = [
  { id_cpmk: "CPMK-1", id_mk: "MI101", nama_cpmk: "Mahasiswa mampu memahami konsep dasar algoritma dan struktur data", id_kurikulum: "K2024" },
  { id_cpmk: "CPMK-2", id_mk: "MI101", nama_cpmk: "Mahasiswa mampu mengimplementasikan algoritma sorting dan searching", id_kurikulum: "K2024" },
  { id_cpmk: "CPMK-3", id_mk: "MI102", nama_cpmk: "Mahasiswa mampu merancang skema basis data relasional", id_kurikulum: "K2024" },
  { id_cpmk: "CPMK-4", id_mk: "MI102", nama_cpmk: "Mahasiswa mampu menggunakan SQL untuk manipulasi data", id_kurikulum: "K2024" },
  { id_cpmk: "CPMK-5", id_mk: "MI103", nama_cpmk: "Mahasiswa mampu membuat halaman web responsif menggunakan HTML, CSS, dan JavaScript", id_kurikulum: "K2024" },
  { id_cpmk: "CPMK-6", id_mk: "MI103", nama_cpmk: "Mahasiswa mampu mengembangkan aplikasi web dengan framework modern", id_kurikulum: "K2024" },
  { id_cpmk: "CPMK-7", id_mk: "MI201", nama_cpmk: "Mahasiswa mampu menerapkan konsep OOP (encapsulation, inheritance, polymorphism)", id_kurikulum: "K2024" },
  { id_cpmk: "CPMK-8", id_mk: "MI203", nama_cpmk: "Mahasiswa mampu mengembangkan aplikasi mobile cross-platform", id_kurikulum: "K2024" },
];

export default function CPMKPage() {
  const [data, setData] = useState<CPMK[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CPMK | null>(null);
  const [formData, setFormData] = useState({
    id_mk: "",
    nama_cpmk: "",
    id_kurikulum: "K2024",
  });
  const [filterMK, setFilterMK] = useState("");

  const filteredData = filterMK
    ? data.filter((item) => item.id_mk === filterMK)
    : data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(
        data.map((item) =>
          item.id_cpmk === editingItem.id_cpmk
            ? {
                ...item,
                id_mk: formData.id_mk,
                nama_cpmk: formData.nama_cpmk,
                id_kurikulum: formData.id_kurikulum,
              }
            : item
        )
      );
    } else {
      const newId = `CPMK-${data.length + 1}`;
      setData([
        ...data,
        {
          id_cpmk: newId,
          id_mk: formData.id_mk,
          nama_cpmk: formData.nama_cpmk,
          id_kurikulum: formData.id_kurikulum,
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: CPMK) => {
    setEditingItem(item);
    setFormData({
      id_mk: item.id_mk,
      nama_cpmk: item.nama_cpmk,
      id_kurikulum: item.id_kurikulum,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id_cpmk !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ id_mk: "", nama_cpmk: "", id_kurikulum: "K2024" });
  };

  const getMKName = (kode: string) => {
    const mk = mataKuliahOptions.find((m) => m.value === kode);
    return mk ? mk.label.split(" - ")[1] : kode;
  };

  return (
    <div>
      <Header
        title="CPMK (Capaian Pembelajaran Mata Kuliah)"
        description="Kelola capaian pembelajaran mata kuliah"
      />

      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>Daftar CPMK</CardTitle>
              <Select
                value={filterMK}
                onChange={(e) => setFilterMK(e.target.value)}
                options={[{ value: "", label: "Semua Mata Kuliah" }, ...mataKuliahOptions]}
                className="w-64"
              />
              <Badge variant="secondary">
                Total: {filteredData.length} CPMK
              </Badge>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Icons.Plus size={18} className="mr-2" />
              Tambah CPMK
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead className="w-28">Kode</TableHead>
                  <TableHead className="w-40">Mata Kuliah</TableHead>
                  <TableHead>Deskripsi CPMK</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id_cpmk}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.id_cpmk}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.id_mk}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getMKName(item.id_mk)}
                      </p>
                    </TableCell>
                    <TableCell>{item.nama_cpmk}</TableCell>
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
                          onClick={() => handleDelete(item.id_cpmk)}
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
                      Belum ada data CPMK
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
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit CPMK" : "Tambah CPMK"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="id_kurikulum">Kurikulum</Label>
                <Select
                  id="id_kurikulum"
                  value={formData.id_kurikulum}
                  onChange={(e) =>
                    setFormData({ ...formData, id_kurikulum: e.target.value })
                  }
                  options={kurikulumOptions}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id_mk">Mata Kuliah</Label>
                <Select
                  id="id_mk"
                  value={formData.id_mk}
                  onChange={(e) =>
                    setFormData({ ...formData, id_mk: e.target.value })
                  }
                  options={mataKuliahOptions}
                  placeholder="Pilih mata kuliah"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama_cpmk">Deskripsi CPMK</Label>
                <Textarea
                  id="nama_cpmk"
                  value={formData.nama_cpmk}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_cpmk: e.target.value })
                  }
                  placeholder="Masukkan deskripsi capaian pembelajaran mata kuliah"
                  rows={4}
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
