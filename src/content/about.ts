import type { Locale } from "@/i18n/routing";

type AboutCopy = {
  kicker: string;
  title: string;
  lede: string;
  intro: string;
  connect: string;
  factsLabel: string;
  facts: string[];
  focusLabel: string;
  focus: string[];
  skillsLabel: string;
  skillsNote: string;
  skills: string[];
  otherLabel: string;
  other: string[];
  leadershipLabel: string;
  leadership: string[];
  certsLabel: string;
  certs: string[];
  clientsLabel: string;
  clients: string[];
  voicesLabel: string;
};

const shared = {
  skills: [
    "PHP",
    "JavaScript",
    "SQL",
    "CSS",
    "Magento",
    "Git",
    "APIs",
    "Docker",
    "Agile",
    "Composer",
    "Jira",
    "Unix",
    "CLI",
  ],
  other: [
    "TypeScript",
    "LESS",
    "MySQL",
    "Jenkins",
    "Kubernetes",
    "Bootstrap",
    "Vue.js",
    "Pixi.js",
    "npm",
    "HTML",
    "XML",
    "Linux",
    "IntelliJ",
    "VS Code",
    "Message queues",
    "Grafana",
    "New Relic",
    "Akeneo",
    "AWS",
    "Azure",
  ],
  certs: [
    "AWS Cloud Practitioner",
    "Adobe Certified Professional",
    "SFI",
    "TOEFL",
  ],
  clients: [
    "Elon",
    "Zoo",
    "Aarke",
    "Apohem",
    "Epiroc",
    "Tres Bien",
    "Unisport",
    "Flygbussarna",
    "Edblad",
  ],
};

export const voices = [
  {
    quote:
      "During my initial months at Vaimo, Filip was instrumental in helping me settle in. He was always available to answer my questions, provide guidance, and offer support, making my transition into the team seamless and enjoyable.",
    name: "Tea Grönborg",
    title: "Fullstack developer",
    url: "https://www.linkedin.com/in/tea-gronborg/en/",
  },
  {
    quote:
      "One of Filip's most notable strengths is his ability to excel in both independent and collaborative settings. He actively participated in team meetings, offering valuable insights and working effectively with colleagues to achieve shared goals. His strong communication skills and ability to build rapport were instrumental in the success of various projects.",
    name: "Đorđe Stanković",
    title: "Engineering Manager",
    url: "https://www.linkedin.com/in/stdjordje/",
  },
  {
    quote:
      "If you want someone to create synergy within your team, Filip is your guy. Not only is he a very bright mind with great ideas coming from various perspectives, he will also take your opinion and thoughts and those from other team members, mix them up with his own findings, do additional research, dive into it, and come back with a complete idea or solution to whatever it is you are working on.",
    name: "Joost van Duijn",
    title: "E-commerce Manager",
    url: "https://www.linkedin.com/in/joost-van-duijn/",
  },
  {
    quote:
      "Filip is capable of going in depth on the problems. He simply loves to learn. Listens very carefully to what others have to say, and forms his own opinion, therefore will very likely pitch a very good idea of his own. He is a very polite, positive, constructive and open person, clearly capable of always seeing the larger picture. That makes him an excellent team player. You can always crack a good joke with him and you can definitely expect support when things are rough.",
    name: "Marjan Petkovski",
    title: "Senior Magento Engineer",
    url: "https://www.linkedin.com/in/marjanpetkovski/",
  },
] as const;

const copy: Record<Locale, AboutCopy> = {
  en: {
    kicker: "About",
    title: "About me",
    lede: "I'm a Stockholm-based software engineer and technical leader with a passion for building great products, solving complex problems, and helping engineering teams thrive.",
    intro:
      "My strongest expertise lies in backend development and systems integration, particularly within e-commerce, but my experience spans a much broader range of technologies and engineering disciplines. Over the years, I've grown into technical leadership, combining this broad engineering background with the ability to guide teams, shape technical direction, and bridge the gap between business and technology. I enjoy turning complex challenges into practical, scalable solutions that create real value.",
    connect: "Get in touch",
    factsLabel: "In short",
    facts: [
      "Tech professional since 2015",
      "Extensive technical and e-commerce expertise",
      "Bachelor's degree in information technology",
      "Proven results with leading teams and complex technical projects",
      "Organizational and production delivery experience with top digital agencies and large brands in Sweden",
    ],
    focusLabel: "Focus",
    focus: [
      "Teamwork",
      "Scalability",
      "Problem solving",
      "Excellence",
      "Knowledge sharing",
      "Leadership",
      "Creativity",
      "Customer focus",
      "Agile",
      "Compliance",
      "Automation",
      "Delivery",
    ],
    skillsLabel: "Core tech",
    skillsNote: "8+ years of experience with",
    skills: shared.skills,
    otherLabel: "Also",
    other: shared.other,
    leadershipLabel: "Technical leadership",
    leadership: [
      "Part of the product owners team, influencing product decisions",
      "Driving technical and process improvements on an ongoing basis",
      "Working with the engineering team to find the best solutions and processes",
      "Owning and driving technical projects from requirements to delivery",
      "Aligning teams across functions",
      "Connecting with external partners and aligning integration decisions",
      "Crafting architecture that fits both the business and the technology",
    ],
    certsLabel: "Certifications",
    certs: shared.certs,
    clientsLabel: "Clients",
    clients: shared.clients,
    voicesLabel: "Professional recommendations",
  },
  sv: {
    kicker: "Om",
    title: "Om mig",
    lede: "Jag är en mjukvaruingenjör och teknisk ledare i Stockholm, med ett engagemang för att bygga bra produkter, lösa komplexa problem och hjälpa utvecklingsteam att växa.",
    intro:
      "Min starkaste kompetens ligger i backendutveckling och systemintegration, särskilt inom e-handel, men min erfarenhet spänner över ett mycket bredare fält av tekniker och ingenjörsdiscipliner. Med åren har jag gått in i tekniskt ledarskap och kombinerar den breda tekniska bakgrunden med förmågan att leda team, forma teknisk riktning och överbrygga gapet mellan verksamhet och teknik. Jag tycker om att omsätta komplexa utmaningar i praktiska, skalbara lösningar som skapar verkligt värde.",
    connect: "Hör av dig",
    factsLabel: "I korthet",
    facts: [
      "Började min yrkeskarriär 2015",
      "Teknisk kompetens och e-handelsexpertis",
      "Kandidatexamen i informationsteknik",
      "God kommunikation och ledarskapsförmåga",
      "Erfarenhet från ledande digitala byråer och stora varumärken i Sverige",
    ],
    focusLabel: "Fokus",
    focus: [
      "Samarbete",
      "Skalbarhet",
      "Problemlösning",
      "Kvalitet",
      "Kunskapsdelning",
      "Ledarskap",
      "Kreativitet",
      "Kundfokus",
      "Agilt",
      "Efterlevnad",
      "Automatisering",
      "Leverans",
    ],
    skillsLabel: "Kärnteknik",
    skillsNote: "Mer än 8 års erfarenhet av",
    skills: shared.skills,
    otherLabel: "Även",
    other: shared.other,
    leadershipLabel: "Tekniskt ledarskap",
    leadership: [
      "Del av produktägarteamet, med inflytande över produktbeslut",
      "Driver löpande tekniska förbättringar och processförbättringar",
      "Arbetar med utvecklingsteamet för att hitta de bästa lösningarna och processerna",
      "Äger och driver tekniska projekt från krav till leverans",
      "Samordnar team över funktionsgränser",
      "Håller kontakt med externa partners och samordnar integrationsbeslut",
      "Tar fram arkitektur som fungerar för både verksamhet och teknik",
    ],
    certsLabel: "Certifieringar",
    certs: shared.certs,
    clientsLabel: "Uppdragsgivare",
    clients: shared.clients,
    voicesLabel: "Professionella rekommendationer",
  },
};

export function getAbout(locale: Locale) {
  return copy[locale];
}
