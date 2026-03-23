import { usageSnapshot } from "@aulaadapt/mocks";
import { demoJson } from "../../../../lib/api";

export async function GET() {
  return demoJson({ usage: usageSnapshot }, "Reporte de uso en modo demo.");
}
