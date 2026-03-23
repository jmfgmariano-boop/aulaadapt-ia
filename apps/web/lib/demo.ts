import type { DemoAppConfig, UserRole } from "@aulaadapt/domain";
import { adaptationOptions, outputOptions } from "@aulaadapt/design-system";
import { deliveries, groups, materials, sessions, subjects, usageSnapshot, users } from "@aulaadapt/mocks";
import {
  sourceAccessibilityContext,
  sourceStudentRegistry,
  sourceTeacherDirectory
} from "./schoolDataset";

const appMode = process.env.NEXT_PUBLIC_APP_MODE === "demo" ? "demo" : "demo";

export const demoConfig: DemoAppConfig = {
  appMode,
  showDemoBanner: false,
  defaultRole: "teacher",
  schoolName:
    process.env.NEXT_PUBLIC_SCHOOL_NAME || "Preparatoria de la Universidad Autónoma de Guadalajara",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "contacto@aulaadaptia.edu"
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
  kicker: "Plataforma institucional para educación media superior",
  title: "AulaAdapt IA convierte cada clase en materiales postclase claros, accesibles y listos para compartirse.",
  description:
    "Diseñada para la Preparatoria de la Universidad Autónoma de Guadalajara, con flujos claros para docentes, estudiantes y coordinación académica.",
  primaryCta: {
    href: "/docente/nueva-clase",
    label: "Explorar panel docente"
  },
  secondaryCta: {
    href: "/estudiante",
    label: "Explorar vista estudiante"
  },
  metrics: [
    {
      label: "Materiales semanales",
      value: String(usageSnapshot.generatedThisWeek)
    },
    {
      label: "Aprobación docente",
      value: `${usageSnapshot.approvedRate}%`
    },
    {
      label: "Grupos activos",
      value: String(usageSnapshot.activeGroups)
    }
  ],
  highlights: [
    {
      title: "Resumen accesible",
      copy: "Contenido breve, claro y ordenado para repasar."
    },
    {
      title: "Revisión docente",
      copy: "La IA propone borradores editables y el docente decide."
    },
    {
      title: "Adaptaciones neutrales",
      copy: "Apoyos como formato visual, repaso breve y pasos claros."
    },
    {
      title: "Escalable para escuelas",
      copy: "Lista para crecer por grupos, materias y futuras integraciones."
    }
  ],
  valuePillars: [
    {
      title: "Privacidad",
      copy: "Protege la información escolar con roles separados, trazabilidad y reportes agregados."
    },
    {
      title: "Uso responsable",
      copy: "La plataforma no sustituye al docente ni realiza diagnósticos clínicos."
    },
    {
      title: "Consentimiento institucional",
      copy: "Preparada para operación escolar con mensajes operativos, éticos y un enfoque pedagógico claro."
    }
  ],
  howItWorks: [
    "Explicación docente",
    "Procesamiento con IA",
    "Revisión docente",
    "Entrega postclase"
  ]
};

export const demoAccess = {
  title: "Acceso institucional",
  description:
    "Ingresa a la plataforma con tus credenciales escolares para acceder a los flujos de docente, estudiante o coordinación académica.",
  roles: [
    {
      role: "teacher" as const,
      title: "Docente",
      copy: "Crea sesiones, revisa borradores generados por IA y entrega materiales postclase con control editorial."
    },
    {
      role: "student" as const,
      title: "Estudiante",
      copy: "Consulta materiales recientes, tareas, glosarios y apoyos personalizados con una experiencia clara y privada."
    },
    {
      role: "admin" as const,
      title: "Coordinación académica",
      copy: "Gestiona bases escolares, permisos, perfiles de accesibilidad autorizados y reportes de uso institucional."
    }
  ]
};

const groupedStudents = Array.from(new Set(sourceStudentRegistry.map((student) => student.group)));
const interviewedTeachersCount = sourceTeacherDirectory.length;
const registeredStudentsCount = sourceStudentRegistry.length;

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
      helper: "Generados en la preparatoria"
    },
    {
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
      title: "Captura multimodal",
      copy: "Integra texto, audio grabado, archivos y puntos clave en un solo flujo de trabajo."
    }
  ],
  recorderSteps: [
    "Iniciar grabación",
    "Pausar o reanudar",
    "Detener y adjuntar",
    "Generar transcripción"
  ],
  notifications: [
    {
      title: "Material pendiente de revisión",
      copy: "Biología 5A tiene un borrador generado hace 12 minutos y listo para editar."
    },
    {
      title: "Entrega programada hoy",
      copy: "Comunicación 4B se publicará a las 16:30 por plataforma interna."
    },
    {
      title: "Plantilla reutilizable disponible",
      copy: "La estructura de repaso breve de Ciencias puede aplicarse a una nueva sesión."
    }
  ],
  templates: [
    {
      title: "Resumen accesible + tarea",
      copy: "Ideal para clases expositivas con cierre y recordatorio breve."
    },
    {
      title: "Glosario + pasos secuenciales",
      copy: "Pensada para actividades con instrucciones segmentadas."
    },
    {
      title: "Repaso visual reforzado",
      copy: "Incluye esquema breve, conceptos clave y lenguaje simplificado."
    }
  ],
  historySummary: [
    "Sesiones filtrables por fecha, materia, grupo y estado de aprobación.",
    "Trazabilidad de quién generó, editó, aprobó y envió cada material.",
    "Reutilización rápida de formatos anteriores para ahorrar tiempo docente."
  ]
};

export const demoStudent = {
  user: demoUsers.student,
  feedFilters: ["Biología", "22 mar 2026", "Docente D06"],
  helperCards: [
    {
      title: "Menos fricción",
      copy: "La vista prioriza resumen, pasos, conceptos y tarea antes que elementos secundarios."
    },
    {
      title: "Lectura sencilla",
      copy: "Contenido segmentado, etiquetas neutrales y ruido visual mínimo."
    }
  ],
  recentDownloads: [
    "Resumen de fotosíntesis.pdf",
    "Glosario de biología.png",
    "Pasos de actividad - comunicación.docx"
  ]
};

export const demoAdmin = {
  user: demoUsers.admin,
  studentRegistry: sourceStudentRegistry.map((student) => ({
    id: student.id,
    name: `Estudiante ${student.id}`,
    semester: `${student.semester}° semestre`,
    group: student.group,
    age: student.age,
    sex: student.sex,
    support: student.preferredMaterial,
    barrier: student.barrier,
    note: student.comment
  })),
  teacherDirectory: sourceTeacherDirectory.map((teacher) => ({
    ...teacher,
    displayName: `${teacher.roleLabel} ${teacher.id}`,
    institution: "Preparatoria de la Universidad Autónoma de Guadalajara"
  })),
  accessibilityContext: sourceAccessibilityContext,
  teacherIntakeFields: [
    "Nombre completo",
    "Correo institucional",
    "Materia principal",
    "Grupos asignados"
  ],
  importSources: ["Excel institucional", "CSV", "Captura manual"],
  accessibilityProfiles: [
    "Comprensión general",
    "Lenguaje simplificado",
    "Apoyo visual",
    "Repaso breve",
    "Estructura paso a paso",
    "Segmentación de actividades",
    "Baja saturación visual",
    "Repaso reforzado",
    "Recordatorios frecuentes",
    "Guía secuencial"
  ],
  reportCards: [
    {
      title: "Alumnos registrados",
      value: String(registeredStudentsCount),
      copy: "Registros válidos integrados desde la base aplicada del proyecto."
    },
    {
      title: "Personal entrevistado",
      value: String(interviewedTeachersCount),
      copy: "Docentes y personal escolar considerados para el diseño funcional."
    },
    {
      title: "Grupos detectados",
      value: String(groupedStudents.length),
      copy: "Organizados automáticamente a partir de la base escolar disponible."
    }
  ]
};

export const demoProfile = {
  avatarActions: ["Subir foto", "Cambiar foto", "Eliminar foto", "Usar avatar predeterminado"],
  appearanceModes: ["Claro", "Oscuro"],
  accentColors: ["Azul académico", "Azul petróleo", "Turquesa suave", "Verde menta"],
  densityModes: ["Cómoda", "Compacta"],
  contrastModes: ["Estándar", "Alto contraste"]
};

export const demoHelp = {
  onboardingSteps: [
    "Selecciona tu perfil e identifica tu panel principal.",
    "Ubica tus accesos rápidos, notificaciones y materiales recientes.",
    "Crea o consulta una clase, revisa el contenido y confirma la entrega.",
    "Personaliza lectura, contraste, tamaño de letra y preferencias visuales."
  ],
  faqs: [
    {
      question: "¿La plataforma sustituye al docente?",
      answer: "No. AulaAdapt IA sugiere borradores editables y el docente conserva la revisión, edición y aprobación final."
    },
    {
      question: "¿La plataforma diagnostica a los estudiantes?",
      answer: "No. Solo trabaja con apoyos pedagógicos y perfiles de accesibilidad previamente autorizados por la institución."
    },
    {
      question: "¿Puedo cargar base escolar completa?",
      answer: "Sí. La coordinación puede registrar alumnos, docentes, grupos y materias por carga masiva o captura manual."
    },
    {
      question: "¿Cómo se entregan los materiales?",
      answer: "Pueden publicarse por plataforma interna, correo institucional, por grupo o para estudiantes específicos."
    }
  ]
};

export const demoApiMeta = {
  demo: true,
  appMode: demoConfig.appMode,
  schoolName: demoConfig.schoolName,
  supportEmail: demoConfig.supportEmail
};
