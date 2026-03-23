import { sessions } from "@aulaadapt/mocks";
import { demoJson } from "../../../lib/api";

export async function POST() {
  return demoJson({ session: sessions[0] }, "Sesion creada en modo demo.");
}
