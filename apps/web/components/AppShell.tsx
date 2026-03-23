"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { RoleSwitcher } from "./RoleSwitcher";
import { AppIcon } from "./Ui";
import { demoConfig } from "../lib/demo";

type NavItem = {
  href: string;
  label: string;
  icon:
    | "home"
    | "spark"
    | "users"
    | "book"
    | "history"
    | "template"
    | "bell"
    | "profile"
    | "settings"
    | "admin"
    | "task"
    | "report";
};

const navByRole: Record<"teacher" | "student" | "admin", NavItem[]> = {
  teacher: [
    { href: "/docente", label: "Inicio", icon: "home" },
    { href: "/docente/nueva-clase", label: "Nueva clase", icon: "spark" },
    { href: "/docente/materiales", label: "Materiales", icon: "book" },
    { href: "/docente/historial", label: "Historial", icon: "history" },
    { href: "/docente/plantillas", label: "Plantillas", icon: "template" },
    { href: "/docente/notificaciones", label: "Alertas", icon: "bell" },
    { href: "/perfil", label: "Perfil", icon: "profile" },
    { href: "/configuracion", label: "Ajustes", icon: "settings" }
  ],
  student: [
    { href: "/estudiante", label: "Inicio", icon: "home" },
    { href: "/estudiante#materiales", label: "Materiales", icon: "book" },
    { href: "/estudiante#materias", label: "Materias", icon: "users" },
    { href: "/estudiante#tareas", label: "Tareas", icon: "task" },
    { href: "/perfil", label: "Perfil", icon: "profile" },
    { href: "/configuracion", label: "Ajustes", icon: "settings" }
  ],
  admin: [
    { href: "/admin", label: "Panel", icon: "admin" },
    { href: "/admin#alumnos", label: "Alumnos", icon: "users" },
    { href: "/admin#docentes", label: "Docentes", icon: "book" },
    { href: "/admin#reportes", label: "Reportes", icon: "report" },
    { href: "/perfil", label: "Perfil", icon: "profile" },
    { href: "/configuracion", label: "Ajustes", icon: "settings" }
  ]
};

function isActivePath(pathname: string, href: string) {
  const baseHref = href.split("#")[0];

  if (baseHref === "/") {
    return pathname === "/";
  }

  return pathname === baseHref || pathname.startsWith(`${baseHref}/`);
}

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
  const pathname = usePathname();
  const primaryItems = navByRole[role].slice(0, 5);
  const secondaryItems = navByRole[role].slice(5);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" href="/">
          <Image
            className="brand-logo"
            src="/prepauag-logo.svg"
            alt="Logo de la Preparatoria de la Universidad Autónoma de Guadalajara"
            width={216}
            height={64}
            priority
          />
          <div>
            <strong>AulaAdapt IA</strong>
            <p>{demoConfig.schoolName}</p>
          </div>
        </Link>

        <div className="sidebar-block">
          <span className="sidebar-label">Cambiar perfil</span>
          <RoleSwitcher />
        </div>

        <div className="sidebar-block">
          <span className="sidebar-label">Navegación</span>
          <nav className="nav-list">
            {primaryItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${active ? "active" : ""}`}
                >
                  <span className="nav-link-icon">
                    <AppIcon name={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {secondaryItems.length ? (
          <div className="sidebar-block">
            <span className="sidebar-label">Más opciones</span>
            <nav className="nav-list nav-list-secondary">
              {secondaryItems.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${active ? "active" : ""}`}
                  >
                    <span className="nav-link-icon">
                      <AppIcon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}

        <div className="ethics-card">
          <span>Uso responsable</span>
          <p>La IA organiza el contenido. El docente revisa, aprueba y decide la entrega.</p>
        </div>
      </aside>

      <main className="content-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              {role === "teacher"
                ? "Panel docente"
                : role === "student"
                  ? "Panel estudiante"
                  : "Panel administrativo"}
            </p>
            <h1>{title}</h1>
            <p className="topbar-copy">{subtitle}</p>
          </div>
          <div className="topbar-actions topbar-actions-compact">
            <span className="status-pill">
              <AppIcon name={role === "teacher" ? "teacher" : role === "student" ? "student" : "admin"} size={16} />
              Acceso por perfil
            </span>
            <Link className="ghost-button" href="/configuracion">
              <AppIcon name="settings" size={16} />
              Preferencias
            </Link>
          </div>
        </header>

        <div className="content-panel">{children}</div>
      </main>

      <nav className="mobile-nav">
        {primaryItems.map((item) => {
          const active = isActivePath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-link ${active ? "active" : ""}`}
            >
              <AppIcon name={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
