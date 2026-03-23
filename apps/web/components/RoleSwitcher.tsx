"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { demoRoleLabels, demoRoutes } from "../lib/demo";

const STORAGE_KEY = "aulaadapt-demo-role";

export function RoleSwitcher() {
  const pathname = usePathname();
  const [preferredRole, setPreferredRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = window.localStorage.getItem(STORAGE_KEY);
    setPreferredRole(savedRole);

    if (pathname.startsWith("/docente")) {
      window.localStorage.setItem(STORAGE_KEY, "teacher");
      setPreferredRole("teacher");
    } else if (pathname.startsWith("/estudiante")) {
      window.localStorage.setItem(STORAGE_KEY, "student");
      setPreferredRole("student");
    } else if (pathname.startsWith("/admin")) {
      window.localStorage.setItem(STORAGE_KEY, "admin");
      setPreferredRole("admin");
    }
  }, [pathname]);

  return (
    <div className="role-switcher-wrap">
      <div className="role-switcher">
        {Object.entries(demoRoutes).map(([role, href]) => {
          const isActive =
            (role === "teacher" && pathname.startsWith("/docente")) ||
            (role === "student" && pathname.startsWith("/estudiante")) ||
            (role === "admin" && pathname.startsWith("/admin"));

          return (
            <Link
              key={role}
              className={`role-switch-link ${isActive ? "active" : ""}`}
              href={href}
            >
              {demoRoleLabels[role as keyof typeof demoRoleLabels]}
            </Link>
          );
        })}
      </div>
      {preferredRole && pathname === "/" ? (
        <Link className="role-continue-link" href={demoRoutes[preferredRole as keyof typeof demoRoutes]}>
          Continuar demo: {demoRoleLabels[preferredRole as keyof typeof demoRoleLabels]}
        </Link>
      ) : null}
    </div>
  );
}
