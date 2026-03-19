export type TreatmentCategory =
  | "Estética"
  | "Ortodoncia"
  | "Implantes"
  | "General";

export interface Treatment {
  id: string;
  name: string;
  category: TreatmentCategory;
  description: string;
  longDescription?: string;
  duration?: string;
  sessions?: string;
  cloudinaryIds?: string[];
}

export const treatments: Treatment[] = [
  {
    id: "blanqueamiento",
    name: "Blanqueamiento dental",
    category: "Estética",
    description:
      "Recuperá el blanco natural de tus dientes con técnicas seguras y sin sensibilidad.",
    longDescription:
      "El blanqueamiento dental profesional utiliza agentes despigmentantes de alta concentración aplicados en consultorio, con activación LED de última generación. El resultado es visible desde la primera sesión y puede aclarar hasta 8 tonos. El procedimiento es seguro, controlado y minimiza la sensibilidad postoperatoria.",
    duration: "90 minutos",
    sessions: "1–2 sesiones",
  },
  {
    id: "carillas",
    name: "Carillas de porcelana",
    category: "Estética",
    description:
      "Transformá la forma, color y tamaño de tus dientes con carillas ultra-delgadas de porcelana.",
    longDescription:
      "Las carillas de porcelana son láminas ultra-delgadas que se adhieren a la superficie del diente. Permiten cambiar el color, forma, tamaño y posición de los dientes frontales con resultados duraderos de más de 15 años. Son la solución ideal para manchas resistentes, fracturas, diastemas y pequeñas malposiciones.",
    duration: "2 semanas (2 consultas)",
    sessions: "2 consultas",
  },
  {
    id: "ortodoncia-invisible",
    name: "Ortodoncia invisible",
    category: "Ortodoncia",
    description:
      "Alineadores transparentes removibles para corregir tu mordida sin brackets metálicos.",
    longDescription:
      "Con alineadores de última generación (Invisalign y alternativas certificadas), podés corregir apiñamiento, espacios y problemas de mordida de forma discreta. Los alineadores son removibles para comer y cepillarse, y se cambian cada 1–2 semanas según el plan de tratamiento personalizado.",
    duration: "6–18 meses",
    sessions: "Control mensual",
  },
  {
    id: "brackets",
    name: "Ortodoncia con brackets",
    category: "Ortodoncia",
    description:
      "Brackets metálicos o cerámicos para correcciones complejas con precisión milimétrica.",
    duration: "12–24 meses",
    sessions: "Control mensual",
  },
  {
    id: "implantes",
    name: "Implantes dentales",
    category: "Implantes",
    description:
      "Reemplazá dientes faltantes con implantes de titanio de alta resistencia y estética natural.",
    longDescription:
      "Los implantes dentales son la solución más avanzada para reemplazar dientes perdidos. Se insertan en el hueso maxilar y funcionan como raíces artificiales, sobre las que se coloca una corona de porcelana idéntica al diente natural. Son permanentes, no afectan dientes vecinos y previenen la pérdida ósea.",
    duration: "3–6 meses (proceso completo)",
    sessions: "3–4 consultas",
  },
  {
    id: "periodoncia",
    name: "Tratamiento periodontal",
    category: "General",
    description:
      "Tratamiento de encías para recuperar su salud y prevenir la pérdida dentaria.",
    duration: "Variable",
    sessions: "2–4 sesiones",
  },
  {
    id: "endodoncia",
    name: "Endodoncia (conducto)",
    category: "General",
    description:
      "Salvá tu diente natural con tratamiento de conducto moderno y sin dolor.",
    duration: "60–90 minutos",
    sessions: "1–2 sesiones",
  },
  {
    id: "protesis",
    name: "Prótesis removible",
    category: "General",
    description:
      "Prótesis parciales y totales personalizadas para recuperar función y estética.",
    duration: "2–3 semanas",
    sessions: "3–4 consultas",
  },
];
