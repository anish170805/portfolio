import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel } from "@/components/shared/ui";

const CONVOPLY_POINTS = [
  {
    title: "Real-time voice-agent pipeline",
    description:
      "Built a voice pipeline with LiveKit, integrating speech-to-text, text-to-speech, and an LLM. Added tools the agent can call during a conversation, along with access to a RAG system for retrieving relevant details.",
  },
  {
    title: "RAG with Qdrant and FastEmbed",
    description:
      "Built a retrieval-augmented generation system with LangChain and Qdrant FastEmbed. It supports dense and sparse search, followed by reranking, and was completed in a short timeframe.",
  },
  {
    title: "VPS deployment and uptime",
    description:
      "Learned deployment practices from the company CTO, created a Dockerfile, and hosted the application on a Hostinger VPS.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-14 lg:py-16 lg:pr-12">
      <Reveal>
        <SectionLabel n="03." title="Experience" />
        <h2 className="mt-4 font-mono text-[clamp(32px,3.6vw,44px)] leading-[1.1] font-bold tracking-[-0.04em]">
          Where I’ve
          <br />
          shaped my skills.
        </h2>
        <p className="mt-5 max-w-[460px] text-[18px] text-ink2">
          From building real-world AI applications to contributing to innovative projects.
        </p>

        {/* Formal employment */}
        <p className="mt-10 font-label text-[13px] tracking-[0.04em] text-ink3 uppercase">
          Employment
        </p>
        <ol className="relative mt-4 border-l border-line pl-6">
          <li className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[30px] size-2.5 rounded-full border border-accent bg-bg"
            />
            <p className="font-label text-[13px] text-ink3">May 2025 – August 2025</p>
            <h3 className="mt-1 font-mono text-[24px] font-bold">Convoply</h3>
            <p className="text-[17px] text-ink2">AI Solutions Intern</p>
            <ul className="mt-5 space-y-5">
              {CONVOPLY_POINTS.map(({ title, description }) => (
                <li key={title} className="border-l border-accent/50 pl-4">
                  <h4 className="font-mono text-[15px] font-medium text-ink">{title}</h4>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink2">{description}</p>
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </Reveal>
    </section>
  );
}
