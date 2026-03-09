"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Speaking", href: "#speaking" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl shadow-sm" : ""
      }`}
      style={{
        backgroundColor: scrolled ? "var(--color-nav-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          JH
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {link.label}
            </a>
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
      </div>
    </nav>
  );
}
