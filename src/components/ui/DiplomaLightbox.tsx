"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CldImage } from "next-cloudinary";
import type { Diploma } from "@/data/credentials";

interface DiplomaLightboxProps {
  diploma: Diploma | null;
  onClose: () => void;
}

export function DiplomaLightbox({ diploma, onClose }: DiplomaLightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const modal = (
    <AnimatePresence>
      {diploma && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 bg-bg rounded-3xl p-6 max-w-lg w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-ink/10 flex items-center justify-center hover:bg-ink/20 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Imagen grande */}
            <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-soft/20 to-warm/30 flex items-center justify-center mb-5 overflow-hidden">
              {diploma.cloudinaryId ? (
                <CldImage
                  src={diploma.cloudinaryId}
                  alt={`Diploma: ${diploma.title}`}
                  fill
                  className="object-contain"
                  sizes="500px"
                />
              ) : (
                <span className="font-heading text-2xl text-gold/40">✦</span>
              )}
            </div>

            <h3 className="font-heading text-2xl text-ink mb-1">{diploma.title}</h3>
            <p className="font-sans text-sm text-[--text-secondary]">
              {diploma.institution}
            </p>
            {diploma.description && (
              <p className="font-sans text-sm text-[--text-secondary] mt-3 leading-relaxed">
                {diploma.description}
              </p>
            )}
            <span className="font-sans text-sm text-gold mt-3 block">{diploma.year}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
