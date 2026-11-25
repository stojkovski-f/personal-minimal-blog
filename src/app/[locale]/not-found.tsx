import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
        {t("kicker")}
      </p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-6 text-lg text-muted">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center border-b border-foreground"
      >
        {t("back")}
      </Link>
    </div>
  );
}
