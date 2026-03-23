import { materials } from "@aulaadapt/mocks";
import { demoJson } from "../../../../../lib/api";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return demoJson({ studentId: id, materials }, "Feed del estudiante en modo demo.");
}
