import type { Penilaian, PenilaianForm } from "~/types";
import { dummyPenilaian } from "~/data/dummy-data";

// Using dummy data for now
let penilaianData = [...dummyPenilaian];

export async function fetchPenilaianList(): Promise<Penilaian[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...penilaianData];
}

export async function createPenilaian(payload: PenilaianForm): Promise<Penilaian> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newPenilaian: Penilaian = {
    id_penilaian: `pen-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  penilaianData.push(newPenilaian);
  return newPenilaian;
}

export async function updatePenilaian(id: string, payload: Partial<PenilaianForm>): Promise<Penilaian> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = penilaianData.findIndex((p) => p.id_penilaian === id);
  if (index === -1) throw new Error("Penilaian not found");
  penilaianData[index] = {
    ...penilaianData[index],
    ...payload,
    updated_at: new Date(),
  };
  return penilaianData[index];
}

export async function deletePenilaian(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  penilaianData = penilaianData.filter((p) => p.id_penilaian !== id);
}
