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
} from "~/components/ui";
import type { CPL, MataKuliah, CPLMataKuliah } from "~/types";

// Dummy CPL data
const dummyCPLs: CPL[] = [
  { id_cpl: "1", kode_cpl: "S1", aspek: "Sikap", deskripsi_cpl: "Bertakwa kepada Tuhan YME", id_kurikulum: "1" },
  { id_cpl: "2", kode_cpl: "S2", aspek: "Sikap", deskripsi_cpl: "Menjunjung tinggi nilai kemanusiaan", id_kurikulum: "1" },
  { id_cpl: "3", kode_cpl: "P1", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai konsep teoritis bidang TI", id_kurikulum: "1" },
  { id_cpl: "4", kode_cpl: "P2", aspek: "Pengetahuan", deskripsi_cpl: "Menguasai prinsip rekayasa perangkat lunak", id_kurikulum: "1" },
  { id_cpl: "5", kode_cpl: "KK1", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu merancang sistem informasi", id_kurikulum: "1" },
  { id_cpl: "6", kode_cpl: "KK2", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu mengembangkan aplikasi", id_kurikulum: "1" },
  { id_cpl: "7", kode_cpl: "KK3", aspek: "Keterampilan Khusus", deskripsi_cpl: "Mampu mengelola basis data", id_kurikulum: "1" },
];

// Dummy Mata Kuliah data
const dummyMataKuliah: MataKuliah[] = [
  { kode_mk: "INF101", nama_mk: "Pemrograman Dasar", sks: 3, semester: 1, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "INF102", nama_mk: "Struktur Data", sks: 3, semester: 2, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "INF201", nama_mk: "Basis Data", sks: 3, semester: 3, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "INF301", nama_mk: "Pemrograman Web", sks: 3, semester: 4, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "INF302", nama_mk: "Jaringan Komputer", sks: 3, semester: 4, sifat: "Wajib", id_kurikulum: "1" },
  { kode_mk: "INF401", nama_mk: "Keamanan Sistem", sks: 3, semester: 5, sifat: "Pilihan", id_kurikulum: "1" },
  { kode_mk: "INF402", nama_mk: "Pemrograman Mobile", sks: 3, semester: 5, sifat: "Pilihan", id_kurikulum: "1" },
  { kode_mk: "INF501", nama_mk: "Etika Profesi", sks: 2, semester: 6, sifat: "Wajib", id_kurikulum: "1" },
];

// Initial mapping state
const initialMapping: Record<string, string[]> = {
  INF101: ["P1", "P2", "KK2"],
  INF102: ["P1", "P2", "KK2"],
  INF201: ["P1", "P2", "KK3"],
  INF301: ["P1", "P2", "KK1", "KK2"],
  INF302: ["P1", "KK1"],
  INF401: ["P1", "KK1"],
  INF402: ["P1", "P2", "KK2"],
  INF501: ["S1", "S2"],
};

export default function MatrixCPLMKPage() {
  const [mapping, setMapping] = useState<Record<string, string[]>>(initialMapping);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Toggle mapping
  const toggleMapping = (kodeMK: string, kodeCPL: string) => {
    setMapping((prev) => {
      const currentMKMapping = prev[kodeMK] || [];
      const newMapping = currentMKMapping.includes(kodeCPL)
        ? currentMKMapping.filter((c) => c !== kodeCPL)
        : [...currentMKMapping, kodeCPL];

      return {
        ...prev,
        [kodeMK]: newMapping,
      };
    });
    setHasChanges(true);
  };

  // Check if MK has mapping to CPL
  const hasMapping = (kodeMK: string, kodeCPL: string): boolean => {
    return (mapping[kodeMK] || []).includes(kodeCPL);
  };

  // Count mappings for a CPL
  const countCPLMappings = (kodeCPL: string): number => {
    return Object.values(mapping).filter((mkMappings) =>
      mkMappings.includes(kodeCPL)
    ).length;
  };

  // Count mappings for a MK
  const countMKMappings = (kodeMK: string): number => {
    return (mapping[kodeMK] || []).length;
  };

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
    alert("Pemetaan berhasil disimpan!");
  };

  // Check if any MK has no CPL mapping
  const mkWithoutCPL = dummyMataKuliah.filter(
    (mk) => !mapping[mk.kode_mk] || mapping[mk.kode_mk].length === 0
  );

  return (
    <div className="space-y-6">
        {/* Legend & Save Button */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                    <Icons.Check size={14} className="text-primary-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Berkontribusi pada CPL
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-muted rounded" />
                  <span className="text-sm text-muted-foreground">
                    Tidak berkontribusi
                  </span>
                </div>
              </div>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Icons.Save size={16} className="mr-2" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Warning for MK without CPL */}
        {mkWithoutCPL.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icons.AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">
                  Perhatian: {mkWithoutCPL.length} Mata Kuliah belum memiliki
                  pemetaan CPL
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  {mkWithoutCPL.map((mk) => mk.nama_mk).join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Matrix Table */}
        <Card>
          <CardHeader>
            <CardTitle>Matrix CPL - Mata Kuliah</CardTitle>
            <CardDescription>
              Klik pada sel untuk mengaktifkan/menonaktifkan pemetaan. Arahkan
              kursor pada kode CPL untuk melihat deskripsi.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto max-h-[600px] border-t">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50 sticky top-0 z-20">
                  <tr>
                    <th className="sticky left-0 bg-gray-50 z-30 px-4 py-3 border-b border-r text-left text-sm font-semibold text-gray-900 min-w-[200px]">
                      Mata Kuliah
                    </th>
                    {dummyCPLs.map((cpl) => (
                      <th
                        key={cpl.id_cpl}
                        className="px-3 py-3 border-b text-center text-sm font-semibold text-gray-900 min-w-[60px]"
                      >
                        <div
                          className="cursor-help"
                          title={cpl.deskripsi_cpl}
                        >
                          <span className="block">{cpl.kode_cpl}</span>
                          <span className="text-xs font-normal text-muted-foreground">
                            ({countCPLMappings(cpl.kode_cpl)})
                          </span>
                        </div>
                      </th>
                    ))}
                    <th className="px-3 py-3 border-b border-l text-center text-sm font-semibold text-gray-900 min-w-[60px]">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dummyMataKuliah.map((mk, idx) => (
                    <tr
                      key={mk.kode_mk}
                      className={`hover:bg-blue-50 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="sticky left-0 bg-inherit z-10 px-4 py-3 border-b border-r font-medium shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                        <div>
                          <span className="text-sm">{mk.nama_mk}</span>
                          <span className="block text-xs text-muted-foreground font-mono">
                            {mk.kode_mk} • {mk.sks} SKS • Sem {mk.semester}
                          </span>
                        </div>
                      </td>
                      {dummyCPLs.map((cpl) => (
                        <td
                          key={`${mk.kode_mk}-${cpl.kode_cpl}`}
                          className="px-3 py-3 border-b text-center"
                        >
                          <button
                            onClick={() =>
                              toggleMapping(mk.kode_mk, cpl.kode_cpl)
                            }
                            className={`w-8 h-8 rounded transition-all ${
                              hasMapping(mk.kode_mk, cpl.kode_cpl)
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "border-2 border-gray-200 hover:border-primary hover:bg-primary/5"
                            }`}
                          >
                            {hasMapping(mk.kode_mk, cpl.kode_cpl) && (
                              <Icons.Check size={16} className="mx-auto" />
                            )}
                          </button>
                        </td>
                      ))}
                      <td className="px-3 py-3 border-b border-l text-center">
                        <Badge
                          variant={
                            countMKMappings(mk.kode_mk) > 0
                              ? "default"
                              : "destructive"
                          }
                        >
                          {countMKMappings(mk.kode_mk)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100 sticky bottom-0">
                  <tr>
                    <td className="sticky left-0 bg-gray-100 z-10 px-4 py-3 border-t border-r font-semibold text-sm">
                      Total MK per CPL
                    </td>
                    {dummyCPLs.map((cpl) => (
                      <td
                        key={`total-${cpl.kode_cpl}`}
                        className="px-3 py-3 border-t text-center font-semibold"
                      >
                        {countCPLMappings(cpl.kode_cpl)}
                      </td>
                    ))}
                    <td className="px-3 py-3 border-t border-l text-center font-semibold">
                      -
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Icons.Book className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Mata Kuliah</p>
                  <p className="text-2xl font-bold">{dummyMataKuliah.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-50">
                  <Icons.Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total CPL</p>
                  <p className="text-2xl font-bold">{dummyCPLs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-50">
                  <Icons.Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Pemetaan</p>
                  <p className="text-2xl font-bold">
                    {Object.values(mapping).reduce(
                      (sum, arr) => sum + arr.length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
