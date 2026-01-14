import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Button,
  Input,
  Label,
  Textarea,
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
import type { BahanKajian } from "~/types";

// Dummy data
const initialBahanKajian: BahanKajian[] = [
  {
    id_bahan_kajian: "1",
    nama_bahan_kajian: "Rekayasa Perangkat Lunak",
    deskripsi: "Prinsip dan metodologi pengembangan perangkat lunak",
  },
  {
    id_bahan_kajian: "2",
    nama_bahan_kajian: "Pemrograman",
    deskripsi: "Konsep dasar dan lanjut pemrograman komputer",
  },
  {
    id_bahan_kajian: "3",
    nama_bahan_kajian: "Basis Data",
    deskripsi: "Perancangan, implementasi, dan manajemen basis data",
  },
  {
    id_bahan_kajian: "4",
    nama_bahan_kajian: "Jaringan Komputer",
    deskripsi: "Infrastruktur dan protokol jaringan komputer",
  },
  {
    id_bahan_kajian: "5",
    nama_bahan_kajian: "Keamanan Informasi",
    deskripsi: "Prinsip dan praktik keamanan sistem informasi",
  },
  {
    id_bahan_kajian: "6",
    nama_bahan_kajian: "Kecerdasan Buatan",
    deskripsi: "Konsep AI, Machine Learning, dan implementasinya",
  },
  {
    id_bahan_kajian: "7",
    nama_bahan_kajian: "Pengembangan Web",
    deskripsi: "Teknologi dan framework pengembangan aplikasi web",
  },
  {
    id_bahan_kajian: "8",
    nama_bahan_kajian: "Pengembangan Mobile",
    deskripsi: "Teknologi pengembangan aplikasi mobile",
  },
];

export default function BahanKajianPage() {
  const [bahanKajianList, setBahanKajianList] = useState<BahanKajian[]>(initialBahanKajian);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBK, setEditingBK] = useState<BahanKajian | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingBK, setDeletingBK] = useState<BahanKajian | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nama_bahan_kajian: "",
    deskripsi: "",
  });

  // Filter bahan kajian
  const filteredBK = bahanKajianList.filter(
    (bk) =>
      bk.nama_bahan_kajian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bk.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submit
  const handleSubmit = () => {
    if (editingBK) {
      setBahanKajianList((prev) =>
        prev.map((bk) =>
          bk.id_bahan_kajian === editingBK.id_bahan_kajian
            ? { ...bk, ...formData }
            : bk
        )
      );
    } else {
      const newBK: BahanKajian = {
        id_bahan_kajian: Date.now().toString(),
        ...formData,
      };
      setBahanKajianList((prev) => [...prev, newBK]);
    }
    handleCloseDialog();
  };

  // Handle delete
  const handleDelete = () => {
    if (deletingBK) {
      setBahanKajianList((prev) =>
        prev.filter((bk) => bk.id_bahan_kajian !== deletingBK.id_bahan_kajian)
      );
      setIsDeleteDialogOpen(false);
      setDeletingBK(null);
    }
  };

  // Open dialog
  const openDialog = (bk?: BahanKajian) => {
    if (bk) {
      setEditingBK(bk);
      setFormData({
        nama_bahan_kajian: bk.nama_bahan_kajian,
        deskripsi: bk.deskripsi || "",
      });
    } else {
      setEditingBK(null);
      setFormData({
        nama_bahan_kajian: "",
        deskripsi: "",
      });
    }
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBK(null);
    setFormData({
      nama_bahan_kajian: "",
      deskripsi: "",
    });
  };

  return (
    <div className="space-y-6">
        {/* Action Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari bahan kajian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => openDialog()}>
                <Icons.Plus size={16} className="mr-2" />
                Tambah Bahan Kajian
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Grid Cards View */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBK.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-8 text-center">
                <Icons.Layers size={40} className="mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-muted-foreground">Tidak ada data bahan kajian</p>
              </CardContent>
            </Card>
          ) : (
            filteredBK.map((bk) => (
              <Card key={bk.id_bahan_kajian} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <Icons.Layers className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openDialog(bk)}
                      >
                        <Icons.Edit size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setDeletingBK(bk);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Icons.Trash size={14} />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-base mt-3">
                    {bk.nama_bahan_kajian}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {bk.deskripsi || "Tidak ada deskripsi"}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBK ? "Edit Bahan Kajian" : "Tambah Bahan Kajian"}
            </DialogTitle>
            <DialogDescription>
              Bahan kajian adalah pokok bahasan atau bidang ilmu yang dipelajari
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nama_bahan_kajian">Nama Bahan Kajian</Label>
              <Input
                id="nama_bahan_kajian"
                placeholder="Contoh: Rekayasa Perangkat Lunak"
                value={formData.nama_bahan_kajian}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nama_bahan_kajian: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                placeholder="Deskripsi singkat tentang bahan kajian..."
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.nama_bahan_kajian.trim()}
            >
              {editingBK ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Bahan Kajian</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus bahan kajian "
              {deletingBK?.nama_bahan_kajian}"? Tindakan ini tidak dapat
              dibatalkan.
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
