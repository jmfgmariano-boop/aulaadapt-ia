import { deliveries } from "@aulaadapt/mocks";
import { demoJson } from "../../../lib/api";

export async function POST() {
  return demoJson({ delivery: deliveries[0] }, "Entrega programada en modo demo.");
}
