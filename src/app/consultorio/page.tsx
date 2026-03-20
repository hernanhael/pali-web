import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { OfficeGallery } from "@/components/consultorio/OfficeGallery";
import { ToolCard } from "@/components/consultorio/ToolCard";

export const metadata: Metadata = {
  title: "Consultorio — Dra. María Paula Cajal",
  description:
    "Conocé el consultorio de la Dra. Paula Cajal: equipamiento de última generación en un espacio cálido y moderno en Buenos Aires.",
  openGraph: {
    title: "Consultorio — Dra. María Paula Cajal",
    description: "Tecnología de vanguardia en un espacio cálido y moderno.",
    locale: "es_AR",
    type: "website",
  },
};

const tools = [
  {
    name: "Scanner intraoral 3D",
    description: "Tecnología de escaneo digital que reemplaza las incómodas impresiones tradicionales.",
    purpose: "Obtener modelos digitales precisos para ortodoncia, coronas e implantes.",
    emoji: "🔬",
  },
  {
    name: "Láser dental",
    description: "Equipo de láser Er:YAG para tratamientos mínimamente invasivos.",
    purpose: "Blanqueamiento, cirugías de encías y tratamientos periodontales sin bisturí.",
    emoji: "⚡",
  },
  {
    name: "Rx digital panorámica",
    description: "Radiografía panorámica y TAC dental con 90% menos de radiación.",
    purpose: "Diagnóstico completo de la boca, implantes y evaluación de terceros molares.",
    emoji: "📡",
  },
  {
    name: "Lámpara LED de fotocurado",
    description: "Luz LED de alta intensidad para polimerización de resinas compuestas.",
    purpose: "Endurece los materiales de relleno y carillas en segundos con alta resistencia.",
    emoji: "💡",
  },
  {
    name: "Ultrasonido periodontal",
    description: "Destartarizador ultrasónico de última generación con punta Piezo.",
    purpose: "Limpieza profunda de encías y remoción de sarro sin dañar el esmalte.",
    emoji: "🌊",
  },
  {
    name: "Sistema CAD/CAM",
    description: "Diseño y fresado de coronas, incrustaciones y carillas en una sola sesión.",
    purpose: "Restauraciones dentales de cerámica de alta resistencia en el día.",
    emoji: "⚙️",
  },
];

export default function ConsultorioPage() {
  return (
    <div className="min-h-screen bg-bg pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <SectionTitle
            eyebrow="El consultorio"
            title="Un espacio diseñado para tu bienestar"
            subtitle="Cada detalle del consultorio fue pensado para que te sientas cómodo/a, seguro/a y atendido/a. Tecnología de vanguardia en un ambiente cálido y acogedor."
          />
          <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-blue-soft/20 to-warm/30 flex items-center justify-center">
            <span className="font-sans text-sm text-blue-mid/50">Foto principal del consultorio</span>
          </div>
        </div>

        <GoldDivider />

        {/* Galería */}
        <div className="flex flex-col gap-10">
          <SectionTitle eyebrow="Galería" title="Conocé el espacio" align="center" />
          <OfficeGallery />
        </div>

        <GoldDivider />

        {/* Herramientas */}
        <div className="flex flex-col gap-10">
          <SectionTitle
            eyebrow="Tecnología"
            title="Herramientas de vanguardia"
            subtitle="Pasá el cursor sobre cada card para conocer más."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
