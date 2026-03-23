import type { AdaptationLabel, GeneratedMaterial } from "@aulaadapt/domain";

export type GenerateMaterialPayload = {
  sessionId?: string;
  topic: string;
  explanation: string;
  keyPoints: string;
  assignment: string;
  observations?: string;
  subjectName?: string;
  groupName?: string;
  date?: string;
  selectedOutputs: string[];
  selectedAdaptations: string[];
  hasRecordedAudio?: boolean;
  hasUploadedAudio?: boolean;
};

type GenerateMaterialResult = {
  material: GeneratedMaterial;
  source: "openai" | "fallback";
  note?: string;
};

const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const materialSchema = {
  type: "json_schema",
  name: "aulaadapt_material",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "title",
      "summary",
      "steps",
      "concepts",
      "glossary",
      "simplifiedVersion",
      "visualOutline",
      "homeworkReminder",
      "selectedAdaptations"
    ],
    properties: {
      title: { type: "string" },
      summary: { type: "string" },
      steps: {
        type: "array",
        items: { type: "string" }
      },
      concepts: {
        type: "array",
        items: { type: "string" }
      },
      glossary: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["term", "definition"],
          properties: {
            term: { type: "string" },
            definition: { type: "string" }
          }
        }
      },
      simplifiedVersion: { type: "string" },
      visualOutline: {
        type: "array",
        items: { type: "string" }
      },
      homeworkReminder: { type: "string" },
      selectedAdaptations: {
        type: "array",
        items: { type: "string" }
      }
    }
  }
} as const;

export async function generateTeachingMaterial(
  payload: GenerateMaterialPayload
): Promise<GenerateMaterialResult> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      material: buildFallbackMaterial(payload),
      source: "fallback",
      note:
        "Se generó un borrador local porque aún no hay una llave OPENAI_API_KEY configurada en el servidor."
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content:
              "Eres AulaAdapt IA, un asistente pedagógico para educación media superior. Genera materiales postclase claros, accesibles y útiles para repaso. No diagnostiques, no clasifiques clínicamente y no sustituyas al docente. Mantén lenguaje profesional, humano y comprensible. Devuelve todo en español de México."
          },
          {
            role: "user",
            content: buildPrompt(payload)
          }
        ],
        text: {
          format: materialSchema
        }
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    const outputText = extractOutputText(data);

    if (!outputText) {
      throw new Error("La respuesta de OpenAI no devolvió texto estructurado.");
    }

    const parsed = JSON.parse(outputText) as Omit<GeneratedMaterial, "id" | "sessionId">;

    return {
      material: normalizeMaterial(parsed, payload),
      source: "openai"
    };
  } catch (error) {
    console.error("OpenAI generation failed", error);

    return {
      material: buildFallbackMaterial(payload),
      source: "fallback",
      note:
        "La conexión con OpenAI falló y se mostró un borrador de respaldo para no interrumpir el flujo docente."
    };
  }
}

function buildPrompt(payload: GenerateMaterialPayload) {
  return [
    "Genera un borrador editable para AulaAdapt IA con esta información:",
    `Tema: ${payload.topic}`,
    `Materia: ${payload.subjectName || "No especificada"}`,
    `Grupo: ${payload.groupName || "No especificado"}`,
    `Fecha: ${payload.date || "No especificada"}`,
    `Explicación base: ${payload.explanation}`,
    `Puntos clave: ${payload.keyPoints}`,
    `Tarea o actividad: ${payload.assignment}`,
    `Observaciones: ${payload.observations || "Sin observaciones adicionales"}`,
    `Salidas solicitadas: ${payload.selectedOutputs.join(", ")}`,
    `Adaptaciones solicitadas: ${payload.selectedAdaptations.join(", ")}`,
    `Audio grabado desde la app: ${payload.hasRecordedAudio ? "Sí" : "No"}`,
    `Audio cargado por archivo: ${payload.hasUploadedAudio ? "Sí" : "No"}`,
    "Instrucciones:",
    "- Resume con claridad y sin saturación.",
    "- Genera pasos concretos y numerables.",
    "- Explica conceptos en lenguaje claro.",
    "- Produce una versión simplificada útil para repaso.",
    "- Incluye recordatorio de tarea breve y accionable.",
    "- Respeta apoyos pedagógicos neutrales y accesibilidad educativa."
  ].join("\n");
}

function extractOutputText(data: Record<string, unknown>) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }

  const output = Array.isArray(data.output) ? data.output : [];
  const texts = output.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const content = Array.isArray((item as { content?: unknown[] }).content)
      ? ((item as { content?: unknown[] }).content as unknown[])
      : [];

    return content.flatMap((part) => {
      if (!part || typeof part !== "object") return [];
      const text = (part as { text?: string }).text;
      return typeof text === "string" ? [text] : [];
    });
  });

  return texts.join("").trim();
}

function normalizeMaterial(
  parsed: Omit<GeneratedMaterial, "id" | "sessionId">,
  payload: GenerateMaterialPayload
): GeneratedMaterial {
  return {
    id: `generated-${Date.now()}`,
    sessionId: payload.sessionId || "live-preview",
    title: parsed.title || `${payload.topic}: resumen postclase`,
    summary: parsed.summary,
    steps: parsed.steps,
    concepts: parsed.concepts,
    glossary: parsed.glossary,
    simplifiedVersion: parsed.simplifiedVersion,
    visualOutline: parsed.visualOutline,
    homeworkReminder: parsed.homeworkReminder,
    selectedAdaptations: (parsed.selectedAdaptations.length
      ? parsed.selectedAdaptations
      : payload.selectedAdaptations) as AdaptationLabel[]
  };
}

function buildFallbackMaterial(payload: GenerateMaterialPayload): GeneratedMaterial {
  const keyPoints = splitLines(payload.keyPoints);
  const concepts = keyPoints.length
    ? keyPoints.map(cleanBullet)
    : extractConcepts(payload.explanation);

  const steps = [
    "Lee primero el resumen general para ubicar la idea central de la clase.",
    ...(concepts.slice(0, 3).map((concept) => `Repasa el punto clave: ${concept}.`)),
    payload.assignment
      ? `Prepara la actividad o tarea indicada: ${payload.assignment}`
      : "Revisa la tarea asignada y confirma lo que debes entregar."
  ].slice(0, 5);

  const glossary = concepts.slice(0, 3).map((concept) => ({
    term: concept,
    definition: `Concepto clave relacionado con ${payload.topic.toLowerCase()} explicado en lenguaje claro para repaso postclase.`
  }));

  return {
    id: `generated-${Date.now()}`,
    sessionId: payload.sessionId || "live-preview",
    title: `${payload.topic}: materiales postclase`,
    summary: summarizeText(payload.explanation, payload.topic),
    steps,
    concepts: concepts.slice(0, 5),
    glossary,
    simplifiedVersion: simplifyText(payload.explanation, payload.topic),
    visualOutline: [
      `${payload.topic} -> idea principal`,
      "Conceptos clave -> repaso guiado",
      "Actividad -> recordatorio de entrega"
    ],
    homeworkReminder:
      payload.assignment || "Revisa el material, identifica las ideas clave y prepara tu siguiente entregable.",
    selectedAdaptations: payload.selectedAdaptations as AdaptationLabel[]
  };
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanBullet(value: string) {
  return value.replace(/^[-*•]\s*/, "").trim();
}

function summarizeText(text: string, topic: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= 220) {
    return compact;
  }

  return `${compact.slice(0, 217)}... En esta sesión se trabajó el tema ${topic.toLowerCase()} con enfoque de repaso claro y accesible.`;
}

function simplifyText(text: string, topic: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  return `En esta clase vimos ${topic.toLowerCase()}. ${compact.slice(0, 150)}. La idea principal es identificar lo más importante y repasarlo paso a paso.`;
}

function extractConcepts(text: string) {
  return text
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 5)
    .slice(0, 5)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
}
