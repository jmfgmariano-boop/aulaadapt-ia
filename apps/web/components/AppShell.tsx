"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RoleSwitcher } from "./RoleSwitcher";
import { AppIcon } from "./Ui";
import { demoConfig, demoRoleLabels, demoUsers } from "../lib/demo";
import {
  PROFILE_EVENT,
  getInitials,
  readProfileState
} from "../lib/user-preferences";

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
    | "report"
    | "compare"
    | "database"
    | "integration"
    | "lock"
    | "shield";
};

const navByRole: Record<"teacher" | "student" | "admin", NavItem[]> = {
  teacher: [
    { href: "/docente", label: "Inicio", icon: "home" },
    { href: "/docente/nueva-clase", label: "Nueva clase", icon: "spark" },
    { href: "/docente/materiales", label: "Materiales", icon: "book" },
    { href: "/docente/comparativa", label: "Comparativa", icon: "compare" },
    { href: "/docente/historial", label: "Historial", icon: "history" },
    { href: "/docente/plantillas", label: "Plantillas", icon: "template" },
    { href: "/docente/notificaciones", label: "Alertas", icon: "bell" },
    { href: "/ayuda", label: "Ayuda", icon: "shield" },
    { href: "/perfil", label: "Perfil", icon: "profile" },
    { href: "/configuracion", label: "Ajustes", icon: "settings" }
  ],
  student: [
    { href: "/estudiante", label: "Inicio", icon: "home" },
    { href: "/estudiante#materiales", label: "Materiales", icon: "book" },
    { href: "/estudiante#materias", label: "Materias", icon: "users" },
    { href: "/estudiante#tareas", label: "Tareas", icon: "task" },
    { href: "/ayuda", label: "Ayuda", icon: "shield" },
    { href: "/perfil", label: "Perfil", icon: "profile" },
    { href: "/configuracion", label: "Ajustes", icon: "settings" }
  ],
  admin: [
    { href: "/admin", label: "Panel", icon: "admin" },
    { href: "/admin#base-escolar", label: "Base escolar", icon: "database" },
    { href: "/admin#perfiles", label: "Perfiles", icon: "users" },
    { href: "/admin/reportes", label: "Reportes", icon: "report" },
    { href: "/admin#privacidad", label: "Privacidad", icon: "lock" },
    { href: "/integraciones", label: "Integraciones", icon: "integration" },
    { href: "/ayuda", label: "Ayuda", icon: "shield" },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(() =>
    readProfileState(
      role === "teacher"
        ? demoUsers.teacher.name
        : role === "student"
          ? demoUsers.student.name
          : demoUsers.admin.name,
      demoRoleLabels[role],
      role === "teacher"
        ? "5A · Biología"
        : role === "student"
          ? "5A"
          : "Coordinación académica"
    )
  );
  const primaryItems = navByRole[role].slice(0, 5);
  const secondaryItems = navByRole[role].slice(5);
  const mobilePrimaryItems = navByRole[role].slice(0, 4);
  const mobileSecondaryItems = navByRole[role].slice(4);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncProfile = () => {
      setProfile(
        readProfileState(
          role === "teacher"
            ? demoUsers.teacher.name
            : role === "student"
              ? demoUsers.student.name
              : demoUsers.admin.name,
          demoRoleLabels[role],
          role === "teacher"
            ? "5A · Biología"
            : role === "student"
              ? "5A"
              : "Coordinación académica"
        )
      );
    };

    syncProfile();
    window.addEventListener(PROFILE_EVENT, syncProfile);
    window.addEventListener("storage", syncProfile);

    return () => {
      window.removeEventListener(PROFILE_EVENT, syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, [role]);

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
          <span>Privacidad institucional</span>
          <p>Permisos, trazabilidad y apoyos pedagógicos autorizados dentro de un flujo escolar controlado.</p>
        </div>
      </aside>

      <main className="content-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              {role === "teacher"
                ? "Panel docente"
                : role === "student"
                  ? "Módulo oculto"
                  : "Panel administrativo"}
            </p>
            <h1>{title}</h1>
            <p className="topbar-copy">{subtitle}</p>
          </div>
          <div className="topbar-actions topbar-actions-compact">
            <span className="status-pill">
              <AppIcon name={role === "teacher" ? "teacher" : role === "student" ? "student" : "admin"} size={16} />
              Acceso institucional
            </span>
            <Link className="profile-chip" href="/perfil">
              {profile.photoDataUrl ? (
                <img
                  className="profile-chip-image"
                  src={profile.photoDataUrl}
                  alt="Fotografía del perfil"
                />
              ) : (
                <span className="profile-chip-avatar">
                  {getInitials(profile.displayName)}
                </span>
              )}
              <span>{profile.displayName}</span>
            </Link>
            <Link className="ghost-button" href="/configuracion">
              <AppIcon name="settings" size={16} />
              Preferencias
            </Link>
          </div>
        </header>

        <div className="content-panel">{children}</div>
      </main>

      <nav className="mobile-nav">
        {mobilePrimaryItems.map((item) => {
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
        {mobileSecondaryItems.length ? (
          <button
            className={`mobile-nav-link mobile-nav-button ${isMobileMenuOpen ? "active" : ""}`}
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <AppIcon name="layers" size={18} />
            <span>Más</span>
          </button>
        ) : null}
      </nav>

      {mobileSecondaryItems.length ? (
        <>
          <button
            className={`mobile-sheet-backdrop ${isMobileMenuOpen ? "visible" : ""}`}
            type="button"
            aria-label="Cerrar menú móvil"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`mobile-sheet ${isMobileMenuOpen ? "visible" : ""}`}>
            <div className="mobile-sheet-panel">
              <strong>Más opciones</strong>
              <div className="stack-list compact-stack">
                {mobileSecondaryItems.map((item) => {
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
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
