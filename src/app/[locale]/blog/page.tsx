import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { PostList } from "@/components/post-list";
import { getPosts } from "@/content/posts";
import { assertLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return { title: t("title") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader kicker={t("kicker")} title={t("title")} lede={t("lede")} />
      <div className="mt-14 max-w-3xl">
        <PostList items={getPosts()} locale={locale} readMore={t("readMore")} />
      </div>
    </div>
  );
}
