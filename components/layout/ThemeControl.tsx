"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const CABLE = 72; // README §13: 65–90px
const THRESHOLD = 55; // pull distance that flips the theme
const MAX_PULL = 92;
const SPRING = { type: "spring", stiffness: 180, damping: 16 } as const;

export function ThemeControl() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const pull = useMotionValue(0);
  const cableHeight = useTransform(pull, (v) => CABLE + v);

  // Always call the latest toggle from window-level listeners.
  const toggleRef = useRef(toggle);
  useEffect(() => {
    toggleRef.current = toggle;
  }, [toggle]);

  const cleanupRef = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanupRef.current?.(), []);

  const snapBack = () => animate(pull, 0, SPRING);

  // Pull gesture: pointer events on window, so the drag keeps working even when
  // the cursor leaves the bulb (mouse, touch and stylus).
  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault(); // no text selection / native drag while pulling
    cleanupRef.current?.();
    pull.stop();

    const startY = e.clientY;
    let moved = 0;
    let fired = false;

    const onMove = (ev: PointerEvent) => {
      const dy = Math.max(0, ev.clientY - startY);
      moved = Math.max(moved, dy);
      // Follows the pointer 1:1 up to the threshold, then resists.
      const eased = dy > THRESHOLD ? THRESHOLD + (dy - THRESHOLD) * 0.35 : dy;
      pull.set(Math.min(eased, MAX_PULL));
      if (!fired && dy >= THRESHOLD) {
        fired = true;
        toggleRef.current();
      }
    };

    const finish = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
      cleanupRef.current = null;
      // A press without a real pull counts as a click.
      if (!fired && moved < 6) {
        toggleRef.current();
        animate(pull, 14, { duration: 0.08 }).then(() => snapBack());
      } else {
        snapBack();
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
    cleanupRef.current = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
    };
  };

  // Keyboard activation (Enter / Space). Mouse and touch are handled by the pull gesture above.
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    toggle();
    animate(pull, 14, { duration: 0.08 }).then(() => snapBack());
  };

  return (
    <>
      {/* Hanging pull-cord bulb */}
      <div className="pointer-events-none fixed top-0 right-[14px] z-[60] flex flex-col items-center md:right-[72px]">
        <motion.div
          aria-hidden
          className="w-[1.5px]"
          style={{ height: cableHeight, background: "var(--bulb-cable)" }}
        />
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label="Toggle theme. Pull the cord or press Enter to switch between dark and light."
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
          className="pointer-events-auto relative -mt-px flex h-12 w-11 cursor-grab touch-none select-none items-start justify-center active:cursor-grabbing"
        >
          {/* glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-[20px] left-1/2 size-[96px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-[350ms]"
            style={{
              opacity: "var(--bulb-glow)",
              background:
                "radial-gradient(circle, rgba(253,199,119,0.4) 0%, rgba(253,199,119,0.12) 40%, transparent 68%)",
            }}
          />
          <svg width="24" height="34" viewBox="0 0 24 34" aria-hidden className="pointer-events-none relative">
            <rect x="8" y="0" width="8" height="7" rx="1.5" style={{ fill: "var(--bulb-cap)" }} />
            <path
              d="M12 7C5.5 7 2 12.5 2 17.5c0 4.6 3 7 6 9.6V30h8v-2.9c3-2.6 6-5 6-9.6C22 12.5 18.5 7 12 7Z"
              style={{ fill: "var(--bulb-glass)", stroke: "var(--bulb-stroke)" }}
              strokeWidth="1"
            />
            <path
              d="M9.5 27 10.3 19.5 12 22.5 13.7 19.5 14.5 27"
              fill="none"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: "var(--bulb-filament)" }}
            />
          </svg>
        </button>
      </div>

      {/* Compact theme pill (shown in the reference mockup, next to the bulb) */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className="fixed top-[66px] right-[10px] z-[60] hidden h-8 items-center gap-1 border border-line bg-[var(--glass-bg)] px-1.5 backdrop-blur-[16px] md:flex"
      >
        <span
          className={`grid size-5 place-items-center transition-colors duration-[180ms] ${
            !isDark ? "text-accent" : "text-ink3"
          }`}
        >
          <Sun size={13} aria-hidden />
        </span>
        <span
          className={`grid size-5 place-items-center transition-colors duration-[180ms] ${
            isDark ? "text-accent" : "text-ink3"
          }`}
        >
          <Moon size={13} aria-hidden />
        </span>
      </button>
    </>
  );
}
