import { materials } from "@aulaadapt/mocks";
import { demoJson } from "../../../../../lib/api";

export async function POST() {
  return demoJson({ material: materials[0] }, "Borrador IA generado en modo demo.");
}
