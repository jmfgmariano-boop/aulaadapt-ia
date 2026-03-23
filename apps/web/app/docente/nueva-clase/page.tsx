import { AppShell } from "../../../components/AppShell";
import { FlowSteps, InfoList, SectionCard, Tag } from "../../../components/Ui";
import { adaptations, outputs, teacherGroups, teacherSubjects } from "../../../lib/data";
import { demoTeacher } from "../../../lib/demo";

export default function NewClassPage() {
  return (
    <AppShell
      role="teacher"
      title="Crear nueva clase"
      subtitle="Captura el contenido de la sesión, selecciona salidas y define adaptaciones neutrales antes de generar materiales."
    >
      <div className="composer-grid">
        <SectionCard title="Datos de la sesión" description="Contexto académico de la clase">
          <form className="form-grid">
            <label>
              Materia
              <select defaultValue={teacherSubjects[0]?.id}>
                {teacherSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Grupo
              <select defaultValue={teacherGroups[0]?.id}>
                {teacherGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} - {group.grade}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Fecha
              <input type="date" defaultValue="2026-03-22" />
            </label>
            <label>
              Tema
              <input type="text" defaultValue="Fotosíntesis y flujo de energía" />
            </label>
            <label className="full-span">
              Explicación o texto base
              <textarea defaultValue="Hoy explicamos cómo las plantas transforman la luz en energía química, revisamos entradas y salidas del proceso y conectamos el tema con los ecosistemas." />
            </label>
            <label>
              Subir audio
              <input type="file" />
            </label>
            <label>
              Material base
              <input type="file" />
            </label>
            <div className="full-span recorder-panel">
              <div className="recorder-header">
                <div>
                  <strong>Grabar audio desde la app</strong>
                  <p>Inicia una grabación rápida para capturar la explicación de clase sin salir del flujo docente.</p>
                </div>
                <span className="recording-pill">Micrófono listo</span>
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
                <button className="primary-button" type="button">
                  Iniciar grabación
                </button>
                <button className="ghost-button" type="button">
                  Pausar
                </button>
                <button className="ghost-button" type="button">
                  Detener y adjuntar
                </button>
              </div>
            </div>
            <label className="full-span">
              Puntos clave
              <textarea defaultValue={"- Función de la clorofila\n- Producción de glucosa\n- Importancia del oxígeno"} />
            </label>
            <label className="full-span">
              Tarea o actividad
              <textarea defaultValue="Crear un esquema simple de entradas y salidas de la fotosíntesis." />
            </label>
          </form>
        </SectionCard>

        <div className="stack-area">
          <SectionCard title="Salidas a generar" description="Selecciona los componentes del material postclase" accent="sky">
            <div className="tag-grid">
              {outputs.map((output) => (
                <Tag key={output}>{output}</Tag>
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
                  <input type="checkbox" defaultChecked={adaptation.id !== "comprension_general"} />
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
              <button className="primary-button" type="button">
                Generar materiales
              </button>
              <button className="ghost-button" type="button">
                Guardar borrador
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
