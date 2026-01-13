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
  Textarea,
} from "~/components/ui";
import type { CPL } from "~/types";

// Dummy data
const initialData: CPL[] = [
  { id_cpl: "CPL-1", nama_cpl: "Mampu menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan ilmu pengetahuan dan teknologi", bobot: 10, id_kurikulum: "K2024" },
  { id_cpl: "CPL-2", nama_cpl: "Mampu menunjukkan kinerja mandiri, bermutu, dan terukur", bobot: 8, id_kurikulum: "K2024" },
  { id_cpl: "CPL-3", nama_cpl: "Mampu mengkaji implikasi pengembangan atau implementasi ilmu pengetahuan dan teknologi", bobot: 8, id_kurikulum: "K2024" },
  { id_cpl: "CPL-4", nama_cpl: "Mampu menyusun deskripsi saintifik hasil kajian dalam bentuk skripsi atau laporan tugas akhir", bobot: 10, id_kurikulum: "K2024" },
  { id_cpl: "CPL-5", nama_cpl: "Mampu mengambil keputusan secara tepat dalam konteks penyelesaian masalah di bidang keahliannya", bobot: 9, id_kurikulum: "K2024" },
  { id_cpl: "CPL-6", nama_cpl: "Mampu memelihara dan mengembangkan jaringan kerja dengan pembimbing, kolega, sejawat", bobot: 7, id_kurikulum: "K2024" },
  { id_cpl: "CPL-7", nama_cpl: "Mampu bertanggung jawab atas pencapaian hasil kerja kelompok dan melakukan supervisi", bobot: 8, id_kurikulum: "K2024" },
  { id_cpl: "CPL-8", nama_cpl: "Mampu melakukan proses evaluasi diri terhadap kelompok kerja yang berada di bawah tanggung jawabnya", bobot: 7, id_kurikulum: "K2024" },
  { id_cpl: "CPL-9", nama_cpl: "Mampu mendokumentasikan, menyimpan, mengamankan, dan menemukan kembali data", bobot: 8, id_kurikulum: "K2024" },
  { id_cpl: "CPL-10", nama_cpl: "Mampu merancang dan mengimplementasikan sistem informasi", bobot: 10, id_kurikulum: "K2024" },
  { id_cpl: "CPL-11", nama_cpl: "Mampu mengembangkan aplikasi berbasis web dan mobile", bobot: 8, id_kurikulum: "K2024" },
  { id_cpl: "CPL-12", nama_cpl: "Mampu mengelola dan menganalisis basis data", bobot: 7, id_kurikulum: "K2024" },
];

const kurikulumOptions = [
  { value: "K2020", label: "Kurikulum 2020" },
  { value: "K2022", label: "Kurikulum 2022" },
  { value: "K2024", label: "Kurikulum 2024" },
];

export default function CPLPage() {
  const [data, setData] = useState<CPL[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CPL | null>(null);
  const [formData, setFormData] = useState({
    nama_cpl: "",
    bobot: "",
    id_kurikulum: "K2024",
  });
  const [filterKurikulum, setFilterKurikulum] = useState("K2024");

  const filteredData = data.filter((item) => item.id_kurikulum === filterKurikulum);
  const totalBobot = filteredData.reduce((sum, item) => sum + item.bobot, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(
        data.map((item) =>
          item.id_cpl === editingItem.id_cpl
            ? {
                ...item,
                nama_cpl: formData.nama_cpl,
                bobot: parseInt(formData.bobot),
                id_kurikulum: formData.id_kurikulum,
              }
            : item
        )
      );
    } else {
      const newId = `CPL-${data.length + 1}`;
      setData([
        ...data,
        {
          id_cpl: newId,
          nama_cpl: formData.nama_cpl,
          bobot: parseInt(formData.bobot),
          id_kurikulum: formData.id_kurikulum,
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: CPL) => {
    setEditingItem(item);
    setFormData({
      nama_cpl: item.nama_cpl,
      bobot: item.bobot.toString(),
      id_kurikulum: item.id_kurikulum,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id_cpl !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ nama_cpl: "", bobot: "", id_kurikulum: "K2024" });
  };

  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="CPL (Capaian Pembelajaran Lulusan)"
        description="Kelola capaian pembelajaran lulusan"
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
              <CardTitle>Daftar CPL</CardTitle>
              <Select
                value={filterKurikulum}
                onChange={(e) => setFilterKurikulum(e.target.value)}
                options={kurikulumOptions}
                className="w-48"
              />
              <Badge variant="secondary">
                Total Bobot: {totalBobot}%
              </Badge>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Icons.Plus size={18} className="mr-2" />
              Tambah CPL
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead className="w-24">Kode</TableHead>
                  <TableHead>Deskripsi CPL</TableHead>
                  <TableHead className="w-24 text-center">Bobot</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id_cpl}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.id_cpl}</Badge>
                    </TableCell>
                    <TableCell>{item.nama_cpl}</TableCell>
                    <TableCell className="text-center">
                      <Badge>{item.bobot}%</Badge>
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
                          onClick={() => handleDelete(item.id_cpl)}
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
                      Belum ada data CPL untuk kurikulum ini
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
              {editingItem ? "Edit CPL" : "Tambah CPL"}
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
                <Label htmlFor="nama_cpl">Deskripsi CPL</Label>
                <Textarea
                  id="nama_cpl"
                  value={formData.nama_cpl}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_cpl: e.target.value })
                  }
                  placeholder="Masukkan deskripsi capaian pembelajaran lulusan"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bobot">Bobot (%)</Label>
                <Input
                  id="bobot"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.bobot}
                  onChange={(e) =>
                    setFormData({ ...formData, bobot: e.target.value })
                  }
                  placeholder="Masukkan bobot (1-100)"
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
