export type UserRole = "teacher" | "student" | "admin";

export type ClassInputType =
  | "text"
  | "audio"
  | "key_points"
  | "assignment"
  | "pdf"
  | "image";

export type DeliveryChannel = "platform" | "email";

export type SessionStatus = "draft" | "generated" | "approved" | "scheduled" | "sent";

export type AdaptationLabel =
  | "comprension_general"
  | "repaso_breve"
  | "estructura_paso_a_paso"
  | "formato_visual"
  | "lenguaje_simplificado"
  | "contenido_segmentado";

export interface UserPreferences {
  language: "es" | "en";
  fontScale: "normal" | "large" | "xlarge";
  reducedNoise: boolean;
  notifications: boolean;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  school: string;
  preferences: UserPreferences;
}

export interface Group {
  id: string;
  name: string;
  grade: string;
  shift: "matutino" | "vespertino";
  teacherIds: string[];
  studentIds: string[];
}

export interface Subject {
  id: string;
  name: string;
  area: string;
  teacherId: string;
}

export interface ClassInput {
  id: string;
  type: ClassInputType;
  label: string;
  content: string;
  meta?: Record<string, string>;
}

export interface GeneratedMaterial {
  id: string;
  sessionId: string;
  title: string;
  summary: string;
  steps: string[];
  concepts: string[];
  glossary: { term: string; definition: string }[];
  simplifiedVersion: string;
  visualOutline: string[];
  homeworkReminder: string;
  selectedAdaptations: AdaptationLabel[];
}

export interface ClassSession {
  id: string;
  date: string;
  topic: string;
  groupId: string;
  subjectId: string;
  teacherId: string;
  status: SessionStatus;
  inputs: ClassInput[];
  materialId?: string;
}

export interface Delivery {
  id: string;
  materialId: string;
  recipients: string[];
  channel: DeliveryChannel;
  scheduledFor: string;
  status: "pending" | "sent";
}

export interface AuditLog {
  id: string;
  actorId: string;
  entityId: string;
  action: "generate" | "edit" | "approve" | "schedule" | "send";
  timestamp: string;
}

export interface UsageSnapshot {
  generatedThisWeek: number;
  approvedRate: number;
  activeGroups: number;
  averageDeliveryMinutes: number;
}

export interface DemoAppConfig {
  appMode: "demo";
  showDemoBanner: boolean;
  defaultRole: UserRole;
  schoolName: string;
  supportEmail: string;
}
