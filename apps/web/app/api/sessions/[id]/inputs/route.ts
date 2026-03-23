import { sessions } from "@aulaadapt/mocks";
import { demoJson } from "../../../../../lib/api";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = sessions.find((item) => item.id === id) ?? sessions[0];

  return demoJson({ session }, "Entradas asociadas a la sesion en modo demo.");
}
