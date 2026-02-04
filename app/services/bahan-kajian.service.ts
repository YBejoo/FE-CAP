import type { BahanKajian, BahanKajianForm } from "~/types";
import { dummyBahanKajian } from "~/data/dummy-data";

// Using dummy data for now
let bahanKajianData = [...dummyBahanKajian];

export async function fetchBahanKajianList(): Promise<BahanKajian[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...bahanKajianData];
}

export async function createBahanKajian(payload: BahanKajianForm): Promise<BahanKajian> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newBK: BahanKajian = {
    id_bahan_kajian: `bk-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  bahanKajianData.push(newBK);
  return newBK;
}

export async function updateBahanKajian(id: string, payload: Partial<BahanKajianForm>): Promise<BahanKajian> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = bahanKajianData.findIndex((bk) => bk.id_bahan_kajian === id);
  if (index === -1) throw new Error("Bahan Kajian not found");
  bahanKajianData[index] = {
    ...bahanKajianData[index],
    ...payload,
    updated_at: new Date(),
  };
  return bahanKajianData[index];
}

export async function deleteBahanKajian(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  bahanKajianData = bahanKajianData.filter((bk) => bk.id_bahan_kajian !== id);
}
