import { AppShell } from "../../components/AppShell";
import { SectionCard } from "../../components/Ui";
import { demoConfig } from "../../lib/demo";

export default function SettingsPage() {
  return (
    <AppShell
      role="teacher"
      title="Configuracion y accesibilidad"
      subtitle="Ajusta idioma, tamano de texto, notificaciones, privacidad y preferencias de entrega sin perder claridad visual."
    >
      <div className="dashboard-grid">
        <SectionCard title="Preferencias de lectura" description="Adaptaciones visuales de la interfaz">
          <form className="form-grid">
            <label>
              Idioma
              <select defaultValue="es">
                <option value="es">Espanol</option>
                <option value="en">English</option>
              </select>
            </label>
            <label>
              Tamano de texto
              <select defaultValue="large">
                <option value="normal">Normal</option>
                <option value="large">Grande</option>
                <option value="xlarge">Muy grande</option>
              </select>
            </label>
            <label className="full-span">
              Accesibilidad visual
              <div className="choice-card">
                <div>
                  <strong>Reducir ruido visual</strong>
                  <p>Usa superficies limpias, menos saturacion y mas segmentacion del contenido.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </label>
          </form>
        </SectionCard>

        <SectionCard title="Entrega y notificaciones" description="Control operativo" accent="sky">
          <form className="form-grid">
            <label>
              Canal preferido
              <select defaultValue="platform">
                <option value="platform">Plataforma interna</option>
                <option value="email">Correo institucional</option>
              </select>
            </label>
            <label>
              Notificaciones
              <select defaultValue="enabled">
                <option value="enabled">Activadas</option>
                <option value="disabled">Desactivadas</option>
              </select>
            </label>
          </form>
        </SectionCard>
      </div>

      <SectionCard title="Privacidad y uso responsable" description="Mensajes visibles en toda la experiencia" accent="mint">
        <div className="stack-list">
          <article className="list-card">
            <strong>La plataforma no realiza diagnosticos.</strong>
            <p>Las adaptaciones son apoyos pedagogicos neutrales seleccionados por el docente o la institucion.</p>
          </article>
          <article className="list-card">
            <strong>La IA no sustituye al docente.</strong>
            <p>Todo material pasa por una etapa de revision y aprobacion humana antes de enviarse.</p>
          </article>
          <article className="list-card">
            <strong>Proteccion de informacion.</strong>
            <p>Los reportes administrativos son agregados y evitan exponer datos sensibles individuales.</p>
          </article>
          <article className="list-card">
            <strong>Publicacion web.</strong>
            <p>Esta version esta preparada para compartirse como demo publica en Vercel con modo {demoConfig.appMode}.</p>
          </article>
        </div>
      </SectionCard>
    </AppShell>
  );
}
