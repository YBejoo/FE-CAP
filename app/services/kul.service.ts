import type { KompetensiUtamaLulusan, KompetensiUtamaLulusanForm } from "~/types";
import { dummyKompetensiUtamaLulusan } from "~/data/dummy-data";

// Using dummy data for now
let kulData = [...dummyKompetensiUtamaLulusan];

export async function fetchKulList(): Promise<KompetensiUtamaLulusan[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...kulData];
}

export async function createKul(payload: KompetensiUtamaLulusanForm): Promise<KompetensiUtamaLulusan> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newKul: KompetensiUtamaLulusan = {
    id_kul: `kul-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  kulData.push(newKul);
  return newKul;
}

export async function updateKul(id: string, payload: Partial<KompetensiUtamaLulusanForm>): Promise<KompetensiUtamaLulusan> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = kulData.findIndex((k) => k.id_kul === id);
  if (index === -1) throw new Error("KUL not found");
  kulData[index] = {
    ...kulData[index],
    ...payload,
    updated_at: new Date(),
  };
  return kulData[index];
}

export async function deleteKul(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  kulData = kulData.filter((k) => k.id_kul !== id);
}
