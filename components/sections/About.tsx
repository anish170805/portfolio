import { BookOpen, GraduationCap, MapPin } from "lucide-react";
import { TradingCard } from "@/components/about/TradingCard";
import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel } from "@/components/shared/ui";

const FACTS = [
  { icon: GraduationCap, text: "Final Year CSE" },
  { icon: MapPin, text: "India" },
  { icon: BookOpen, text: "Always Learning" },
] as const;

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-20">
      <div className="wrap">
        <Reveal>
          <SectionLabel n="01." title="About Me" line />

          <div className="mt-10 grid min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
            {/* Left: description */}
            <div className="min-w-0">
              <h2 className="font-mono text-[clamp(26px,8vw,50px)] leading-[1.1] font-bold tracking-[-0.04em] break-words lg:text-[clamp(34px,4vw,50px)]">
                More than just
                <br />
                code, it’s about
                <br />
                <span className="text-accent">impact</span>.
              </h2>
              <p className="mt-6 max-w-[520px] text-[18px] leading-[1.7] text-ink2">
                I’m Anish, a final year CSE student passionate about AI, agents and building{" "}
                <strong className="font-medium text-ink">products</strong> that solve real
                problems.
              </p>

              <ul className="mt-8 flex flex-wrap gap-3 font-mono text-[14px] text-ink2">
                {FACTS.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-2.5 rounded-full border border-[var(--glass-border)] bg-[var(--card-bg)] px-4 py-2"
                  >
                    <Icon size={18} strokeWidth={1.5} aria-hidden className="shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: developer trading card */}
            <div className="w-full min-w-0 justify-self-center lg:justify-self-end">
              <TradingCard />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
