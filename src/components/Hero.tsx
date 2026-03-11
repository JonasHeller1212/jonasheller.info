"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrambleText } from "@/hooks/useScrambleText";
import MagneticButton from "./MagneticButton";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const headline = useScrambleText("Dr. Jonas Heller", { delay: 300, speed: 25 });
  const subtitle = useScrambleText(t("hero.subtitle"), { delay: 800, speed: 20 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, var(--color-hero-gradient-start) 0%, var(--color-hero-gradient-end) 50%, var(--color-bg) 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--color-text) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div ref={fgRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 font-mono"
            style={{ color: "var(--color-text)" }}
          >
            {headline}
          </h1>
        </motion.div>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-4 font-mono"
          style={{ color: "var(--color-text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>

        <motion.p
          className="text-base sm:text-lg font-medium max-w-2xl mx-auto mb-4"
          style={{ color: "var(--color-text)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {t("hero.value")}
        </motion.p>

        <motion.p
          className="text-sm sm:text-base max-w-2xl mx-auto mb-10"
          style={{ color: "var(--color-text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          {t("hero.bio")}{" "}
          <a
            href="https://www.sbe-dexlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            DEXLab
          </a>{" "}
          &amp;{" "}
          <a
            href="https://www.litnetwork.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity"
            style={{ color: "var(--color-accent)" }}
          >
            LIT Network
          </a>
          .
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "var(--color-accent)" } as React.CSSProperties}
          >
            {t("hero.getInTouch")}
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#research"
            className="px-8 py-3 rounded-full text-sm font-semibold border transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            } as React.CSSProperties}
          >
            {t("hero.viewResearch")}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
