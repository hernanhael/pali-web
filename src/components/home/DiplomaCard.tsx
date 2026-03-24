"use client";

import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { scaleIn, viewportConfig } from "@/lib/animations";
import type { Diploma } from "@/data/credentials";

interface DiplomaCardProps {
  diploma: Diploma;
  variant?: "featured" | "medium" | "compact";
  onClick?: (diploma: Diploma) => void;
}

export function DiplomaCard({
  diploma,
  variant = "medium",
  onClick,
}: DiplomaCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <motion.div
      className={`group cursor-pointer rounded-2xl overflow-hidden flex flex-col ${
        isFeatured ? "border-2 border-gold/40" : "border border-warm/50"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      onClick={() => onClick?.(diploma)}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-soft/20 to-warm/30 flex items-center justify-center overflow-hidden">
        {diploma.cloudinaryId ? (
          <CldImage
            src={diploma.cloudinaryId}
            alt={`Diploma: ${diploma.title}`}
            fill
            className="object-cover"
            sizes={isFeatured ? "400px" : isCompact ? "200px" : "300px"}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <div
              className={`rounded-full bg-gold/20 flex items-center justify-center ${
                isFeatured ? "w-16 h-16" : "w-10 h-10"
              }`}
            >
              <span className={`text-gold ${isFeatured ? "text-2xl" : "text-base"}`}>
                ✦
              </span>
            </div>
            {!isCompact && (
              <span className="font-sans text-xs text-blue-mid/60">
                {diploma.institution}
              </span>
            )}
          </div>
        )}

      </div>

      {/* Info */}
      <div className={`flex flex-col gap-1 bg-surface ${isFeatured ? "p-5" : isCompact ? "p-3" : "p-4"}`}>
        <h3
          className={`font-heading text-ink leading-tight ${
            isFeatured ? "text-xl" : isCompact ? "text-sm" : "text-base"
          }`}
        >
          {diploma.title}
        </h3>
        {!isCompact && (
          <p className="font-sans text-xs text-[--text-secondary]">
            {diploma.institution}
          </p>
        )}
        <span className="font-sans text-xs text-gold mt-1">{diploma.year}</span>
      </div>
    </motion.div>
  );
}
