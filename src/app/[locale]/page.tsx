import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostList } from "@/components/post-list";
import { WorkList } from "@/components/work-list";
import { getPosts } from "@/content/posts";
import { projects } from "@/content/work";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/lib/locale";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const blog = await getTranslations("blog");

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
          {t("role")}
        </p>
        <div className="mt-6 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div>
            <h1 className="max-w-4xl font-serif text-[clamp(3.2rem,8vw,5.75rem)] leading-[0.88] tracking-[-0.035em]">
              {t("headlineLead")}
              <br />
              <span className="italic">{t("headlineRest")}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {t("intro")}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <Link
                href="/portfolio"
                className="inline-flex min-h-11 items-center border-b border-foreground"
              >
                {t("viewWork")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center border-b border-foreground"
              >
                {t("getInTouch")}
              </Link>
            </div>
          </div>
          <aside>
            <h2 className="mb-4 font-mono text-[11px] tracking-[0.22em] uppercase">
              {t("workLabel")}
            </h2>
            <WorkList items={projects} locale={locale} variant="compact" />
            <Link
              href="/portfolio"
              className="mt-4 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4"
            >
              {t("allWork")}
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-line px-5 py-16 sm:px-8">
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
            {t("writingLabel")}
          </h2>
          <Link
            href="/blog"
            className="text-sm underline decoration-line underline-offset-4"
          >
            {t("allWriting")}
          </Link>
        </div>
        <PostList items={getPosts()} locale={locale} readMore={blog("readMore")} />
      </section>
    </>
  );
}
