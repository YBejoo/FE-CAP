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
  Textarea,
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
import type { MataKuliah, BahanKajian, SifatMK } from "~/types";
import { SEMESTER_OPTIONS, SIFAT_MK_OPTIONS } from "~/lib/constants";

// Dummy Bahan Kajian
const dummyBahanKajian: BahanKajian[] = [
  { id_bahan_kajian: "1", nama_bahan_kajian: "Rekayasa Perangkat Lunak" },
  { id_bahan_kajian: "2", nama_bahan_kajian: "Pemrograman" },
  { id_bahan_kajian: "3", nama_bahan_kajian: "Basis Data" },
  { id_bahan_kajian: "4", nama_bahan_kajian: "Jaringan Komputer" },
  { id_bahan_kajian: "5", nama_bahan_kajian: "Keamanan Informasi" },
  { id_bahan_kajian: "6", nama_bahan_kajian: "Pengembangan Web" },
  { id_bahan_kajian: "7", nama_bahan_kajian: "Pengembangan Mobile" },
];

// Dummy Mata Kuliah
const initialMataKuliah: MataKuliah[] = [
  {
    kode_mk: "INF101",
    nama_mk: "Pemrograman Dasar",
    sks: 3,
    semester: 1,
    sifat: "Wajib",
    deskripsi: "Pengantar konsep pemrograman komputer",
    id_kurikulum: "1",
    bahan_kajian: [dummyBahanKajian[1]],
  },
  {
    kode_mk: "INF102",
    nama_mk: "Struktur Data",
    sks: 3,
    semester: 2,
    sifat: "Wajib",
    deskripsi: "Konsep dan implementasi struktur data",
    id_kurikulum: "1",
    bahan_kajian: [dummyBahanKajian[1]],
  },
  {
    kode_mk: "INF201",
    nama_mk: "Basis Data",
    sks: 3,
    semester: 3,
    sifat: "Wajib",
    deskripsi: "Perancangan dan implementasi basis data",
    id_kurikulum: "1",
    bahan_kajian: [dummyBahanKajian[2]],
  },
  {
    kode_mk: "INF301",
    nama_mk: "Pemrograman Web",
    sks: 3,
    semester: 4,
    sifat: "Wajib",
    deskripsi: "Pengembangan aplikasi berbasis web",
    id_kurikulum: "1",
    bahan_kajian: [dummyBahanKajian[5], dummyBahanKajian[1]],
  },
  {
    kode_mk: "INF302",
    nama_mk: "Jaringan Komputer",
    sks: 3,
    semester: 4,
    sifat: "Wajib",
    deskripsi: "Konsep dan implementasi jaringan komputer",
    id_kurikulum: "1",
    bahan_kajian: [dummyBahanKajian[3]],
  },
  {
    kode_mk: "INF401",
    nama_mk: "Keamanan Sistem Informasi",
    sks: 3,
    semester: 5,
    sifat: "Pilihan",
    deskripsi: "Prinsip keamanan sistem dan jaringan",
    id_kurikulum: "1",
    bahan_kajian: [dummyBahanKajian[4], dummyBahanKajian[3]],
  },
  {
    kode_mk: "INF402",
    nama_mk: "Pemrograman Mobile",
    sks: 3,
    semester: 5,
    sifat: "Pilihan",
    deskripsi: "Pengembangan aplikasi mobile",
    id_kurikulum: "1",
    bahan_kajian: [dummyBahanKajian[6], dummyBahanKajian[1]],
  },
];

// Bahan Kajian Tag Component
function BahanKajianTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
      {name}
    </span>
  );
}

export default function MataKuliahPage() {
  const [mataKuliahList, setMataKuliahList] = useState<MataKuliah[]>(initialMataKuliah);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState<string>("all");
  const [filterSifat, setFilterSifat] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMK, setEditingMK] = useState<MataKuliah | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingMK, setDeletingMK] = useState<MataKuliah | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    kode_mk: "",
    nama_mk: "",
    sks: 3,
    semester: 1,
    sifat: "Wajib" as SifatMK,
    deskripsi: "",
    bahan_kajian_ids: [] as string[],
  });

  // Filter mata kuliah
  const filteredMK = mataKuliahList.filter((mk) => {
    const matchSearch =
      mk.kode_mk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mk.nama_mk.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSemester =
      filterSemester === "all" || mk.semester.toString() === filterSemester;
    const matchSifat = filterSifat === "all" || mk.sifat === filterSifat;
    return matchSearch && matchSemester && matchSifat;
  });

  // Toggle bahan kajian
  const toggleBahanKajian = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      bahan_kajian_ids: prev.bahan_kajian_ids.includes(id)
        ? prev.bahan_kajian_ids.filter((bk) => bk !== id)
        : [...prev.bahan_kajian_ids, id],
    }));
  };

  // Handle form submit
  const handleSubmit = () => {
    const selectedBK = dummyBahanKajian.filter((bk) =>
      formData.bahan_kajian_ids.includes(bk.id_bahan_kajian)
    );

    if (editingMK) {
      setMataKuliahList((prev) =>
        prev.map((mk) =>
          mk.kode_mk === editingMK.kode_mk
            ? {
                ...mk,
                nama_mk: formData.nama_mk,
                sks: formData.sks,
                semester: formData.semester,
                sifat: formData.sifat,
                deskripsi: formData.deskripsi,
                bahan_kajian: selectedBK,
              }
            : mk
        )
      );
    } else {
      const newMK: MataKuliah = {
        kode_mk: formData.kode_mk,
        nama_mk: formData.nama_mk,
        sks: formData.sks,
        semester: formData.semester,
        sifat: formData.sifat,
        deskripsi: formData.deskripsi,
        id_kurikulum: "1",
        bahan_kajian: selectedBK,
      };
      setMataKuliahList((prev) => [...prev, newMK]);
    }
    handleCloseDialog();
  };

  // Handle delete
  const handleDelete = () => {
    if (deletingMK) {
      setMataKuliahList((prev) =>
        prev.filter((mk) => mk.kode_mk !== deletingMK.kode_mk)
      );
      setIsDeleteDialogOpen(false);
      setDeletingMK(null);
    }
  };

  // Open dialog
  const openDialog = (mk?: MataKuliah) => {
    if (mk) {
      setEditingMK(mk);
      setFormData({
        kode_mk: mk.kode_mk,
        nama_mk: mk.nama_mk,
        sks: mk.sks,
        semester: mk.semester,
        sifat: mk.sifat,
        deskripsi: mk.deskripsi || "",
        bahan_kajian_ids: mk.bahan_kajian?.map((bk) => bk.id_bahan_kajian) || [],
      });
    } else {
      setEditingMK(null);
      setFormData({
        kode_mk: "",
        nama_mk: "",
        sks: 3,
        semester: 1,
        sifat: "Wajib",
        deskripsi: "",
        bahan_kajian_ids: [],
      });
    }
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingMK(null);
  };

  return (
    <div className="space-y-6">
        {/* Action Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari mata kuliah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterSemester} onValueChange={setFilterSemester}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Semester</SelectItem>
                    {SEMESTER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterSifat} onValueChange={setFilterSifat}>
                  <SelectTrigger className="w-full sm:w-35">
                    <SelectValue placeholder="Sifat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Sifat</SelectItem>
                    {SIFAT_MK_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => openDialog()}>
                <Icons.Plus size={16} className="mr-2" />
                Tambah MK
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Mata Kuliah</CardTitle>
            <CardDescription>
              Total {filteredMK.length} mata kuliah ditemukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">Kode</TableHead>
                  <TableHead>Nama Mata Kuliah</TableHead>
                  <TableHead className="w-15 text-center">SKS</TableHead>
                  <TableHead className="w-20 text-center">Semester</TableHead>
                  <TableHead className="w-20">Sifat</TableHead>
                  <TableHead>Bahan Kajian</TableHead>
                  <TableHead className="w-30 text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMK.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Icons.Book size={40} className="opacity-50" />
                        <p>Tidak ada data mata kuliah</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMK.map((mk) => (
                    <TableRow key={mk.kode_mk} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-sm text-blue-600 font-bold">
                        {mk.kode_mk}
                      </TableCell>
                      <TableCell className="font-medium">{mk.nama_mk}</TableCell>
                      <TableCell className="text-center">{mk.sks}</TableCell>
                      <TableCell className="text-center">{mk.semester}</TableCell>
                      <TableCell>
                        <Badge
                          variant={mk.sifat === "Wajib" ? "default" : "secondary"}
                        >
                          {mk.sifat}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {mk.bahan_kajian?.map((bk) => (
                            <BahanKajianTag
                              key={bk.id_bahan_kajian}
                              name={bk.nama_bahan_kajian}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog(mk)}
                          >
                            <Icons.Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setDeletingMK(mk);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Icons.Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      {/* Add/Edit Dialog (Side Drawer style) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingMK ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            </DialogTitle>
            <DialogDescription>
              Lengkapi informasi mata kuliah dan pilih bahan kajian yang relevan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kode_mk">Kode MK</Label>
                <Input
                  id="kode_mk"
                  placeholder="Contoh: INF101"
                  value={formData.kode_mk}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kode_mk: e.target.value.toUpperCase(),
                    }))
                  }
                  disabled={!!editingMK}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama_mk">Nama Mata Kuliah</Label>
                <Input
                  id="nama_mk"
                  placeholder="Contoh: Pemrograman Web"
                  value={formData.nama_mk}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nama_mk: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sks">SKS</Label>
                <Select
                  value={formData.sks.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, sks: parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="SKS" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 6].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} SKS
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={formData.semester.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, semester: parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEMESTER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sifat">Sifat</Label>
                <Select
                  value={formData.sifat}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, sifat: value as SifatMK }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sifat" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIFAT_MK_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi Singkat</Label>
              <Textarea
                id="deskripsi"
                placeholder="Deskripsi singkat tentang mata kuliah..."
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))
                }
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Bahan Kajian</Label>
              <p className="text-sm text-muted-foreground">
                Pilih bahan kajian yang dipelajari dalam mata kuliah ini
              </p>
              <div className="grid grid-cols-2 gap-2 border rounded-lg p-3">
                {dummyBahanKajian.map((bk) => (
                  <label
                    key={bk.id_bahan_kajian}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      formData.bahan_kajian_ids.includes(bk.id_bahan_kajian)
                        ? "bg-indigo-50 border-indigo-200"
                        : "hover:bg-accent"
                    } border`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.bahan_kajian_ids.includes(
                        bk.id_bahan_kajian
                      )}
                      onChange={() => toggleBahanKajian(bk.id_bahan_kajian)}
                    />
                    <span className="text-sm">{bk.nama_bahan_kajian}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.kode_mk.trim() || !formData.nama_mk.trim()}
            >
              {editingMK ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Mata Kuliah</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus mata kuliah "{deletingMK?.nama_mk}
              " ({deletingMK?.kode_mk})? Tindakan ini tidak dapat dibatalkan.
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
