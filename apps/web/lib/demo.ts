import type { DemoAppConfig, UserRole } from "@aulaadapt/domain";
import { adaptationOptions, outputOptions } from "@aulaadapt/design-system";
import { deliveries, groups, materials, sessions, subjects, usageSnapshot, users } from "@aulaadapt/mocks";
import {
  sourceStudentDisplayNames,
  sourceAccessibilityContext,
  sourceStudentRegistry,
  sourceTeacherDisplayNames,
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
  title: "AulaAdapt IA transforma la explicación docente en materiales postclase claros, accesibles y listos para entregarse.",
  description:
    "Diseñada para la Preparatoria de la Universidad Autónoma de Guadalajara con flujos claros para docentes, estudiantes y coordinación académica.",
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
      copy: "Repaso breve, claro y ordenado."
    },
    {
      title: "Revisión docente",
      copy: "La IA propone; el docente revisa y decide."
    },
    {
      title: "Adaptaciones neutrales",
      copy: "Apoyos pedagógicos claros, visuales y secuenciales."
    },
    {
      title: "Escalable para escuelas",
      copy: "Lista para crecer por grupos, materias e integraciones."
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
  ],
  modes: [
    {
      title: "Recorrido guiado",
      copy: "Presenta el producto con recorridos completos y datos controlados para mostrar su operación."
    },
    {
      title: "Operación institucional",
      copy: "Módulos listos para conectarse con base escolar, directorio académico y permisos formales."
    }
  ],
  example: {
    topic: "Biología · Fotosíntesis y flujo de energía",
    input:
      "Clase con explicación de entradas, salidas y función de la clorofila, más un esquema del proceso como actividad.",
    baseOutput:
      "Resumen accesible, pasos de actividad, conceptos clave y glosario para todo el grupo.",
    adaptedOutput:
      "Versión con lenguaje simplificado, bloques cortos, pasos numerados y apoyo visual."
  }
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
const studentName = (id: string) =>
  sourceStudentDisplayNames[id as keyof typeof sourceStudentDisplayNames] ?? id;
const teacherName = (id: string) =>
  sourceTeacherDisplayNames[id as keyof typeof sourceTeacherDisplayNames] ?? id;

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
  notificationCenter: [
    {
      id: "notif-1",
      title: "Material pendiente de revisión",
      copy: "Biología 5A tiene un borrador generado hace 12 minutos.",
      priority: "Alta",
      category: "Revisión",
      date: "22 mar · 15:42",
      read: false
    },
    {
      id: "notif-2",
      title: "Entrega programada hoy",
      copy: "Comunicación 4B se publicará a las 16:30 por plataforma interna.",
      priority: "Media",
      category: "Entrega",
      date: "22 mar · 14:20",
      read: true
    },
    {
      id: "notif-3",
      title: "Perfil pedagógico actualizado",
      copy: "Se agregó apoyo visual al grupo 5A para una estudiante autorizada.",
      priority: "Media",
      category: "Accesibilidad",
      date: "22 mar · 13:05",
      read: false
    },
    {
      id: "notif-4",
      title: "Carga de base escolar completada",
      copy: "La coordinación integró 69 filas válidas y 3 observaciones para revisión.",
      priority: "Baja",
      category: "Base escolar",
      date: "22 mar · 09:10",
      read: true
    }
  ],
  templates: [
    {
      id: "resumen-accesible",
      title: "Resumen accesible + tarea",
      copy: "Ideal para clases expositivas con cierre y recordatorio breve.",
      recommendedOutputs: [
        "Resumen accesible",
        "Pasos de la actividad",
        "Recordatorio de tarea"
      ],
      recommendedAdaptations: [
        "repaso_breve",
        "lenguaje_simplificado",
        "contenido_segmentado"
      ],
      focus: "Cierre rápido de clase con repaso y tarea clara."
    },
    {
      id: "glosario-secuencial",
      title: "Glosario + pasos secuenciales",
      copy: "Pensada para actividades con instrucciones segmentadas.",
      recommendedOutputs: [
        "Glosario sencillo",
        "Pasos de la actividad",
        "Conceptos clave"
      ],
      recommendedAdaptations: [
        "estructura_paso_a_paso",
        "contenido_segmentado",
        "comprension_general"
      ],
      focus: "Actividades guiadas con lectura paso a paso."
    },
    {
      id: "repaso-visual",
      title: "Repaso visual reforzado",
      copy: "Incluye esquema breve, conceptos clave y lenguaje simplificado.",
      recommendedOutputs: [
        "Versión simplificada",
        "Esquema breve",
        "Conceptos clave"
      ],
      recommendedAdaptations: [
        "formato_visual",
        "lenguaje_simplificado",
        "repaso_breve"
      ],
      focus: "Repaso de alto impacto con estructura visual breve."
    }
  ],
  historySummary: [
    "Sesiones filtrables por fecha, materia, grupo y estado de aprobación.",
    "Trazabilidad de quién generó, editó, aprobó y envió cada material.",
    "Reutilización rápida de formatos anteriores para ahorrar tiempo docente."
  ],
  modePanels: [
    {
      title: "Recorrido guiado",
      copy: "Presentación funcional de la plataforma con escenarios listos para mostrar su valor."
    },
    {
      title: "Modo institucional",
      copy: "Operación con base escolar real, permisos diferenciados, trazabilidad y envío postclase."
    }
  ],
  workflowSteps: [
    {
      title: "Contexto de la clase",
      copy: "Materia, grupo, fecha y tema con ayuda contextual y validación mínima."
    },
    {
      title: "Captura del contenido",
      copy: "Texto, audio, archivo base, puntos clave y tarea en un mismo flujo."
    },
    {
      title: "Generación y revisión",
      copy: "La IA propone; el docente edita, compara y aprueba."
    },
    {
      title: "Destinatarios y entrega",
      copy: "Material base para todos y apoyos adicionales para quienes corresponda."
    }
  ],
  contextualPrompts: [
    "Ejemplo: 'Clase de Biología sobre fotosíntesis con énfasis en entradas, salidas y función de la clorofila'.",
    "Ejemplo de tarea: 'Elabora un esquema simple con las entradas y salidas del proceso'.",
    "Sugerencia: agrega una observación breve sobre ritmo del grupo o conceptos que conviene reforzar."
  ],
  recipientGroups: [
    {
      id: "group-5a",
      subject: "Biología",
      group: "5A",
      total: 32,
      supportCount: 7,
      recommendedSupports: [
        "Bloques breves con recordatorios claros",
        "Lenguaje directo y glosario ampliado",
        "Formato visual limpio con secuencia estable"
      ],
      suggestedMaterial: "Resumen accesible + pasos numerados + apoyo visual breve",
      practicalRecommendations: [
        "Mantener instrucciones en 3 o 4 pasos visibles.",
        "Usar frases cortas y una sola acción por bloque.",
        "Evitar saturación visual en el material final."
      ],
      students: [
        { id: "E001", name: studentName("E001"), support: "Lenguaje simplificado", active: true },
        { id: "E004", name: studentName("E004"), support: "Apoyo visual", active: true },
        { id: "E007", name: studentName("E007"), support: "Repaso breve", active: true },
        { id: "E010", name: studentName("E010"), support: "Sin apoyo adicional", active: true },
        { id: "E014", name: studentName("E014"), support: "Guía secuencial", active: true },
        { id: "E018", name: studentName("E018"), support: "Sin apoyo adicional", active: true }
      ]
    },
    {
      id: "group-4b",
      subject: "Comunicación",
      group: "4B",
      total: 28,
      supportCount: 5,
      recommendedSupports: [
        "Guía secuencial con estructura predecible",
        "Repaso breve reforzado al cierre",
        "Menor carga visual y vocabulario claro"
      ],
      suggestedMaterial: "Repaso breve + checklist + glosario con ejemplos",
      practicalRecommendations: [
        "Abrir con idea principal y cierre con checklist.",
        "Separar actividad y tarea en dos bloques distintos.",
        "Destacar palabras clave con ejemplos breves."
      ],
      students: [
        { id: "E021", name: studentName("E021"), support: "Glosario ampliado", active: true },
        { id: "E025", name: studentName("E025"), support: "Estructura paso a paso", active: true },
        { id: "E027", name: studentName("E027"), support: "Sin apoyo adicional", active: true },
        { id: "E029", name: studentName("E029"), support: "Baja saturación visual", active: true }
      ]
    }
  ],
  comparisonCase: {
    original: [
      "Clase de Biología sobre fotosíntesis con entradas, salidas y función de la clorofila.",
      "Audio de explicación docente con énfasis en producción de glucosa y liberación de oxígeno.",
      "Actividad: elaborar un esquema simple del proceso y explicar cada etapa."
    ],
    aiDraft: [
      "Resumen accesible con las etapas principales del proceso.",
      "Pasos de actividad organizados para construir el esquema del tema.",
      "Glosario con términos como clorofila, glucosa y dióxido de carbono."
    ],
    teacherEdits: [
      "Se simplificó el segundo párrafo para 5A.",
      "Se agregó un ejemplo de entradas y salidas del proceso.",
      "Se ajustó el recordatorio de tarea para entrega el miércoles."
    ],
    finalResult: [
      "Material base para todo el grupo.",
      "Versión adaptada con lenguaje simplificado para estudiantes con apoyo activo.",
      "Entrega programada por plataforma y correo institucional."
    ]
  },
  exampleOutputs: [
    {
      title: "Entrada docente",
      body:
        "Clase de Biología sobre fotosíntesis: etapas, entradas, salidas y función de la clorofila."
    },
    {
      title: "Salida base",
      body:
        "Resumen breve, pasos de actividad, conceptos clave y glosario para todo el grupo."
    },
    {
      title: "Salida adaptada",
      body:
        "Lenguaje simplificado, pasos secuenciales, repaso breve y apoyo visual para estudiantes con apoyos activos."
    }
  ],
  authorizedSupportGuides: [
    {
      title: "Atención sostenida",
      copy:
        "Cuando existe un registro institucional autorizado relacionado con atención, el docente ve solo ajustes pedagógicos concretos.",
      supports: ["Pasos cortos", "Bloques breves", "Recordatorios claros"],
      suggestedMaterial: "Checklist + repaso breve + cierre con tarea visible"
    },
    {
      title: "Lenguaje y comprensión",
      copy:
        "Si hay antecedentes autorizados de lenguaje o comprensión, la plataforma sugiere materiales con lenguaje claro y glosario ampliado.",
      supports: ["Lenguaje simplificado", "Glosario ampliado", "Secuencia visible"],
      suggestedMaterial: "Resumen accesible + glosario + ejemplo resuelto"
    },
    {
      title: "Regulación sensorial o emocional",
      copy:
        "Con autorización institucional, se priorizan materiales menos abrumadores y con baja saturación visual.",
      supports: ["Baja saturación visual", "Estructura estable", "Repaso breve"],
      suggestedMaterial: "Versión visual limpia + pasos + recordatorio final"
    }
  ]
};

export const demoStudent = {
  user: demoUsers.student,
  feedFilters: ["Biología", "22 mar 2026", teacherName("D06")],
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
    {
      id: "summary-fotosintesis",
      title: "Resumen de fotosíntesis",
      description: "Archivo de repaso breve para consulta sin conexión.",
      downloadName: "resumen-fotosintesis.txt"
    },
    {
      id: "glossary-biologia",
      title: "Glosario de biología",
      description: "Conceptos clave organizados para lectura rápida.",
      downloadName: "glosario-biologia.txt"
    },
    {
      id: "steps-comunicacion",
      title: "Pasos de actividad de comunicación",
      description: "Secuencia resumida para revisar antes de entregar.",
      downloadName: "pasos-actividad-comunicacion.txt"
    }
  ],
  subjectHistory: [
    {
      subject: "Biología",
      date: "22 mar 2026",
      title: "Fotosíntesis y flujo de energía",
      status: "Nuevo"
    },
    {
      subject: "Biología",
      date: "19 mar 2026",
      title: "Respiración celular",
      status: "Guardado"
    },
    {
      subject: "Comunicación",
      date: "18 mar 2026",
      title: "Argumentación y texto breve",
      status: "Consultado"
    }
  ],
  reminders: [
    "Tarea de Biología con entrega mañana a las 08:00.",
    "Material nuevo de Biología con apoyo visual disponible.",
    "Glosario guardado en tu biblioteca personal."
  ],
  favorites: [
    "Respiración celular",
    "Fotosíntesis",
    "Texto argumentativo"
  ]
};

export const demoAdmin = {
  user: demoUsers.admin,
  studentRegistry: sourceStudentRegistry.map((student) => ({
    id: student.id,
    name: studentName(student.id),
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
    displayName: teacherName(teacher.id),
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
  ],
  importTemplateHeaders: [
    "matrícula",
    "nombre completo",
    "grado",
    "grupo",
    "turno",
    "materias inscritas",
    "docente responsable",
    "correo institucional",
    "estatus",
    "condición previamente identificada",
    "diagnóstico previo registrado",
    "observaciones pedagógicas autorizadas",
    "perfil de accesibilidad",
    "apoyos sugeridos",
    "apoyos pedagógicos activos",
    "adaptaciones recomendadas",
    "nivel de prioridad educativa",
    "responsable del registro",
    "fecha de actualización"
  ],
  importPreviewRows: [
    {
      matricula: "E001",
      nombre: studentName("E001"),
      grupo: "5A",
      estatus: "Activo",
      perfil: "Lenguaje simplificado",
      condicionInterna: "Atención sostenida",
      prioridad: "Media",
      permisos: "Coordinación + docente autorizado",
      validacion: "Correcto"
    },
    {
      matricula: "E004",
      nombre: studentName("E004"),
      grupo: "5A",
      estatus: "Activo",
      perfil: "Apoyo visual",
      condicionInterna: "Procesamiento sensorial",
      prioridad: "Alta",
      permisos: "Orientación + coordinación",
      validacion: "Correcto"
    },
    {
      matricula: "E021",
      nombre: studentName("E021"),
      grupo: "4B",
      estatus: "Inactivo",
      perfil: "Glosario ampliado",
      condicionInterna: "Lenguaje",
      prioridad: "Media",
      permisos: "Coordinación académica",
      validacion: "Actualizar estatus"
    }
  ],
  importSummary: {
    validRows: 69,
    errorRows: 3,
    newStudents: 12,
    updatedStudents: 57,
    inactiveStudents: 4
  },
  profileRegistry: [
    {
      studentId: "E001",
      studentName: studentName("E001"),
      currentProfile: "Lenguaje simplificado",
      activeSupports: ["Lenguaje simplificado", "Repaso breve"],
      conditionRecord: "Condición previamente identificada: TDA/TDAH registrado por el área autorizada",
      diagnosisRecord: "Diagnóstico previo institucional disponible para administración y orientación autorizadas",
      pedagogicalObservations:
        "Se recomienda dividir instrucciones en bloques cortos y reforzar cierre de tarea con recordatorio visible.",
      suggestedSupports: ["Pasos numerados", "Bloques breves", "Recordatorios claros"],
      recommendedAdaptations: ["Repaso breve", "Contenido segmentado", "Lenguaje simplificado"],
      priorityLevel: "Media",
      visibility: ["Coordinación académica", "Orientación", "Docente autorizado"],
      responsibleArea: "Coordinación académica",
      teacherView: {
        recommendedSupports: ["Pasos numerados", "Recordatorios claros", "Lenguaje directo"],
        suggestedMaterial: "Resumen breve + checklist + tarea visible",
        practicalRecommendations: [
          "Presentar una sola consigna por bloque.",
          "Resaltar fecha de entrega en la parte final.",
          "Usar conceptos clave con definición breve."
        ]
      },
      createdAt: "15 ene 2026",
      updatedAt: "20 mar 2026",
      registeredBy: "Coordinación académica",
      history: [
        "15 ene 2026 · Alta inicial por coordinación académica",
        "02 feb 2026 · Se agregó repaso breve",
        "20 mar 2026 · Revisión de apoyos activos por docente titular"
      ]
    },
    {
      studentId: "E004",
      studentName: studentName("E004"),
      currentProfile: "Apoyo visual",
      activeSupports: ["Apoyo visual", "Contenido segmentado"],
      conditionRecord: "Condición previamente identificada: procesamiento sensorial registrado",
      diagnosisRecord: "Registro interno con acceso restringido a administración autorizada",
      pedagogicalObservations:
        "Conviene mantener baja saturación visual, secuencia estable y separación clara de bloques.",
      suggestedSupports: ["Baja saturación visual", "Apoyo visual", "Secuencia predecible"],
      recommendedAdaptations: ["Formato visual", "Contenido segmentado", "Guía secuencial"],
      priorityLevel: "Alta",
      visibility: ["Orientación", "Coordinación académica"],
      responsibleArea: "Orientación institucional",
      teacherView: {
        recommendedSupports: ["Apoyo visual", "Guía secuencial", "Baja saturación visual"],
        suggestedMaterial: "Esquema breve + instrucciones lineales + glosario corto",
        practicalRecommendations: [
          "Evitar tablas saturadas o demasiado densas.",
          "Mantener orden fijo de resumen, pasos y tarea.",
          "Usar un máximo de un color de énfasis por bloque."
        ]
      },
      createdAt: "10 feb 2026",
      updatedAt: "18 mar 2026",
      registeredBy: "Orientación institucional",
      history: [
        "10 feb 2026 · Registro de apoyo visual autorizado",
        "18 mar 2026 · Se agregó contenido segmentado"
      ]
    },
    {
      studentId: "E021",
      studentName: studentName("E021"),
      currentProfile: "Glosario ampliado",
      activeSupports: ["Glosario ampliado", "Lenguaje simplificado", "Repaso breve"],
      conditionRecord: "Condición previamente identificada: alteración del lenguaje registrada",
      diagnosisRecord: "Dato clínico previo resguardado por el área autorizada",
      pedagogicalObservations:
        "Se recomienda material breve, vocabulario claro y apoyo de conceptos antes de la tarea.",
      suggestedSupports: ["Glosario ampliado", "Lenguaje simplificado", "Secuencia ordenada"],
      recommendedAdaptations: ["Lenguaje simplificado", "Repaso breve", "Estructura paso a paso"],
      priorityLevel: "Media",
      visibility: ["Coordinación académica", "Orientación", "Docente autorizado"],
      responsibleArea: "Área psicopedagógica",
      teacherView: {
        recommendedSupports: ["Glosario ampliado", "Lenguaje claro", "Secuencia ordenada"],
        suggestedMaterial: "Resumen accesible + glosario + pasos visibles",
        practicalRecommendations: [
          "Definir términos antes de la actividad.",
          "Separar conceptos clave de instrucciones.",
          "Evitar párrafos largos sin subtítulos."
        ]
      },
      createdAt: "08 feb 2026",
      updatedAt: "22 mar 2026",
      registeredBy: "Área psicopedagógica",
      history: [
        "08 feb 2026 · Alta institucional por observación autorizada",
        "01 mar 2026 · Se añadió glosario ampliado",
        "22 mar 2026 · Revisión conjunta con coordinación académica"
      ]
    }
  ],
  auditLog: [
    {
      timestamp: "22 mar 2026 · 15:12",
      actor: "Coordinación académica",
      action: "Carga masiva de base escolar",
      module: "Base escolar",
      detail: "Se integraron 69 filas válidas y se marcaron 4 alumnos inactivos."
    },
    {
      timestamp: "22 mar 2026 · 16:08",
      actor: teacherName("D06"),
      action: "Aprobación de material",
      module: "Materiales postclase",
      detail: "Se aprobó el material de Fotosíntesis para Biología 5A."
    },
    {
      timestamp: "22 mar 2026 · 16:18",
      actor: "Coordinación académica",
      action: "Actualización de perfil pedagógico",
      module: "Perfiles de accesibilidad",
      detail: "Se agregó apoyo visual al registro E004."
    }
  ],
  permissions: [
    {
      module: "Base escolar",
      admin: "Ver, editar, importar y desactivar registros",
      teacher: "Consultar grupo asignado",
      student: "Sin acceso"
    },
    {
      module: "Perfiles pedagógicos",
      admin:
        "Registrar diagnósticos previos o condiciones identificadas, editar apoyos, definir visibilidad y auditar cambios",
      teacher:
        "Ver solo apoyos autorizados, material sugerido y recomendaciones pedagógicas sin diagnóstico visible",
      student: "Recibe solo el material correspondiente"
    },
    {
      module: "Reportes y analítica",
      admin: "Vista completa agregada",
      teacher: "Métricas de sus grupos y materiales",
      student: "Sin acceso"
    }
  ],
  analytics: {
    filters: ["Fecha", "Grupo", "Materia", "Docente", "Tipo de salida", "Tipo de apoyo"],
    metrics: [
        { label: "Materiales generados", value: "184", helper: "Último mes" },
        { label: "Entregas realizadas", value: "162", helper: "Por plataforma y correo" },
        { label: "Consultas de materiales", value: "1,248", helper: "Aperturas registradas" },
        { label: "Descargas", value: "392", helper: "Biblioteca del estudiante" }
    ],
    usageBySubject: [
      { label: "Biología", value: 42 },
      { label: "Historia", value: 31 },
      { label: "Comunicación", value: 28 },
      { label: "Matemáticas", value: 19 }
    ],
    usageByAdaptation: [
      { label: "Repaso breve", value: 38 },
      { label: "Lenguaje simplificado", value: 34 },
      { label: "Apoyo visual", value: 27 },
      { label: "Estructura paso a paso", value: 21 }
    ],
    trend: [
      { period: "Semana 1", value: 28 },
      { period: "Semana 2", value: 36 },
      { period: "Semana 3", value: 44 },
      { period: "Semana 4", value: 52 }
    ]
  },
  integrations: [
    {
      title: "Google Classroom",
      status: "Ruta de crecimiento",
      copy: "Publicación de materiales y sincronización de tareas por grupo."
    },
    {
      title: "Microsoft Teams",
      status: "Ruta de crecimiento",
      copy: "Distribución institucional y seguimiento desde entornos híbridos."
    },
    {
      title: "Correo institucional y exportación",
      status: "Listo para activarse",
      copy: "Salida por correo, PDF y Word para compartir materiales postclase."
    }
  ],
  sensitiveCategoryExamples: [
    "TDA / TDAH",
    "TEA nivel 1",
    "Alteración del lenguaje",
    "Procesamiento sensorial",
    "Ansiedad o crisis de pánico",
    "Depresión"
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
      question: "¿Puede usar diagnósticos previos o condiciones ya registradas por la escuela?",
      answer:
        "Sí, pero únicamente como información institucional protegida para activar apoyos pedagógicos concretos. La interfaz docente prioriza apoyos y ajustes, no etiquetas clínicas visibles."
    },
    {
      question: "¿Puedo cargar base escolar completa?",
      answer: "Sí. La coordinación puede registrar alumnos, docentes, grupos y materias por carga masiva o captura manual."
    },
    {
      question: "¿Cómo se entregan los materiales?",
      answer: "Pueden publicarse por plataforma interna, correo institucional, por grupo o para estudiantes específicos."
    }
  ],
  onboardingByRole: {
    teacher: [
      "Selecciona materia, grupo y fecha de la sesión.",
      "Carga texto, audio o puntos clave de la explicación.",
      "Genera el borrador, compáralo y edítalo antes de aprobar.",
      "Define destinatarios, adapta y programa el envío postclase."
    ],
    student: [
      "Ubica materiales nuevos, favoritos e historial por materia.",
      "Consulta resumen, pasos, glosario y tarea en vista resumida o detallada.",
      "Guarda, descarga o marca materiales para repaso posterior."
    ],
    admin: [
      "Importa base escolar, revisa validaciones y actualiza registros.",
      "Gestiona perfiles pedagógicos autorizados y permisos por rol.",
      "Consulta reportes agregados, bitácora e integraciones futuras."
    ]
  },
  moduleMap: [
    {
      title: "Base escolar",
      copy: "Alumnos, docentes, grupos, materias, estatus y apoyos pedagógicos."
    },
    {
      title: "Flujo docente",
      copy: "Captura, IA, revisión, comparativa y envío por destinatarios."
    },
    {
      title: "Experiencia estudiante",
      copy: "Materiales claros, privados, guardados y descargables."
    },
    {
      title: "Gobernanza institucional",
      copy: "Permisos, reportes, bitácora, privacidad e integraciones futuras."
    }
  ],
  wireflow: [
    "Institución importa base escolar -> organiza alumnos, grupos y materias",
    "Docente crea clase -> IA genera borrador -> docente revisa y aprueba",
    "Sistema determina destinatarios -> entrega materiales base y adaptados",
    "Estudiante consulta, guarda y descarga -> analítica agrega uso institucional"
  ],
  architectureLayers: [
    {
      title: "Capa académica",
      copy: "Usuarios, grupos, materias, sesiones, materiales y entregas."
    },
    {
      title: "Capa de IA",
      copy: "Transcripción, generación base, adaptaciones y salida estructurada."
    },
    {
      title: "Capa de control",
      copy: "Permisos, revisión docente, bitácora y trazabilidad institucional."
    }
  ],
  examples: [
    {
      topic: "Biología · Fotosíntesis y flujo de energía",
      input:
        "Explicación sobre entradas, salidas y función de la clorofila, con un esquema breve del proceso como actividad.",
      baseOutput:
        "Resumen del proceso, pasos de actividad, conceptos clave y glosario para todo el grupo.",
      adaptedOutput:
        "Versión con lenguaje simplificado, pasos secuenciales, bloques cortos y apoyo visual."
    }
  ]
};

export const demoApiMeta = {
  demo: true,
  appMode: demoConfig.appMode,
  schoolName: demoConfig.schoolName,
  supportEmail: demoConfig.supportEmail
};
