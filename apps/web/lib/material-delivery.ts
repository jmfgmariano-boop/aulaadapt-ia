import type { GeneratedMaterial } from "@aulaadapt/domain";

export function sanitizeMaterialFilename(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "material-aulaadapt"
  );
}

export function buildMaterialText(
  material: GeneratedMaterial,
  teacherName: string,
  schoolName: string
) {
  return [
    material.title,
    "",
    "Resumen accesible",
    material.summary,
    "",
    "Pasos de la actividad",
    ...material.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "Conceptos clave",
    ...material.concepts.map((concept) => `- ${concept}`),
    "",
    "Glosario",
    ...material.glossary.map((entry) => `- ${entry.term}: ${entry.definition}`),
    "",
    "Versión simplificada",
    material.simplifiedVersion,
    "",
    "Apoyo visual",
    ...material.visualOutline.map((entry) => `- ${entry}`),
    "",
    `Recordatorio de tarea: ${material.homeworkReminder}`,
    "",
    `Docente responsable: ${teacherName}`,
    `Institución: ${schoolName}`
  ].join("\n");
}

export function buildMaterialHtml(
  material: GeneratedMaterial,
  teacherName: string,
  schoolName: string
) {
  const glossary = material.glossary
    .map((entry) => `<li><strong>${entry.term}:</strong> ${entry.definition}</li>`)
    .join("");
  const steps = material.steps.map((step) => `<li>${step}</li>`).join("");
  const concepts = material.concepts.map((concept) => `<li>${concept}</li>`).join("");
  const outline = material.visualOutline.map((entry) => `<li>${entry}</li>`).join("");

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>${material.title}</title>
    <style>
      body {
        font-family: Avenir Next, Segoe UI, sans-serif;
        margin: 40px;
        color: #352e2f;
        line-height: 1.6;
      }
      h1, h2 { color: #79242f; }
      .meta {
        padding: 16px 18px;
        border: 1px solid #e8ddd8;
        border-radius: 18px;
        background: #f8f4f1;
        margin-bottom: 24px;
      }
      ul, ol { padding-left: 22px; }
      section { margin-bottom: 22px; }
    </style>
  </head>
  <body>
    <h1>${material.title}</h1>
    <div class="meta">
      <strong>${schoolName}</strong><br />
      Docente responsable: ${teacherName}
    </div>
    <section>
      <h2>Resumen accesible</h2>
      <p>${material.summary}</p>
    </section>
    <section>
      <h2>Pasos de la actividad</h2>
      <ol>${steps}</ol>
    </section>
    <section>
      <h2>Conceptos clave</h2>
      <ul>${concepts}</ul>
    </section>
    <section>
      <h2>Glosario</h2>
      <ul>${glossary}</ul>
    </section>
    <section>
      <h2>Versión simplificada</h2>
      <p>${material.simplifiedVersion}</p>
    </section>
    <section>
      <h2>Apoyo visual</h2>
      <ul>${outline}</ul>
    </section>
    <section>
      <h2>Recordatorio de tarea</h2>
      <p>${material.homeworkReminder}</p>
    </section>
  </body>
</html>`;
}

export function triggerDownload(filename: string, mimeType: string, content: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

export function openMailClient(
  recipient: string,
  subject: string,
  body: string
) {
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function copyTextToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}
