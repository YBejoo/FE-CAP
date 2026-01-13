import { useState } from "react";
import { useParams } from "react-router";
import { Header } from "~/components/header";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
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
import { METODE_MENGAJAR_OPTIONS } from "~/lib/constants";
import type { Pertemuan } from "~/types";

// Dummy RPS info
const rpsInfo = {
  id_rps: "RPS-001",
  nama_rps: "RPS Algoritma dan Pemrograman Ganjil 2024/2025",
  id_mk: "MI101",
  nama_mk: "Algoritma dan Pemrograman",
  sks: 3,
};

// Dummy CPMK options for this MK
const cpmkOptions = [
  { value: "CPMK-1", label: "CPMK-1: Mahasiswa mampu memahami konsep dasar algoritma" },
  { value: "CPMK-2", label: "CPMK-2: Mahasiswa mampu mengimplementasikan algoritma sorting" },
];

// Dummy pertemuan data
const initialPertemuan: Pertemuan[] = [
  {
    id_pertemuan: "P1",
    pertemuan_ke: 1,
    id_rps: "RPS-001",
    id_cpmk: "CPMK-1",
    indikator_pembelajaran: "Mahasiswa dapat menjelaskan konsep algoritma",
    materi: "Pengenalan Algoritma dan Pemrograman",
    metode_mengajar: "ceramah",
    alat_bantu: "Proyektor, Whiteboard",
    capaian_pembelajaran: "Memahami definisi dan peran algoritma",
    bobot: 5,
    jumlah_unit_ajar: 2,
  },
  {
    id_pertemuan: "P2",
    pertemuan_ke: 2,
    id_rps: "RPS-001",
    id_cpmk: "CPMK-1",
    indikator_pembelajaran: "Mahasiswa dapat membuat flowchart",
    materi: "Flowchart dan Pseudocode",
    metode_mengajar: "praktikum",
    alat_bantu: "Komputer, Software Flowchart",
    capaian_pembelajaran: "Mampu membuat flowchart sederhana",
    bobot: 5,
    jumlah_unit_ajar: 2,
  },
  {
    id_pertemuan: "P3",
    pertemuan_ke: 3,
    id_rps: "RPS-001",
    id_cpmk: "CPMK-1",
    indikator_pembelajaran: "Mahasiswa dapat memahami tipe data dan variabel",
    materi: "Tipe Data, Variabel, dan Operator",
    metode_mengajar: "ceramah",
    alat_bantu: "Proyektor, IDE",
    capaian_pembelajaran: "Memahami tipe data primitif",
    bobot: 5,
    jumlah_unit_ajar: 2,
  },
];

export default function RPSDetailPage() {
  const { id } = useParams();
  const [pertemuanData, setPertemuanData] = useState<Pertemuan[]>(initialPertemuan);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Pertemuan | null>(null);
  const [formData, setFormData] = useState({
    pertemuan_ke: "",
    id_cpmk: "",
    indikator_pembelajaran: "",
    materi: "",
    metode_mengajar: "",
    alat_bantu: "",
    capaian_pembelajaran: "",
    bobot: "",
    jumlah_unit_ajar: "",
  });

  const totalBobot = pertemuanData.reduce((sum, p) => sum + p.bobot, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPertemuan: Pertemuan = {
      id_pertemuan: editingItem?.id_pertemuan || `P${pertemuanData.length + 1}`,
      pertemuan_ke: parseInt(formData.pertemuan_ke),
      id_rps: rpsInfo.id_rps,
      id_cpmk: formData.id_cpmk,
      indikator_pembelajaran: formData.indikator_pembelajaran,
      materi: formData.materi,
      metode_mengajar: formData.metode_mengajar,
      alat_bantu: formData.alat_bantu,
      capaian_pembelajaran: formData.capaian_pembelajaran,
      bobot: parseInt(formData.bobot),
      jumlah_unit_ajar: parseInt(formData.jumlah_unit_ajar),
    };

    if (editingItem) {
      setPertemuanData(
        pertemuanData.map((item) =>
          item.id_pertemuan === editingItem.id_pertemuan ? newPertemuan : item
        )
      );
    } else {
      setPertemuanData([...pertemuanData, newPertemuan]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: Pertemuan) => {
    setEditingItem(item);
    setFormData({
      pertemuan_ke: item.pertemuan_ke.toString(),
      id_cpmk: item.id_cpmk,
      indikator_pembelajaran: item.indikator_pembelajaran,
      materi: item.materi,
      metode_mengajar: item.metode_mengajar,
      alat_bantu: item.alat_bantu,
      capaian_pembelajaran: item.capaian_pembelajaran,
      bobot: item.bobot.toString(),
      jumlah_unit_ajar: item.jumlah_unit_ajar.toString(),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pertemuan ini?")) {
      setPertemuanData(pertemuanData.filter((item) => item.id_pertemuan !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({
      pertemuan_ke: "",
      id_cpmk: "",
      indikator_pembelajaran: "",
      materi: "",
      metode_mengajar: "",
      alat_bantu: "",
      capaian_pembelajaran: "",
      bobot: "",
      jumlah_unit_ajar: "",
    });
  };

  const getMetodeName = (value: string) => {
    const metode = METODE_MENGAJAR_OPTIONS.find((m) => m.value === value);
    return metode ? metode.label : value;
  };

  return (
    <div>
      <Header
        title="Detail RPS"
        description={rpsInfo.nama_rps}
      />

      <div className="p-6 space-y-6">
        {/* RPS Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{rpsInfo.nama_rps}</CardTitle>
                <CardDescription className="mt-2">
                  <span className="flex items-center gap-4">
                    <Badge variant="outline">{rpsInfo.id_rps}</Badge>
                    <Badge>{rpsInfo.id_mk} - {rpsInfo.nama_mk}</Badge>
                    <Badge variant="secondary">{rpsInfo.sks} SKS</Badge>
                  </span>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Icons.Printer size={18} className="mr-2" />
                  Cetak PDF
                </Button>
                <a
                  href="/rps"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  <Icons.ChevronRight size={18} className="mr-2 rotate-180" />
                  Kembali
                </a>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Pertemuan Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>Daftar Pertemuan</CardTitle>
              <Badge variant="secondary">
                {pertemuanData.length} Pertemuan | Total Bobot: {totalBobot}%
              </Badge>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Icons.Plus size={18} className="mr-2" />
              Tambah Pertemuan
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Pert.</TableHead>
                  <TableHead className="w-24">CPMK</TableHead>
                  <TableHead>Materi</TableHead>
                  <TableHead className="w-32">Metode</TableHead>
                  <TableHead className="w-20 text-center">Bobot</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pertemuanData
                  .sort((a, b) => a.pertemuan_ke - b.pertemuan_ke)
                  .map((item) => (
                    <TableRow key={item.id_pertemuan}>
                      <TableCell>
                        <Badge variant="outline">#{item.pertemuan_ke}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.id_cpmk}</Badge>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{item.materi}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.indikator_pembelajaran}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getMetodeName(item.metode_mengajar)}
                        </Badge>
                      </TableCell>
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
                            onClick={() => handleDelete(item.id_pertemuan)}
                          >
                            <Icons.Trash2 size={16} className="text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                {pertemuanData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Belum ada data pertemuan
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Pertemuan" : "Tambah Pertemuan"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pertemuan_ke">Pertemuan Ke-</Label>
                  <Input
                    id="pertemuan_ke"
                    type="number"
                    min="1"
                    max="16"
                    value={formData.pertemuan_ke}
                    onChange={(e) =>
                      setFormData({ ...formData, pertemuan_ke: e.target.value })
                    }
                    placeholder="1-16"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id_cpmk">CPMK</Label>
                  <Select
                    id="id_cpmk"
                    value={formData.id_cpmk}
                    onChange={(e) =>
                      setFormData({ ...formData, id_cpmk: e.target.value })
                    }
                    options={cpmkOptions}
                    placeholder="Pilih CPMK"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="materi">Materi Pembelajaran</Label>
                <Input
                  id="materi"
                  value={formData.materi}
                  onChange={(e) =>
                    setFormData({ ...formData, materi: e.target.value })
                  }
                  placeholder="Masukkan materi pembelajaran"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="indikator_pembelajaran">Indikator Pembelajaran</Label>
                <Textarea
                  id="indikator_pembelajaran"
                  value={formData.indikator_pembelajaran}
                  onChange={(e) =>
                    setFormData({ ...formData, indikator_pembelajaran: e.target.value })
                  }
                  placeholder="Masukkan indikator pembelajaran"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capaian_pembelajaran">Capaian Pembelajaran</Label>
                <Textarea
                  id="capaian_pembelajaran"
                  value={formData.capaian_pembelajaran}
                  onChange={(e) =>
                    setFormData({ ...formData, capaian_pembelajaran: e.target.value })
                  }
                  placeholder="Masukkan capaian pembelajaran"
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metode_mengajar">Metode Mengajar</Label>
                  <Select
                    id="metode_mengajar"
                    value={formData.metode_mengajar}
                    onChange={(e) =>
                      setFormData({ ...formData, metode_mengajar: e.target.value })
                    }
                    options={METODE_MENGAJAR_OPTIONS}
                    placeholder="Pilih metode"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alat_bantu">Alat Bantu</Label>
                  <Input
                    id="alat_bantu"
                    value={formData.alat_bantu}
                    onChange={(e) =>
                      setFormData({ ...formData, alat_bantu: e.target.value })
                    }
                    placeholder="Proyektor, Whiteboard, dll"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    placeholder="1-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jumlah_unit_ajar">Jumlah Unit Ajar</Label>
                  <Input
                    id="jumlah_unit_ajar"
                    type="number"
                    min="1"
                    value={formData.jumlah_unit_ajar}
                    onChange={(e) =>
                      setFormData({ ...formData, jumlah_unit_ajar: e.target.value })
                    }
                    placeholder="Jumlah jam"
                    required
                  />
                </div>
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
