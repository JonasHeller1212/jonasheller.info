"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const highlights = [
  {
    area: "a",
    title: "DEXLab",
    description:
      "Co-founder & Scientific Director of the Digital Experience Lab — a hub for AR, VR, AI, service robots, and neuroscientific tools at Maastricht University SBE.",
    link: "https://www.sbe-dexlab.com",
    linkText: "Visit DEXLab →",
    accent: true,
  },
  {
    area: "b",
    title: "€2.1M+ Research Funding",
    description:
      "Secured competitive grants including Marie Curie, Comenius, NETSPAR, ERASMUS+, and international PhD funding from CSC and SACM.",
    accent: true,
  },
  {
    area: "c",
    title: "Augmented Reality",
    description:
      "Pioneering research on AR's impact on consumer decision-making in frontline services.",
  },
  {
    area: "d",
    title: "AI & Digital Marketing",
    description:
      "Combining experimental and econometric methods to study AI-driven marketing decisions.",
  },
  {
    area: "e",
    title: "LIT Network",
    description:
      "Co-founded the Limburg Immersive Technologies Network connecting academia, industry, and SMEs.",
    link: "https://www.litnetwork.nl",
    linkText: "Learn more →",
  },
  {
    area: "f",
    title: "30+ Publications",
    description: "Published in top journals including Journal of Retailing, Journal of Service Research, and Computers in Human Behavior.",
  },
  {
    area: "g",
    title: "Executive Education",
    description:
      "MBA Digital Strategy, workshops & in-company training for Allianz, APG, Dutch Ministry of I&W, and more.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Bento() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="research" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
          ref={ref}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-secondary)" }}
          >
            Research &amp; Impact
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            Work Highlights
          </h2>
        </motion.div>

        <motion.div
          className="bento-grid grid gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.area}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              style={{ gridArea: item.area }}
              variants={cardVariants}
            >
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-3"
                  style={{
                    color: item.accent ? "var(--color-accent)" : "var(--color-text)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.description}
                </p>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-semibold hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.linkText}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
