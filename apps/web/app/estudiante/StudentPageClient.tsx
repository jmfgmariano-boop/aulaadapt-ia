"use client";

import { useEffect, useState } from "react";
import type { GeneratedMaterial, User } from "@aulaadapt/domain";
import { AppShell } from "../../components/AppShell";
import { InfoList, SectionCard, Tag } from "../../components/Ui";
import { demoStudent } from "../../lib/demo";

const REVIEWED_KEY = "aulaadapt-reviewed-materials";
const SAVED_KEY = "aulaadapt-saved-materials";
const DOWNLOADS_KEY = "aulaadapt-recent-downloads";

type DownloadItem = (typeof demoStudent.recentDownloads)[number];

type StudentPageClientProps = {
  material: GeneratedMaterial;
  student: User;
};

export function StudentPageClient({
  material,
  student
}: StudentPageClientProps) {
  const [isReviewed, setIsReviewed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [recentDownloads, setRecentDownloads] = useState<DownloadItem[]>(
    demoStudent.recentDownloads
  );
  const [statusMessage, setStatusMessage] = useState(
    "Tu material está listo para repasar y guardar en tu biblioteca personal."
  );
  const [downloadMessage, setDownloadMessage] = useState(
    "Puedes abrir o descargar otra vez tus materiales guardados para repasar sin conexión."
  );

  function normalizeDownloads(candidate: unknown): DownloadItem[] {
    if (!Array.isArray(candidate)) {
      return demoStudent.recentDownloads;
    }

    return candidate
      .map((item, index) => {
        if (typeof item === "string") {
          const sanitizedName =
            item
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "") || `material-${index + 1}`;

          return {
            id: `legacy-${index + 1}`,
            title: item.replace(/\.[a-z0-9]+$/i, ""),
            description: "Material migrado desde una descarga previa del navegador.",
            downloadName: `${sanitizedName}.txt`
          };
        }

        if (
          item &&
          typeof item === "object" &&
          "id" in item &&
          "title" in item &&
          "description" in item &&
          "downloadName" in item
        ) {
          return item as DownloadItem;
        }

        return null;
      })
      .filter(Boolean) as DownloadItem[];
  }

  useEffect(() => {
    const reviewedMaterials = JSON.parse(
      window.localStorage.getItem(REVIEWED_KEY) ?? "[]"
    ) as string[];
    const savedMaterials = JSON.parse(
      window.localStorage.getItem(SAVED_KEY) ?? "[]"
    ) as string[];

    setIsReviewed(reviewedMaterials.includes(material.id));
    setIsSaved(savedMaterials.includes(material.id));

    const storedDownloads = window.localStorage.getItem(DOWNLOADS_KEY);

    if (storedDownloads) {
      try {
        setRecentDownloads(normalizeDownloads(JSON.parse(storedDownloads)));
      } catch {
        window.localStorage.removeItem(DOWNLOADS_KEY);
      }
    } else {
      window.localStorage.setItem(
        DOWNLOADS_KEY,
        JSON.stringify(demoStudent.recentDownloads)
      );
    }
  }, [material.id]);

  function updateDownloads(nextDownloads: DownloadItem[]) {
    setRecentDownloads(nextDownloads);
    window.localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(nextDownloads));
  }

  function buildDownloadContent(item: DownloadItem) {
    return [
      item.title,
      "",
      `Resumen: ${material.summary}`,
      "",
      "Pasos para repasar:",
      ...material.steps.map((step, index) => `${index + 1}. ${step}`),
      "",
      "Conceptos clave:",
      ...material.concepts.map((concept) => `- ${concept}`),
      "",
      "Glosario:",
      ...material.glossary.map((entry) => `- ${entry.term}: ${entry.definition}`),
      "",
      `Tarea: ${material.homeworkReminder}`
    ].join("\n");
  }

  function triggerFileDownload(item: DownloadItem) {
    const blob = new Blob([buildDownloadContent(item)], {
      type: "text/plain;charset=utf-8"
    });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = item.downloadName;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1200);
  }

  function updateDownloadOrder(item: DownloadItem) {
    const nextDownloads = [item, ...recentDownloads.filter((entry) => entry.id !== item.id)];
    updateDownloads(nextDownloads);
    return nextDownloads;
  }

  function handleDownload(item: DownloadItem) {
    triggerFileDownload(item);
    updateDownloadOrder(item);
    setDownloadMessage(`Se descargó nuevamente "${item.title}" en formato de estudio.`);
  }

  function handleOpen(item: DownloadItem) {
    const blob = new Blob([buildDownloadContent(item)], {
      type: "text/plain;charset=utf-8"
    });
    const previewUrl = URL.createObjectURL(blob);
    window.open(previewUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(previewUrl), 2000);
    updateDownloadOrder(item);
    setDownloadMessage(`Se abrió una vista de lectura para "${item.title}".`);
  }

  function handleReview() {
    const reviewedMaterials = JSON.parse(
      window.localStorage.getItem(REVIEWED_KEY) ?? "[]"
    ) as string[];

    if (!reviewedMaterials.includes(material.id)) {
      reviewedMaterials.push(material.id);
      window.localStorage.setItem(REVIEWED_KEY, JSON.stringify(reviewedMaterials));
    }

    setIsReviewed(true);
    setStatusMessage("Material marcado como revisado. Ya quedó registrado en tu seguimiento personal.");
  }

  function handleSave() {
    const savedMaterials = JSON.parse(
      window.localStorage.getItem(SAVED_KEY) ?? "[]"
    ) as string[];

    if (!savedMaterials.includes(material.id)) {
      savedMaterials.push(material.id);
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedMaterials));
    }

    setIsSaved(true);
    setStatusMessage("Material guardado correctamente. Ya aparece en tu biblioteca de estudio.");

    const generatedDownload: DownloadItem = {
      id: material.id,
      title: material.title,
      description: "Material guardado desde tu sesión actual de estudio.",
      downloadName: `${material.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "material-aulaadapt"}.txt`
    };

    updateDownloads([
      generatedDownload,
      ...recentDownloads.filter((item) => item.id !== material.id)
    ]);
  }

  return (
    <AppShell
      role="student"
      title={`Bienvenido, ${student.name}`}
      subtitle="Encuentra rápido lo importante de cada clase: resumen, pasos, conceptos y tarea en un solo lugar."
    >
      <div className="student-hero">
        <div className="class-of-day">
          <span className="hero-kicker">Clase del día</span>
          <h2>{material.title}</h2>
          <p>{material.summary}</p>
        </div>
        <div className="student-filters">
          {demoStudent.feedFilters.map((filter) => (
            <Tag key={filter}>{filter}</Tag>
          ))}
        </div>
      </div>

      <div className="dashboard-grid" id="materiales">
        <SectionCard title="Resumen postclase" description="Versión principal de estudio">
          <p className="reading-block">{material.summary}</p>
        </SectionCard>
        <SectionCard
          title="Vista adaptada"
          description="Lenguaje claro y estructura segmentada"
          accent="mint"
        >
          <p className="reading-block">{material.simplifiedVersion}</p>
          <div className="inline-tags">
            {material.selectedAdaptations.map((adaptation) => (
              <Tag key={adaptation}>{adaptation.replaceAll("_", " ")}</Tag>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Pasos para repasar" description="Sigue esta ruta para estudiar">
          <InfoList items={material.steps} />
        </SectionCard>
        <SectionCard
          title="Glosario sencillo"
          description="Conceptos clave explicados con lenguaje simple"
          accent="sky"
        >
          <div className="glossary-list">
            {material.glossary.map((item) => (
              <article key={item.term}>
                <h3>{item.term}</h3>
                <p>{item.definition}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid" id="materias">
        <SectionCard title="Materias" description="Accede por asignatura, fecha o docente">
          <div className="inline-tags">
            <Tag>Biología</Tag>
            <Tag>Comunicación</Tag>
            <Tag>22 mar 2026</Tag>
            <Tag>Docente D06</Tag>
          </div>
        </SectionCard>
        <SectionCard title="Conceptos clave" description="Ideas centrales de la clase" accent="sky">
          <div className="inline-tags">
            {material.concepts.map((concept) => (
              <Tag key={concept}>{concept}</Tag>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid" id="tareas">
        <SectionCard title="Tarea y entregable" description="Lo más importante para después de clase">
          <div className="task-card">
            <strong>{material.homeworkReminder}</strong>
            <p>Marca esta actividad como revisada cuando termines de leer el material.</p>
            <div className="cta-row">
              <button className="primary-button" type="button" onClick={handleReview}>
                {isReviewed ? "Revisado" : "Marcar como revisado"}
              </button>
              <button className="ghost-button" type="button" onClick={handleSave}>
                {isSaved ? "Guardado" : "Guardar material"}
              </button>
            </div>
            <p className="action-feedback">{statusMessage}</p>
          </div>
        </SectionCard>
        <SectionCard title="Esquema breve" description="Apoyo visual rápido">
          <InfoList items={material.visualOutline} />
          <div className="stack-list compact-stack">
            {demoStudent.helperCards.map((card) => (
              <article key={card.title} className="list-card compact">
                <strong>{card.title}</strong>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard
          title="Descargas recientes"
          description="Materiales guardados para repaso sin conexión"
        >
          <div className="stack-list">
            {recentDownloads.map((item) => (
              <article key={item.id} className="list-card compact download-card">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
                <div className="cta-row">
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() => handleOpen(item)}
                  >
                    Abrir
                  </button>
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => handleDownload(item)}
                  >
                    Descargar otra vez
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="action-feedback">{downloadMessage}</p>
        </SectionCard>
        <SectionCard
          title="Privacidad y apoyos"
          description="Tu experiencia se adapta sin exponer información sensible"
          accent="mint"
        >
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Material privado por perfil</strong>
              <p>Solo ves los apoyos pedagógicos que corresponden a tu configuración autorizada.</p>
            </article>
            <article className="list-card compact">
              <strong>Lectura clara</strong>
              <p>Puedes ajustar tamaño de letra, contraste y densidad visual desde configuración.</p>
            </article>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
