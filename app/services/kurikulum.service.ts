import type { Kurikulum, KurikulumForm } from "~/types";
import { dummyKurikulum } from "~/data/dummy-data";

// Using dummy data for now
let kurikulumData = [...dummyKurikulum];

export async function fetchKurikulumList(): Promise<Kurikulum[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...kurikulumData];
}

export async function createKurikulum(payload: KurikulumForm): Promise<Kurikulum> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newKurikulum: Kurikulum = {
    id_kurikulum: `kur-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  kurikulumData.push(newKurikulum);
  return newKurikulum;
}

export async function updateKurikulum(id: string, payload: Partial<KurikulumForm>): Promise<Kurikulum> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = kurikulumData.findIndex((k) => k.id_kurikulum === id);
  if (index === -1) throw new Error("Kurikulum not found");
  kurikulumData[index] = {
    ...kurikulumData[index],
    ...payload,
    updated_at: new Date(),
  };
  return kurikulumData[index];
}

export async function activateKurikulum(id: string): Promise<Kurikulum> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Deactivate all first
  kurikulumData = kurikulumData.map((k) => ({ ...k, is_active: false }));
  // Activate the selected one
  const index = kurikulumData.findIndex((k) => k.id_kurikulum === id);
  if (index === -1) throw new Error("Kurikulum not found");
  kurikulumData[index] = {
    ...kurikulumData[index],
    is_active: true,
    updated_at: new Date(),
  };
  return kurikulumData[index];
}

export async function deleteKurikulum(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  kurikulumData = kurikulumData.filter((k) => k.id_kurikulum !== id);
}
