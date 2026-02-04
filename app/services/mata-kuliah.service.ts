import type { MataKuliah, MataKuliahForm } from "~/types";
import { dummyMataKuliah } from "~/data/dummy-data";

// Using dummy data for now
let mataKuliahData = [...dummyMataKuliah];

export async function fetchMataKuliahList(): Promise<MataKuliah[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mataKuliahData];
}

export async function createMataKuliah(payload: MataKuliahForm): Promise<MataKuliah> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newMK: MataKuliah = {
    id_mk: `mk-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  mataKuliahData.push(newMK);
  return newMK;
}

export async function updateMataKuliah(id: string, payload: Partial<MataKuliahForm>): Promise<MataKuliah> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mataKuliahData.findIndex((mk) => mk.id_mk === id);
  if (index === -1) throw new Error("Mata Kuliah not found");
  mataKuliahData[index] = {
    ...mataKuliahData[index],
    ...payload,
    updated_at: new Date(),
  };
  return mataKuliahData[index];
}

export async function deleteMataKuliah(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  mataKuliahData = mataKuliahData.filter((mk) => mk.id_mk !== id);
}
