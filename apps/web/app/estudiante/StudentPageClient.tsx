"use client";

import { useEffect, useMemo, useState } from "react";
import type { GeneratedMaterial, User } from "@aulaadapt/domain";
import { AppShell } from "../../components/AppShell";
import { AppIcon, InfoList, SectionCard, Tag } from "../../components/Ui";
import { demoStudent } from "../../lib/demo";

const REVIEWED_KEY = "aulaadapt-reviewed-materials";
const SAVED_KEY = "aulaadapt-saved-materials";
const DOWNLOADS_KEY = "aulaadapt-recent-downloads";
const FAVORITES_KEY = "aulaadapt-student-favorites";

type DownloadItem = (typeof demoStudent.recentDownloads)[number];

type StudentPageClientProps = {
  material: GeneratedMaterial;
  student: User;
};

export function StudentPageClient({
  material,
  student
}: StudentPageClientProps) {
  const [activeWorkspace, setActiveWorkspace] = useState<"clase" | "historial" | "guardados">(
    "clase"
  );
  const [isReviewed, setIsReviewed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [viewMode, setViewMode] = useState<"resumida" | "detallada">("resumida");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [favoriteTopics, setFavoriteTopics] = useState<string[]>(demoStudent.favorites);
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

    const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      try {
        setFavoriteTopics(JSON.parse(storedFavorites) as string[]);
      } catch {
        window.localStorage.removeItem(FAVORITES_KEY);
      }
    }
  }, [material.id]);

  const filteredHistory = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return demoStudent.subjectHistory.filter((item) => {
      const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject;
      const matchesSearch =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.subject.toLowerCase().includes(normalized) ||
        item.date.toLowerCase().includes(normalized);
      return matchesSubject && matchesSearch;
    });
  }, [searchTerm, selectedSubject]);

  function updateFavorites(nextFavorites: string[]) {
    setFavoriteTopics(nextFavorites);
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
  }

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

  function toggleFavorite(topic: string) {
    const nextFavorites = favoriteTopics.includes(topic)
      ? favoriteTopics.filter((item) => item !== topic)
      : [topic, ...favoriteTopics];

    updateFavorites(nextFavorites);
    setStatusMessage(
      nextFavorites.includes(topic)
        ? `"${topic}" se agregó a tus favoritos.`
        : `"${topic}" se quitó de tus favoritos.`
    );
  }

  return (
    <AppShell
      role="student"
      title={`Bienvenido, ${student.name}`}
      subtitle="Encuentra rápido lo importante de cada clase con una vista clara para repasar, guardar y volver a consultar."
    >
      <div className="workspace-strip">
        <button
          className={`workspace-chip ${activeWorkspace === "clase" ? "active" : ""}`}
          type="button"
          onClick={() => setActiveWorkspace("clase")}
        >
          Clase de hoy
        </button>
        <button
          className={`workspace-chip ${activeWorkspace === "historial" ? "active" : ""}`}
          type="button"
          onClick={() => setActiveWorkspace("historial")}
        >
          Historial
        </button>
        <button
          className={`workspace-chip ${activeWorkspace === "guardados" ? "active" : ""}`}
          type="button"
          onClick={() => setActiveWorkspace("guardados")}
        >
          Guardados
        </button>
      </div>

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

      <div className="mini-stat-grid">
        <article className="mini-stat-card">
          <span>Materiales nuevos</span>
          <strong>
            {demoStudent.subjectHistory.filter((item) => item.status === "Nuevo").length}
          </strong>
        </article>
        <article className="mini-stat-card">
          <span>Guardados</span>
          <strong>{recentDownloads.length}</strong>
        </article>
        <article className="mini-stat-card">
          <span>Favoritos</span>
          <strong>{favoriteTopics.length}</strong>
        </article>
      </div>

      {activeWorkspace === "historial" ? (
        <div className="dashboard-grid">
          <SectionCard title="Explorar materiales" description="Busca por fecha, tema o materia">
            <div className="form-grid">
              <label>
                Buscar material
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Ejemplo: Fotosíntesis o Texto argumentativo"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </label>
              <label>
                Materia
                <select
                  value={selectedSubject}
                  onChange={(event) => setSelectedSubject(event.target.value)}
                >
                  <option value="all">Todas las materias</option>
                  {Array.from(new Set(demoStudent.subjectHistory.map((item) => item.subject))).map(
                    (subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>

            <div className="stack-list compact-stack">
              {filteredHistory.map((item) => (
                <article key={`${item.subject}-${item.title}`} className="list-card compact history-item">
                  <div>
                    <strong>{item.title}</strong>
                    <p>
                      {item.subject} · {item.date}
                    </p>
                  </div>
                  <div className="inline-tags">
                    <Tag>{item.status}</Tag>
                    <button
                      className="ghost-button"
                      type="button"
                      onClick={() => toggleFavorite(item.title)}
                    >
                      <AppIcon name="bookmark" size={16} />
                      {favoriteTopics.includes(item.title) ? "Favorito" : "Guardar"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recordatorios y favoritos" description="Lo importante de esta semana" accent="sky">
            <div className="stack-list compact-stack">
              {demoStudent.reminders.map((reminder) => (
                <article key={reminder} className="list-card compact">
                  <strong>Recordatorio</strong>
                  <p>{reminder}</p>
                </article>
              ))}
              <article className="list-card compact">
                <strong>Favoritos</strong>
                <div className="inline-tags">
                  {favoriteTopics.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </article>
            </div>
          </SectionCard>
        </div>
      ) : null}

      {activeWorkspace === "clase" ? (
        <>
          <div className="dashboard-grid">
            <SectionCard title="Resumen postclase" description="Versión principal de estudio">
              <div className="view-toggle">
                <button
                  className={viewMode === "resumida" ? "primary-button" : "ghost-button"}
                  type="button"
                  onClick={() => setViewMode("resumida")}
                >
                  Vista resumida
                </button>
                <button
                  className={viewMode === "detallada" ? "primary-button" : "ghost-button"}
                  type="button"
                  onClick={() => setViewMode("detallada")}
                >
                  Vista detallada
                </button>
              </div>
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

          {viewMode === "detallada" ? (
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
          ) : null}

          {viewMode === "detallada" ? (
            <div className="dashboard-grid">
              <SectionCard title="Materias" description="Accede por asignatura, fecha o docente">
                <div className="inline-tags">
                  <Tag>Biología</Tag>
                  <Tag>Comunicación</Tag>
                  <Tag>22 mar 2026</Tag>
                  <Tag>Mariana Torres Villaseñor</Tag>
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
          ) : null}

          <div className="dashboard-grid">
            <SectionCard title="Tarea y entregable" description="Lo importante para después de clase">
              <div className="task-card">
                <strong>{material.homeworkReminder}</strong>
                <p>Marca esta actividad como revisada cuando termines de estudiar.</p>
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
        </>
      ) : null}

      {activeWorkspace === "guardados" ? (
        <div className="dashboard-grid">
          <SectionCard
            title="Descargas recientes"
            description="Materiales guardados para repaso sin conexión"
          >
            <div className="stack-list compact-stack">
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
            <div className="stack-list compact-stack">
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
      ) : null}
    </AppShell>
  );
}
