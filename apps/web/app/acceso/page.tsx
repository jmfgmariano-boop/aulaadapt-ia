import Link from "next/link";
import { RoleSwitcher } from "../../components/RoleSwitcher";
import { SectionCard, Tag } from "../../components/Ui";
import { demoAccess, demoConfig, demoRoutes } from "../../lib/demo";

export default function AccessPage() {
  return (
    <main className="landing-page">
      <section className="landing-topbar">
        <Link className="brand brand-inline" href="/">
          <span className="brand-mark">A</span>
          <div>
            <strong>AulaAdapt IA</strong>
            <p>{demoConfig.schoolName}</p>
          </div>
        </Link>
        <div className="landing-topbar-actions">
          <Tag>Acceso seguro</Tag>
          <Link className="ghost-button" href="/ayuda">
            Ayuda
          </Link>
        </div>
      </section>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="hero-kicker">Ingreso institucional</span>
          <h1>{demoAccess.title}</h1>
          <p>{demoAccess.description}</p>
          <div className="profile-selector-card">
            <div className="profile-selector-copy">
              <span>Seleccionar perfil</span>
              <p>Elige el recorrido que deseas revisar dentro de la plataforma.</p>
            </div>
            <RoleSwitcher />
          </div>
        </div>

        <SectionCard title="Iniciar sesión" description="Acceso por correo institucional y contraseña" accent="sky">
          <form className="form-grid">
            <label>
              Correo institucional
              <input type="email" placeholder="nombre@edu.uag.mx" defaultValue="m.gomez@edu.uag.mx" />
            </label>
            <label>
              Contraseña
              <input type="password" defaultValue="AulaAdapt2026" />
            </label>
            <label className="full-span">
              Recuperación de acceso
              <input type="text" placeholder="Solicitar enlace de recuperación" defaultValue="Enlace enviado al correo institucional" />
            </label>
          </form>
          <div className="cta-row">
            <Link className="primary-button" href={demoRoutes.teacher}>
              Entrar al panel docente
            </Link>
            <Link className="ghost-button" href="/perfil">
              Ver perfil
            </Link>
          </div>
        </SectionCard>
      </section>

      <section className="role-section">
        <div className="section-title">
          <span>Recorridos disponibles</span>
          <h2>Cada perfil entra con una experiencia clara, privada y enfocada en su tarea principal.</h2>
        </div>
        <div className="role-grid">
          {demoAccess.roles.map((item) => (
            <article key={item.role} className="role-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Link href={demoRoutes[item.role]}>Abrir recorrido</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
