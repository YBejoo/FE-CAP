import type { ProfilLulusan, ProfilLulusanForm } from "~/types";
import { dummyProfilLulusan } from "~/data/dummy-data";

// Using dummy data for now
let profilData = [...dummyProfilLulusan];

export async function fetchProfilLulusanList(): Promise<ProfilLulusan[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...profilData];
}

export async function createProfilLulusan(payload: ProfilLulusanForm): Promise<ProfilLulusan> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newProfil: ProfilLulusan = {
    id_profil: `pl-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  profilData.push(newProfil);
  return newProfil;
}

export async function updateProfilLulusan(id: string, payload: Partial<ProfilLulusanForm>): Promise<ProfilLulusan> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = profilData.findIndex((p) => p.id_profil === id);
  if (index === -1) throw new Error("Profil Lulusan not found");
  profilData[index] = {
    ...profilData[index],
    ...payload,
    updated_at: new Date(),
  };
  return profilData[index];
}

export async function deleteProfilLulusan(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  profilData = profilData.filter((p) => p.id_profil !== id);
}
