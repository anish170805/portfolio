import type { ProjectStatus } from "../../lib/projects";

export function SectionLabel({
  n,
  title,
  line = false,
}: {
  n: string;
  title: string;
  line?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 font-label text-[14px] tracking-[0.04em]">
      <span className="text-ink3">{n}</span>
      <span className="text-accent">{title}</span>
      {line && <span aria-hidden className="h-px flex-1 bg-line" />}
    </div>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const deployed = status === "Deployed";
  const color = deployed ? "var(--success)" : "var(--warning)";
  return (
    <span
      className="inline-flex h-8 items-center gap-2 rounded-full border px-3.5 font-label text-[13px] text-ink2"
      style={{
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 26%, transparent)`,
      }}
    >
      <span aria-hidden className="size-2 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}
