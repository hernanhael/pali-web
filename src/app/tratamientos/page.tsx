"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { TreatmentCard } from "@/components/tratamientos/TreatmentCard";
import { treatments, type TreatmentCategory } from "@/data/treatments";
import { fadeUp } from "@/lib/animations";

const categories: ("Todos" | TreatmentCategory)[] = [
  "Todos",
  "Estética",
  "Ortodoncia",
  "Implantes",
  "General",
];

export default function TratamientosPage() {
  const [activeCategory, setActiveCategory] = useState<"Todos" | TreatmentCategory>("Todos");

  const filtered =
    activeCategory === "Todos"
      ? treatments
      : treatments.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <SectionTitle
          eyebrow="Servicios"
          title="Tratamientos"
          subtitle="Cada tratamiento es diseñado a medida, pensando en tu caso particular y los resultados que querés lograr."
        />

        <GoldDivider />

        {/* Filtros */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeUp}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-sm px-5 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-ink text-bg border-ink"
                  : "border-warm/60 text-ink/60 hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid asimétrico */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.map((treatment, i) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              size={i === 0 && activeCategory === "Todos" ? "large" : "medium"}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
