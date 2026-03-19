"use client";

import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";

interface Tool {
  name: string;
  description: string;
  purpose: string;
  emoji?: string;
  cloudinaryId?: string;
}

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <motion.div
      className="group relative h-64 cursor-pointer"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
      style={{ perspective: "1000px" }}
    >
      {/* Flip container */}
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRENTE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-soft/20 to-warm/30 flex flex-col items-center justify-center gap-3 border border-warm/40 group-hover:[transform:rotateY(180deg)] transition-transform duration-700"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl">{tool.emoji || "🦷"}</span>
          <h3 className="font-heading text-lg text-ink text-center px-4">{tool.name}</h3>
        </div>

        {/* DORSO */}
        <div
          className="absolute inset-0 rounded-2xl bg-ink flex flex-col justify-center gap-3 p-5 [transform:rotateY(180deg)] group-hover:[transform:rotateY(0deg)] transition-transform duration-700"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="font-heading text-lg text-bg">{tool.name}</h3>
          <p className="font-sans text-sm text-bg/70 leading-relaxed">{tool.description}</p>
          <div className="pt-3 border-t border-bg/20">
            <span className="font-sans text-xs text-gold tracking-wide uppercase">Para qué sirve</span>
            <p className="font-sans text-xs text-bg/60 mt-1">{tool.purpose}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
