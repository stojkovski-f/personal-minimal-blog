import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { site } from "@/content/site";
import { assertLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader kicker={t("kicker")} title={t("title")} lede={t("lede")} />
      <div className="mt-14 border-t border-line pt-8">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
          {t("emailLabel")}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-3 inline-block font-serif text-3xl tracking-tight underline decoration-line underline-offset-8 sm:text-5xl"
        >
          {site.email}
        </a>
        <p className="mt-8 max-w-md text-muted">{t("note")}</p>
      </div>
    </div>
  );
}
