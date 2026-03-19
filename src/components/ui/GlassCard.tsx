"use client";

import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  animate = true,
  hover = true,
}: GlassCardProps) {
  const base =
    "glass rounded-2xl p-6 " + className;

  if (!animate) {
    return <div className={base}>{children}</div>;
  }

  return (
    <motion.div
      className={base}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
      whileHover={hover ? { scale: 1.02, transition: { duration: 0.3 } } : undefined}
    >
      {children}
    </motion.div>
  );
}
