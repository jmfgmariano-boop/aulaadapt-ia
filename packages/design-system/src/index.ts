export const theme = {
  colors: {
    ink: "#14354A",
    inkSoft: "#2B5872",
    mint: "#A9E5D5",
    mintDeep: "#64C7B2",
    sky: "#D9F1F6",
    surface: "#F4F7F8",
    paper: "#FFFFFF",
    line: "#D8E1E5",
    text: "#173042",
    textMuted: "#5D7383",
    success: "#257A61",
    warning: "#B07B24"
  },
  radii: {
    lg: 28,
    md: 20,
    sm: 14
  },
  shadows: {
    card: "0 20px 60px rgba(20, 53, 74, 0.10)"
  }
};

export const adaptationOptions = [
  {
    id: "comprension_general",
    label: "Comprensión general",
    description: "Versión estándar clara para todo el grupo."
  },
  {
    id: "repaso_breve",
    label: "Repaso breve",
    description: "Ideas esenciales para revisar en pocos minutos."
  },
  {
    id: "estructura_paso_a_paso",
    label: "Estructura paso a paso",
    description: "Secuencia numerada y ordenada."
  },
  {
    id: "formato_visual",
    label: "Formato visual",
    description: "Mayor apoyo con bloques y esquema breve."
  },
  {
    id: "lenguaje_simplificado",
    label: "Lenguaje simplificado",
    description: "Frases directas y vocabulario más claro."
  },
  {
    id: "contenido_segmentado",
    label: "Contenido segmentado",
    description: "Contenido dividido en fragmentos fáciles de seguir."
  }
] as const;

export const outputOptions = [
  "Resumen accesible",
  "Pasos de la actividad",
  "Conceptos clave",
  "Glosario sencillo",
  "Versión simplificada",
  "Esquema breve",
  "Recordatorio de tarea"
] as const;
