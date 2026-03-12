"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

const topicKeys = [0, 1, 2, 3, 4, 5];

export default function Speaking() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useI18n();

  return (
    <section id="speaking" className="py-14 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            {t("speaking.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            {t("speaking.title")}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {topicKeys.map((i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <h3
                className="font-bold mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {t(`speaking.${i}.title`)}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {t(`speaking.${i}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Past engagements */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-text)" }}>
            {t("speaking.pastTitle")}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {t("speaking.past")}
          </p>
        </motion.div>

        {/* Speaker reel placeholder */}
        <motion.div
          className="mt-8 glass-card rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
            {t("speaking.reelTitle")}
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {t("speaking.reelPlaceholder")}
          </p>
        </motion.div>

        {/* Booking CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
            {t("speaking.bookingCta")}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {t("speaking.bookingBtn")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
