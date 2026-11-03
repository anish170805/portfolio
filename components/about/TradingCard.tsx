import Image from "next/image";
import { Database, Eye, Moon, RefreshCw, Search, Sparkles, Sun, Zap, type LucideIcon } from "lucide-react";
import { getBrandIcon } from "@/lib/icons";
import { FlipCard } from "./FlipCard";

/* ------------------------------------------------------------------
   Developer trading card. Content mirrors the reference card; styling is
   driven entirely by the site's CSS variables, so it follows the dark
   (amber) and light (graphite) themes automatically.
------------------------------------------------------------------ */

type EnergyType = "psychic" | "electric";

const ENERGY: Record<EnergyType, { label: string; Icon: LucideIcon }> = {
  psychic: { label: "Psychic", Icon: Eye },
  electric: { label: "Electric", Icon: Zap },
};

const STATS = [
  { label: "Code Attack", value: 82 },
  { label: "Debug Defence", value: 68 },
  { label: "Build Speed", value: 88 },
  { label: "System HP", value: 110 },
] as const;

const MOVES: { name: string; desc: string; cost: EnergyType[]; damage: number }[] = [
  {
    name: "Debug Spark",
    desc: "Finds and fixes implementation issues.",
    cost: ["psychic", "electric"],
    damage: 40,
  },
  {
    name: "Chain Reaction",
    desc: "Connects tools, APIs and systems.",
    cost: ["electric", "electric"],
    damage: 70,
  },
  {
    name: "Rapid Build",
    desc: "Turns an idea into a working product.",
    cost: ["psychic", "electric"],
    damage: 30,
  },
];

type Item = { name: string; role: string; brand?: string; Icon?: LucideIcon };

const ITEMS: Item[] = [
  { name: "Python Module", role: "Core logic", brand: "siPython" },
  { name: "FastAPI Core", role: "APIs", brand: "siFastapi" },
  { name: "LangGraph Engine", role: "Agents", brand: "siLanggraph" },
  { name: "RAG Scanner", role: "Knowledge", Icon: Search },
  { name: "MCP Adapter", role: "Tools", brand: "siModelcontextprotocol" },
  { name: "SQL Storage", role: "Data", Icon: Database },
];

/** Round energy symbol: electric is filled, psychic is outlined. */
function Energy({ type, size = 20 }: { type: EnergyType; size?: number }) {
  const { Icon, label } = ENERGY[type];
  const filled = type === "electric";
  return (
    <span
      title={label}
      className={`grid shrink-0 place-items-center rounded-full border ${
        filled ? "border-accent bg-accent text-bg" : "border-accent/70 bg-accent/10 text-accent"
      }`}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.58)} strokeWidth={2.25} aria-hidden />
    </span>
  );
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 font-label text-[10px] tracking-[0.14em] text-accent uppercase">
      <span>{children}</span>
      <span aria-hidden className="h-px flex-1 bg-line-subtle" />
    </div>
  );
}

function ItemIcon({ brand, Icon }: Pick<Item, "brand" | "Icon">) {
  const b = brand ? getBrandIcon(brand) : undefined;
  if (b) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-6"
        style={{ color: `color-mix(in srgb, #${b.hex} 70%, var(--text-primary))` }}
      >
        <path fill="currentColor" d={b.path} />
      </svg>
    );
  }
  const Fallback = Icon ?? Sparkles;
  return <Fallback size={24} strokeWidth={1.5} aria-hidden className="text-ink2" />;
}

function CardBack() {
  return (
    <div className="trade-card h-full">
      <div className="trade-card-inner card-back-pattern relative grid h-full place-items-center p-6">
        <span
          aria-hidden
          className="absolute inset-3 rounded-xl border border-accent/25"
        />
        <Image
          src="/logos/anish_logo.png"
          alt="Anish's developer logo"
          width={360}
          height={360}
          className="size-[210px] object-contain"
        />
      </div>
    </div>
  );
}

export function TradingCard() {
  return (
    <FlipCard back={<CardBack />} front={<CardFront />} />
  );
}

function CardFront() {
  return (
    <article aria-label="Anish, developer trading card" className="trade-card">
      <div className="trade-card-inner flex flex-col gap-2.5 p-3 font-label">
        {/* Header */}
        <header>
          <div className="flex items-end justify-between gap-3">
            <h3 className="font-mono text-[26px] leading-none font-bold tracking-[-0.05em] text-ink uppercase">
              Anish
            </h3>
            <p className="text-[13px] text-ink2">
              Lv. <span className="text-[22px] leading-none font-bold text-ink">38</span>
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <ul className="flex items-center gap-1.5">
              {(Object.keys(ENERGY) as EnergyType[]).map((t) => (
                <li
                  key={t}
                  className="flex h-7 items-center gap-1.5 rounded-full border border-line bg-[var(--card-bg)] py-0 pr-3 pl-1"
                >
                  <Energy type={t} size={20} />
                  <span className="text-[12px] text-ink">{ENERGY[t].label}</span>
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 text-ink">
              <span className="text-[11px] font-semibold text-ink2">HP</span>
              <span className="font-mono text-[22px] leading-none font-bold">110</span>
              <Energy type="psychic" size={22} />
            </p>
          </div>
        </header>

        {/* Art */}
        <div className="relative aspect-[2.3/1] overflow-hidden rounded-lg border border-line">
          <Image
            src="/images/profile.jpeg"
            alt="Anish at his desk"
            fill
            sizes="420px"
            className="object-cover object-[50%_24%]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent"
          />
          <p className="absolute bottom-2 left-3 font-mono text-[11px] tracking-[0.04em] text-[#f5f5f5]">
            build <span className="text-[#fdc777]">→</span> debug{" "}
            <span className="text-[#fdc777]">→</span> improve{" "}
            <span className="text-[#fdc777]">→</span> repeat
            <span className="caret text-[#fdc777]">_</span>
          </p>
        </div>

        {/* Core stats */}
        <section className="flex flex-col gap-2">
          <BlockLabel>Core Stats</BlockLabel>
          <ul className="grid grid-cols-4 rounded-lg border border-line-subtle bg-[var(--card-bg)] py-2">
            {STATS.map((s, i) => (
              <li
                key={s.label}
                className={`flex flex-col items-center gap-1 px-1 text-center ${
                  i > 0 ? "border-l border-line-subtle" : ""
                }`}
              >
                <span className="text-[10px] leading-tight text-ink3">{s.label}</span>
                <span className="font-mono text-[22px] leading-none font-bold text-ink">
                  {s.value}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Moves */}
        <section className="flex flex-col gap-1">
          <BlockLabel>Moves</BlockLabel>
          <ul>
            {MOVES.map((m) => (
              <li
                key={m.name}
                className="flex items-center gap-3 border-b border-line-subtle py-1.5 last:border-b-0"
              >
                <span className="flex w-[48px] shrink-0 gap-1">
                  {m.cost.map((c, i) => (
                    <Energy key={i} type={c} size={20} />
                  ))}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[14px] leading-tight font-semibold text-ink">
                    {m.name}
                  </p>
                  <p className="text-[11px] leading-snug text-ink3">{m.desc}</p>
                </div>
                <span className="font-mono text-[22px] leading-none font-bold text-ink">
                  {m.damage}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ability */}
        <section className="rounded-lg border border-accent/30 bg-accent/[0.06] px-3 py-2">
          <div className="flex items-center gap-2">
            <RefreshCw size={14} strokeWidth={1.75} aria-hidden className="text-accent" />
            <span className="rounded-full border border-accent/50 px-2 py-px text-[9px] tracking-[0.12em] text-accent uppercase">
              Ability
            </span>
            <span className="font-mono text-[14px] font-semibold text-ink">Iterative Charge</span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-ink2">
            After using a move, gain +20 to your next move’s damage if it’s a technical move.
          </p>
        </section>

        {/* Held items */}
        <section className="flex flex-col gap-2">
          <BlockLabel>Held Items</BlockLabel>
          <ul className="grid grid-cols-3 gap-1.5">
            {ITEMS.map((it) => (
              <li
                key={it.name}
                className="grid grid-cols-[auto_1fr] items-center gap-x-2 rounded-lg border border-line-subtle bg-[var(--card-bg)] px-2 py-1.5 text-left [&>svg]:row-span-2 [&>svg]:size-5"
              >
                <ItemIcon brand={it.brand} Icon={it.Icon} />
                <span className="text-[10px] leading-tight font-medium text-ink">{it.name}</span>
                <span className="text-[9px] leading-none text-ink3">{it.role}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer: weakness / resistance / bonus */}
        <footer className="flex flex-col gap-2">
          <ul className="grid grid-cols-3 rounded-lg border border-line-subtle bg-[var(--card-bg)] py-1.5 text-[10px] text-ink3">
            <li className="flex flex-col items-center gap-1 px-1 text-center">
              <span>Weakness</span>
              <span className="flex items-center gap-1 text-[12px] text-ink">
                <Moon size={13} strokeWidth={1.75} aria-hidden /> Dark ×2
              </span>
            </li>
            <li className="flex flex-col items-center gap-1 border-x border-line-subtle px-1 text-center">
              <span>Resistance</span>
              <span className="flex items-center gap-1 text-[12px] text-ink">
                <Eye size={13} strokeWidth={1.75} aria-hidden /> Psychic −30
              </span>
            </li>
            <li className="flex flex-col items-center gap-1 px-1 text-center">
              <span>Daylight Bonus</span>
              <span className="flex items-center gap-1 text-[12px] text-ink">
                <Sun size={13} strokeWidth={1.75} aria-hidden className="text-accent" /> Solar
                Charge
              </span>
            </li>
          </ul>
          <p className="text-center text-[11px] text-ink3 italic">
            Always building, always learning.
          </p>
        </footer>
      </div>
    </article>
  );
}
