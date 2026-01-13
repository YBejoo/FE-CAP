import { useState } from "react";
import { useNavigate } from "react-router";
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
} from "~/components/ui";
import type { RPS } from "~/types";

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

const initialData: RPS[] = [
  { id_rps: "RPS-001", id_mk: "MI101", nama_rps: "RPS Algoritma dan Pemrograman Ganjil 2024/2025" },
  { id_rps: "RPS-002", id_mk: "MI102", nama_rps: "RPS Basis Data Ganjil 2024/2025" },
  { id_rps: "RPS-003", id_mk: "MI103", nama_rps: "RPS Pemrograman Web Ganjil 2024/2025" },
  { id_rps: "RPS-004", id_mk: "MI201", nama_rps: "RPS PBO Genap 2024/2025" },
  { id_rps: "RPS-005", id_mk: "MI203", nama_rps: "RPS Pemrograman Mobile Genap 2024/2025" },
];

export default function RPSPage() {
  const [data, setData] = useState<RPS[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RPS | null>(null);
  const [formData, setFormData] = useState({
    id_mk: "",
    nama_rps: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.nama_rps.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id_mk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(
        data.map((item) =>
          item.id_rps === editingItem.id_rps
            ? {
                ...item,
                id_mk: formData.id_mk,
                nama_rps: formData.nama_rps,
              }
            : item
        )
      );
    } else {
      const newId = `RPS-${String(data.length + 1).padStart(3, "0")}`;
      setData([
        ...data,
        {
          id_rps: newId,
          id_mk: formData.id_mk,
          nama_rps: formData.nama_rps,
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: RPS) => {
    setEditingItem(item);
    setFormData({
      id_mk: item.id_mk,
      nama_rps: item.nama_rps,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id_rps !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ id_mk: "", nama_rps: "" });
  };

  const getMKName = (kode: string) => {
    const mk = mataKuliahOptions.find((m) => m.value === kode);
    return mk ? mk.label.split(" - ")[1] : kode;
  };

  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="RPS (Rencana Pembelajaran Semester)"
        description="Kelola rencana pembelajaran semester"
      />

      <div className="p-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <Icons.ArrowLeft size={18} className="mr-2" />
          Kembali
        </Button>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>Daftar RPS</CardTitle>
              <Badge variant="secondary">Total: {data.length} RPS</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari RPS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Icons.Plus size={18} className="mr-2" />
                Tambah RPS
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead className="w-28">ID RPS</TableHead>
                  <TableHead className="w-40">Mata Kuliah</TableHead>
                  <TableHead>Nama RPS</TableHead>
                  <TableHead className="w-48 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id_rps}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {item.id_rps}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.id_mk}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getMKName(item.id_mk)}
                      </p>
                    </TableCell>
                    <TableCell className="font-medium">{item.nama_rps}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <a
                          href={`/rps/${item.id_rps}`}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 px-3"
                        >
                          <Icons.Eye size={16} className="mr-1" />
                          Detail
                        </a>
                        <Button variant="ghost" size="icon" title="Print PDF">
                          <Icons.Printer size={16} />
                        </Button>
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
                          onClick={() => handleDelete(item.id_rps)}
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
                      {searchQuery ? "Tidak ada RPS yang ditemukan" : "Belum ada data RPS"}
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
              {editingItem ? "Edit RPS" : "Tambah RPS"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
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
                <Label htmlFor="nama_rps">Nama RPS</Label>
                <Input
                  id="nama_rps"
                  value={formData.nama_rps}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_rps: e.target.value })
                  }
                  placeholder="Contoh: RPS Pemrograman Web Ganjil 2024/2025"
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
