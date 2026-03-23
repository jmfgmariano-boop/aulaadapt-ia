import type { DemoAppConfig, UserRole } from "@aulaadapt/domain";
import { adaptationOptions, outputOptions } from "@aulaadapt/design-system";
import { deliveries, groups, materials, sessions, subjects, usageSnapshot, users } from "@aulaadapt/mocks";

const appMode = process.env.NEXT_PUBLIC_APP_MODE === "demo" ? "demo" : "demo";

export const demoConfig: DemoAppConfig = {
  appMode,
  showDemoBanner: true,
  defaultRole: "teacher",
  schoolName:
    process.env.NEXT_PUBLIC_SCHOOL_NAME || "Preparatoria de la Universidad Autónoma de Guadalajara",
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
  admin: "Administración"
};

export const demoLanding = {
  kicker: "Demo pública para escuelas de educación media superior",
  title: "AulaAdapt IA convierte la explicación de clase en materiales postclase accesibles, claros y listos para compartir.",
  description:
    "Sitio web demostrativo con experiencia docente, estudiante y administrativa. La navegación es pública, los datos son simulados y el flujo muestra cómo una escuela podría operar el producto en un piloto real.",
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
      title: "Revisión docente",
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
      copy: "La demostración comunica límites claros, roles separados y reportes agregados."
    },
    {
      title: "Uso responsable",
      copy: "La plataforma no sustituye al docente ni realiza diagnósticos clínicos."
    },
    {
      title: "Consentimiento institucional",
      copy: "Preparada para presentarse como piloto escolar con mensajes operativos y éticos."
    }
  ],
  howItWorks: [
    "Explicación docente",
    "Procesamiento con IA",
    "Revisión docente",
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
      label: "Tasa de aprobación",
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
      helper: "Entre cierre de clase y publicación"
    }
  ],
  focusCards: [
    {
      title: "Nueva clase en pocos pasos",
      copy: "Captura explicación, agrega tarea y selecciona apoyos pedagógicos neutrales antes de generar."
    },
    {
      title: "Modo demostración",
      copy: "Los datos son simulados y permiten recorrer el flujo completo sin autenticación."
    }
  ],
  recorderSteps: [
    "Iniciar grabación",
    "Pausar o reanudar",
    "Detener y adjuntar",
    "Generar transcripción"
  ]
};

export const demoStudent = {
  user: demoUsers.student,
  feedFilters: ["Biología", "22 mar 2026", "Mariana Gómez"],
  helperCards: [
    {
      title: "Menos fricción",
      copy: "La vista prioriza resumen, pasos, conceptos y tarea antes que elementos secundarios."
    },
    {
      title: "Lectura sencilla",
      copy: "Contenido segmentado, etiquetas neutrales y ruido visual mínimo."
    }
  ]
};

export const demoAdmin = {
  user: demoUsers.admin,
  studentRegistry: [
    {
      id: "A-24018",
      name: "Valeria Peña",
      group: "5A",
      support: "Lenguaje simplificado",
      tutor: "Mariana Gómez"
    },
    {
      id: "A-24022",
      name: "Diego Núñez",
      group: "4B",
      support: "Estructura paso a paso",
      tutor: "Mariana Gómez"
    },
    {
      id: "A-24031",
      name: "Andrea Muñoz",
      group: "5A",
      support: "Formato visual",
      tutor: "Mariana Gómez"
    }
  ],
  teacherIntakeFields: [
    "Nombre completo",
    "Correo institucional",
    "Materia principal",
    "Grupos asignados"
  ],
  reportCards: [
    {
      title: "Generación semanal",
      value: String(usageSnapshot.generatedThisWeek),
      copy: "Materiales emitidos por docentes esta semana."
    },
    {
      title: "Entrega promedio",
      value: `${usageSnapshot.averageDeliveryMinutes} min`,
      copy: "Tiempo entre clase y publicación del recurso."
    },
    {
      title: "Roles protegidos",
      value: "Vistas separadas",
      copy: "Administración, docente y estudiante con recorridos diferenciados."
    }
  ]
};

export const demoApiMeta = {
  demo: true,
  appMode: demoConfig.appMode,
  schoolName: demoConfig.schoolName,
  supportEmail: demoConfig.supportEmail
};
