import { NextResponse } from "next/server";

export const runtime = "nodejs";

const transcriptionModel = process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe";

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Configura OPENAI_API_KEY en el servidor para habilitar la transcripción automática de audio."
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          message: "No se encontró un archivo de audio válido para transcribir."
        },
        { status: 400 }
      );
    }

    const upstreamFormData = new FormData();
    upstreamFormData.append("file", file, file.name || "audio.webm");
    upstreamFormData.append("model", transcriptionModel);

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: upstreamFormData
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(details);
    }

    const data = (await response.json()) as { text?: string };

    return NextResponse.json({
      ok: true,
      message: "Audio transcrito correctamente.",
      data: {
        transcript: data.text || ""
      }
    });
  } catch (error) {
    console.error("Audio transcription failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "No fue posible transcribir el audio en este momento."
      },
      { status: 500 }
    );
  }
}
