import { getBrandIcon } from "@/lib/icons";
import { SITE } from "@/lib/site";

export function Footer() {
  const github = getBrandIcon("siGithub");
  return (
    <footer className="border-t border-line-subtle">
      <div className="wrap flex flex-col gap-4 pt-8 pb-24 md:flex-row md:items-center md:justify-between">
        <p className="font-label text-[13px] text-ink3">
          © {SITE.footerYear} {SITE.name}. Built with <span className="text-accent">{"</>"}</span>{" "}
          and a lot of caffeine.
        </p>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex min-h-11 items-center gap-2 border border-transparent px-3 font-label text-[13px] text-ink2 transition-colors duration-200 hover:border-line hover:text-accent"
            >
              {github && (
                <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]">
                  <path fill="currentColor" d={github.path} />
                </svg>
              )}
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
