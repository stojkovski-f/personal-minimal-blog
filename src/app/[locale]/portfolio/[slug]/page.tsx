import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { getProject, projects } from "@/content/work";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/lib/locale";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return { title: project.title[assertLocale(locale)] };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = assertLocale(localeParam);
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("portfolio");

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        kicker={project.year}
        title={project.title[locale]}
        lede={project.summary[locale]}
      />
      <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed">
        {project.body[locale].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center border-b border-foreground"
          >
            {t("visit")}
          </a>
        ) : null}
        <Link
          href="/portfolio"
          className="inline-flex min-h-11 items-center border-b border-foreground"
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
