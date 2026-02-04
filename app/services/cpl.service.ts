import type { CPL, CPLForm } from "~/types";
import { dummyCPL } from "~/data/dummy-data";

// Using dummy data for now
let cplData = [...dummyCPL];

export async function fetchCplList(): Promise<CPL[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...cplData];
}

export async function createCpl(payload: CPLForm): Promise<CPL> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newCpl: CPL = {
    id_cpl: `cpl-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  cplData.push(newCpl);
  return newCpl;
}

export async function updateCpl(id: string, payload: Partial<CPLForm>): Promise<CPL> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = cplData.findIndex((c) => c.id_cpl === id);
  if (index === -1) throw new Error("CPL not found");
  cplData[index] = {
    ...cplData[index],
    ...payload,
    updated_at: new Date(),
  };
  return cplData[index];
}

export async function deleteCpl(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  cplData = cplData.filter((c) => c.id_cpl !== id);
}
