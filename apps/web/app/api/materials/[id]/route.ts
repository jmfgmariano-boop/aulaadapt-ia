import { materials } from "@aulaadapt/mocks";
import { demoJson } from "../../../../lib/api";

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const material = materials.find((item) => item.id === id) ?? materials[0];

  return demoJson({ material }, "Material actualizado en modo demo.");
}
