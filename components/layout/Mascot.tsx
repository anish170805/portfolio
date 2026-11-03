"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Theme = "dark" | "light";

const WALK_FRAME_COUNT = 10;
const SCROLL_PER_FRAME = 12;

function getFramePath(theme: Theme, frame: number) {
  const color = theme === "dark" ? "white" : "black";
  const number = String(frame + 1).padStart(2, "0");
  return `/stickman_images/${color}_nobg/stickman_${color}_nobg_frame_${number}.png`;
}

/**
 * Viewport-level mascot (README §14). Fixed to the bottom edge, travels left → right
 * with overall page scroll progress, flips to face its direction of travel.
 * Walks through the supplied frame sequence using the theme-matched artwork.
 */
export function Mascot() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      setTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");
    };
    const observer = new MutationObserver(syncTheme);

    syncTheme();
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    for (const color of ["black", "white"] as const) {
      for (let index = 0; index < WALK_FRAME_COUNT; index++) {
        const image = new window.Image();
        image.src = getFramePath(color === "white" ? "dark" : "light", index);
      }
    }
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const imgWrap = imgWrapRef.current;
    if (!wrap || !imgWrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let lastX = 0;
    let dir = 1;

    const update = () => {
      raf = 0;
      if (reduced.matches) {
        wrap.style.transform = "translate3d(0,0,0)";
        setFrame(0);
        return;
      }
      setFrame(Math.floor(window.scrollY / SCROLL_PER_FRAME) % WALK_FRAME_COUNT);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      const maxX = Math.max(0, window.innerWidth - wrap.offsetWidth - 16);
      const x = progress * maxX;

      if (x > lastX + 0.5) dir = 1;
      else if (x < lastX - 0.5) dir = -1;
      lastX = x;

      wrap.style.transform = `translate3d(${x}px, 0, 0)`;
      imgWrap.style.transform = `scaleX(${dir})`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed bottom-0 left-0 z-40 size-[76px] will-change-transform md:size-[104px]"
    >
      <div ref={imgWrapRef} className="size-full">
        <Image
          src={getFramePath(theme, frame)}
          alt=""
          width={1010}
          height={1010}
          loading="eager"
          unoptimized
          draggable={false}
          className="size-full select-none"
        />
      </div>
    </div>
  );
}
