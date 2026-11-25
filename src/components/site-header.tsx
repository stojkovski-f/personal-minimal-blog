"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/logo";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const links = [
  { href: "/portfolio", key: "work" },
  { href: "/blog", key: "writing" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();

  return <HeaderShell key={`${locale}${pathname}`} pathname={pathname} />;
}

function HeaderShell({ pathname }: { pathname: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Filip Stojkovski">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label={t("menu")}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm tracking-wide ${
                  active ? "underline decoration-1 underline-offset-8" : ""
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            type="button"
            className="min-h-11 px-1 text-sm tracking-wide md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line md:hidden"
          aria-label={t("menu")}
        >
          <ul className="mx-auto flex max-w-5xl flex-col px-5 py-3 sm:px-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="block py-3 font-serif text-4xl tracking-tight"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function LanguageSwitcher() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase">
      <span className="sr-only">{t("language")}</span>
      {routing.locales.map((item, index) => (
        <span key={item} className="flex items-center gap-2">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          <Link
            href={pathname}
            locale={item}
            hrefLang={item}
            lang={item}
            aria-current={item === locale ? "true" : undefined}
            className={`inline-flex min-h-11 min-w-8 items-center ${
              item === locale ? "underline underline-offset-4" : "text-muted"
            }`}
          >
            {item}
          </Link>
        </span>
      ))}
    </div>
  );
}
