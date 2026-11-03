"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ExternalLink,
  Minus,
  Play,
  Plus,
  RotateCcw,
  Workflow,
  X,
} from "lucide-react";
import { siGithub } from "simple-icons";
import {
  DEFAULT_PROJECT_INDEX,
  PROJECTS,
  type ChatProject,
  type Project,
  type ProjectId,
} from "../../lib/projects";
import { ChatPanel } from "@/components/projects/ChatPanel";
import { ProjectIcon } from "@/components/projects/ProjectIcon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel } from "@/components/shared/ui";

/** Round icon button that opens an external link, or shows as dimmed until the URL is provided. */
function IconLink({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  const base =
    "grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink2 transition-colors duration-200";
  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={`${label} (coming soon)`}
        title={`${label}: coming soon`}
        className={`${base} cursor-not-allowed opacity-40`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`${base} hover:border-accent hover:text-accent`}
    >
      {children}
    </a>
  );
}

function hasChatDetails(project: Project): project is ChatProject {
  return Boolean(project.summary && project.features && project.chatQuestions);
}

const FLOWCHART_DETAILS = {
  gyanpath: {
    title: "GyanPath — Learning agent workflow",
    src: "/flowcharts/gyanpath_fc.svg",
    width: 1931.6065953653044,
    height: 3276.238881359208,
  },
  eera: {
    title: "Eera — Voice sales agent workflow",
    src: "/flowcharts/eera_fc.svg",
    width: 1872,
    height: 2252.25,
  },
  nobrac: {
    title: "NOBRAC — How the agent works",
    src: "/flowcharts/flowchart.svg",
    width: 1920,
    height: 1736,
  },
  front9: {
    title: "Front9 — Project generation workflow",
    src: "/flowcharts/front9_fc.svg",
    width: 1940,
    height: 1562.25,
  },
  "ret-jet": {
    title: "Ret-Jet — CSV analytics agent workflow",
    src: "/flowcharts/ret-jet_fc.svg",
    width: 1440,
    height: 1080,
  },
  FlipkartReviewAnalysis: {
    title: "Flipkart Reviews — Sentiment analysis workflow",
    src: "/flowcharts/flipkart-rev-fc.svg",
    width: 1440,
    height: 1080,
  },
  "Anveshak-AI": {
    title: "Anveshak AI — Document analysis workflow",
    src: "/flowcharts/anveshak-ai.svg",
    width: 1500,
    height: 988,
  },
  Trading_bot: {
    title: "Binance Futures Testnet Bot — Order workflow",
    src: "/flowcharts/trading-bot_fc.svg",
    width: 1440,
    height: 1080,
  },
  Supervisore: {
    title: "Supervisore — Durable order supervision workflow",
    src: "/flowcharts/supervisore_fc.svg",
    width: 1440,
    height: 1080,
  },
} satisfies Partial<
  Record<ProjectId, { title: string; src: string; width: number; height: number }>
>;

type FlowchartProjectId = keyof typeof FLOWCHART_DETAILS;

function hasFlowchart(
  project: Project,
): project is Project & {
  id: FlowchartProjectId;
  links: NonNullable<Project["links"]> & { flowchart: string };
} {
  return Boolean(project.links?.flowchart && project.id in FLOWCHART_DETAILS);
}

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const plugins = useMemo(
    () => [
      AutoScroll({
        speed: 0.6,
        direction: "backward", // slide left → right
        startDelay: 1000,
        playOnInit: false,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: true,
    startIndex: DEFAULT_PROJECT_INDEX,
  }, plugins);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(DEFAULT_PROJECT_INDEX);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [openId, setOpenId] = useState<Project["id"] | null>(null);
  const [flowchartProject, setFlowchartProject] =
    useState<FlowchartProjectId | null>(null);
  const [flowchartZoom, setFlowchartZoom] = useState(1);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSelected(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  useEffect(() => {
    const viewport = carouselViewportRef.current;
    if (!viewport || !emblaApi) return;

    let accumulatedDelta = 0;
    let gestureHandled = false;
    let resetTimer: number | undefined;

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.shiftKey
            ? event.deltaY
            : 0;
      if (delta === 0) return;

      event.preventDefault();
      accumulatedDelta += delta;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        accumulatedDelta = 0;
        gestureHandled = false;
      }, 280);

      if (!gestureHandled && Math.abs(accumulatedDelta) >= 24) {
        if (accumulatedDelta > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
        gestureHandled = true;
      }
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheel);
      window.clearTimeout(resetTimer);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (
      prefersReducedMotion ||
      isCarouselHovered ||
      openId ||
      flowchartProject
    ) {
      autoScroll.stop();
    } else {
      autoScroll.play();
    }
  }, [
    emblaApi,
    flowchartProject,
    isCarouselHovered,
    openId,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (!flowchartProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFlowchartProject(null);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [flowchartProject]);

  const flowchartDetails = flowchartProject
    ? FLOWCHART_DETAILS[flowchartProject]
    : null;

  const openProject = (index: number, project: ChatProject) => {
    emblaApi?.scrollTo(index);
    setSelected(index);
    setOpenId(project.id);
  };

  const selectedProject = PROJECTS.find((p) => p.id === openId);
  const openedProject =
    selectedProject && hasChatDetails(selectedProject) ? selectedProject : null;

  return (
    <section id="projects" className="scroll-mt-24 py-12 md:py-16">
      <Reveal>
        <div className="wrap">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex-1">
              <SectionLabel n="02." title="Projects" line />
            </div>
            <span className="font-label text-[12px] text-ink3 md:text-[13px]">
              Drag, swipe, or trackpad scroll to explore
            </span>
          </div>

          <h2 className="mt-8 font-mono text-[clamp(34px,4.2vw,52px)] leading-[1.1] font-bold tracking-[-0.04em]">
            Ideas → Real Products
          </h2>
          <p className="mt-4 text-[18px] text-ink2">
            Some of the projects I’ve built and am working on.
          </p>
        </div>

        {/* Carousel is clipped to the content column, so cards never run past the left/right content edges */}
        <div className="wrap relative mt-6">
          <div
            ref={(node) => {
              emblaRef(node);
              carouselViewportRef.current = node;
            }}
            className="overflow-hidden py-5"
            onPointerEnter={() => setIsCarouselHovered(true)}
            onPointerLeave={() => setIsCarouselHovered(false)}
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)",
            }}
          >
            <div className="flex touch-pan-y">
              {PROJECTS.map((p, i) => {
                const isActive = selected === i;
                return (
                  <div
                    key={p.id}
                    data-slide
                    className="min-w-0 flex-[0_0_100%] md:flex-[0_0_auto] md:basis-[420px]"
                  >
                    <div
                      className={`glass group mr-3 flex h-[320px] min-w-0 flex-col gap-4 p-5 transition-[translate,scale,border-color] duration-[250ms] hover:-translate-y-1 hover:scale-[1.04] md:mr-5 md:p-7 ${
                        isActive ? "border-accent" : ""
                      }`}
                    >
                      <div className="flex h-7 shrink-0 items-center justify-between rounded-md border border-line-subtle bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-3 font-label text-[9px] tracking-[0.1em] text-ink3">
                        <span>PROJECT FILE</span>
                        <span>{String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
                      </div>
                      <div className="flex min-h-0 flex-1 items-center">
                        <div className="flex w-full items-start gap-5">
                          <ProjectIcon id={p.id} />
                          <div className="min-w-0 pt-1">
                            <p className="font-mono text-[22px] leading-tight font-bold break-words">
                              {p.name}
                            </p>
                            {p.description && (
                              <p className="mt-2 font-mono text-[15px] leading-snug break-words text-ink2">
                                {p.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full items-center gap-2">
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                          {p.links?.live && (
                            <IconLink href={p.links.live} label={p.links.liveLabel ?? "Live link"}>
                              <ExternalLink size={18} aria-hidden />
                            </IconLink>
                          )}
                          {p.links?.github && (
                            <IconLink href={p.links.github} label="GitHub repository">
                              <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]">
                                <path fill="currentColor" d={siGithub.path} />
                              </svg>
                            </IconLink>
                          )}
                          {p.links?.demo && (
                            <IconLink href={p.links.demo} label="Demo video">
                              <Play size={18} aria-hidden />
                            </IconLink>
                          )}
                          {hasFlowchart(p) && (
                            <button
                              type="button"
                              aria-label={`View ${p.name} flowchart`}
                              title={`View ${p.name} flowchart`}
                              onClick={() => {
                                setFlowchartZoom(1);
                                setFlowchartProject(p.id);
                              }}
                              className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink2 transition-colors duration-200 hover:border-accent hover:text-accent"
                            >
                              <Workflow size={18} aria-hidden />
                            </button>
                          )}
                        </div>
                        {hasChatDetails(p) && (
                          <button
                            type="button"
                            aria-label={`Open ${p.name} project chat`}
                            onClick={() => openProject(i, p)}
                            className="ml-auto inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-accent px-3 font-label text-[13px] font-medium text-bg transition-[background-color,gap] duration-200 hover:gap-3 hover:bg-accent-hover sm:px-5"
                          >
                            Chat
                            <ArrowRight size={16} aria-hidden />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <ChatPanel project={openedProject} onClose={() => setOpenId(null)} />

      {flowchartProject && flowchartDetails && (
        <div
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setFlowchartProject(null);
          }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-2 sm:p-4"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-flowchart-title"
            className="flex h-[98dvh] w-full max-w-[1600px] flex-col overflow-hidden rounded-xl border border-line bg-bg shadow-2xl"
          >
            <header className="flex shrink-0 items-center gap-2 border-b border-line-subtle px-3 py-2 sm:px-5">
              <h2
                id="project-flowchart-title"
                className="min-w-0 flex-1 font-mono text-[14px] font-bold text-ink sm:text-[18px]"
              >
                {flowchartDetails.title}
              </h2>
              <button
                type="button"
                onClick={() => setFlowchartZoom((zoom) => Math.max(0.5, zoom - 0.25))}
                aria-label="Zoom out"
                className="grid size-10 shrink-0 place-items-center rounded-full text-ink2 transition-colors hover:bg-accent hover:text-bg"
              >
                <Minus size={18} aria-hidden />
              </button>
              <span className="w-12 shrink-0 text-center font-label text-[11px] text-ink2">
                {Math.round(flowchartZoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setFlowchartZoom((zoom) => Math.min(2, zoom + 0.25))}
                aria-label="Zoom in"
                className="grid size-10 shrink-0 place-items-center rounded-full text-ink2 transition-colors hover:bg-accent hover:text-bg"
              >
                <Plus size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => setFlowchartZoom(1)}
                aria-label="Reset zoom"
                className="grid size-10 shrink-0 place-items-center rounded-full text-ink2 transition-colors hover:bg-accent hover:text-bg"
              >
                <RotateCcw size={17} aria-hidden />
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => setFlowchartProject(null)}
                aria-label="Close flowchart"
                className="grid size-11 shrink-0 place-items-center rounded-full text-ink2 transition-colors hover:bg-accent hover:text-bg"
              >
                <X size={20} aria-hidden />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-auto p-2 sm:p-4">
              <Image
                src={flowchartDetails.src}
                alt={`${flowchartDetails.title.split(" —")[0]} project flowchart`}
                width={flowchartDetails.width}
                height={flowchartDetails.height}
                priority
                unoptimized
                className="mx-auto block h-auto max-w-none"
                style={{
                  width: `${flowchartDetails.width * flowchartZoom}px`,
                  height: "auto",
                }}
                sizes={`${flowchartDetails.width}px`}
              />
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
