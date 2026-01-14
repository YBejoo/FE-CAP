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
import type { ProfilLulusan, CPL } from "~/types";

// Dummy CPL data untuk relasi
const dummyCPLs: CPL[] = [
  { id_cpl: "1", kode_cpl: "S1", aspek: "Sikap", deskripsi_cpl: "Bertakwa kepada Tuhan YME", id_kurikulum: "1" },
  { id_cpl: "2", kode_cpl: "S2", aspek: "Sikap", deskripsi_cpl: "Menjunjung tinggi nilai kemanusiaan", id_kurikulum: "1" },
  { id_cpl: "3", kode_cpl: "P1", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai konsep teoritis bidang TI", id_kurikulum: "1" },
  { id_cpl: "4", kode_cpl: "P2", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai prinsip rekayasa perangkat lunak", id_kurikulum: "1" },
  { id_cpl: "5", kode_cpl: "KK1", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu merancang sistem informasi", id_kurikulum: "1" },
  { id_cpl: "6", kode_cpl: "KK2", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu mengembangkan aplikasi", id_kurikulum: "1" },
  { id_cpl: "7", kode_cpl: "KK3", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu mengelola basis data", id_kurikulum: "1" },
];

// Dummy Profil Lulusan data
const initialProfilLulusan: ProfilLulusan[] = [
  {
    id_profil: "1",
    kode_profil: "PL-01",
    peran: "Software Engineer",
    deskripsi: "Mampu merancang, mengembangkan, dan memelihara sistem perangkat lunak yang efisien dan berkualitas tinggi.",
    id_kurikulum: "1",
    cpl_terkait: ["S1", "P1", "P2", "KK1", "KK2"],
  },
  {
    id_profil: "2",
    kode_profil: "PL-02",
    peran: "Data Analyst",
    deskripsi: "Mampu mengolah, menganalisis, dan menginterpretasi data untuk mendukung pengambilan keputusan bisnis.",
    id_kurikulum: "1",
    cpl_terkait: ["S1", "P1", "KK3"],
  },
  {
    id_profil: "3",
    kode_profil: "PL-03",
    peran: "IT Consultant",
    deskripsi: "Mampu memberikan solusi teknologi informasi yang tepat sesuai kebutuhan organisasi.",
    id_kurikulum: "1",
    cpl_terkait: ["S1", "S2", "P1", "KK1"],
  },
];

export default function ProfilLulusanPage() {
  const [profilList, setProfilList] = useState<ProfilLulusan[]>(initialProfilLulusan);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfil, setEditingProfil] = useState<ProfilLulusan | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingProfil, setDeletingProfil] = useState<ProfilLulusan | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    kode_profil: "",
    peran: "",
    deskripsi: "",
    cpl_terkait: [] as string[],
  });

  // Filter profil lulusan
  const filteredProfil = profilList.filter(
    (p) =>
      p.peran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.kode_profil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle CPL checkbox toggle
  const toggleCPL = (kodeCPL: string) => {
    setFormData((prev) => ({
      ...prev,
      cpl_terkait: prev.cpl_terkait.includes(kodeCPL)
        ? prev.cpl_terkait.filter((c) => c !== kodeCPL)
        : [...prev.cpl_terkait, kodeCPL],
    }));
  };

  // Handle form submit
  const handleSubmit = () => {
    if (editingProfil) {
      setProfilList((prev) =>
        prev.map((p) =>
          p.id_profil === editingProfil.id_profil
            ? { ...p, ...formData }
            : p
        )
      );
    } else {
      const newProfil: ProfilLulusan = {
        id_profil: Date.now().toString(),
        ...formData,
        id_kurikulum: "1",
      };
      setProfilList((prev) => [...prev, newProfil]);
    }
    handleCloseDialog();
  };

  // Handle delete
  const handleDelete = () => {
    if (deletingProfil) {
      setProfilList((prev) =>
        prev.filter((p) => p.id_profil !== deletingProfil.id_profil)
      );
      setIsDeleteDialogOpen(false);
      setDeletingProfil(null);
    }
  };

  // Open dialog
  const openDialog = (profil?: ProfilLulusan) => {
    if (profil) {
      setEditingProfil(profil);
      setFormData({
        kode_profil: profil.kode_profil,
        peran: profil.peran,
        deskripsi: profil.deskripsi,
        cpl_terkait: profil.cpl_terkait || [],
      });
    } else {
      setEditingProfil(null);
      const nextCode = `PL-${String(profilList.length + 1).padStart(2, "0")}`;
      setFormData({
        kode_profil: nextCode,
        peran: "",
        deskripsi: "",
        cpl_terkait: [],
      });
    }
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProfil(null);
    setFormData({
      kode_profil: "",
      peran: "",
      deskripsi: "",
      cpl_terkait: [],
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
                  placeholder="Cari profil lulusan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => openDialog()}>
                <Icons.Plus size={16} className="mr-2" />
                Tambah Profil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Profil Lulusan</CardTitle>
            <CardDescription>
              Peran yang diharapkan dapat dilakukan oleh lulusan di dunia kerja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Kode</TableHead>
                  <TableHead>Profil Lulusan</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="w-[200px]">CPL Terkait</TableHead>
                  <TableHead className="w-[120px] text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfil.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Icons.Users size={40} className="opacity-50" />
                        <p>Tidak ada data profil lulusan</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfil.map((profil) => (
                    <TableRow key={profil.id_profil}>
                      <TableCell className="font-mono text-sm font-medium">
                        {profil.kode_profil}
                      </TableCell>
                      <TableCell className="font-medium">{profil.peran}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate text-muted-foreground text-sm">
                          {profil.deskripsi}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {profil.cpl_terkait?.map((cpl) => (
                            <Badge
                              key={cpl}
                              variant="outline"
                              className="text-xs cursor-help"
                              title={
                                dummyCPLs.find((c) => c.kode_cpl === cpl)
                                  ?.deskripsi_cpl
                              }
                            >
                              {cpl}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDialog(profil)}
                          >
                            <Icons.Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setDeletingProfil(profil);
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProfil ? "Edit Profil Lulusan" : "Tambah Profil Lulusan"}
            </DialogTitle>
            <DialogDescription>
              Tentukan peran lulusan dan hubungkan dengan CPL yang relevan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kode_profil">Kode Profil</Label>
                <Input
                  id="kode_profil"
                  placeholder="PL-01"
                  value={formData.kode_profil}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kode_profil: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peran">Nama Profil/Peran</Label>
                <Input
                  id="peran"
                  placeholder="Contoh: Software Engineer"
                  value={formData.peran}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, peran: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                placeholder="Deskripsi lengkap tentang profil lulusan..."
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>CPL Terkait</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Pilih CPL yang mendukung profil lulusan ini
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                {dummyCPLs.map((cpl) => (
                  <label
                    key={cpl.id_cpl}
                    className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      formData.cpl_terkait.includes(cpl.kode_cpl)
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-accent"
                    } border`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.cpl_terkait.includes(cpl.kode_cpl)}
                      onChange={() => toggleCPL(cpl.kode_cpl)}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium text-sm">{cpl.kode_cpl}</span>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {cpl.deskripsi_cpl}
                      </p>
                    </div>
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
              disabled={!formData.kode_profil.trim() || !formData.peran.trim()}
            >
              {editingProfil ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Profil Lulusan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus profil "{deletingProfil?.peran}"?
              Tindakan ini tidak dapat dibatalkan.
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
