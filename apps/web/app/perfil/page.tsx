import { AppShell } from "../../components/AppShell";
import { SectionCard, Tag } from "../../components/Ui";
import { teacher } from "../../lib/data";
import { demoProfile } from "../../lib/demo";

export default function ProfilePage() {
  return (
    <AppShell
      role="teacher"
      title="Perfil y personalización"
      subtitle="Administra tu información visible, fotografía y preferencias visuales dentro de una experiencia profesional y accesible."
    >
      <div className="dashboard-grid">
        <SectionCard title="Datos visibles" description="Información principal del usuario">
          <div className="list-card">
            <div className="profile-header">
              <span className="profile-avatar">MG</span>
              <div>
                <strong>{teacher.name}</strong>
                <p>{teacher.school}</p>
              </div>
            </div>
          </div>
          <form className="form-grid">
            <label>
              Nombre visible
              <input type="text" defaultValue={teacher.name} />
            </label>
            <label>
              Rol
              <input type="text" defaultValue="Docente" />
            </label>
            <label className="full-span">
              Grupo principal
              <input type="text" defaultValue="5A · Biología" />
            </label>
          </form>
        </SectionCard>

        <SectionCard title="Fotografía de perfil" description="Carga, recorte y vista previa" accent="sky">
          <div className="stack-list">
            <article className="list-card compact">
              <strong>Formatos admitidos</strong>
              <p>JPG y PNG con validación básica de tamaño antes de guardarse.</p>
            </article>
            <div className="inline-tags">
              {demoProfile.avatarActions.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Apariencia visual" description="Controla tema, color principal, contraste y densidad">
          <form className="form-grid">
            <label>
              Tema
              <select defaultValue="Claro">
                {demoProfile.appearanceModes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Color principal
              <select defaultValue="Azul petróleo">
                {demoProfile.accentColors.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Densidad visual
              <select defaultValue="Cómoda">
                {demoProfile.densityModes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Contraste
              <select defaultValue="Estándar">
                {demoProfile.contrastModes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </form>
        </SectionCard>

        <SectionCard title="Vista previa de lectura" description="Así se verán tus materiales" accent="mint">
          <div className="preview-card">
            <strong>Resumen con lectura clara</strong>
            <p>
              La interfaz mantiene estructura por bloques, alto contraste moderado y densidad configurable para priorizar comprensión y repaso postclase.
            </p>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
