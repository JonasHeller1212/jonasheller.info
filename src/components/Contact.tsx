"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xwpezryp", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
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
            Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Get in Touch
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Interested in research collaborations, speaking engagements, or consulting? Reach out.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card rounded-2xl p-8 sm:p-12"
        >
          {status === "sent" ? (
            <div className="text-center py-8">
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--color-text)" }}
              >
                Thank you!
              </p>
              <p style={{ color: "var(--color-text-secondary)" }}>
                Your message has been sent. I&apos;ll get back to you soon.
              </p>
              <button
                className="mt-4 text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
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
                    Name
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
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Email
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
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Message
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
                  placeholder="Your message..."
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-center" style={{ color: "#ef4444" }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="text-center">
                <MagneticButton
                  className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </MagneticButton>
              </div>
            </form>
          )}

          <div
            className="mt-10 pt-8 border-t text-sm text-center"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p className="font-medium mb-1" style={{ color: "var(--color-text)" }}>
              Office
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
