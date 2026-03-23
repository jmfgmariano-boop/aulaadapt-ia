import Link from "next/link";
import { ReactNode } from "react";
import { DemoBanner } from "./DemoBanner";
import { RoleSwitcher } from "./RoleSwitcher";
import { demoConfig } from "../lib/demo";

type NavItem = {
  href: string;
  label: string;
};

const navByRole: Record<"teacher" | "student" | "admin", NavItem[]> = {
  teacher: [
    { href: "/docente", label: "Dashboard" },
    { href: "/docente/nueva-clase", label: "Nueva clase" },
    { href: "/docente#historial", label: "Historial" },
    { href: "/docente/materiales", label: "Materiales" },
    { href: "/docente#grupos", label: "Grupos" },
    { href: "/configuracion", label: "Configuracion" }
  ],
  student: [
    { href: "/estudiante", label: "Inicio" },
    { href: "/estudiante#materiales", label: "Materiales" },
    { href: "/estudiante#materias", label: "Materias" },
    { href: "/estudiante#tareas", label: "Tareas" },
    { href: "/configuracion", label: "Configuracion" }
  ],
  admin: [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin#docentes", label: "Docentes" },
    { href: "/admin#grupos", label: "Grupos" },
    { href: "/admin#materias", label: "Materias" },
    { href: "/admin#reportes", label: "Reportes" },
    { href: "/configuracion", label: "Configuracion" }
  ]
};

export function AppShell({
  role,
  title,
  subtitle,
  children
}: {
  role: "teacher" | "student" | "admin";
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">A</span>
          <div>
            <strong>AulaAdapt IA</strong>
            <p>{demoConfig.schoolName} - experiencia demo publica</p>
          </div>
        </Link>
        <RoleSwitcher />
        <nav className="nav-list">
          {navByRole[role].map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ethics-card">
          <span>Uso responsable</span>
          <p>La IA apoya. El docente decide. No se realizan diagnosticos.</p>
        </div>
      </aside>
      <main className="content-area">
        <DemoBanner />
        <header className="topbar">
          <div>
            <p className="eyebrow">{role === "teacher" ? "Panel docente" : role === "student" ? "Panel estudiante" : "Panel administrativo"}</p>
            <h1>{title}</h1>
            <p className="topbar-copy">{subtitle}</p>
          </div>
          <div className="topbar-actions">
            <span className="status-pill">Demo publica - {demoConfig.appMode}</span>
            <Link className="ghost-button" href="/configuracion">
              Preferencias
            </Link>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
