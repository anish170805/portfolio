"use client";

import { useRef } from "react";
import { animate, useReducedMotion } from "motion/react";

/**
 * 3D flip wrapper. Click (or Enter/Space) = one slow 360° turn around the
 * vertical axis. The back face is pre-turned 180°, so it shows mid-spin and
 * the card lands on the front again. `front` and `back` are server-rendered.
 *
 * The spin is driven by `motion` (already used by Reveal) rather than a CSS
 * transition, so it always plays a real full rotation.
 */
export function FlipCard({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const rotor = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const spinning = useRef(false);
  const reduced = useReducedMotion();

  const spin = () => {
    const el = rotor.current;
    if (!el || spinning.current) return;
    spinning.current = true;

    const from = angle.current;
    const to = from + 360;
    angle.current = to;

    animate(
      el,
      { rotateY: [from, to] },
      {
        duration: reduced ? 1 : 2,
        ease: [0.45, 0, 0.25, 1],
        onComplete: () => {
          spinning.current = false;
        },
      },
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Developer trading card. Activate to spin it and see the back."
      onClick={spin}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          spin();
        }
      }}
      className="card-scene w-full max-w-[420px] cursor-pointer select-none"
    >
      <div ref={rotor} className="card-rotor" style={{ transformStyle: "preserve-3d" }}>
        {/* Front: in normal flow, so it sets the card's size */}
        <div
          className="card-face"
          style={{ position: "relative", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        {/* Back: pinned exactly behind the front, pre-turned 180deg */}
        <div
          className="card-face card-back"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
