"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback, MouseEvent } from "react";
import MagneticButton from "./MagneticButton";
import { useI18n, localeLabels, Locale } from "@/lib/i18n";

const linkKeys = [
  { key: "nav.about", href: "#about" },
  { key: "nav.research", href: "#research" },
  { key: "nav.publications", href: "#publications" },
  { key: "nav.speaking", href: "#speaking" },
  { key: "nav.cv", href: "/cv" },
  { key: "nav.contact", href: "#contact" },
];

const locales: Locale[] = ["en", "de", "nl"];

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return; // let normal links navigate
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(href.slice(1));
    if (target) {
      const navHeight = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "backdrop-blur-xl shadow-sm" : ""
      }`}
      style={{
        backgroundColor: scrolled || menuOpen ? "var(--color-nav-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          JH
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="flex items-center rounded-full border text-xs" style={{ borderColor: "var(--color-border)" }}>
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className="px-2 py-1.5 rounded-full transition-colors font-medium"
                style={{
                  backgroundColor: locale === l ? "var(--color-accent)" : "transparent",
                  color: locale === l ? "#fff" : "var(--color-text-secondary)",
                }}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>

          <MagneticButton
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            } as React.CSSProperties}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted ? (theme === "dark" ? "☀" : "☾") : "○"}
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="14" y2="14" />
                  <line x1="14" y1="4" x2="4" y2="14" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="15" y2="5" />
                  <line x1="3" y1="9" x2="15" y2="9" />
                  <line x1="3" y1="13" x2="15" y2="13" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ backgroundColor: "var(--color-nav-bg)" }}
        >
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium py-2 hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text)" }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {t(link.key)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
