"use client";

import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MagneticButton from "./MagneticButton";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [state, handleSubmit] = useForm("mgonaray");
  const { t } = useI18n();

  return (
    <section id="contact" className="py-14 sm:py-16 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            {t("contact.eyebrow")}
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            {t("contact.title")}
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card rounded-2xl p-8 sm:p-12"
        >
          {state.succeeded ? (
            <div className="text-center py-8">
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {t("contact.thanks")}
              </p>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {t("contact.thanksSub")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {t("contact.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border text-sm focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                      // @ts-expect-error -- CSS custom property
                      "--tw-ring-color": "var(--color-accent)",
                    }}
                    placeholder={t("contact.namePlaceholder")}
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {t("contact.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-transparent border text-sm focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                    placeholder="your@email.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border text-sm focus:outline-none focus:ring-2 resize-none"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  placeholder={t("contact.messagePlaceholder")}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              {state.errors && (
                <p className="text-sm text-center" style={{ color: "#ef4444" }}>
                  {t("contact.error")}
                </p>
              )}

              <div className="text-center">
                <MagneticButton
                  className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors"
                >
                  {state.submitting ? t("contact.sending") : t("contact.send")}
                </MagneticButton>
              </div>
            </form>
          )}

          <div
            className="mt-10 pt-8 border-t text-sm text-center"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p className="font-medium mb-1" style={{ color: "var(--color-text)" }}>
              {t("contact.office")}
            </p>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Room B1.17a, Tongersestraat 53
              <br />
              Maastricht, NL
            </p>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-8 flex justify-center gap-6 text-sm"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/hellerjonas/" },
            { label: "Google Scholar", href: "https://scholar.google.com/citations?user=NOSPtp8AAAAJ" },
            { label: "ResearchGate", href: "https://www.researchgate.net/profile/Jonas-Heller-2" },
            { label: "Substack", href: "https://jonasheller.substack.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
