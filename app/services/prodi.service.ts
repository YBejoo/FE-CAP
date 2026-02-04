import type { Prodi, ProdiForm } from "~/types";
import { dummyProdi } from "~/data/dummy-data";

// Using dummy data for now
let prodiData = [...dummyProdi];

export async function fetchProdiList(): Promise<Prodi[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...prodiData];
}

export async function createProdi(payload: ProdiForm): Promise<Prodi> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newProdi: Prodi = {
    id_prodi: `prodi-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  prodiData.push(newProdi);
  return newProdi;
}

export async function updateProdi(id: string, payload: Partial<ProdiForm>): Promise<Prodi> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = prodiData.findIndex((p) => p.id_prodi === id);
  if (index === -1) throw new Error("Prodi not found");
  prodiData[index] = {
    ...prodiData[index],
    ...payload,
    updated_at: new Date(),
  };
  return prodiData[index];
}

export async function deleteProdi(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  prodiData = prodiData.filter((p) => p.id_prodi !== id);
}
