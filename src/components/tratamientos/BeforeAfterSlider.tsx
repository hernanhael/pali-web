"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Antes",
  afterAlt = "Después",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => {
    dragging.current = true;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };
  const onMouseUp = () => {
    dragging.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* Imagen ANTES */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm/40 to-blue-soft/20 flex items-center justify-center">
        {beforeSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={beforeSrc} alt={beforeAlt} className="w-full h-full object-cover" />
        ) : (
          <span className="font-sans text-xs text-blue-mid/50">Antes</span>
        )}
      </div>

      {/* Imagen DESPUÉS (clip) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-soft/20 to-warm/10 flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {afterSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={afterSrc} alt={afterAlt} className="w-full h-full object-cover" />
        ) : (
          <span className="font-sans text-xs text-blue-mid/50">Después</span>
        )}
      </div>

      {/* Divisor */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center cursor-ew-resize z-10"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={() => {
          dragging.current = true;
        }}
        whileTap={{ scale: 1.15 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5 4L1 8L5 12" stroke="#768B9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 4L15 8L11 12" stroke="#768B9A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 glass rounded-full px-2 py-0.5 pointer-events-none">
        <span className="font-sans text-xs text-ink">Antes</span>
      </div>
      <div className="absolute bottom-3 right-3 glass rounded-full px-2 py-0.5 pointer-events-none">
        <span className="font-sans text-xs text-ink">Después</span>
      </div>
    </div>
  );
}
