import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AskMe } from "@/components/ask-me";
import { PageHeader } from "@/components/page-header";
import { getAbout, voices } from "@/content/about";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = assertLocale((await params).locale);

  return { title: getAbout(locale).title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const about = getAbout(locale);
  const ask = await getTranslations("ask");

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16">
        <div>
          <PageHeader
            kicker={about.kicker}
            title={about.title}
            lede={about.lede}
          />
          <p className="mt-10 max-w-2xl text-lg leading-relaxed">{about.intro}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-11 items-center border-b border-foreground text-sm"
          >
            {about.connect}
          </Link>
          <AskMe
            locale={locale}
            copy={{
              label: ask("label"),
              powered: ask("powered"),
              placeholder: ask("placeholder"),
              submit: ask("submit"),
              pending: ask("pending"),
              unknownLead: ask("unknownLead"),
              unknownOr: ask("unknownOr"),
              quota: ask("quota"),
              unavailable: ask("unavailable"),
              tooLong: ask("tooLong"),
              email: site.email,
              linkedinLabel: ask("linkedinLabel"),
              linkedinUrl: site.linkedin,
            }}
          />
        </div>
        <Image
          src="/filip-stojkovski.jpg"
          alt="Filip Stojkovski"
          width={981}
          height={1024}
          priority
          sizes="(min-width: 768px) 16rem, 100vw"
          className="aspect-[4/5] w-full max-w-sm object-cover object-[center_20%] grayscale md:max-w-none"
        />
      </div>

      <div className="mt-16 grid gap-14 border-t border-line pt-10 lg:grid-cols-2 lg:gap-20">
        <section>
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
            {about.factsLabel}
          </h2>
          <ul className="mt-6">
            {about.facts.map((item) => (
              <li
                key={item}
                className="border-t border-line py-3 leading-relaxed last:border-b"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
            {about.focusLabel}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-3">
            {about.focus.map((term) => (
              <li
                key={term}
                className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase"
              >
                {term}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
          {about.skillsLabel}
        </h2>
        <p className="mt-3 text-sm text-muted">{about.skillsNote}</p>
        <p className="mt-6 max-w-4xl font-serif text-3xl leading-snug tracking-tight sm:text-4xl">
          {about.skills.join("  ·  ")}
        </p>
        <h3 className="mt-10 font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
          {about.otherLabel}
        </h3>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          {about.other.join("  ·  ")}
        </p>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
          {about.leadershipLabel}
        </h2>
        <ul className="mt-6 max-w-3xl">
          {about.leadership.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-line py-4 last:border-b"
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.14em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 grid gap-14 border-t border-line pt-10 sm:grid-cols-2">
        <section>
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
            {about.certsLabel}
          </h2>
          <ul className="mt-6">
            {about.certs.map((item) => (
              <li key={item} className="border-t border-line py-3 last:border-b">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
            {about.clientsLabel}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {about.clients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase">
          {about.voicesLabel}
        </h2>
        <div className="mt-8">
          {voices.map((voice) => (
            <figure key={voice.name} className="border-t border-line py-8">
              <blockquote>
                <p className="max-w-3xl font-serif text-xl leading-snug tracking-tight sm:text-2xl">
                  {voice.quote}
                </p>
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <a
                  href={voice.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-line underline-offset-4"
                >
                  {voice.name}
                </a>
                {"title" in voice ? (
                  <span className="text-muted">, {voice.title}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
