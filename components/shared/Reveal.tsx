"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";

/**
 * Section reveal (README §16): fade + Y 20px, 500ms, ease [0.22, 1, 0.36, 1],
 * triggered near 85% of the viewport height, once. Content that is already in
 * view (or when JS / motion is unavailable) is never hidden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "";
    el.style.transform = "";
    if (reduced) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        animate(
          el,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
        );
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
