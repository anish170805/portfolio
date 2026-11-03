import { getBrandIcon } from "@/lib/icons";
import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel } from "@/components/shared/ui";

type Tech = { name: string; icon: string };

// README §12. `icon` is the Simple Icons export name.
const GROUPS: { category: string; items: Tech[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "siPython" },
      { name: "JavaScript", icon: "siJavascript" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "FastAPI", icon: "siFastapi" },
      { name: "React", icon: "siReact" },
      { name: "LangChain", icon: "siLangchain" },
      { name: "LangGraph", icon: "siLanggraph" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: "siPostgresql" },
      { name: "Supabase", icon: "siSupabase" },
      { name: "Qdrant", icon: "siQdrant" },
    ],
  },
  {
    category: "Infra / Cloud",
    items: [
      { name: "Docker", icon: "siDocker" },
      { name: "Vercel", icon: "siVercel" },
      { name: "Linux", icon: "siLinux" },
    ],
  },
  {
    category: "Other",
    items: [
      { name: "Git", icon: "siGit" },
      { name: "VS Code", icon: "siVisualstudiocode" },
      { name: "Temporal", icon: "siTemporal" },
      { name: "MCP", icon: "siModelcontextprotocol" },
    ],
  },
];

function Tile({ name, icon }: Tech) {
  const brand = getBrandIcon(icon);
  return (
    <li className="group flex w-[96px] flex-col items-center gap-2.5 transition-transform duration-200 hover:-translate-y-[3px]">
      <span className="grid size-[72px] place-items-center rounded-xl border border-line bg-[var(--card-bg)] transition-colors duration-200 group-hover:border-accent">
        {brand ? (
          <svg
            role="img"
            aria-hidden
            viewBox="0 0 24 24"
            className="size-9 opacity-75 transition-opacity duration-200 group-hover:opacity-100"
            style={{ color: `color-mix(in srgb, #${brand.hex} 70%, var(--text-primary))` }}
          >
            <path fill="currentColor" d={brand.path} />
          </svg>
        ) : (
          // Logo not shipped by the installed Simple Icons version: show the name, no stand-in graphic.
          <span className="px-1 text-center font-label text-[11px] leading-tight text-ink2">
            {name}
          </span>
        )}
      </span>
      <span className="text-center font-label text-[12px] leading-tight text-ink3">{name}</span>
    </li>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-line-subtle py-14 lg:border-t-0 lg:border-l lg:py-16 lg:pl-12"
    >
      <Reveal>
        <SectionLabel n="04." title="Skills" />
        <h2 className="mt-4 font-mono text-[clamp(32px,3.6vw,44px)] leading-[1.1] font-bold tracking-[-0.04em]">
          Tools I use to
          <br />
          build cool stuff.
        </h2>

        <div className="mt-10 space-y-8">
          {GROUPS.map((g) => (
            <div key={g.category}>
              <p className="font-label text-[13px] tracking-[0.04em] text-ink3 uppercase">
                {g.category}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-5">
                {g.items.map((t) => (
                  <Tile key={t.name} {...t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
