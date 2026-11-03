"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bot, ChevronRight, RotateCcw, Sparkles, X } from "lucide-react";
import type { ChatProject } from "../../lib/projects";
import { ProjectIcon } from "./ProjectIcon";
import { StatusBadge } from "@/components/shared/ui";

type Question = ChatProject["chatQuestions"][number];
type AnsweredQuestion = Pick<Question, "id" | "label" | "answer">;
const THINKING_STEPS = [
  "Understanding your question",
  "Reviewing project notes",
  "Putting together an answer",
];

function Panel({ project, onClose }: { project: ChatProject; onClose: () => void }) {
  const reduced = useReducedMotion();
  const [answered, setAnswered] = useState<AnsweredQuestion[]>([]);
  const [pendingQuestion, setPendingQuestion] = useState<Question | null>(null);
  const [thinkingStep, setThinkingStep] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "instant" : "smooth" });
  }, [answered, pendingQuestion, reduced]);

  useEffect(() => {
    if (!pendingQuestion) return;

    const delay = reduced ? 0 : 1600;
    const stepTimers = THINKING_STEPS.slice(1).map((_, index) =>
      window.setTimeout(
        () => setThinkingStep(index + 1),
        delay === 0 ? 0 : ((index + 1) * delay) / THINKING_STEPS.length,
      ),
    );
    const answerTimer = window.setTimeout(() => {
      setAnswered((current) => [...current, pendingQuestion]);
      setPendingQuestion(null);
    }, delay);

    return () => {
      stepTimers.forEach(window.clearTimeout);
      window.clearTimeout(answerTimer);
    };
  }, [pendingQuestion, reduced]);

  const askedIds = new Set(answered.map((question) => question.id));
  if (pendingQuestion) askedIds.add(pendingQuestion.id);
  const questions = project.chatQuestions.filter((question) => !askedIds.has(question.id));

  const chooseQuestion = (question: Question) => {
    if (!pendingQuestion) {
      setThinkingStep(0);
      setPendingQuestion(question);
    }
  };

  const resetQuestions = () => {
    if (!pendingQuestion) setAnswered([]);
  };

  return (
    <motion.div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-label={`${project.name} project guide`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="glass chat-panel-glass fixed inset-x-0 bottom-0 z-[70] flex max-h-[85dvh] w-full flex-col overflow-hidden rounded-b-none outline-none md:inset-x-auto md:right-8 md:bottom-8 md:max-h-[560px] md:w-[400px] md:rounded-[14px]"
    >
      <div className="flex items-center gap-3 border-b border-line-subtle p-4">
        <ProjectIcon id={project.id} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[15px] font-medium">{project.name}</p>
          {project.status && (
            <div className="mt-1">
              <StatusBadge status={project.status} />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project chat"
          className="grid size-11 shrink-0 place-items-center text-ink2 transition-colors hover:text-ink"
        >
          <X size={18} aria-hidden />
        </button>
      </div>

      <div ref={bodyRef} className="min-h-[200px] flex-1 space-y-4 overflow-y-auto p-4">
        <p className="font-label text-[10px] tracking-[0.04em] text-ink3">
          PROJECT GUIDE · CHOOSE A QUESTION
        </p>
        <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-line bg-[var(--card-bg)] px-3.5 py-3 text-[14px] text-ink2">
          {project.summary}
        </div>

        {answered.map((item, index) => (
          <div key={`${item.id}-${index}`} className="space-y-3">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-sm border border-line bg-[var(--card-bg)] px-3.5 py-2 text-[14px]">
                {item.label}
              </p>
            </div>
            <div
              aria-live="polite"
              className="max-w-[92%] rounded-2xl rounded-tl-sm border border-line bg-[var(--card-bg)] px-3.5 py-3 text-[14px] text-ink2"
            >
              {item.answer}
            </div>
          </div>
        ))}

        {pendingQuestion && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-sm border border-line bg-[var(--card-bg)] px-3.5 py-2 text-[14px]">
                {pendingQuestion.label}
              </p>
            </div>
            <div
              aria-live="polite"
              aria-label={THINKING_STEPS[thinkingStep]}
              className="flex max-w-[92%] items-center gap-3 rounded-2xl rounded-tl-sm border border-line bg-[var(--card-bg)] px-3.5 py-3 text-[13px] text-ink2"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Bot size={16} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">{THINKING_STEPS[thinkingStep]}</span>
              <span className="flex items-center gap-1 text-accent" aria-hidden>
                <Sparkles size={14} className="animate-pulse" />
                <span className="size-1 animate-bounce rounded-full bg-accent [animation-delay:0ms]" />
                <span className="size-1 animate-bounce rounded-full bg-accent [animation-delay:120ms]" />
                <span className="size-1 animate-bounce rounded-full bg-accent [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2 border-t border-line-subtle pt-4">
          <p className="font-label text-[11px] text-ink3">
            {answered.length ? "Explore another topic" : "What would you like to know?"}
          </p>
          {questions.map((question) => (
            <button
              key={question.id}
              type="button"
              onClick={() => chooseQuestion(question)}
              disabled={Boolean(pendingQuestion)}
              className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-left text-[13px] text-ink2 transition-colors hover:border-accent hover:bg-accent hover:text-bg disabled:cursor-wait disabled:opacity-50"
            >
              <span>{question.label}</span>
              <ChevronRight size={16} aria-hidden className="shrink-0" />
            </button>
          ))}
          {answered.length > 0 && !pendingQuestion && (
            <button
              type="button"
              onClick={resetQuestions}
              className="inline-flex min-h-11 items-center gap-2 px-2 text-[12px] text-ink3 transition-colors hover:text-accent"
            >
              <RotateCcw size={14} aria-hidden />
              Main questions
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ChatPanel({
  project,
  onClose,
}: {
  project: ChatProject | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && <Panel key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}
