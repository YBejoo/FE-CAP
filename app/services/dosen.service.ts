import type { Dosen } from "~/types";
import { dummyDosen } from "~/data/dummy-data";

// Using dummy data for now
let dosenData = [...dummyDosen];

export async function fetchDosenList(): Promise<Dosen[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...dosenData];
}
