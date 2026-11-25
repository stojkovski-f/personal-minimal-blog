import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { getPost, posts } from "@/content/posts";
import { Link } from "@/i18n/navigation";
import { assertLocale, formatDate } from "@/lib/locale";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return { title: post.title[assertLocale(locale)] };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = assertLocale(localeParam);
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        kicker={formatDate(post.date, locale)}
        title={post.title[locale]}
        lede={post.summary[locale]}
      />
      <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed">
        {post.body[locale].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-10 inline-flex min-h-11 items-center border-b border-foreground text-sm"
      >
        {t("back")}
      </Link>
    </div>
  );
}
