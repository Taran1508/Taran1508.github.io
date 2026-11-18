"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// "100+" counts 0..100 and keeps the "+" suffix.
export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const n = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [shown, setShown] = useState(n);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    const c = animate(0, n, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, n]);

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
