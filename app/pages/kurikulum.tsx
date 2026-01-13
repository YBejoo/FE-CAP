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
import { TAHUN_OPTIONS } from "~/lib/constants";
import type { Kurikulum } from "~/types";

// Dummy data
const initialData: Kurikulum[] = [
  { id_kurikulum: "K2020", tahun: 2020, id_prodi: "1" },
  { id_kurikulum: "K2022", tahun: 2022, id_prodi: "1" },
  { id_kurikulum: "K2024", tahun: 2024, id_prodi: "1" },
];

export default function KurikulumPage() {
  const [data, setData] = useState<Kurikulum[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Kurikulum | null>(null);
  const [formData, setFormData] = useState({ tahun: "", id_prodi: "1" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tahun = parseInt(formData.tahun);
    if (editingItem) {
      setData(
        data.map((item) =>
          item.id_kurikulum === editingItem.id_kurikulum
            ? { ...item, tahun, id_prodi: formData.id_prodi }
            : item
        )
      );
    } else {
      setData([
        ...data,
        {
          id_kurikulum: `K${tahun}`,
          tahun,
          id_prodi: formData.id_prodi,
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleEdit = (item: Kurikulum) => {
    setEditingItem(item);
    setFormData({ tahun: item.tahun.toString(), id_prodi: item.id_prodi });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id_kurikulum !== id));
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ tahun: "", id_prodi: "1" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <Header
        title="Kurikulum"
        description="Kelola data kurikulum per tahun"
      />

      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Kurikulum</CardTitle>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Icons.Plus size={18} className="mr-2" />
              Tambah Kurikulum
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>ID Kurikulum</TableHead>
                  <TableHead>Tahun</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id_kurikulum}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-mono">{item.id_kurikulum}</TableCell>
                    <TableCell className="font-medium">{item.tahun}</TableCell>
                    <TableCell>
                      {item.tahun === currentYear ? (
                        <Badge>Aktif</Badge>
                      ) : item.tahun > currentYear ? (
                        <Badge variant="secondary">Mendatang</Badge>
                      ) : (
                        <Badge variant="outline">Tidak Aktif</Badge>
                      )}
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
                          onClick={() => handleDelete(item.id_kurikulum)}
                        >
                          <Icons.Trash2 size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      Belum ada data kurikulum
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
              {editingItem ? "Edit Kurikulum" : "Tambah Kurikulum"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tahun">Tahun Kurikulum</Label>
                <Select
                  id="tahun"
                  value={formData.tahun}
                  onChange={(e) =>
                    setFormData({ ...formData, tahun: e.target.value })
                  }
                  options={TAHUN_OPTIONS}
                  placeholder="Pilih tahun"
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
