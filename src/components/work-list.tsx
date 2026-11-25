import type { Project } from "@/content/work";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function WorkList({
  items,
  locale,
  variant = "full",
}: {
  items: Project[];
  locale: Locale;
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <ol>
        {items.map((project) => (
          <li key={project.slug} className="border-t border-line">
            <Link
              href={`/portfolio/${project.slug}`}
              className="group flex items-baseline justify-between gap-4 py-3"
            >
              <span className="group-hover:underline">
                {project.title[locale]}
              </span>
              <time className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-muted">
                {project.year}
              </time>
            </Link>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol>
      {items.map((project, index) => (
        <li key={project.slug} className="border-t border-line">
          <Link
            href={`/portfolio/${project.slug}`}
            className="group grid grid-cols-[2.25rem_1fr] gap-x-4 py-6 sm:grid-cols-[3rem_1fr]"
          >
            <span className="pt-1.5 font-mono text-[11px] tracking-[0.14em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-serif text-2xl tracking-tight group-hover:underline sm:text-3xl">
                  {project.title[locale]}
                </span>
                <time className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-muted">
                  {project.year}
                </time>
              </span>
              <span className="mt-2 block max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                {project.summary[locale]}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
