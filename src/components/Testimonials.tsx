"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useI18n();

  return (
    <section id="testimonials" className="py-14 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            {t("testimonials.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8"
            style={{ color: "var(--color-text)" }}
          >
            {t("testimonials.title")}
          </h2>
          <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto">
            <p
              className="text-sm sm:text-base leading-relaxed italic"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t("testimonials.placeholder")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
