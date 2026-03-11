"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: `linear-gradient(135deg, var(--color-hero-gradient-start) 0%, var(--color-hero-gradient-end) 50%, var(--color-bg) 100%)`,
      }}
    >
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-8xl sm:text-9xl font-bold font-mono mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          404
        </p>
        <h1
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: "var(--color-text)" }}
        >
          Page not found
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <MagneticButton
          as="a"
          href="/"
          className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors inline-block"
          style={{ backgroundColor: "var(--color-accent)" } as React.CSSProperties}
        >
          Back to Home
        </MagneticButton>
      </motion.div>
    </div>
  );
}
