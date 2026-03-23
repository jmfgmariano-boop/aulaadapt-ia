"use client";

import { useMemo, useState } from "react";
import { AppShell } from "../../components/AppShell";
import { AppIcon, InfoList, SectionCard, Tag } from "../../components/Ui";
import { generatedMaterials, teacher } from "../../lib/data";
import { demoAdmin, demoConfig } from "../../lib/demo";

function sanitizeFilename(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "material-aulaadapt"
  );
}

function buildTextExport(material: (typeof generatedMaterials)[number]) {
  return [
    material.title,
    "",
    "Resumen accesible",
    material.summary,
    "",
    "Pasos de repaso",
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
    ...material.visualOutline.map((item) => `- ${item}`),
    "",
    `Recordatorio de tarea: ${material.homeworkReminder}`,
    "",
    `Docente responsable: ${teacher.name}`,
    `Institución: ${demoConfig.schoolName}`
  ].join("\n");
}

function buildHtmlExport(material: (typeof generatedMaterials)[number]) {
  const glossary = material.glossary
    .map(
      (entry) =>
        `<li><strong>${entry.term}:</strong> ${entry.definition}</li>`
    )
    .join("");
  const steps = material.steps.map((step) => `<li>${step}</li>`).join("");
  const concepts = material.concepts.map((concept) => `<li>${concept}</li>`).join("");
  const outline = material.visualOutline.map((item) => `<li>${item}</li>`).join("");

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
      h1, h2 {
        color: #79242f;
      }
      .meta {
        padding: 16px 18px;
        border: 1px solid #e8ddd8;
        border-radius: 18px;
        background: #f8f4f1;
        margin-bottom: 24px;
      }
      ul, ol {
        padding-left: 22px;
      }
      section {
        margin-bottom: 22px;
      }
    </style>
  </head>
  <body>
    <h1>${material.title}</h1>
    <div class="meta">
      <strong>${demoConfig.schoolName}</strong><br />
      Docente responsable: ${teacher.name}
    </div>
    <section>
      <h2>Resumen accesible</h2>
      <p>${material.summary}</p>
    </section>
    <section>
      <h2>Pasos de repaso</h2>
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

function triggerDownload(filename: string, mimeType: string, content: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

export function IntegrationsClient() {
  const [selectedMaterialId, setSelectedMaterialId] = useState(generatedMaterials[0]?.id ?? "");
  const [institutionalEmail, setInstitutionalEmail] = useState(demoConfig.supportEmail);
  const [statusMessage, setStatusMessage] = useState(
    "Selecciona un material y activa el canal de salida que necesites para compartirlo."
  );

  const selectedMaterial =
    generatedMaterials.find((material) => material.id === selectedMaterialId) ??
    generatedMaterials[0];

  const exportSummary = useMemo(
    () => [
      "Resumen accesible listo para lectura postclase",
      "Pasos, conceptos clave y glosario en un solo archivo",
      "Versión simplificada y recordatorio de tarea"
    ],
    []
  );

  function handleExportWord() {
    if (!selectedMaterial) {
      setStatusMessage("Selecciona primero un material para exportarlo.");
      return;
    }

    triggerDownload(
      `${sanitizeFilename(selectedMaterial.title)}.doc`,
      "application/msword",
      buildHtmlExport(selectedMaterial)
    );
    setStatusMessage(`Se exportó "${selectedMaterial.title}" en formato Word.`);
  }

  function handleExportLocal() {
    if (!selectedMaterial) {
      setStatusMessage("Selecciona primero un material para descargarlo.");
      return;
    }

    triggerDownload(
      `${sanitizeFilename(selectedMaterial.title)}.txt`,
      "text/plain;charset=utf-8",
      buildTextExport(selectedMaterial)
    );
    setStatusMessage(`Se descargó una copia local de "${selectedMaterial.title}".`);
  }

  function handleExportPdf() {
    if (!selectedMaterial) {
      setStatusMessage("Selecciona primero un material para abrir la vista de impresión.");
      return;
    }

    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=960,height=720");

    if (!printWindow) {
      setStatusMessage("Tu navegador bloqueó la ventana de impresión. Permite ventanas emergentes e inténtalo de nuevo.");
      return;
    }

    printWindow.document.write(buildHtmlExport(selectedMaterial));
    printWindow.document.close();
    printWindow.focus();
    window.setTimeout(() => {
      printWindow.print();
    }, 300);
    setStatusMessage(`Se abrió la vista para guardar "${selectedMaterial.title}" como PDF.`);
  }

  function handleInstitutionalEmail() {
    if (!selectedMaterial) {
      setStatusMessage("Selecciona primero un material para enviarlo por correo.");
      return;
    }

    const trimmedEmail = institutionalEmail.trim();

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setStatusMessage("Escribe un correo institucional válido antes de continuar.");
      return;
    }

    const subject = encodeURIComponent(
      `${selectedMaterial.title} | ${demoConfig.schoolName}`
    );
    const body = encodeURIComponent(
      [
        `Hola,`,
        "",
        `Comparto el material postclase "${selectedMaterial.title}" generado en AulaAdapt IA.`,
        "",
        `Resumen: ${selectedMaterial.summary}`,
        "",
        `Tarea: ${selectedMaterial.homeworkReminder}`,
        "",
        `Docente responsable: ${teacher.name}`,
        `Institución: ${demoConfig.schoolName}`
      ].join("\n")
    );

    window.location.href = `mailto:${trimmedEmail}?subject=${subject}&body=${body}`;
    setStatusMessage(`Se abrió tu cliente de correo con "${selectedMaterial.title}" listo para envío institucional.`);
  }

  return (
    <AppShell
      role="admin"
      title="Integraciones y exportación"
      subtitle="Activa salidas institucionales para compartir materiales y mantén visible la ruta de crecimiento del producto."
    >
      <div className="dashboard-grid">
        <SectionCard
          title="Correo institucional y exportación"
          description="Selecciona un material y usa una salida operativa inmediata"
        >
          <div className="integration-workspace">
            <article className="integration-preview-card">
              <div className="section-heading">
                <div>
                  <h2>Material listo para compartir</h2>
                  <p>La exportación toma el contenido aprobado y lo prepara para uso escolar.</p>
                </div>
              </div>

              <label className="integration-field">
                <span>Material postclase</span>
                <select
                  value={selectedMaterialId}
                  onChange={(event) => setSelectedMaterialId(event.target.value)}
                >
                  {generatedMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.title}
                    </option>
                  ))}
                </select>
              </label>

              <div className="integration-material-summary">
                <div className="inline-tags">
                  <Tag>Resumen accesible</Tag>
                  <Tag>Glosario</Tag>
                  <Tag>Versión simplificada</Tag>
                  <Tag>Tarea</Tag>
                </div>
                <p className="helper-copy">
                  {selectedMaterial.summary}
                </p>
                <InfoList items={exportSummary} />
              </div>
            </article>

            <article className="integration-preview-card">
              <div className="section-heading">
                <div>
                  <h2>Canales listos para usar</h2>
                  <p>Correo institucional, PDF, Word y descarga local con la misma base de contenido.</p>
                </div>
              </div>

              <label className="integration-field">
                <span>Correo institucional de destino</span>
                <input
                  type="email"
                  value={institutionalEmail}
                  onChange={(event) => setInstitutionalEmail(event.target.value)}
                  placeholder="coordinacion@prepauag.edu.mx"
                />
              </label>

              <div className="integration-actions-grid">
                <button className="primary-button" type="button" onClick={handleInstitutionalEmail}>
                  <AppIcon name="send" />
                  Abrir correo institucional
                </button>
                <button className="ghost-button" type="button" onClick={handleExportPdf}>
                  <AppIcon name="download" />
                  Guardar como PDF
                </button>
                <button className="ghost-button" type="button" onClick={handleExportWord}>
                  <AppIcon name="download" />
                  Exportar Word
                </button>
                <button className="ghost-button" type="button" onClick={handleExportLocal}>
                  <AppIcon name="download" />
                  Descargar local
                </button>
              </div>

              <p className="helper-copy status-message">{statusMessage}</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard
          title="Ruta de integraciones"
          description="Módulos institucionales visibles para escalar la plataforma"
          accent="sky"
        >
          <div className="stack-list">
            {demoAdmin.integrations.map((integration) => (
              <article key={integration.title} className="list-card compact">
                <div className="role-card-head">
                  <span className="icon-badge">
                    <AppIcon
                      name={
                        integration.title === "Correo institucional y exportación"
                          ? "send"
                          : "integration"
                      }
                    />
                  </span>
                  <div>
                    <strong>{integration.title}</strong>
                    <p>{integration.copy}</p>
                  </div>
                </div>
                <div className="inline-tags">
                  <Tag>{integration.status}</Tag>
                  {integration.title === "Correo institucional y exportación" ? (
                    <Tag>Operativo hoy</Tag>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
