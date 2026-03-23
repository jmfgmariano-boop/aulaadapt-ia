import type {
  ClassSession,
  Delivery,
  GeneratedMaterial,
  Group,
  Subject,
  UsageSnapshot,
  User
} from "@aulaadapt/domain";

export const users: User[] = [
  {
    id: "teacher-1",
    name: "Mariana Gómez",
    role: "teacher",
    school: "Preparatoria de la Universidad Autónoma de Guadalajara",
    preferences: {
      language: "es",
      fontScale: "normal",
      reducedNoise: true,
      notifications: true
    }
  },
  {
    id: "student-1",
    name: "Leonardo Ruiz",
    role: "student",
    school: "Preparatoria de la Universidad Autónoma de Guadalajara",
    preferences: {
      language: "es",
      fontScale: "large",
      reducedNoise: true,
      notifications: true
    }
  },
  {
    id: "admin-1",
    name: "Coordinación Académica",
    role: "admin",
    school: "Preparatoria de la Universidad Autónoma de Guadalajara",
    preferences: {
      language: "es",
      fontScale: "normal",
      reducedNoise: false,
      notifications: true
    }
  }
];

export const groups: Group[] = [
  {
    id: "group-5a",
    name: "5A",
    grade: "5to semestre",
    shift: "matutino",
    teacherIds: ["teacher-1"],
    studentIds: ["student-1"]
  },
  {
    id: "group-4b",
    name: "4B",
    grade: "4to semestre",
    shift: "vespertino",
    teacherIds: ["teacher-1"],
    studentIds: ["student-1"]
  }
];

export const subjects: Subject[] = [
  {
    id: "subject-bio",
    name: "Biología",
    area: "Ciencias naturales",
    teacherId: "teacher-1"
  },
  {
    id: "subject-com",
    name: "Comunicación",
    area: "Lenguaje",
    teacherId: "teacher-1"
  }
];

export const materials: GeneratedMaterial[] = [
  {
    id: "material-1",
    sessionId: "session-1",
    title: "Fotosíntesis: resumen postclase",
    summary:
      "La fotosíntesis es el proceso mediante el cual las plantas usan luz, agua y dióxido de carbono para producir glucosa y oxígeno. Hoy revisamos las etapas principales y por qué este proceso es esencial para los ecosistemas.",
    steps: [
      "Lee primero el resumen general para recordar la idea central.",
      "Repasa las etapas: absorción de luz, transformación de energía y producción de glucosa.",
      "Observa el esquema para identificar entradas y salidas del proceso.",
      "Revisa la tarea y prepara un ejemplo de la vida diaria."
    ],
    concepts: ["Fotosíntesis", "Clorofila", "Glucosa", "Dióxido de carbono", "Oxígeno"],
    glossary: [
      {
        term: "Clorofila",
        definition: "Pigmento verde que ayuda a captar la luz del sol."
      },
      {
        term: "Glucosa",
        definition: "Azúcar que la planta produce como fuente de energía."
      },
      {
        term: "Ecosistema",
        definition: "Conjunto de seres vivos y su entorno."
      }
    ],
    simplifiedVersion:
      "Las plantas usan la luz del sol para fabricar su alimento. Para hacerlo, toman agua y aire. Como resultado producen energía para vivir y liberan oxígeno.",
    visualOutline: [
      "Luz solar -> hoja",
      "Agua + CO2 -> proceso en la planta",
      "Resultado -> glucosa + oxígeno"
    ],
    homeworkReminder:
      "Entrega mañana un esquema simple con las entradas y salidas de la fotosíntesis.",
    selectedAdaptations: [
      "comprension_general",
      "lenguaje_simplificado",
      "estructura_paso_a_paso"
    ]
  }
];

export const sessions: ClassSession[] = [
  {
    id: "session-1",
    date: "2026-03-22",
    topic: "Fotosíntesis y flujo de energía",
    groupId: "group-5a",
    subjectId: "subject-bio",
    teacherId: "teacher-1",
    status: "approved",
    materialId: "material-1",
    inputs: [
      {
        id: "input-1",
        type: "text",
        label: "Explicación docente",
        content:
          "Explicamos cómo las plantas convierten la luz en energía química y cuál es la importancia de la glucosa en el proceso."
      },
      {
        id: "input-2",
        type: "assignment",
        label: "Tarea",
        content: "Crear un esquema de entradas y salidas del proceso."
      }
    ]
  }
];

export const deliveries: Delivery[] = [
  {
    id: "delivery-1",
    materialId: "material-1",
    recipients: ["group-5a"],
    channel: "platform",
    scheduledFor: "2026-03-22T16:30:00.000Z",
    status: "pending"
  }
];

export const usageSnapshot: UsageSnapshot = {
  generatedThisWeek: 18,
  approvedRate: 92,
  activeGroups: 6,
  averageDeliveryMinutes: 23
};
