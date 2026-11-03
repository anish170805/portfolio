"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

const ITEMS = [
  { id: "about", n: "01", label: "About" },
  { id: "projects", n: "02", label: "Projects" },
  { id: "experience", n: "03", label: "Experience" },
  { id: "skills", n: "04", label: "Skills" },
  { id: "contact", n: "05", label: "Contact" },
] as const;

/**
 * Left-edge scroll rail (large screens). A gold line fills as you scroll, with a
 * clickable dot per section and a back-to-top button above it.
 */
export function SideRail() {
  const [active, setActive] = useState<string>("about");
  const activeRef = useRef(active);
  const fillRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  // Active section: same approach as the navbar
  useEffect(() => {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0 || visible.has(activeRef.current)) return;
        const next = ITEMS.find((it) => visible.has(it.id));
        if (next) {
          activeRef.current = next.id;
          setActive(next.id);
        }
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    ITEMS.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Scroll progress fill (direct DOM write, no re-render)
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      fill.style.transform = `scaleY(${p})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    activeRef.current = id;
    setActive(id);
  };

  return (
    <aside
      aria-label="Section progress"
      className="fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
    >
      <a
        href="#top"
        aria-label="Back to top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        }}
        className="grid size-9 place-items-center border border-line text-ink2 transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        <ArrowUp size={16} aria-hidden />
      </a>

      <nav className="relative w-11">
        <span
          aria-hidden
          className="absolute top-[22px] bottom-[22px] left-1/2 w-px -translate-x-1/2 bg-line"
        />
        <span
          ref={fillRef}
          aria-hidden
          className="absolute top-[22px] bottom-[22px] left-1/2 w-px origin-top -translate-x-1/2 bg-accent"
          style={{ transform: "scaleY(0)" }}
        />
        <ul className="relative flex flex-col">
          {ITEMS.map(({ id, n, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex h-11 w-11 items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={`size-2 rounded-full border transition-all duration-200 ${
                      isActive
                        ? "scale-[1.6] border-accent bg-accent"
                        : "border-ink3 bg-bg group-hover:border-accent"
                    }`}
                  />
                  <span
                    aria-hidden
                    className="glass pointer-events-none absolute left-12 rounded-md px-2 py-1 font-label text-[10px] whitespace-nowrap text-ink2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <span className="text-accent">{n}</span> {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
