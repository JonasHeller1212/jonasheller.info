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

  // Bento
  "bento.eyebrow": { en: "Research & Impact", de: "Forschung & Wirkung", nl: "Onderzoek & Impact" },
  "bento.title": { en: "Work Highlights", de: "Ausgewählte Arbeiten", nl: "Hoogtepunten" },

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
