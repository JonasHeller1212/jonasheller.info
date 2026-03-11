"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const [showImpressum, setShowImpressum] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <footer
        className="py-8 px-6 border-t text-center text-sm"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        <p>
          © {new Date().getFullYear()} Dr. Jonas Heller. {t("footer.rights")}
        </p>
        <button
          onClick={() => setShowImpressum(true)}
          className="mt-2 hover:opacity-70 transition-opacity underline underline-offset-4 decoration-1"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {t("footer.impressum")}
        </button>
      </footer>

      {showImpressum && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowImpressum(false);
          }}
        >
          <div
            className="glass-card rounded-2xl p-8 sm:p-10 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
            style={{ color: "var(--color-text)" }}
          >
            <button
              onClick={() => setShowImpressum(false)}
              className="absolute top-4 right-4 text-xl hover:opacity-70 transition-opacity"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-6">Impressum</h2>

            <div className="space-y-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Responsible for content
                </p>
                <p>Dr. Jonas Heller</p>
                <p>Maastricht University</p>
                <p>School of Business and Economics</p>
                <p>Tongersestraat 53, 6211 LM Maastricht</p>
                <p>The Netherlands</p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Contact
                </p>
                <p>
                  Please use the{" "}
                  <button
                    onClick={() => {
                      setShowImpressum(false);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                    style={{ color: "var(--color-accent)" }}
                  >
                    contact form
                  </button>{" "}
                  on this website.
                </p>
              </div>

              <hr style={{ borderColor: "var(--color-border)" }} />

              <h3 className="text-base font-bold pt-2" style={{ color: "var(--color-text)" }}>
                Privacy Notice
              </h3>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Contact form
                </p>
                <p>
                  When you submit the contact form, your name, email address, and
                  message are transmitted to{" "}
                  <a
                    href="https://formspree.io/legal/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-1 hover:opacity-70"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Formspree
                  </a>{" "}
                  for processing and forwarded to me via email. This data is used
                  solely to respond to your inquiry. Legal basis: Art. 6(1)(f) GDPR
                  (legitimate interest in responding to inquiries).
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Hosting
                </p>
                <p>
                  This website is hosted on GitHub Pages. GitHub may collect
                  technical log data (IP addresses) in accordance with their{" "}
                  <a
                    href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-1 hover:opacity-70"
                    style={{ color: "var(--color-accent)" }}
                  >
                    privacy statement
                  </a>
                  .
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  No tracking
                </p>
                <p>
                  This website does not use cookies, analytics, or any third-party
                  tracking tools.
                </p>
              </div>

              <div>
                <p className="font-medium" style={{ color: "var(--color-text)" }}>
                  Your rights
                </p>
                <p>
                  Under the GDPR, you have the right to access, rectify, or delete
                  your personal data. To exercise these rights, please contact me
                  via the contact form.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
