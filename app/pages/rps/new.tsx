import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui";
import type { MataKuliah, CPL, CPMK, SubCPMK } from "~/types";
import { METODE_PEMBELAJARAN_OPTIONS } from "~/lib/constants";
import { useMataKuliah } from "~/hooks/useMataKuliah";
import { useCpl } from "~/hooks/useCpl";


const steps = [
  { id: 1, title: "Identitas & Pustaka", icon: Icons.FileText },
  { id: 2, title: "Pemetaan CPMK", icon: Icons.Target },
  { id: 3, title: "Sub-CPMK & Indikator", icon: Icons.List },
  { id: 4, title: "Rencana Mingguan", icon: Icons.Calendar },
];

// Step 1: Identitas Form
function IdentitasForm({
  data,
  onChange,
  mataKuliahList,
}: {
  data: any;
  onChange: (data: any) => void;
  mataKuliahList: MataKuliah[];
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="kode_mk">Mata Kuliah</Label>
          <Select
            value={data.kode_mk}
            onValueChange={(value) => onChange({ ...data, kode_mk: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Mata Kuliah" />
            </SelectTrigger>
            <SelectContent>
              {mataKuliahList.map((mk) => (
                <SelectItem key={mk.kode_mk} value={mk.kode_mk}>
                  {mk.kode_mk} - {mk.nama_mk}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dosen_pengampu">Dosen Pengampu</Label>
          <Input
            id="dosen_pengampu"
            placeholder="Nama dosen pengampu"
            value={data.dosen_pengampu}
            onChange={(e) =>
              onChange({ ...data, dosen_pengampu: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="koordinator_rmk">Koordinator RMK</Label>
          <Input
            id="koordinator_rmk"
            placeholder="Nama koordinator RMK"
            value={data.koordinator_rmk}
            onChange={(e) =>
              onChange({ ...data, koordinator_rmk: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="kaprodi">Ketua Program Studi</Label>
          <Input
            id="kaprodi"
            placeholder="Nama Kaprodi"
            value={data.kaprodi}
            onChange={(e) => onChange({ ...data, kaprodi: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi_mk">Deskripsi Mata Kuliah</Label>
        <Textarea
          id="deskripsi_mk"
          placeholder="Deskripsi singkat tentang mata kuliah..."
          value={data.deskripsi_mk}
          onChange={(e) => onChange({ ...data, deskripsi_mk: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pustaka_utama">Pustaka Utama</Label>
          <Textarea
            id="pustaka_utama"
            placeholder="Daftar referensi utama..."
            value={data.pustaka_utama}
            onChange={(e) =>
              onChange({ ...data, pustaka_utama: e.target.value })
            }
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pustaka_pendukung">Pustaka Pendukung</Label>
          <Textarea
            id="pustaka_pendukung"
            placeholder="Daftar referensi pendukung..."
            value={data.pustaka_pendukung}
            onChange={(e) =>
              onChange({ ...data, pustaka_pendukung: e.target.value })
            }
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="media_pembelajaran">Media Pembelajaran</Label>
        <Input
          id="media_pembelajaran"
          placeholder="Contoh: LCD Projector, Laptop, Software IDE"
          value={data.media_pembelajaran}
          onChange={(e) =>
            onChange({ ...data, media_pembelajaran: e.target.value })
          }
        />
      </div>
    </div>
  );
}

// Step 2: CPMK Mapping Form
function CPMKMappingForm({
  data,
  onChange,
  cplList,
}: {
  data: any;
  onChange: (data: any) => void;
  cplList: CPL[];
}) {
  const addCPMK = () => {
    const newCPMK: CPMK = {
      id_cpmk: Date.now().toString(),
      kode_cpmk: `M${data.cpmkList.length + 1}`,
      deskripsi_cpmk: "",
      bobot_persentase: 0,
      kode_mk: data.kode_mk,
      id_cpl: "",
    };
    onChange({ ...data, cpmkList: [...data.cpmkList, newCPMK] });
  };

  const updateCPMK = (index: number, field: string, value: any) => {
    const updated = [...data.cpmkList];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, cpmkList: updated });
  };

  const removeCPMK = (index: number) => {
    const updated = data.cpmkList.filter((_: any, i: number) => i !== index);
    onChange({ ...data, cpmkList: updated });
  };

  const totalBobot = data.cpmkList.reduce(
    (sum: number, cpmk: CPMK) => sum + (cpmk.bobot_persentase || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* CPL yang tersedia */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">CPL yang Dibebankan pada MK</CardTitle>
          <CardDescription>
            CPL yang sudah di-mapping ke mata kuliah ini di Matrix CPL-MK
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {cplList.map((cpl) => (
              <div
                key={cpl.id_cpl}
                className="p-3 rounded-lg border bg-accent/50"
                title={cpl.deskripsi_cpl}
              >
                <Badge variant="secondary">{cpl.kode_cpl}</Badge>
                <p className="text-xs text-muted-foreground mt-1 max-w-50 truncate">
                  {cpl.deskripsi_cpl}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bobot Progress */}
      <div
        className={`p-4 rounded-lg ${
          totalBobot === 100
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        } border`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Total Bobot CPMK</span>
          <span className={totalBobot === 100 ? "text-green-600" : "text-red-600"}>
            {totalBobot}% / 100%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              totalBobot === 100 ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${Math.min(totalBobot, 100)}%` }}
          />
        </div>
        {totalBobot !== 100 && (
          <p className="text-sm text-red-600 mt-2">
            {totalBobot < 100
              ? `Kurang ${100 - totalBobot}% untuk mencapai 100%`
              : `Melebihi ${totalBobot - 100}% dari 100%`}
          </p>
        )}
      </div>

      {/* CPMK List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Daftar CPMK</h4>
          <Button variant="outline" size="sm" onClick={addCPMK}>
            <Icons.Plus size={14} className="mr-1" />
            Tambah CPMK
          </Button>
        </div>

        {data.cpmkList.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-muted/50">
            <Icons.FileCheck size={40} className="mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-muted-foreground">Belum ada CPMK</p>
            <Button variant="outline" size="sm" onClick={addCPMK} className="mt-2">
              Tambah CPMK Pertama
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {data.cpmkList.map((cpmk: CPMK, index: number) => (
              <Card key={cpmk.id_cpmk}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Kode CPMK</Label>
                          <Input
                            value={cpmk.kode_cpmk}
                            onChange={(e) =>
                              updateCPMK(index, "kode_cpmk", e.target.value)
                            }
                            placeholder="M1"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">CPL Terkait</Label>
                          <Select
                            value={cpmk.id_cpl}
                            onValueChange={(value) =>
                              updateCPMK(index, "id_cpl", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih CPL" />
                            </SelectTrigger>
                            <SelectContent>
                              {cplList.map((cpl) => (
                                <SelectItem key={cpl.id_cpl} value={cpl.id_cpl}>
                                  {cpl.kode_cpl}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Bobot (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={cpmk.bobot_persentase}
                            onChange={(e) =>
                              updateCPMK(
                                index,
                                "bobot_persentase",
                                parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Deskripsi CPMK</Label>
                        <Textarea
                          value={cpmk.deskripsi_cpmk}
                          onChange={(e) =>
                            updateCPMK(index, "deskripsi_cpmk", e.target.value)
                          }
                          placeholder="Deskripsi kemampuan yang diharapkan..."
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeCPMK(index)}
                    >
                      <Icons.Trash size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Step 3: Sub-CPMK Form
function SubCPMKForm({
  data,
  onChange,
}: {
  data: any;
  onChange: (data: any) => void;
}) {
  const addSubCPMK = (cpmkId: string) => {
    const cpmk = data.cpmkList.find((c: CPMK) => c.id_cpmk === cpmkId);
    const subCount =
      data.subCpmkList.filter((s: SubCPMK) => s.id_cpmk === cpmkId).length + 1;

    const newSubCPMK: SubCPMK = {
      id_sub_cpmk: Date.now().toString(),
      kode_sub: `${cpmk?.kode_cpmk || "L"}.${subCount}`,
      deskripsi_sub_cpmk: "",
      indikator: "",
      kriteria_penilaian: "",
      id_cpmk: cpmkId,
    };
    onChange({ ...data, subCpmkList: [...data.subCpmkList, newSubCPMK] });
  };

  const updateSubCPMK = (id: string, field: string, value: any) => {
    const updated = data.subCpmkList.map((s: SubCPMK) =>
      s.id_sub_cpmk === id ? { ...s, [field]: value } : s
    );
    onChange({ ...data, subCpmkList: updated });
  };

  const removeSubCPMK = (id: string) => {
    const updated = data.subCpmkList.filter(
      (s: SubCPMK) => s.id_sub_cpmk !== id
    );
    onChange({ ...data, subCpmkList: updated });
  };

  return (
    <div className="space-y-6">
      {data.cpmkList.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-muted/50">
          <Icons.AlertCircle size={40} className="mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-muted-foreground">
            Silakan tambahkan CPMK terlebih dahulu di step sebelumnya
          </p>
        </div>
      ) : (
        data.cpmkList.map((cpmk: CPMK) => {
          const subCpmks = data.subCpmkList.filter(
            (s: SubCPMK) => s.id_cpmk === cpmk.id_cpmk
          );

          return (
            <Card key={cpmk.id_cpmk}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Badge>{cpmk.kode_cpmk}</Badge>
                      <span className="font-normal text-muted-foreground">
                        ({cpmk.bobot_persentase}%)
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {cpmk.deskripsi_cpmk || "Belum ada deskripsi"}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSubCPMK(cpmk.id_cpmk)}
                  >
                    <Icons.Plus size={14} className="mr-1" />
                    Sub-CPMK
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {subCpmks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Belum ada Sub-CPMK
                  </p>
                ) : (
                  <div className="space-y-3">
                    {subCpmks.map((sub: SubCPMK) => (
                      <div
                        key={sub.id_sub_cpmk}
                        className="p-3 border rounded-lg bg-accent/30"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Kode</Label>
                              <Input
                                value={sub.kode_sub}
                                onChange={(e) =>
                                  updateSubCPMK(
                                    sub.id_sub_cpmk,
                                    "kode_sub",
                                    e.target.value
                                  )
                                }
                                placeholder="L1.1"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Deskripsi</Label>
                              <Input
                                value={sub.deskripsi_sub_cpmk}
                                onChange={(e) =>
                                  updateSubCPMK(
                                    sub.id_sub_cpmk,
                                    "deskripsi_sub_cpmk",
                                    e.target.value
                                  )
                                }
                                placeholder="Kemampuan akhir..."
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Indikator</Label>
                              <Input
                                value={sub.indikator}
                                onChange={(e) =>
                                  updateSubCPMK(
                                    sub.id_sub_cpmk,
                                    "indikator",
                                    e.target.value
                                  )
                                }
                                placeholder="Ukuran keberhasilan..."
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Kriteria Penilaian</Label>
                              <Input
                                value={sub.kriteria_penilaian}
                                onChange={(e) =>
                                  updateSubCPMK(
                                    sub.id_sub_cpmk,
                                    "kriteria_penilaian",
                                    e.target.value
                                  )
                                }
                                placeholder="Tes/Non-tes..."
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removeSubCPMK(sub.id_sub_cpmk)}
                          >
                            <Icons.Trash size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}

// Step 4: Weekly Schedule Form
function WeeklyScheduleForm({
  data,
  onChange,
}: {
  data: any;
  onChange: (data: any) => void;
}) {
  const updatePertemuan = (week: number, field: string, value: any) => {
    const updated = [...data.pertemuan];
    updated[week - 1] = { ...updated[week - 1], [field]: value };
    onChange({ ...data, pertemuan: updated });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-15 text-center">Minggu</TableHead>
              <TableHead className="w-30">Sub-CPMK</TableHead>
              <TableHead>Materi Pembelajaran</TableHead>
              <TableHead className="w-36">Metode</TableHead>
              <TableHead className="w-20 text-center">Waktu</TableHead>
              <TableHead className="w-20 text-center">Bobot</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pertemuan.map((p: any, idx: number) => {
              const isUTS = idx === 7;
              const isUAS = idx === 15;

              return (
                <TableRow
                  key={idx}
                  className={isUTS || isUAS ? "bg-amber-50" : ""}
                >
                  <TableCell className="text-center font-medium">
                    {idx + 1}
                    {isUTS && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        UTS
                      </Badge>
                    )}
                    {isUAS && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        UAS
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={p.sub_cpmk || ""}
                      onValueChange={(value) =>
                        updatePertemuan(idx + 1, "sub_cpmk", value)
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.subCpmkList.map((sub: SubCPMK) => (
                          <SelectItem key={sub.id_sub_cpmk} value={sub.kode_sub}>
                            {sub.kode_sub}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={p.materi || ""}
                      onChange={(e) =>
                        updatePertemuan(idx + 1, "materi", e.target.value)
                      }
                      placeholder={isUTS ? "Ujian Tengah Semester" : isUAS ? "Ujian Akhir Semester" : "Materi pembelajaran..."}
                      className="h-8 text-xs"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={p.metode || ""}
                      onValueChange={(value) =>
                        updatePertemuan(idx + 1, "metode", value)
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent>
                        {METODE_PEMBELAJARAN_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={p.waktu || 150}
                      onChange={(e) =>
                        updatePertemuan(idx + 1, "waktu", parseInt(e.target.value))
                      }
                      className="h-8 text-xs text-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={p.bobot || 0}
                      onChange={(e) =>
                        updatePertemuan(idx + 1, "bobot", parseInt(e.target.value))
                      }
                      className="h-8 text-xs text-center"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function RPSEditorPage() {
  const { mataKuliahList, loading: mkLoading } = useMataKuliah();
  const { cplList, loading: cplLoading } = useCpl();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Identitas
    kode_mk: "",
    dosen_pengampu: "",
    koordinator_rmk: "",
    kaprodi: "",
    deskripsi_mk: "",
    pustaka_utama: "",
    pustaka_pendukung: "",
    media_pembelajaran: "",
    // Step 2: CPMK
    cpmkList: [] as CPMK[],
    // Step 3: Sub-CPMK
    subCpmkList: [] as SubCPMK[],
    // Step 4: Pertemuan (16 weeks)
    pertemuan: Array.from({ length: 16 }, (_, i) => ({
      minggu: i + 1,
      sub_cpmk: "",
      materi: "",
      metode: "",
      waktu: 150,
      bobot: 0,
    })),
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    // TODO: Save to localStorage or API
    alert("RPS berhasil disimpan sebagai draft!");
  };

  const handlePublish = () => {
    // TODO: Submit to API
    alert("RPS berhasil dipublikasikan!");
  };

  const selectedMK = mataKuliahList.find(
    (mk) => mk.kode_mk === formData.kode_mk
  );

  if (mkLoading || cplLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icons.Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Stepper */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                          ? "bg-green-100 text-green-700"
                          : "text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive
                            ? "bg-primary-foreground/20"
                            : isCompleted
                            ? "bg-green-200"
                            : "bg-muted"
                        }`}
                      >
                        {isCompleted ? (
                          <Icons.Check size={16} />
                        ) : (
                          <Icon size={16} />
                        )}
                      </div>
                      <span className="hidden md:inline text-sm font-medium">
                        {step.title}
                      </span>
                    </button>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-12 h-0.5 mx-2 ${
                          isCompleted ? "bg-green-500" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {steps.find((s) => s.id === currentStep)?.title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 &&
                "Isi informasi dasar dan daftar pustaka mata kuliah"}
              {currentStep === 2 &&
                "Tentukan CPMK dan hubungkan dengan CPL yang tersedia"}
              {currentStep === 3 &&
                "Rinci Sub-CPMK dengan indikator dan kriteria penilaian"}
              {currentStep === 4 &&
                "Susun rencana pembelajaran untuk 16 pertemuan"}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-96">
            {currentStep === 1 && (
              <IdentitasForm
                data={formData}
                onChange={setFormData}
                mataKuliahList={mataKuliahList}
              />
            )}
            {currentStep === 2 && (
              <CPMKMappingForm
                data={formData}
                onChange={setFormData}
                cplList={cplList}
              />
            )}
            {currentStep === 3 && (
              <SubCPMKForm data={formData} onChange={setFormData} />
            )}
            {currentStep === 4 && (
              <WeeklyScheduleForm data={formData} onChange={setFormData} />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <Icons.ChevronLeft size={16} className="mr-1" />
            Kembali
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Icons.Save size={16} className="mr-1" />
              Simpan Draft
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                Lanjut
                <Icons.ChevronRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button onClick={handlePublish}>
                <Icons.Check size={16} className="mr-1" />
                Selesai & Publish
              </Button>
            )}
          </div>
        </div>
    </div>
  );
}
