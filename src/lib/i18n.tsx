"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Locale = "en" | "de" | "nl";

const STORAGE_KEY = "locale";

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "de" || stored === "nl" || stored === "en") return stored;
  const lang = navigator.language?.toLowerCase() ?? "";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("nl")) return "nl";
  return "en";
}

type TranslationMap = Record<string, Record<Locale, string>>;

const translations: TranslationMap = {
  // Nav
  "nav.about": { en: "About", de: "Über mich", nl: "Over mij" },
  "nav.research": { en: "Research", de: "Forschung", nl: "Onderzoek" },
  "nav.publications": { en: "Publications", de: "Publikationen", nl: "Publicaties" },
  "nav.speaking": { en: "Speaking", de: "Vorträge", nl: "Lezingen" },
  "nav.cv": { en: "CV", de: "Lebenslauf", nl: "CV" },
  "nav.contact": { en: "Contact", de: "Kontakt", nl: "Contact" },

  // Hero
  "hero.subtitle": { en: "Researcher · Consultant · Speaker", de: "Forscher · Berater · Redner", nl: "Onderzoeker · Adviseur · Spreker" },
  "hero.value": {
    en: "I help organizations harness AR, VR, and AI to transform customer experiences — backed by rigorous research and real-world results.",
    de: "Ich helfe Unternehmen, AR, VR und KI für bessere Kundenerlebnisse zu nutzen — gestützt auf fundierte Forschung und praxisnahe Ergebnisse.",
    nl: "Ik help organisaties AR, VR en AI in te zetten voor betere klantbeleving — onderbouwd door gedegen onderzoek en concrete resultaten.",
  },
  "hero.bio": {
    en: "Assistant Professor in Marketing at Maastricht University. Co-Founder of",
    de: "Assistant Professor für Marketing an der Universität Maastricht. Mitgründer von",
    nl: "Assistant Professor Marketing aan de Universiteit Maastricht. Medeoprichter van",
  },
  "hero.viewResearch": { en: "View Research", de: "Forschung ansehen", nl: "Onderzoek bekijken" },
  "hero.getInTouch": { en: "Get in Touch", de: "Kontakt aufnehmen", nl: "Neem contact op" },

  // Terminal
  "terminal.title": { en: "about.sh", de: "ueber-mich.sh", nl: "over-mij.sh" },

  // Terminal lines
  "terminal.line.0": { en: 'name: "Dr. Jonas Heller"', de: 'Name: "Dr. Jonas Heller"', nl: 'naam: "Dr. Jonas Heller"' },
  "terminal.line.1": { en: 'role: "Assistant Professor of Marketing"', de: 'Rolle: "Assistant Professor für Marketing"', nl: 'functie: "Assistant Professor Marketing"' },
  "terminal.line.2": { en: 'affiliation: "Maastricht University, SBE"', de: 'Universität: "Maastricht University, SBE"', nl: 'universiteit: "Maastricht University, SBE"' },
  "terminal.line.3": { en: 'labs: ["DEXLab", "LIT Network"]', de: 'Labs: ["DEXLab", "LIT Network"]', nl: 'labs: ["DEXLab", "LIT Network"]' },
  "terminal.line.4": { en: 'research: ["AR/VR", "AI", "Digital Marketing", "Consumer Behavior"]', de: 'Forschung: ["AR/VR", "KI", "Digitales Marketing", "Konsumentenverhalten"]', nl: 'onderzoek: ["AR/VR", "AI", "Digitale Marketing", "Consumentengedrag"]' },
  "terminal.line.5": { en: 'funding: "€2.1M+ in competitive grants"', de: 'Förderung: "€2,1 Mio.+ kompetitive Drittmittel"', nl: 'financiering: "€2,1 mln.+ competitieve subsidies"' },
  "terminal.line.6": { en: 'awards: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]', de: 'Auszeichnungen: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]', nl: 'prijzen: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]' },
  "terminal.line.7": { en: 'education: "PhD UNSW | MSc & BSc Maastricht University"', de: 'Ausbildung: "PhD UNSW | MSc & BSc Universität Maastricht"', nl: 'opleiding: "PhD UNSW | MSc & BSc Universiteit Maastricht"' },
  "terminal.line.8": { en: 'industry: ["Zalando", "Jimdo"]', de: 'Industrie: ["Zalando", "Jimdo"]', nl: 'industrie: ["Zalando", "Jimdo"]' },
  "terminal.line.9": { en: 'publications: "30+ peer-reviewed articles | h-index 23"', de: 'Publikationen: "30+ peer-reviewed Artikel | h-Index 23"', nl: 'publicaties: "30+ peer-reviewed artikelen | h-index 23"' },

  // Bento
  "bento.eyebrow": { en: "Research & Impact", de: "Forschung & Wirkung", nl: "Onderzoek & Impact" },
  "bento.title": { en: "Work Highlights", de: "Ausgewählte Arbeiten", nl: "Hoogtepunten" },
  "bento.a.title": { en: "DEXLab", de: "DEXLab", nl: "DEXLab" },
  "bento.a.desc": {
    en: "Co-founder & Scientific Director of the Digital Experience Lab — a hub for AR, VR, AI, service robots, and neuroscientific tools at Maastricht University SBE.",
    de: "Mitgründer & wissenschaftlicher Direktor des Digital Experience Lab — ein Zentrum für AR, VR, KI, Serviceroboter und neurowissenschaftliche Instrumente an der Universität Maastricht SBE.",
    nl: "Medeoprichter & wetenschappelijk directeur van het Digital Experience Lab — een centrum voor AR, VR, AI, servicerobot en neurowetenschappelijke tools aan Maastricht University SBE.",
  },
  "bento.a.link": { en: "Visit DEXLab →", de: "DEXLab besuchen →", nl: "Bezoek DEXLab →" },
  "bento.b.title": {
    en: "€2.1M+ Research Funding",
    de: "€2,1 Mio.+ Forschungsförderung",
    nl: "€2,1 mln.+ onderzoeksfinanciering",
  },
  "bento.b.desc": {
    en: "Secured competitive grants including Marie Curie, Comenius, NETSPAR, ERASMUS+, and international PhD funding from CSC and SACM.",
    de: "Kompetitive Drittmittel eingeworben, u.a. Marie Curie, Comenius, NETSPAR, ERASMUS+ sowie internationale PhD-Förderungen von CSC und SACM.",
    nl: "Competitieve subsidies verworven, waaronder Marie Curie, Comenius, NETSPAR, ERASMUS+ en internationale PhD-financiering van CSC en SACM.",
  },
  "bento.c.title": { en: "Augmented Reality", de: "Augmented Reality", nl: "Augmented Reality" },
  "bento.c.desc": {
    en: "Pioneering research on AR's impact on consumer decision-making in frontline services.",
    de: "Wegweisende Forschung zur Wirkung von AR auf Konsumentenentscheidungen im Dienstleistungsbereich.",
    nl: "Baanbrekend onderzoek naar de invloed van AR op consumentenbeslissingen in dienstverlening.",
  },
  "bento.d.title": { en: "AI & Digital Marketing", de: "KI & Digitales Marketing", nl: "AI & Digitale Marketing" },
  "bento.d.desc": {
    en: "Combining experimental and econometric methods to study AI-driven marketing decisions.",
    de: "Kombination experimenteller und ökonometrischer Methoden zur Erforschung KI-gestützter Marketingentscheidungen.",
    nl: "Combinatie van experimentele en econometrische methoden om AI-gedreven marketingbeslissingen te onderzoeken.",
  },
  "bento.e.title": { en: "LIT Network", de: "LIT Network", nl: "LIT Network" },
  "bento.e.desc": {
    en: "Co-founded the Limburg Immersive Technologies Network connecting academia, industry, and SMEs.",
    de: "Mitgründer des Limburg Immersive Technologies Network, das Wissenschaft, Industrie und KMU verbindet.",
    nl: "Medeoprichter van het Limburg Immersive Technologies Network dat wetenschap, industrie en mkb verbindt.",
  },
  "bento.e.link": { en: "Learn more →", de: "Mehr erfahren →", nl: "Meer informatie →" },
  "bento.f.title": { en: "30+ Publications", de: "30+ Publikationen", nl: "30+ Publicaties" },
  "bento.f.desc": {
    en: "Published in journals including Journal of Retailing, Journal of Service Research, and Computers in Human Behavior.",
    de: "Veröffentlichungen u.a. in Journal of Retailing, Journal of Service Research und Computers in Human Behavior.",
    nl: "Gepubliceerd in o.a. Journal of Retailing, Journal of Service Research en Computers in Human Behavior.",
  },
  "bento.g.title": { en: "Executive Education", de: "Executive Education", nl: "Executive Education" },
  "bento.g.desc": {
    en: "MBA Digital Strategy, workshops & in-company training for Allianz, APG, Dutch Ministry of I&W, and more.",
    de: "MBA Digital Strategy, Workshops & Inhouse-Trainings für Allianz, APG, niederländisches Ministerium für I&W u.a.",
    nl: "MBA Digital Strategy, workshops & incompany trainingen voor Allianz, APG, Ministerie van I&W en meer.",
  },

  // Publications
  "pub.eyebrow": { en: "Publications", de: "Publikationen", nl: "Publicaties" },
  "pub.title": { en: "Selected Papers", de: "Ausgewählte Arbeiten", nl: "Geselecteerde publicaties" },
  "pub.count": { en: "Publications", de: "Publikationen", nl: "Publicaties" },
  "pub.showAll": { en: "Show All", de: "Alle anzeigen", nl: "Alles tonen" },
  "pub.papers": { en: "Papers", de: "Arbeiten", nl: "Artikelen" },
  "pub.showLess": { en: "Show Less", de: "Weniger anzeigen", nl: "Minder tonen" },

  // Speaking
  "speaking.eyebrow": { en: "Speaking", de: "Vorträge", nl: "Lezingen" },
  "speaking.title": { en: "Keynote Topics", de: "Keynote-Themen", nl: "Keynote-onderwerpen" },

  // Speaking topics
  "speaking.0.title": { en: "AR & VR in Business and Retail", de: "AR & VR in Wirtschaft und Handel", nl: "AR & VR in bedrijfsleven en retail" },
  "speaking.0.desc": {
    en: "How immersive technologies are transforming customer experiences and frontline services.",
    de: "Wie immersive Technologien Kundenerlebnisse und Dienstleistungen verändern.",
    nl: "Hoe immersieve technologieën klantbeleving en dienstverlening transformeren.",
  },
  "speaking.1.title": { en: "AI's Impact on Consumers and Organizations", de: "Einfluss von KI auf Konsumenten und Unternehmen", nl: "Impact van AI op consumenten en organisaties" },
  "speaking.1.desc": {
    en: "Data-driven marketing and the role of artificial intelligence in business decision-making.",
    de: "Datengetriebenes Marketing und die Rolle künstlicher Intelligenz bei Geschäftsentscheidungen.",
    nl: "Datagedreven marketing en de rol van kunstmatige intelligentie bij zakelijke besluitvorming.",
  },
  "speaking.2.title": { en: "Brain-Computer Interfaces: The Next Frontier", de: "Brain-Computer-Interfaces: Die nächste Grenze", nl: "Brain-computer interfaces: de volgende grens" },
  "speaking.2.desc": {
    en: "Exploring the intersection of neuroscience and consumer research.",
    de: "An der Schnittstelle von Neurowissenschaft und Konsumentenforschung.",
    nl: "De kruising van neurowetenschappen en consumentenonderzoek verkennen.",
  },
  "speaking.3.title": { en: "The Future of Immersive Work and the Metaverse", de: "Die Zukunft immersiver Arbeit und des Metaverse", nl: "De toekomst van immersief werken en het metaverse" },
  "speaking.3.desc": {
    en: "What XR technologies mean for remote collaboration, education, and innovation.",
    de: "Was XR-Technologien für Remote-Zusammenarbeit, Bildung und Innovation bedeuten.",
    nl: "Wat XR-technologieën betekenen voor samenwerking op afstand, onderwijs en innovatie.",
  },
  "speaking.4.title": { en: "Digital Transformation & Customer Experience", de: "Digitale Transformation & Kundenerlebnis", nl: "Digitale transformatie & klantervaring" },
  "speaking.4.desc": {
    en: "Leveraging emerging technologies for meaningful customer engagement.",
    de: "Nutzung aufkommender Technologien für nachhaltige Kundenbindung.",
    nl: "Opkomende technologieën inzetten voor betekenisvolle klantbetrokkenheid.",
  },
  "speaking.5.title": { en: "The Open Academic: Transparency in Research", de: "Der offene Akademiker: Transparenz in der Forschung", nl: "De open academicus: transparantie in onderzoek" },
  "speaking.5.desc": {
    en: "How open science, open data, and transparent practices make academia better for everyone.",
    de: "Wie Open Science, offene Daten und transparente Praktiken die Wissenschaft verbessern.",
    nl: "Hoe open science, open data en transparante praktijken de wetenschap verbeteren.",
  },

  // Contact
  "contact.eyebrow": { en: "Contact", de: "Kontakt", nl: "Contact" },
  "contact.title": { en: "Get in Touch", de: "Kontakt aufnehmen", nl: "Neem contact op" },
  "contact.subtitle": {
    en: "Interested in research collaborations, speaking engagements, or consulting? Reach out.",
    de: "Interesse an Forschungskooperationen, Vorträgen oder Beratung? Schreiben Sie mir.",
    nl: "Geïnteresseerd in onderzoekssamenwerking, lezingen of advies? Neem contact op.",
  },
  "contact.name": { en: "Name", de: "Name", nl: "Naam" },
  "contact.namePlaceholder": { en: "Your name", de: "Ihr Name", nl: "Uw naam" },
  "contact.email": { en: "Email", de: "E-Mail", nl: "E-mail" },
  "contact.message": { en: "Message", de: "Nachricht", nl: "Bericht" },
  "contact.messagePlaceholder": { en: "Your message...", de: "Ihre Nachricht...", nl: "Uw bericht..." },
  "contact.send": { en: "Send Message", de: "Nachricht senden", nl: "Bericht verzenden" },
  "contact.sending": { en: "Sending...", de: "Wird gesendet...", nl: "Verzenden..." },
  "contact.thanks": { en: "Thank you!", de: "Vielen Dank!", nl: "Dank u!" },
  "contact.thanksSub": {
    en: "Your message has been sent. I'll get back to you soon.",
    de: "Ihre Nachricht wurde gesendet. Ich melde mich in Kürze.",
    nl: "Uw bericht is verzonden. Ik neem snel contact met u op.",
  },
  "contact.error": {
    en: "Something went wrong. Please try again.",
    de: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    nl: "Er is iets misgegaan. Probeer het opnieuw.",
  },
  "contact.office": { en: "Office", de: "Büro", nl: "Kantoor" },

  // Footer
  "footer.rights": { en: "All rights reserved.", de: "Alle Rechte vorbehalten.", nl: "Alle rechten voorbehouden." },
  "footer.impressum": { en: "Impressum & Privacy", de: "Impressum & Datenschutz", nl: "Impressum & Privacy" },
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[locale] ?? entry.en ?? key;
    },
    [locale],
  );

  // Prevent flash of wrong language
  if (!mounted) {
    return <I18nContext.Provider value={{ locale: "en", setLocale, t: (key) => translations[key]?.en ?? key }}>{children}</I18nContext.Provider>;
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  nl: "NL",
};
