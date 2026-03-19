"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportConfig } from "@/lib/animations";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionTitle } from "@/components/ui/SectionTitle";

const values = [
  {
    icon: "✦",
    title: "Escucha activa",
    desc: "Cada paciente tiene su tiempo. Me importa entender tu historia antes de proponer cualquier tratamiento.",
  },
  {
    icon: "✦",
    title: "Tecnología de vanguardia",
    desc: "Trabajo con equipos de última generación para resultados predecibles y tratamientos menos invasivos.",
  },
  {
    icon: "✦",
    title: "Estética natural",
    desc: "Busco resultados que se vean armónicos, que complementen tu rostro y personalidad.",
  },
];

export function AboutSection() {
  return (
    <section className="py-28 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1fr] gap-20 items-center">
          {/* Imagen placeholder */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[3/4] rounded-[2rem] bg-gradient-to-br from-warm/40 to-blue-soft/20 flex items-center justify-center">
              <span className="font-heading text-xl text-blue-mid/40">
                Foto consultorio / ambiente
              </span>
            </div>
            {/* Tarjeta flotante */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 max-w-[200px]">
              <p className="font-sans text-xs text-[--text-secondary] leading-relaxed">
                &ldquo;La boca es la puerta del bienestar.&rdquo;
              </p>
              <span className="font-heading text-sm text-gold mt-2 block">
                Dra. Paula Cajal
              </span>
            </div>
          </motion.div>

          {/* Texto */}
          <div className="flex flex-col gap-8 lg:pl-8">
            <SectionTitle
              eyebrow="Quién soy"
              title="Una odontóloga que cree en la prevención y la belleza genuina"
            />

            <motion.div
              className="flex flex-col gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="font-sans text-[--text-secondary] leading-relaxed"
              >
                Me gradué de la Universidad de Buenos Aires y desde entonces no
                paré de formarme. La odontología cambia rápido y me encanta
                estar a la vanguardia — no solo en técnica, sino en la forma de
                relacionarme con mis pacientes.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-sans text-[--text-secondary] leading-relaxed"
              >
                Mi consultorio es un espacio donde intentás relajarte, confiar y
                salir con algo mejor de lo que entraste. Trabajo con adultos,
                adolescentes y niños, y cada caso me desafía a ser mejor
                profesional.
              </motion.p>
            </motion.div>

            <GoldDivider />

            {/* Valores */}
            <motion.ul
              className="flex flex-col gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {values.map((v) => (
                <motion.li
                  key={v.title}
                  variants={fadeUp}
                  className="flex gap-4"
                >
                  <span className="text-gold mt-0.5 flex-shrink-0">{v.icon}</span>
                  <div>
                    <h4 className="font-sans font-medium text-ink text-sm mb-0.5">
                      {v.title}
                    </h4>
                    <p className="font-sans text-sm text-[--text-secondary] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
