import { ArrowUpRight, Mail } from "lucide-react";
import { getBrandIcon } from "@/lib/icons";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel } from "@/components/shared/ui";

export function Contact() {
  const github = getBrandIcon("siGithub");
  const linkedin = getBrandIcon("siLinkedin");

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line-subtle py-16 md:py-20">
      <div className="wrap">
        <Reveal>
          <SectionLabel n="05." title="Contacts" line />

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-mono text-[clamp(34px,4.2vw,52px)] leading-[1.1] font-bold tracking-[-0.04em]">
                Let’s build something
                <br />
                <span className="text-accent">meaningful.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-14 items-center gap-3 border border-line px-6 font-label text-[15px] text-ink2 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
              >
                <Mail size={19} aria-hidden />
                Email me
                <ArrowUpRight size={18} aria-hidden />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center gap-3 border border-line px-6 font-label text-[15px] text-ink2 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
              >
                {linkedin && (
                  <svg aria-hidden viewBox="0 0 24 24" className="size-5">
                    <path fill="currentColor" d={linkedin.path} />
                  </svg>
                )}
                LinkedIn
                <ArrowUpRight size={18} aria-hidden />
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center gap-3 border border-line px-6 font-label text-[15px] text-ink2 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg"
              >
                {github && (
                  <svg aria-hidden viewBox="0 0 24 24" className="size-5">
                    <path fill="currentColor" d={github.path} />
                  </svg>
                )}
                GitHub
                <ArrowUpRight size={18} aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
