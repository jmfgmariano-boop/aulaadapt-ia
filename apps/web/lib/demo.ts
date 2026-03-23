import type { DemoAppConfig, UserRole } from "@aulaadapt/domain";
import { adaptationOptions, outputOptions } from "@aulaadapt/design-system";
import { deliveries, groups, materials, sessions, subjects, usageSnapshot, users } from "@aulaadapt/mocks";

const appMode = process.env.NEXT_PUBLIC_APP_MODE === "demo" ? "demo" : "demo";

export const demoConfig: DemoAppConfig = {
  appMode,
  showDemoBanner: true,
  defaultRole: "teacher",
  schoolName: process.env.NEXT_PUBLIC_SCHOOL_NAME || "Preparatoria Horizonte",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "demo@aulaadaptia.edu"
};

export const demoUsers = {
  teacher: users.find((user) => user.role === "teacher")!,
  student: users.find((user) => user.role === "student")!,
  admin: users.find((user) => user.role === "admin")!
};

export const demoRoutes: Record<UserRole, string> = {
  teacher: "/docente",
  student: "/estudiante",
  admin: "/admin"
};

export const demoRoleLabels: Record<UserRole, string> = {
  teacher: "Docente",
  student: "Estudiante",
  admin: "Administracion"
};

export const demoLanding = {
  kicker: "Demo publica para escuelas de educacion media superior",
  title: "AulaAdapt IA convierte la explicacion de clase en materiales postclase accesibles, claros y listos para compartir.",
  description:
    "Sitio web demostrativo con experiencia docente, estudiante y administrativa. La navegacion es publica, los datos son simulados y el flujo muestra como una escuela podria operar el producto en un piloto real.",
  primaryCta: {
    href: "/docente/nueva-clase",
    label: "Explorar flujo docente"
  },
  secondaryCta: {
    href: "/estudiante",
    label: "Ver experiencia estudiante"
  },
  highlights: [
    {
      title: "Resumen accesible",
      copy: "Contenido postclase en lenguaje claro, con estructura entendible y listo para repasar."
    },
    {
      title: "Revision docente",
      copy: "La IA sugiere borradores editables. El docente revisa antes de aprobar y entregar."
    },
    {
      title: "Adaptaciones neutrales",
      copy: "Apoyos como formato visual, repaso breve y estructura paso a paso."
    },
    {
      title: "Escalable para escuelas",
      copy: "Pensada para crecer por grupos, materias, docentes y futuras integraciones."
    }
  ],
  valuePillars: [
    {
      title: "Privacidad",
      copy: "La demostracion comunica limites claros, roles separados y reportes agregados."
    },
    {
      title: "Uso responsable",
      copy: "La plataforma no sustituye al docente ni realiza diagnosticos clinicos."
    },
    {
      title: "Consentimiento institucional",
      copy: "Preparada para presentarse como piloto escolar con mensajes operativos y eticos."
    }
  ],
  howItWorks: [
    "Explicacion docente",
    "Procesamiento con IA",
    "Revision docente",
    "Entrega postclase"
  ]
};

export const demoOutputs = outputOptions;
export const demoAdaptations = adaptationOptions;
export const demoGroups = groups;
export const demoSubjects = subjects;
export const demoSessions = sessions;
export const demoMaterials = materials;
export const demoDeliveries = deliveries;
export const demoUsage = usageSnapshot;

export const demoTeacher = {
  user: demoUsers.teacher,
  quickStats: [
    {
      label: "Materiales esta semana",
      value: String(usageSnapshot.generatedThisWeek),
      helper: "Generados en esta escuela demostrativa"
    },
    {
      label: "Tasa de aprobacion",
      value: `${usageSnapshot.approvedRate}%`,
      helper: "Borradores revisados antes de entregarse"
    },
    {
      label: "Grupos activos",
      value: String(usageSnapshot.activeGroups),
      helper: "Con uso reciente dentro de la plataforma"
    },
    {
      label: "Entrega promedio",
      value: `${usageSnapshot.averageDeliveryMinutes} min`,
      helper: "Entre cierre de clase y publicacion"
    }
  ],
  focusCards: [
    {
      title: "Nueva clase en pocos pasos",
      copy: "Captura explicacion, agrega tarea y selecciona apoyos pedagogicos neutrales antes de generar."
    },
    {
      title: "Modo demostracion",
      copy: "Los datos son simulados y permiten recorrer el flujo completo sin autenticacion."
    }
  ]
};

export const demoStudent = {
  user: demoUsers.student,
  feedFilters: ["Biologia", "22 mar 2026", "Mariana Gomez"],
  helperCards: [
    {
      title: "Menos friccion",
      copy: "La vista prioriza resumen, pasos, conceptos y tarea antes que elementos secundarios."
    },
    {
      title: "Lectura sencilla",
      copy: "Contenido segmentado, etiquetas neutrales y ruido visual minimo."
    }
  ]
};

export const demoAdmin = {
  user: demoUsers.admin,
  reportCards: [
    {
      title: "Generacion semanal",
      value: String(usageSnapshot.generatedThisWeek),
      copy: "Materiales emitidos por docentes esta semana."
    },
    {
      title: "Entrega promedio",
      value: `${usageSnapshot.averageDeliveryMinutes} min`,
      copy: "Tiempo entre clase y publicacion del recurso."
    },
    {
      title: "Roles protegidos",
      value: "Vistas separadas",
      copy: "Administracion, docente y estudiante con recorridos diferenciados."
    }
  ]
};

export const demoApiMeta = {
  demo: true,
  appMode: demoConfig.appMode,
  schoolName: demoConfig.schoolName,
  supportEmail: demoConfig.supportEmail
};
