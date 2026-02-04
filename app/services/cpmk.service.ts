import type { CPMK, CPMKForm, SubCPMK, SubCPMKForm } from "~/types";
import { dummyCPMK, dummySubCPMK } from "~/data/dummy-data";

// Using dummy data for now
let cpmkData = [...dummyCPMK];
let subCpmkData = [...dummySubCPMK];

export async function fetchCpmkList(): Promise<CPMK[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...cpmkData];
}

export async function fetchCpmkByMataKuliah(id: string): Promise<CPMK[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return cpmkData.filter((cpmk) => cpmk.id_mk === id || cpmk.kode_mk === id);
}

export async function createCpmk(payload: CPMKForm): Promise<CPMK> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newCPMK: CPMK = {
    id_cpmk: `cpmk-${Date.now()}`,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
  };
  cpmkData.push(newCPMK);
  return newCPMK;
}

export async function updateCpmk(id: string, payload: Partial<CPMKForm>): Promise<CPMK> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = cpmkData.findIndex((c) => c.id_cpmk === id);
  if (index === -1) throw new Error("CPMK not found");
  cpmkData[index] = {
    ...cpmkData[index],
    ...payload,
    updated_at: new Date(),
  };
  return cpmkData[index];
}

export async function deleteCpmk(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  cpmkData = cpmkData.filter((c) => c.id_cpmk !== id);
}

export async function createSubCpmk(idCpmk: string, payload: SubCPMKForm): Promise<SubCPMK> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newSub: SubCPMK = {
    id_sub_cpmk: `sub-${Date.now()}`,
    ...payload,
    id_cpmk: idCpmk,
    created_at: new Date(),
    updated_at: new Date(),
  };
  subCpmkData.push(newSub);
  return newSub;
}

export async function updateSubCpmk(idCpmk: string, idSub: string, payload: Partial<SubCPMKForm>): Promise<SubCPMK> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = subCpmkData.findIndex((s) => s.id_sub_cpmk === idSub && s.id_cpmk === idCpmk);
  if (index === -1) throw new Error("Sub-CPMK not found");
  subCpmkData[index] = {
    ...subCpmkData[index],
    ...payload,
    updated_at: new Date(),
  };
  return subCpmkData[index];
}

export async function deleteSubCpmk(idCpmk: string, idSub: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  subCpmkData = subCpmkData.filter((s) => s.id_sub_cpmk !== idSub || s.id_cpmk !== idCpmk);
}
