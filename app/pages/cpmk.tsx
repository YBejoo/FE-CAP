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
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui";
import type { CPMK, SubCPMK, MataKuliah, CPL } from "~/types";

// Dummy data
const dummyMataKuliah: MataKuliah[] = [
  { kode_mk: "INF301", nama_mk: "Pemrograman Web", sks: 3, semester: 4, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "INF302", nama_mk: "Jaringan Komputer", sks: 3, semester: 4, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "INF401", nama_mk: "Keamanan Sistem", sks: 3, semester: 5, sifat: "Pilihan", id_kurikulum: "1" },
];

const dummyCPLs: CPL[] = [
  { id_cpl: "1", kode_cpl: "P1", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai konsep teoritis bidang TI", id_kurikulum: "1" },
  { id_cpl: "2", kode_cpl: "P2", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai prinsip rekayasa perangkat lunak", id_kurikulum: "1" },
  { id_cpl: "3", kode_cpl: "KK1", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu merancang sistem informasi", id_kurikulum: "1" },
  { id_cpl: "4", kode_cpl: "KK2", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu mengembangkan aplikasi", id_kurikulum: "1" },
];

const initialCPMK: CPMK[] = [
  { id_cpmk: "1", kode_cpmk: "M1", deskripsi_cpmk: "Mampu menjelaskan dasar-dasar pemrograman web", bobot_persentase: 30, kode_mk: "INF301", id_cpl: "1" },
  { id_cpmk: "2", kode_cpmk: "M2", deskripsi_cpmk: "Mampu menerapkan konsep HTML, CSS, dan JavaScript", bobot_persentase: 40, kode_mk: "INF301", id_cpl: "3" },
  { id_cpmk: "3", kode_cpmk: "M3", deskripsi_cpmk: "Mampu mengembangkan aplikasi web interaktif", bobot_persentase: 30, kode_mk: "INF301", id_cpl: "4" },
  { id_cpmk: "4", kode_cpmk: "N1", deskripsi_cpmk: "Mampu menjelaskan konsep jaringan komputer", bobot_persentase: 35, kode_mk: "INF302", id_cpl: "1" },
  { id_cpmk: "5", kode_cpmk: "N2", deskripsi_cpmk: "Mampu mengkonfigurasi jaringan dasar", bobot_persentase: 65, kode_mk: "INF302", id_cpl: "3" },
];

const initialSubCPMK: SubCPMK[] = [
  { id_sub_cpmk: "1", kode_sub: "M1.1", deskripsi_sub_cpmk: "Memahami konsep HTTP dan protokol web", indikator: "Mahasiswa dapat menjelaskan cara kerja HTTP", kriteria_penilaian: "Tes tertulis", id_cpmk: "1" },
  { id_sub_cpmk: "2", kode_sub: "M1.2", deskripsi_sub_cpmk: "Memahami arsitektur client-server", indikator: "Mahasiswa dapat menggambarkan arsitektur web", kriteria_penilaian: "Tes tertulis", id_cpmk: "1" },
  { id_sub_cpmk: "3", kode_sub: "M2.1", deskripsi_sub_cpmk: "Menerapkan struktur HTML5", indikator: "Mahasiswa dapat membuat halaman HTML semantik", kriteria_penilaian: "Praktikum", id_cpmk: "2" },
  { id_sub_cpmk: "4", kode_sub: "M2.2", deskripsi_sub_cpmk: "Menerapkan styling CSS", indikator: "Mahasiswa dapat mendesain tampilan responsif", kriteria_penilaian: "Praktikum", id_cpmk: "2" },
  { id_sub_cpmk: "5", kode_sub: "M2.3", deskripsi_sub_cpmk: "Menerapkan JavaScript interaktif", indikator: "Mahasiswa dapat membuat fitur interaktif", kriteria_penilaian: "Praktikum", id_cpmk: "2" },
];

export default function CPMKManagementPage() {
  const [cpmkList, setCPMKList] = useState<CPMK[]>(initialCPMK);
  const [subCpmkList, setSubCpmkList] = useState<SubCPMK[]>(initialSubCPMK);
  const [selectedMK, setSelectedMK] = useState<string>("INF301");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);
  const [editingCPMK, setEditingCPMK] = useState<CPMK | null>(null);
  const [editingSubCPMK, setEditingSubCPMK] = useState<SubCPMK | null>(null);
  const [expandedCPMK, setExpandedCPMK] = useState<string[]>([]);

  const filteredCPMK = cpmkList.filter((c) => c.kode_mk === selectedMK);
  const totalBobot = filteredCPMK.reduce((sum, c) => sum + c.bobot_persentase, 0);

  const handleSaveCPMK = () => {
    if (!editingCPMK) return;

    if (editingCPMK.id_cpmk && cpmkList.find((c) => c.id_cpmk === editingCPMK.id_cpmk)) {
      setCPMKList(cpmkList.map((c) => (c.id_cpmk === editingCPMK.id_cpmk ? editingCPMK : c)));
    } else {
      setCPMKList([...cpmkList, { ...editingCPMK, id_cpmk: Date.now().toString(), kode_mk: selectedMK }]);
    }
    setIsDialogOpen(false);
    setEditingCPMK(null);
  };

  const handleDeleteCPMK = (id: string) => {
    if (confirm("Hapus CPMK ini? Sub-CPMK terkait juga akan terhapus.")) {
      setCPMKList(cpmkList.filter((c) => c.id_cpmk !== id));
      setSubCpmkList(subCpmkList.filter((s) => s.id_cpmk !== id));
    }
  };

  const handleSaveSubCPMK = () => {
    if (!editingSubCPMK) return;

    if (editingSubCPMK.id_sub_cpmk && subCpmkList.find((s) => s.id_sub_cpmk === editingSubCPMK.id_sub_cpmk)) {
      setSubCpmkList(subCpmkList.map((s) => (s.id_sub_cpmk === editingSubCPMK.id_sub_cpmk ? editingSubCPMK : s)));
    } else {
      setSubCpmkList([...subCpmkList, { ...editingSubCPMK, id_sub_cpmk: Date.now().toString() }]);
    }
    setIsSubDialogOpen(false);
    setEditingSubCPMK(null);
  };

  const handleDeleteSubCPMK = (id: string) => {
    if (confirm("Hapus Sub-CPMK ini?")) {
      setSubCpmkList(subCpmkList.filter((s) => s.id_sub_cpmk !== id));
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedCPMK((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentMK = dummyMataKuliah.find((mk) => mk.kode_mk === selectedMK);

  return (
    <div className="space-y-6">
        {/* Filter & Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <Label className="text-xs text-muted-foreground">Mata Kuliah</Label>
              <Select value={selectedMK} onValueChange={setSelectedMK}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dummyMataKuliah.map((mk) => (
                    <SelectItem key={mk.kode_mk} value={mk.kode_mk}>
                      {mk.kode_mk} - {mk.nama_mk}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label className="text-xs text-muted-foreground">Total CPMK</Label>
              <p className="text-2xl font-bold">{filteredCPMK.length}</p>
              <p className="text-xs text-muted-foreground">
                {subCpmkList.filter((s) => filteredCPMK.some((c) => c.id_cpmk === s.id_cpmk)).length} Sub-CPMK
              </p>
            </CardContent>
          </Card>

          <Card className={totalBobot === 100 ? "border-green-500" : "border-red-500"}>
            <CardContent className="p-4">
              <Label className="text-xs text-muted-foreground">Total Bobot</Label>
              <p className={`text-2xl font-bold ${totalBobot === 100 ? "text-green-600" : "text-red-600"}`}>
                {totalBobot}%
              </p>
              {totalBobot !== 100 && (
                <p className="text-xs text-red-500">
                  {totalBobot < 100 ? `Kurang ${100 - totalBobot}%` : `Lebih ${totalBobot - 100}%`}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bobot Progress Bar */}
        <div className="p-4 border rounded-lg bg-background">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Distribusi Bobot CPMK</span>
            <span className="text-sm text-muted-foreground">Target: 100%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
            {filteredCPMK.map((cpmk, idx) => {
              const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-rose-500"];
              return (
                <div
                  key={cpmk.id_cpmk}
                  className={`${colors[idx % colors.length]} h-full transition-all`}
                  style={{ width: `${cpmk.bobot_persentase}%` }}
                  title={`${cpmk.kode_cpmk}: ${cpmk.bobot_persentase}%`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {filteredCPMK.map((cpmk, idx) => {
              const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-rose-500"];
              return (
                <div key={cpmk.id_cpmk} className="flex items-center gap-1.5 text-xs">
                  <div className={`w-2.5 h-2.5 rounded-full ${colors[idx % colors.length]}`} />
                  <span>{cpmk.kode_cpmk}: {cpmk.bobot_persentase}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add CPMK Button */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Daftar CPMK - {currentMK?.nama_mk}</h3>
          <Button
            onClick={() => {
              setEditingCPMK({
                id_cpmk: "",
                kode_cpmk: "",
                deskripsi_cpmk: "",
                bobot_persentase: 0,
                kode_mk: selectedMK,
                id_cpl: "",
              });
              setIsDialogOpen(true);
            }}
          >
            <Icons.Plus size={16} className="mr-1" />
            Tambah CPMK
          </Button>
        </div>

        {/* CPMK List with nested Sub-CPMK */}
        <div className="space-y-3">
          {filteredCPMK.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Icons.Target size={48} className="mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">Belum ada CPMK untuk mata kuliah ini</p>
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={() => {
                    setEditingCPMK({
                      id_cpmk: "",
                      kode_cpmk: "",
                      deskripsi_cpmk: "",
                      bobot_persentase: 0,
                      kode_mk: selectedMK,
                      id_cpl: "",
                    });
                    setIsDialogOpen(true);
                  }}
                >
                  Tambah CPMK Pertama
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCPMK.map((cpmk) => {
              const relatedCPL = dummyCPLs.find((c) => c.id_cpl === cpmk.id_cpl);
              const subCpmks = subCpmkList.filter((s) => s.id_cpmk === cpmk.id_cpmk);
              const isExpanded = expandedCPMK.includes(cpmk.id_cpmk);

              return (
                <Card key={cpmk.id_cpmk}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {cpmk.kode_cpmk}
                          </Badge>
                          <Badge variant="secondary">{cpmk.bobot_persentase}%</Badge>
                          {relatedCPL && (
                            <Badge variant="default" className="bg-primary/10 text-primary">
                              → {relatedCPL.kode_cpl}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base mt-2">{cpmk.deskripsi_cpmk}</CardTitle>
                        {relatedCPL && (
                          <CardDescription className="mt-1">
                            CPL: {relatedCPL.deskripsi_cpl}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingCPMK(cpmk);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Icons.Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteCPMK(cpmk.id_cpmk)}
                        >
                          <Icons.Trash size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Sub-CPMK Section */}
                  <CardContent className="pt-0">
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => toggleExpanded(cpmk.id_cpmk)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {isExpanded ? (
                            <Icons.ChevronDown size={16} />
                          ) : (
                            <Icons.ChevronRight size={16} />
                          )}
                          <span>Sub-CPMK ({subCpmks.length})</span>
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingSubCPMK({
                              id_sub_cpmk: "",
                              kode_sub: "",
                              deskripsi_sub_cpmk: "",
                              indikator: "",
                              kriteria_penilaian: "",
                              id_cpmk: cpmk.id_cpmk,
                            });
                            setIsSubDialogOpen(true);
                          }}
                        >
                          <Icons.Plus size={14} className="mr-1" />
                          Tambah
                        </Button>
                      </div>

                      {isExpanded && (
                        <div className="space-y-2 mt-3">
                          {subCpmks.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-3">
                              Belum ada Sub-CPMK
                            </p>
                          ) : (
                            subCpmks.map((sub) => (
                              <div
                                key={sub.id_sub_cpmk}
                                className="flex items-start gap-3 p-3 rounded-lg bg-accent/50"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs font-mono">
                                      {sub.kode_sub}
                                    </Badge>
                                  </div>
                                  <p className="text-sm">{sub.deskripsi_sub_cpmk}</p>
                                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                                    <div>
                                      <span className="font-medium">Indikator:</span> {sub.indikator}
                                    </div>
                                    <div>
                                      <span className="font-medium">Penilaian:</span> {sub.kriteria_penilaian}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => {
                                      setEditingSubCPMK(sub);
                                      setIsSubDialogOpen(true);
                                    }}
                                  >
                                    <Icons.Pencil size={12} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-destructive"
                                    onClick={() => handleDeleteSubCPMK(sub.id_sub_cpmk)}
                                  >
                                    <Icons.Trash size={12} />
                                  </Button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

      {/* CPMK Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingCPMK?.id_cpmk ? "Edit CPMK" : "Tambah CPMK Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi detail CPMK dan hubungkan dengan CPL
            </DialogDescription>
          </DialogHeader>

          {editingCPMK && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kode CPMK</Label>
                  <Input
                    value={editingCPMK.kode_cpmk}
                    onChange={(e) =>
                      setEditingCPMK({ ...editingCPMK, kode_cpmk: e.target.value })
                    }
                    placeholder="M1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bobot (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editingCPMK.bobot_persentase}
                    onChange={(e) =>
                      setEditingCPMK({
                        ...editingCPMK,
                        bobot_persentase: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>CPL Terkait</Label>
                <Select
                  value={editingCPMK.id_cpl}
                  onValueChange={(value) =>
                    setEditingCPMK({ ...editingCPMK, id_cpl: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih CPL" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyCPLs.map((cpl) => (
                      <SelectItem key={cpl.id_cpl} value={cpl.id_cpl}>
                        {cpl.kode_cpl} - {cpl.deskripsi_cpl.slice(0, 40)}...
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi CPMK</Label>
                <Textarea
                  value={editingCPMK.deskripsi_cpmk}
                  onChange={(e) =>
                    setEditingCPMK({ ...editingCPMK, deskripsi_cpmk: e.target.value })
                  }
                  placeholder="Kemampuan yang diharapkan..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveCPMK}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sub-CPMK Dialog */}
      <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingSubCPMK?.id_sub_cpmk ? "Edit Sub-CPMK" : "Tambah Sub-CPMK"}
            </DialogTitle>
            <DialogDescription>
              Rinci kemampuan akhir yang diharapkan
            </DialogDescription>
          </DialogHeader>

          {editingSubCPMK && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Kode Sub-CPMK</Label>
                <Input
                  value={editingSubCPMK.kode_sub}
                  onChange={(e) =>
                    setEditingSubCPMK({ ...editingSubCPMK, kode_sub: e.target.value })
                  }
                  placeholder="M1.1"
                />
              </div>

              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={editingSubCPMK.deskripsi_sub_cpmk}
                  onChange={(e) =>
                    setEditingSubCPMK({
                      ...editingSubCPMK,
                      deskripsi_sub_cpmk: e.target.value,
                    })
                  }
                  placeholder="Kemampuan akhir..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Indikator</Label>
                <Textarea
                  value={editingSubCPMK.indikator}
                  onChange={(e) =>
                    setEditingSubCPMK({ ...editingSubCPMK, indikator: e.target.value })
                  }
                  placeholder="Ukuran keberhasilan..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Kriteria Penilaian</Label>
                <Input
                  value={editingSubCPMK.kriteria_penilaian}
                  onChange={(e) =>
                    setEditingSubCPMK({
                      ...editingSubCPMK,
                      kriteria_penilaian: e.target.value,
                    })
                  }
                  placeholder="Tes/Non-tes/Praktikum"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveSubCPMK}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
