"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { scaleIn, viewportConfig } from "@/lib/animations";
import type { Treatment } from "@/data/treatments";

interface TreatmentCardProps {
  treatment: Treatment;
  size?: "large" | "medium" | "small";
}

export function TreatmentCard({ treatment, size = "medium" }: TreatmentCardProps) {
  const [open, setOpen] = useState(false);

  const sizeClass =
    size === "large"
      ? "col-span-2 row-span-2"
      : size === "small"
      ? "col-span-1"
      : "col-span-1";

  return (
    <>
      <motion.div
        className={`group cursor-pointer rounded-2xl overflow-hidden flex flex-col bg-surface border border-warm/40 ${sizeClass}`}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={scaleIn}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        onClick={() => setOpen(true)}
      >
        {/* Imagen/Slider preview */}
        <div className={`${size === "large" ? "aspect-[16/9]" : "aspect-[4/3]"} relative bg-gradient-to-br from-blue-soft/20 to-warm/30 flex items-center justify-center overflow-hidden`}>
          <span className="font-heading text-blue-mid/40 text-lg">{treatment.name}</span>
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <h3 className="font-heading text-xl text-ink leading-tight">{treatment.name}</h3>
            <span className="font-sans text-xs text-gold bg-gold/10 rounded-full px-2 py-0.5 ml-2 flex-shrink-0">
              {treatment.category}
            </span>
          </div>
          <p className="font-sans text-sm text-[--text-secondary] leading-relaxed line-clamp-2">
            {treatment.description}
          </p>
        </div>
      </motion.div>

      {/* Modal detalle */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-ink/10 flex items-center justify-center hover:bg-ink/20 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="p-6 flex flex-col gap-5">
                <BeforeAfterSlider />

                <div>
                  <span className="font-sans text-xs text-gold tracking-[0.2em] uppercase">
                    {treatment.category}
                  </span>
                  <h2 className="font-heading text-3xl text-ink mt-1">{treatment.name}</h2>
                </div>

                <p className="font-sans text-[--text-secondary] leading-relaxed">
                  {treatment.longDescription || treatment.description}
                </p>

                {treatment.duration && (
                  <div className="flex gap-6 pt-4 border-t border-warm/40">
                    <div>
                      <span className="font-sans text-xs text-[--text-secondary] uppercase tracking-wide">Duración</span>
                      <p className="font-sans text-sm text-ink mt-0.5">{treatment.duration}</p>
                    </div>
                    {treatment.sessions && (
                      <div>
                        <span className="font-sans text-xs text-[--text-secondary] uppercase tracking-wide">Sesiones</span>
                        <p className="font-sans text-sm text-ink mt-0.5">{treatment.sessions}</p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
