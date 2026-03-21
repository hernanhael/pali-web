"use client";

import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  name: string;
  onClose: () => void;
}

export function ConfirmationModal({ open, name, onClose }: ConfirmationModalProps) {
  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 bg-[#ECEBE8] rounded-3xl p-10 max-w-md w-full flex flex-col items-center text-center gap-5"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle size={52} className="text-gold" />
            </motion.div>

            <div>
              <h2 className="font-heading text-3xl text-ink">¡Solicitud enviada!</h2>
              <p className="font-sans text-[--text-secondary] mt-2 leading-relaxed">
                Gracias, <span className="text-ink font-medium">{name.split(" ")[0]}</span>. Recibiste un email de confirmación. Nos pondremos en contacto para confirmar tu turno.
              </p>
            </div>

            <div className="gold-divider w-20" />

            <button
              onClick={onClose}
              className="font-sans text-sm font-medium px-8 py-3 rounded-full bg-ink text-bg hover:bg-gold hover:text-ink transition-all duration-300"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document === 'undefined') return null
  return createPortal(modal, document.body)
}
