"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ end, suffix = "", duration = 1.5 }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const steps = 40;
    const increment = end / steps;
    const interval = (duration * 1000) / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
