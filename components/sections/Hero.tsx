"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { SITE } from "@/lib/site";
import { SCREEN_CRAWLERS_URL } from "../../lib/projects";

type Phrase = { text: string; em?: string };

// First phrase is the one shown in the mockup ("think" emphasised); the rest are from README §7.
const PHRASES: Phrase[] = [
  { text: "Building systems that think, act and help.", em: "think" },
  { text: "Building AI agents that solve real problems." },
  { text: "Developing intelligent systems." },
  { text: "Turning ideas into working products." },
  { text: "Exploring LLMs, RAG and agentic systems." },
];

const PAUSE_AFTER_PHRASE = 1600;
const DELETE_INTERVAL = 30;

function Typewriter() {
  const reduced = useReducedMotion();
  const [s, setS] = useState({ i: 0, len: 0, deleting: false });

  useEffect(() => {
    if (reduced) return;
    const phrase = PHRASES[s.i].text;
    let delay: number;
    let next: typeof s;

    if (!s.deleting) {
      if (s.len < phrase.length) {
        delay = 45 + ((s.len * 7) % 21); // 45–65ms per character
        next = { ...s, len: s.len + 1 };
      } else {
        delay = PAUSE_AFTER_PHRASE;
        next = { ...s, deleting: true };
      }
    } else if (s.len > 0) {
      delay = DELETE_INTERVAL;
      next = { ...s, len: s.len - 1 };
    } else {
      delay = DELETE_INTERVAL;
      next = { i: (s.i + 1) % PHRASES.length, len: 0, deleting: false };
    }

    const t = setTimeout(() => setS(next), delay);
    return () => clearTimeout(t);
  }, [s, reduced]);

  const phrase = reduced ? PHRASES[0] : PHRASES[s.i];
  const typed = reduced ? phrase.text : phrase.text.slice(0, s.len);
  const emStart = phrase.em ? phrase.text.indexOf(phrase.em) : -1;
  const emEnd = emStart + (phrase.em?.length ?? 0);

  const before = emStart >= 0 ? typed.slice(0, emStart) : typed;
  const em = emStart >= 0 ? typed.slice(emStart, emEnd) : "";
  const after = emStart >= 0 ? typed.slice(emEnd) : "";

  return (
    <>
      <p className="sr-only">{PHRASES[0].text}</p>
      <p
        aria-hidden
        className="hero-in min-h-[1.65em] font-mono text-[18px] text-ink2 md:text-[22px]"
        style={{ animationDelay: "120ms" }}
      >
        {before}
        {em && <em className="font-medium text-accent">{em}</em>}
        {after}
        <span className="caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-accent" />
      </p>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />

      <div className="wrap relative grid min-w-0 grid-cols-1 items-center gap-14 pt-12 pb-20 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:pt-16">
        {/* Left column ~55% */}
        <div className="min-w-0">
          <h1
            className="hero-in min-w-0 max-w-full font-mono text-[clamp(34px,10vw,72px)] leading-[1.1] font-bold tracking-[-0.04em] break-words"
            style={{ animationDelay: "0ms" }}
          >
            <span className="text-ink3">&gt;</span> Hello, I’m <span className="text-accent">Anish</span>{" "}
            <span className="text-accent">_</span>
          </h1>

          <div className="mt-5">
            <Typewriter />
          </div>

          <div className="hero-in mt-8" style={{ animationDelay: "200ms" }}>
            <div aria-hidden className="mb-5 h-px w-20 bg-line" />
            <p className="flex items-center gap-3 font-label text-[13px] text-ink2">
              <span aria-hidden className="size-2.5 rounded-full bg-accent" />
              {SITE.availability}
            </p>
          </div>

          <div
            className="hero-in mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-4"
            style={{ animationDelay: "280ms" }}
          >
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center gap-2 border border-accent bg-accent px-7 text-[15px] font-medium text-bg transition-colors duration-200 hover:border-accent-hover hover:bg-accent-hover sm:justify-start"
            >
              View Projects
              <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href="https://drive.google.com/file/d/1RV0o92J_viwPxVrxPU6KZLHCL1RIiZ97/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-accent bg-accent px-5 text-[15px] text-bg transition-colors duration-200 hover:border-accent-hover hover:bg-accent-hover sm:justify-start"
            >
              Resume
              <ArrowUpRight size={16} aria-hidden />
            </a>
            <a
              href={SCREEN_CRAWLERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-accent bg-accent px-5 text-[15px] text-bg transition-colors duration-200 hover:border-accent-hover hover:bg-accent-hover sm:justify-start"
            >
              Try Screen Crawlers
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>

        {/* Right column ~45%: terminal panel */}
        <div
          className="hero-in relative flex min-w-0 lg:justify-end"
          style={{ animationDelay: "240ms" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-6 right-8 hidden size-24 border border-line-subtle lg:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-2 -bottom-8 hidden size-28 border border-line-subtle lg:block"
          />
          <div
            className="terminal relative h-[190px] w-[420px] max-w-full p-6 font-label text-[14px] text-ink2 lg:[transform:perspective(1100px)_rotateX(5deg)_rotateY(-9deg)]"
            role="img"
            aria-label="Terminal window showing: build cool stuff"
          >
            <div className="mb-5 flex items-center gap-2" aria-hidden>
              <span className="size-2 rounded-full bg-accent" />
              <span className="size-2 rounded-full bg-accent opacity-80" />
              <span className="size-2 rounded-full bg-ink3" />
            </div>
            <p aria-hidden>
              <span className="text-ink3">&gt;</span> build cool stuff...
            </p>
            <p aria-hidden className="mt-2 flex items-center">
              <span className="text-ink3">&gt;</span>
              <span className="caret ml-2 inline-block h-[18px] w-[8px] bg-accent" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
