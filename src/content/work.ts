import type { Locale } from "@/i18n/routing";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  year: string;
  url?: string;
  title: Localized;
  summary: Localized;
  body: Localized[];
};

export const projects: Project[] = [
  {
    slug: "personal-landing-page",
    year: "2026",
    url: "https://react-personal-landing-page.vercel.app/",
    title: {
      en: "React Landing Page",
      sv: "React Landing Page",
    },
    summary: {
      en: "A React.js landing page on Vercel, the first project I built in 2026, focused on brutalist CSS.",
      sv: "En landningssida i React.js på Vercel, det första projektet jag byggde 2026, med fokus på brutalistisk CSS.",
    },
    body: {
      en: [
        "This is the first project I built in 2026. I was looking for an easy way to deploy a personal website and to experiment with AI coding assistant agents, so I chose Vercel and built the first draft in React.js.",
        "The focus was custom CSS for a brutalist landing page. Brutalist design leaves structure, type, and raw contrast exposed instead of polishing them into a smooth template, and it became popular as a reaction to websites that had started to look the same.",
      ],
      sv: [
        "Det här är det första projektet jag byggde 2026. Jag letade efter ett enkelt sätt att publicera en personlig webbplats och experimentera med AI-kodassistenter, så jag valde Vercel och byggde det första utkastet i React.js.",
        "Fokuset var egen CSS för en brutalistisk landningssida. Brutalistisk design lämnar struktur, typografi och rå kontrast synliga i stället för att slipa dem till en polerad mall, och den blev populär som en reaktion mot webbplatser som hade börjat se likadana ut.",
      ],
    },
  },
  {
    slug: "bostadsklok",
    year: "2026",
    url: "https://www.bostadsklok.se",
    title: {
      en: "Bostadsklok",
      sv: "Bostadsklok",
    },
    summary: {
      en: "A free guide for first-time home buyers in Sweden, with mortgage basics and a calculator.",
      sv: "En gratis guide för förstagångsköpare i Sverige, med bolånegrunder och en kalkylator.",
    },
    body: {
      en: [
        "Bostadsklok is a free project for people buying a first home in Sweden. It explains how mortgages work, what a down payment and debt ratio mean, and how a bostadsrätt differs from a house.",
        "Short market notes cover Stockholm and the country. A calculator gives loan forecasts and investment insights before a viewing. The writing is educational and is not financial advice.",
      ],
      sv: [
        "Bostadsklok är ett gratis projekt för den som köper sin första bostad i Sverige. Det förklarar hur bolån fungerar, vad kontantinsats och skuldkvot betyder, och hur en bostadsrätt skiljer sig från en villa.",
        "Korta marknadsnotiser tar upp Stockholm och riket. En kalkylator ger låneprognoser och investeringsinsikter inför en visning. Innehållet är utbildande och är inte finansiell rådgivning.",
      ],
    },
  },
  {
    slug: "field-notes",
    year: "2024",
    title: {
      en: "Field notes",
      sv: "Fältanteckningar",
    },
    summary: {
      en: "A writing app for drafts that stay on the device until you decide otherwise.",
      sv: "En skrivapp för utkast som stannar på enheten tills du väljer något annat.",
    },
    body: {
      en: [
        "Notes are kept local, so a draft does not leave the machine unless you choose to move it.",
      ],
      sv: [
        "Anteckningarna ligger lokalt, så ett utkast lämnar inte datorn förrän du själv väljer att flytta det.",
      ],
    },
  },
  {
    slug: "northline",
    year: "2024",
    title: {
      en: "Northline",
      sv: "Northline",
    },
    summary: {
      en: "A transit timetable rebuilt around the connections people actually wait for.",
      sv: "En tidtabell ombyggd kring de byten människor faktiskt väntar på.",
    },
    body: {
      en: [
        "The view is organised by the next change, not by a long list of every departure.",
      ],
      sv: [
        "Vyn är ordnad efter nästa byte, inte efter en lång lista med varje avgång.",
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
