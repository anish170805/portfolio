"use client";

import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, CodeXml, FolderCode, Mail, Menu, UserRound, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { NAV, SECTION_ORDER } from "@/lib/site";

const ICONS = {
  about: UserRound,
  experience: BriefcaseBusiness,
  projects: FolderCode,
  skills: CodeXml,
  contact: Mail,
} as const;

export function Navbar() {
  const [active, setActive] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeRef = useRef(active);
  const headerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Translucent surface + blur once the page scrolls (README §6)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver (README §6)
  useEffect(() => {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0 || visible.has(activeRef.current)) return;
        const next = SECTION_ORDER.find((id) => visible.has(id));
        if (next) {
          activeRef.current = next;
          setActive(next);
        }
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Mobile menu: close on outside click and Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    activeRef.current = id;
    setActive(id);
    setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      style={{
        fontFamily: "var(--font-black-ops-one), system-ui",
        fontWeight: 400,
        fontStyle: "normal",
      }}
      className={`sticky top-0 z-50 h-[76px] border-b border-[var(--navbar-line)] transition-[background-color,backdrop-filter] duration-[180ms] ${
        scrolled
          ? "bg-[var(--glass-bg)] backdrop-blur-[16px]"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-full w-full items-center px-5 md:px-8 lg:px-16">
        <a href="#top" className="flex items-center gap-4 text-[20px]">
          <span className="text-accent">&gt;_</span>
          <span>Anish</span>
        </a>

        <nav
          aria-label="Primary"
          className="ml-8 hidden flex-1 items-center justify-evenly md:flex"
        >
          {NAV.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex h-9 items-center gap-2 rounded-none px-4 text-[18px] transition-colors duration-[180ms] pointer-coarse:min-h-11 hover:bg-accent hover:text-bg ${
                  isActive ? "text-accent" : "text-ink2"
                }`}
              >
                  {label}
                </a>
            );
          })}
        </nav>

        {/* Mobile menu button (leaves room for the hanging bulb) */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="mr-12 grid size-11 place-items-center border border-line md:hidden"
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="glass absolute top-[68px] right-[64px] max-h-[calc(100dvh-100px)] w-56 overflow-y-auto p-2 md:hidden"
        >
          {NAV.map(({ id, label }) => {
            const Icon = ICONS[id];
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-none px-3 text-[17px] transition-colors duration-[180ms] hover:bg-accent hover:text-bg ${
                  isActive ? "text-accent" : "text-ink2"
                }`}
              >
                <Icon size={16} aria-hidden />
                {label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
