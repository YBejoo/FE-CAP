import api from "~/lib/api";
import type { ApiResponse, Penilaian, PenilaianForm } from "~/types";
import { unwrapResponse } from "~/services/utils";

// Penilaian service - not yet implemented in backend
// Returns empty array for now

export async function fetchPenilaianList(): Promise<Penilaian[]> {
  // Not yet implemented in backend
  return [];
}

export async function createPenilaian(payload: PenilaianForm): Promise<Penilaian> {
  // Not yet implemented in backend
  throw new Error("Penilaian API not yet implemented");
}

export async function updatePenilaian(id: string, payload: Partial<PenilaianForm>): Promise<Penilaian> {
  // Not yet implemented in backend
  throw new Error("Penilaian API not yet implemented");
}

export async function deletePenilaian(id: string): Promise<void> {
  // Not yet implemented in backend
  throw new Error("Penilaian API not yet implemented");
}
