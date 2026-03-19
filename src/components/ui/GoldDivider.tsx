"use client";

import { motion } from "framer-motion";

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className = "" }: GoldDividerProps) {
  return (
    <motion.div
      className={`gold-divider my-8 ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
