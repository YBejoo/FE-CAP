import type { Mahasiswa } from "~/types";
import { dummyMahasiswa } from "~/data/dummy-data";

// Using dummy data for now
let mahasiswaData = [...dummyMahasiswa];

export async function fetchMahasiswaList(): Promise<Mahasiswa[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mahasiswaData];
}
