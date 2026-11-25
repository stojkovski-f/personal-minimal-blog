import type { Locale } from "@/i18n/routing";

type Localized = Record<Locale, string>;

export type Post = {
  slug: string;
  date: string;
  title: Localized;
  summary: Localized;
  body: Record<Locale, string[]>;
};

/** Sample notes. Replace these with your own writing. */
export const posts: Post[] = [
  {
    slug: "small-interfaces",
    date: "2026-03-12",
    title: {
      en: "Small interfaces",
      sv: "Små gränssnitt",
    },
    summary: {
      en: "Why a narrower surface is often the kinder one.",
      sv: "Varför en smalare yta ofta är den vänligare.",
    },
    body: {
      en: [
        "A smaller interface asks for fewer decisions at once. The screen shows the next action, and the rest can wait until it is needed.",
        "That limit is a kindness. People finish more often when the surface does not try to hold every option at the same time.",
      ],
      sv: [
        "Ett mindre gränssnitt ber om färre beslut på en gång. Skärmen visar nästa handling, och resten kan vänta tills den behövs.",
        "Den gränsen är en vänlighet. Människor blir oftare klara när ytan inte försöker rymma varje val samtidigt.",
      ],
    },
  },
  {
    slug: "names-that-hold",
    date: "2026-01-08",
    title: {
      en: "Names that hold",
      sv: "Namn som håller",
    },
    summary: {
      en: "On choosing words in code that still make sense a year later.",
      sv: "Om att välja ord i kod som fortfarande betyder något ett år senare.",
    },
    body: {
      en: [
        "A name in code is a promise about what the thing does. If the promise is vague, the next change has to rediscover it from the surrounding lines.",
        "Words that still fit a year later are usually the plain ones: the noun for the thing, and the verb for what happens to it.",
      ],
      sv: [
        "Ett namn i kod är ett löfte om vad saken gör. Om löftet är vagt måste nästa ändring hitta innebörden i raderna runt omkring.",
        "Ord som fortfarande passar ett år senare är oftast de enkla: substantivet för saken, och verbet för vad som händer med den.",
      ],
    },
  },
];

export function getPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
