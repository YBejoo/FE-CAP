import type { RPS } from "~/types";
import { dummyRPS } from "~/data/dummy-data";

// Using dummy data for now
let rpsData = [...dummyRPS];

export async function fetchRpsList(): Promise<RPS[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...rpsData];
}
