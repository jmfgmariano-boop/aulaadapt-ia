"use client";

import type { GeneratedMaterial } from "@aulaadapt/domain";
import { useEffect, useRef, useState, useTransition } from "react";
import { FlowSteps, InfoList, SectionCard } from "../../../components/Ui";
import { adaptations, outputs, teacherGroups, teacherSubjects } from "../../../lib/data";
import { demoTeacher } from "../../../lib/demo";
import { SELECTED_TEMPLATE_STORAGE_KEY } from "../../../lib/user-preferences";

type DraftState = {
  subjectId: string;
  groupId: string;
  date: string;
  topic: string;
  explanation: string;
  keyPoints: string;
  assignment: string;
  observations: string;
  selectedOutputs: string[];
  selectedAdaptations: string[];
};

type GenerationResponse = {
  ok: boolean;
  message?: string;
  data?: {
    material: GeneratedMaterial;
    source: "openai" | "fallback";
    note?: string;
  };
};

const DRAFT_STORAGE_KEY = "aulaadapt-draft";
const GENERATED_STORAGE_KEY = "aulaadapt-generated-material";

const initialDraft: DraftState = {
  subjectId: teacherSubjects[0]?.id || "",
  groupId: teacherGroups[0]?.id || "",
  date: "2026-03-22",
  topic: "Fotosíntesis y flujo de energía",
  explanation:
    "Hoy explicamos cómo las plantas transforman la luz en energía química, revisamos entradas y salidas del proceso y conectamos el tema con los ecosistemas.",
  keyPoints:
    "- Función de la clorofila\n- Producción de glucosa\n- Importancia del oxígeno",
  assignment: "Crear un esquema simple de entradas y salidas de la fotosíntesis.",
  observations: "Grupo con buen ritmo general. Conviene reforzar conceptos clave con lenguaje claro y estructura visual.",
  selectedOutputs: [...outputs],
  selectedAdaptations: adaptations
    .filter((adaptation) => adaptation.id !== "comprension_general")
    .map((adaptation) => adaptation.id)
};

export function NewClassComposerClient() {
  const [draft, setDraft] = useState<DraftState>(initialDraft);
  const [generatedMaterial, setGeneratedMaterial] = useState<GeneratedMaterial | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [resultNote, setResultNote] = useState<string>("");
  const [resultSource, setResultSource] = useState<"openai" | "fallback" | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string>("");
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [uploadedAudioFile, setUploadedAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [recorderState, setRecorderState] = useState<"idle" | "recording" | "paused" | "ready">(
    "idle"
  );
  const [hasUploadedAudio, setHasUploadedAudio] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isTranscribing, startTranscribing] = useTransition();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const storedDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    const storedGenerated = window.localStorage.getItem(GENERATED_STORAGE_KEY);
    const selectedTemplateId = window.localStorage.getItem(SELECTED_TEMPLATE_STORAGE_KEY);
    let nextDraft = initialDraft;

    if (storedDraft) {
      try {
        nextDraft = JSON.parse(storedDraft) as DraftState;
      } catch {
        window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    }

    if (selectedTemplateId) {
      const selectedTemplate = demoTeacher.templates.find(
        (template) => template.id === selectedTemplateId
      );

      if (selectedTemplate) {
        nextDraft = {
          ...nextDraft,
          selectedOutputs: [...selectedTemplate.recommendedOutputs],
          selectedAdaptations: [...selectedTemplate.recommendedAdaptations],
          observations: nextDraft.observations.includes(selectedTemplate.title)
            ? nextDraft.observations
            : `${nextDraft.observations}\n\nPlantilla aplicada: ${selectedTemplate.title}. ${selectedTemplate.focus}`
        };

        setStatusMessage(
          `La plantilla "${selectedTemplate.title}" se aplicó al borrador actual.`
        );
      }

      window.localStorage.removeItem(SELECTED_TEMPLATE_STORAGE_KEY);
    }

    setDraft(nextDraft);

    if (storedGenerated) {
      try {
        const parsed = JSON.parse(storedGenerated) as GeneratedMaterial;
        setGeneratedMaterial(parsed);
      } catch {
        window.localStorage.removeItem(GENERATED_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioPreviewUrl]);

  function updateDraftField<K extends keyof DraftState>(key: K, value: DraftState[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function toggleSelection(key: "selectedOutputs" | "selectedAdaptations", value: string) {
    setDraft((current) => {
      const exists = current[key].includes(value);
      return {
        ...current,
        [key]: exists ? current[key].filter((item) => item !== value) : [...current[key], value]
      };
    });
  }

  function saveDraft() {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    setStatusMessage("Borrador guardado localmente en este navegador.");
  }

  async function handleGenerate() {
    setStatusMessage("");
    setResultNote("");

    startTransition(async () => {
      const selectedSubject = teacherSubjects.find((subject) => subject.id === draft.subjectId);
      const selectedGroup = teacherGroups.find((group) => group.id === draft.groupId);

      const response = await fetch("/api/sessions/live-preview/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...draft,
          subjectName: selectedSubject?.name,
          groupName: selectedGroup?.name,
          hasRecordedAudio: Boolean(audioPreviewUrl),
          hasUploadedAudio
        })
      });

      const payload = (await response.json()) as GenerationResponse;

      if (!response.ok || !payload.ok || !payload.data) {
        setStatusMessage(payload.message || "No se pudo generar el material.");
        return;
      }

      setGeneratedMaterial(payload.data.material);
      setResultSource(payload.data.source);
      setStatusMessage(payload.message || "Material generado correctamente.");
      setResultNote(payload.data.note || "");
      window.localStorage.setItem(GENERATED_STORAGE_KEY, JSON.stringify(payload.data.material));
    });
  }

  async function startRecording() {
    if (recorderState === "recording") {
      return;
    }

    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setStatusMessage("Este navegador no permite grabación de audio desde la app.");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;

    const recorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    });

    recorder.addEventListener("stop", () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const nextUrl = URL.createObjectURL(blob);
      setRecordedAudioBlob(blob);
      setAudioPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return nextUrl;
      });
      setRecorderState("ready");

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    });

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecorderState("recording");
    setStatusMessage("Grabación iniciada.");
  }

  function pauseRecording() {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    if (recorder.state === "recording") {
      recorder.pause();
      setRecorderState("paused");
      setStatusMessage("Grabación pausada.");
      return;
    }

    if (recorder.state === "paused") {
      recorder.resume();
      setRecorderState("recording");
      setStatusMessage("Grabación reanudada.");
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") return;
    recorder.stop();
    setStatusMessage("Audio adjuntado al borrador local.");
  }

  async function handleTranscription() {
    const fileToTranscribe =
      uploadedAudioFile ||
      (recordedAudioBlob
        ? new File([recordedAudioBlob], "grabacion-clase.webm", { type: recordedAudioBlob.type || "audio/webm" })
        : null);

    if (!fileToTranscribe) {
      setStatusMessage("Primero carga o graba un audio para poder transcribirlo.");
      return;
    }

    setStatusMessage("");

    startTranscribing(async () => {
      const formData = new FormData();
      formData.append("file", fileToTranscribe);

      const response = await fetch("/api/audio/transcribe", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        data?: { transcript: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        setStatusMessage(payload.message || "No se pudo transcribir el audio.");
        return;
      }

      const transcriptText = payload.data.transcript;

      setTranscript(transcriptText);
      setDraft((current) => ({
        ...current,
        explanation: current.explanation
          ? `${current.explanation}\n\nTranscripción de apoyo:\n${transcriptText}`
          : transcriptText
      }));
      setStatusMessage(payload.message || "Audio transcrito correctamente.");
    });
  }

  return (
    <div className="composer-grid">
      <SectionCard title="Datos de la sesión" description="Contexto académico de la clase">
        <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
          <label>
            Materia
            <select
              value={draft.subjectId}
              onChange={(event) => updateDraftField("subjectId", event.target.value)}
            >
              {teacherSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Grupo
            <select
              value={draft.groupId}
              onChange={(event) => updateDraftField("groupId", event.target.value)}
            >
              {teacherGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name} - {group.grade}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fecha
            <input
              type="date"
              value={draft.date}
              onChange={(event) => updateDraftField("date", event.target.value)}
            />
          </label>
          <label>
            Tema
            <input
              type="text"
              value={draft.topic}
              onChange={(event) => updateDraftField("topic", event.target.value)}
            />
          </label>
          <label className="full-span">
            Explicación o texto base
            <textarea
              value={draft.explanation}
              onChange={(event) => updateDraftField("explanation", event.target.value)}
            />
          </label>
          <label>
            Subir audio
            <input
              type="file"
              accept="audio/*"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                setUploadedAudioFile(file);
                setHasUploadedAudio(Boolean(file));
              }}
            />
          </label>
          <label>
            Material base
            <input type="file" accept=".pdf,image/*" />
          </label>
          <div className="full-span recorder-panel">
            <div className="recorder-header">
              <div>
                <strong>Grabar audio desde la app</strong>
                <p>Captura una explicación rápida sin salir del flujo docente y adjunta el audio al borrador actual.</p>
              </div>
              <span className="recording-pill">
                {recorderState === "recording"
                  ? "Grabando"
                  : recorderState === "paused"
                    ? "Grabación pausada"
                    : recorderState === "ready"
                      ? "Audio listo"
                      : "Micrófono listo"}
              </span>
            </div>
            <div className="wave-bars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <FlowSteps items={demoTeacher.recorderSteps} />
            <div className="cta-row">
              <button className="primary-button" type="button" onClick={startRecording}>
                Iniciar grabación
              </button>
              <button className="ghost-button" type="button" onClick={pauseRecording}>
                {recorderState === "paused" ? "Reanudar" : "Pausar"}
              </button>
              <button className="ghost-button" type="button" onClick={stopRecording}>
                Detener y adjuntar
              </button>
              <button className="ghost-button" type="button" onClick={handleTranscription} disabled={isTranscribing}>
                {isTranscribing ? "Transcribiendo..." : "Transcribir audio"}
              </button>
            </div>
            {audioPreviewUrl ? (
              <div className="audio-preview-card">
                <strong>Audio adjuntado</strong>
                <audio controls src={audioPreviewUrl} />
              </div>
            ) : null}
            {transcript ? (
              <div className="audio-preview-card">
                <strong>Transcripción detectada</strong>
                <p>{transcript}</p>
              </div>
            ) : null}
          </div>
          <label className="full-span">
            Puntos clave
            <textarea
              value={draft.keyPoints}
              onChange={(event) => updateDraftField("keyPoints", event.target.value)}
            />
          </label>
          <label className="full-span">
            Tarea o actividad
            <textarea
              value={draft.assignment}
              onChange={(event) => updateDraftField("assignment", event.target.value)}
            />
          </label>
          <label className="full-span">
            Observaciones de la clase
            <textarea
              value={draft.observations}
              onChange={(event) => updateDraftField("observations", event.target.value)}
            />
          </label>
        </form>
      </SectionCard>

      <div className="stack-area">
        <SectionCard title="Salidas a generar" description="Selecciona los componentes del material postclase" accent="sky">
          <div className="preference-list">
            {outputs.map((output) => (
              <article key={output} className="choice-card">
                <div>
                  <strong>{output}</strong>
                  <p>Se incluirá dentro del material postclase si permanece seleccionado.</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.selectedOutputs.includes(output)}
                  onChange={() => toggleSelection("selectedOutputs", output)}
                />
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Adaptaciones" description="Apoyos pedagógicos neutrales, sin diagnósticos" accent="mint">
          <div className="preference-list">
            {adaptations.map((adaptation) => (
              <article key={adaptation.id} className="choice-card">
                <div>
                  <strong>{adaptation.label}</strong>
                  <p>{adaptation.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.selectedAdaptations.includes(adaptation.id)}
                  onChange={() => toggleSelection("selectedAdaptations", adaptation.id)}
                />
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Antes de generar" description="Validaciones pedagógicas y éticas">
          <InfoList
            items={[
              "La IA producirá un borrador editable, no una versión definitiva.",
              "No se solicitan diagnósticos ni clasificaciones clínicas.",
              "El material puede asignarse por grupo o de forma individual.",
              "La entrega puede ser inmediata o programada."
            ]}
          />
          <div className="cta-row">
            <button className="primary-button" type="button" onClick={handleGenerate} disabled={isPending}>
              {isPending ? "Generando..." : "Generar materiales con IA"}
            </button>
            <button className="ghost-button" type="button" onClick={saveDraft}>
              Guardar borrador
            </button>
          </div>
          {statusMessage ? <p className="helper-copy status-message">{statusMessage}</p> : null}
          {resultNote ? <p className="helper-copy status-message">{resultNote}</p> : null}
        </SectionCard>
      </div>

      {generatedMaterial ? (
        <div className="full-span generated-material-panel">
          <SectionCard
            title="Borrador generado"
            description={
              resultSource === "openai"
                ? "Contenido sugerido por IA y listo para revisión docente."
                : "Contenido de respaldo para mantener el flujo operativo mientras configuras la IA."
            }
            accent="sky"
          >
            <div className="dashboard-grid">
              <article className="preview-card">
                <strong>{generatedMaterial.title}</strong>
                <p>{generatedMaterial.summary}</p>
              </article>
              <article className="preview-card">
                <strong>Versión simplificada</strong>
                <p>{generatedMaterial.simplifiedVersion}</p>
              </article>
            </div>

            <div className="dashboard-grid">
              <article className="preview-card">
                <strong>Pasos de actividad</strong>
                <InfoList items={generatedMaterial.steps} />
              </article>
              <article className="preview-card">
                <strong>Recordatorio de tarea</strong>
                <p>{generatedMaterial.homeworkReminder}</p>
                <strong>Conceptos clave</strong>
                <div className="inline-tags">
                  {generatedMaterial.concepts.map((concept) => (
                    <span key={concept} className="tag">
                      {concept}
                    </span>
                  ))}
                </div>
              </article>
            </div>

            <article className="preview-card">
              <strong>Glosario</strong>
              <div className="glossary-list">
                {generatedMaterial.glossary.map((item) => (
                  <article key={item.term}>
                    <h3>{item.term}</h3>
                    <p>{item.definition}</p>
                  </article>
                ))}
              </div>
            </article>
          </SectionCard>
        </div>
      ) : null}
    </div>
  );
}
