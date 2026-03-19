"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/animations";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "items-start";

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-gold"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-heading text-4xl md:text-5xl lg:text-6xl text-ink leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="font-sans text-[--text-secondary] text-base md:text-lg max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
