import Image from "next/image";
import {
  AudioWaveform,
  BookOpen,
  FileSpreadsheet,
  FolderCode,
  Leaf,
  Puzzle,
} from "lucide-react";
import type { ProjectId } from "../../lib/projects";

const LOGOS: Partial<Record<ProjectId, string>> = {
  eera: "/logos/eera_logo.png",
  gyanpath: "/logos/GyanPath_logo.jpeg",
  nobrac: "/logos/nobrac_icon.png",
  "screen-crawlers": "/logos/screencrawlers_logo.jpg",
};

const ICONS = {
  eera: AudioWaveform,
  "screen-crawlers": Puzzle,
  gyanpath: BookOpen,
  nobrac: Leaf,
  "ret-jet": FileSpreadsheet,
  FlipkartReviewAnalysis: FolderCode,
  Supervisore: FolderCode,
  "Anveshak-AI": FolderCode,
  Trading_bot: FolderCode,
  front9: FolderCode,
} as const;

/** Rounded icon tile used on project cards and in the chat panel header. */
export function ProjectIcon({
  id,
  size = "md",
}: {
  id: ProjectId;
  size?: "md" | "sm";
}) {
  const Icon = ICONS[id];
  const green = id === "nobrac";
  const iconSize = size === "md" ? 32 : 18;
  const logo = LOGOS[id];
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-xl border border-line ${
        size === "md" ? "size-[72px]" : "size-10"
      }`}
      style={{
        background: green
          ? "color-mix(in srgb, var(--success) 12%, transparent)"
          : "var(--card-bg)",
        color: green ? "var(--success)" : "var(--text-primary)",
      }}
    >
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={iconSize * 2}
          height={iconSize * 2}
          className="size-full rounded-[inherit] object-contain"
        />
      ) : (
        <Icon size={iconSize} strokeWidth={1.6} />
      )}
    </span>
  );
}
