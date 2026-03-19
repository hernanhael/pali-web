"use client";

import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";

const photos = [
  { id: 1, label: "Sala de espera", aspect: "aspect-[4/3]" },
  { id: 2, label: "Sillón principal", aspect: "aspect-[3/4]" },
  { id: 3, label: "Equipamiento", aspect: "aspect-[4/3]" },
  { id: 4, label: "Recepción", aspect: "aspect-[4/3]" },
  { id: 5, label: "Sala de esterilización", aspect: "aspect-[3/4]" },
  { id: 6, label: "Vista general", aspect: "aspect-[16/9]" },
];

export function OfficeGallery() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {photos.map((photo, i) => (
        <motion.div
          key={photo.id}
          className={`break-inside-avoid rounded-2xl overflow-hidden bg-gradient-to-br ${
            i % 2 === 0
              ? "from-blue-soft/20 to-warm/30"
              : "from-warm/30 to-blue-soft/20"
          } flex items-center justify-center ${photo.aspect}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={scaleIn}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <span className="font-sans text-sm text-blue-mid/50">{photo.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
