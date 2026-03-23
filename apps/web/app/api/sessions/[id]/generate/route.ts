import { NextResponse } from "next/server";
import { generateTeachingMaterial } from "../../../../../lib/material-generator";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const { id } = await params;
    const result = await generateTeachingMaterial({
      sessionId: id,
      topic: String(body.topic || ""),
      explanation: String(body.explanation || ""),
      keyPoints: String(body.keyPoints || ""),
      assignment: String(body.assignment || ""),
      observations: String(body.observations || ""),
      subjectName: String(body.subjectName || ""),
      groupName: String(body.groupName || ""),
      date: String(body.date || ""),
      selectedOutputs: Array.isArray(body.selectedOutputs)
        ? body.selectedOutputs.map((item) => String(item))
        : [],
      selectedAdaptations: Array.isArray(body.selectedAdaptations)
        ? body.selectedAdaptations.map((item) => String(item))
        : [],
      hasRecordedAudio: Boolean(body.hasRecordedAudio),
      hasUploadedAudio: Boolean(body.hasUploadedAudio)
    });

    return NextResponse.json({
      ok: true,
      message:
        result.source === "openai"
          ? "Borrador generado con IA y listo para revisión docente."
          : "Se generó un borrador de respaldo para mantener el flujo operativo.",
      data: result
    });
  } catch (error) {
    console.error("Generate route failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo generar el borrador en este momento."
      },
      { status: 500 }
    );
  }
}
