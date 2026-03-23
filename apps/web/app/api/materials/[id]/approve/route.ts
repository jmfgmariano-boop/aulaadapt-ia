import { demoJson } from "../../../../../lib/api";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return demoJson({ materialId: id, status: "approved" }, "Material aprobado en modo demo.");
}
