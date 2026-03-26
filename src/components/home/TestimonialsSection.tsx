"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { SectionTitle } from "@/components/ui/SectionTitle";

const testimonials = [
  {
    name: "Valentina M.",
    treatment: "Ortodoncia invisible",
    text: "Siempre tuve miedo al dentista y la Dra. Cajal cambió eso completamente. Su paciencia y profesionalismo son únicos. Mis dientes ahora son exactamente lo que quería.",
    rating: 5,
  },
  {
    name: "Martín R.",
    treatment: "Implantes dentales",
    text: "Perdí un diente hace años y siempre aplacé el implante. Fue la mejor decisión que tomé. El resultado es perfecto y el proceso no me dolió nada.",
    rating: 5,
  },
  {
    name: "Carolina F.",
    treatment: "Blanqueamiento estético",
    text: "El blanqueamiento fue rápido, efectivo y sin sensibilidad. La Dra. Paula es muy detallista y se nota que le importa cada paciente.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 px-6 bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <SectionTitle
          eyebrow="Testimonios"
          title="Lo que dicen mis pacientes"
          align="center"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-[1.15fr_0.9fr_0.95fr] gap-6 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className={`glass rounded-2xl flex flex-col gap-4 ${
                i === 0
                  ? 'p-9 md:row-span-1'
                  : i === 1
                    ? 'p-7 md:mt-8'
                    : 'p-7 md:-mt-2'
              }`}
            >
              {/* Estrellas */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-gold text-sm" aria-hidden="true">★</span>
                ))}
                <span className="sr-only">{t.rating} de 5 estrellas</span>
              </div>

              <p className={`font-sans text-ink/80 leading-relaxed flex-1 ${i === 0 ? 'text-base' : 'text-sm'}`}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="pt-3 border-t border-warm/40">
                <p className="font-sans font-medium text-sm text-ink">{t.name}</p>
                <p className="font-sans text-xs text-gold">{t.treatment}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
