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
} from "~/components/ui";
import { BENTUK_PENILAIAN_OPTIONS } from "~/lib/constants";
import type { Penilaian } from "~/types";

// Dummy RPS options
const rpsOptions = [
  { value: "RPS-001", label: "RPS-001 - Algoritma dan Pemrograman" },
  { value: "RPS-002", label: "RPS-002 - Basis Data" },
  { value: "RPS-003", label: "RPS-003 - Pemrograman Web" },
];

// Dummy pertemuan options
const pertemuanOptions = [
  { value: "P1", label: "Pertemuan 1 - Pengenalan Algoritma" },
  { value: "P2", label: "Pertemuan 2 - Flowchart" },
  { value: "P3", label: "Pertemuan 3 - Tipe Data" },
  { value: "P8", label: "Pertemuan 8 - UTS" },
  { value: "P16", label: "Pertemuan 16 - UAS" },
];

const initialData: Penilaian[] = [
  { id_penilaian: "PN-001", bobot_nilai: 20, id_rps: "RPS-001", id_pertemuan: "P1", nama_penilaian: "Tugas 1", bentuk_penilaian: "tugas" },
  { id_penilaian: "PN-002", bobot_nilai: 15, id_rps: "RPS-001", id_pertemuan: "P2", nama_penilaian: "Kuis 1", bentuk_penilaian: "kuis" },
  { id_penilaian: "PN-003", bobot_nilai: 25, id_rps: "RPS-001", id_pertemuan: "P8", nama_penilaian: "UTS", bentuk_penilaian: "uts" },
  { id_penilaian: "PN-004", bobot_nilai: 15, id_rps: "RPS-001", id_pertemuan: "P3", nama_penilaian: "Praktikum 1", bentuk_penilaian: "praktikum" },
  { id_penilaian: "PN-005", bobot_nilai: 25, id_rps: "RPS-001", id_pertemuan: "P16", nama_penilaian: "UAS", bentuk_penilaian: "uas" },
];

export default function PenilaianPage() {
  const [data, setData] = useState<Penilaian[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Penilaian | null>(null);
  const [formData, setFormData] = useState({
    id_rps: "",
    id_pertemuan: "",
    nama_penilaian: "",
    bentuk_penilaian: "",
    bobot_nilai: "",
  });
  const [filterRPS, setFilterRPS] = useState("");

  const filteredData = filterRPS
    ? data.filter((item) => item.id_rps === filterRPS)
    : data;

  const totalBobot = filteredData.reduce((sum, item) => sum + item.bobot_nilai, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(
        data.map((item) =>
          item.id_penilaian === editingItem.id_penilaian
            ? {
                ...item,
                id_rps: formData.id_rps,
                id_pertemuan: formData.id_pertemuan,
                nama_penilaian: formData.nama_penilaian,
                bentuk_penilaian: formData.bentuk_penilaian,
                bobot_nilai: parseInt(formData.bobot_nilai),
              }
            : item
        )
      );
    } else {
      const newId = `PN-${String(data.length + 1).padStart(3, "0")}`;
      setData([
        ...data,
        {
          id_penilaian: newId,
          id_rps: formData.id_rps,
          id_pertemuan: formData.id_pertemuan,
          nama_penilaian: formData.nama_penilaian,
          bentuk_penilaian: formData.bentuk_penilaian,
          bobot_nilai: parseInt(formData.bobot_nilai),
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: Penilaian) => {
    setEditingItem(item);
    setFormData({
      id_rps: item.id_rps,
      id_pertemuan: item.id_pertemuan,
      nama_penilaian: item.nama_penilaian,
      bentuk_penilaian: item.bentuk_penilaian,
      bobot_nilai: item.bobot_nilai.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id_penilaian !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      id_rps: "",
      id_pertemuan: "",
      nama_penilaian: "",
      bentuk_penilaian: "",
      bobot_nilai: "",
    });
  };

  const getBentukPenilaianLabel = (value: string) => {
    const bentuk = BENTUK_PENILAIAN_OPTIONS.find((b) => b.value === value);
    return bentuk ? bentuk.label : value;
  };

  const getBentukPenilaianVariant = (value: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (value) {
      case "uts":
      case "uas":
        return "default";
      case "tugas":
      case "project":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div>
      <Header
        title="Penilaian"
        description="Kelola data penilaian per RPS"
      />

      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>Daftar Penilaian</CardTitle>
              <Select
                value={filterRPS}
                onChange={(e) => setFilterRPS(e.target.value)}
                options={[{ value: "", label: "Semua RPS" }, ...rpsOptions]}
                className="w-64"
              />
              <Badge
                variant={totalBobot === 100 ? "default" : "destructive"}
              >
                Total Bobot: {totalBobot}%
                {totalBobot !== 100 && " (harus 100%)"}
              </Badge>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Icons.Plus size={18} className="mr-2" />
              Tambah Penilaian
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead className="w-28">ID</TableHead>
                  <TableHead className="w-32">RPS</TableHead>
                  <TableHead>Nama Penilaian</TableHead>
                  <TableHead className="w-32">Bentuk</TableHead>
                  <TableHead className="w-24 text-center">Bobot</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id_penilaian}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {item.id_penilaian}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.id_rps}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.nama_penilaian}</TableCell>
                    <TableCell>
                      <Badge variant={getBentukPenilaianVariant(item.bentuk_penilaian)}>
                        {getBentukPenilaianLabel(item.bentuk_penilaian)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge>{item.bobot_nilai}%</Badge>
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
                          onClick={() => handleDelete(item.id_penilaian)}
                        >
                          <Icons.Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Belum ada data penilaian
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
              {editingItem ? "Edit Penilaian" : "Tambah Penilaian"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="id_rps">RPS</Label>
                <Select
                  id="id_rps"
                  value={formData.id_rps}
                  onChange={(e) =>
                    setFormData({ ...formData, id_rps: e.target.value })
                  }
                  options={rpsOptions}
                  placeholder="Pilih RPS"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id_pertemuan">Pertemuan</Label>
                <Select
                  id="id_pertemuan"
                  value={formData.id_pertemuan}
                  onChange={(e) =>
                    setFormData({ ...formData, id_pertemuan: e.target.value })
                  }
                  options={pertemuanOptions}
                  placeholder="Pilih pertemuan"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama_penilaian">Nama Penilaian</Label>
                <Input
                  id="nama_penilaian"
                  value={formData.nama_penilaian}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_penilaian: e.target.value })
                  }
                  placeholder="Contoh: UTS, Tugas 1, Kuis 1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bentuk_penilaian">Bentuk Penilaian</Label>
                <Select
                  id="bentuk_penilaian"
                  value={formData.bentuk_penilaian}
                  onChange={(e) =>
                    setFormData({ ...formData, bentuk_penilaian: e.target.value })
                  }
                  options={BENTUK_PENILAIAN_OPTIONS}
                  placeholder="Pilih bentuk penilaian"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bobot_nilai">Bobot Nilai (%)</Label>
                <Input
                  id="bobot_nilai"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.bobot_nilai}
                  onChange={(e) =>
                    setFormData({ ...formData, bobot_nilai: e.target.value })
                  }
                  placeholder="1-100"
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
