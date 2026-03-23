import { AppShell } from "../../../components/AppShell";
import { InfoList, SectionCard, Tag } from "../../../components/Ui";
import { adaptations, outputs, teacherGroups, teacherSubjects } from "../../../lib/data";

export default function NewClassPage() {
  return (
    <AppShell
      role="teacher"
      title="Crear nueva clase"
      subtitle="Captura el contenido de la sesion, selecciona salidas y define adaptaciones neutrales antes de generar materiales."
    >
      <div className="composer-grid">
        <SectionCard title="Datos de la sesion" description="Contexto academico de la clase">
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
              <input type="text" defaultValue="Fotosintesis y flujo de energia" />
            </label>
            <label className="full-span">
              Explicacion o texto base
              <textarea defaultValue="Hoy explicamos como las plantas transforman la luz en energia quimica, revisamos entradas y salidas del proceso y conectamos el tema con los ecosistemas." />
            </label>
            <label>
              Audio
              <input type="file" />
            </label>
            <label>
              Material base
              <input type="file" />
            </label>
            <label className="full-span">
              Puntos clave
              <textarea defaultValue={"- Funcion de la clorofila\n- Produccion de glucosa\n- Importancia del oxigeno"} />
            </label>
            <label className="full-span">
              Tarea o actividad
              <textarea defaultValue="Crear un esquema simple de entradas y salidas de la fotosintesis." />
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

          <SectionCard title="Adaptaciones" description="Apoyos pedagogicos neutrales, sin diagnosticos" accent="mint">
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

          <SectionCard title="Antes de generar" description="Validaciones pedagogicas y eticas">
            <InfoList
              items={[
                "La IA producira un borrador editable, no una version definitiva.",
                "No se solicitan diagnosticos ni clasificaciones clinicas.",
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
