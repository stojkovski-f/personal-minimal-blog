import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";

const year = 2026;

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {site.name} <span className="text-muted">© {year}</span>
        </p>
        <a
          href={`mailto:${site.email}`}
          className="underline decoration-line underline-offset-4"
        >
          {site.email}
        </a>
        <p className="text-muted">{t("built")}</p>
      </div>
    </footer>
  );
}
