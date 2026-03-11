"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useI18n } from "@/lib/i18n";

const topics = [
  {
    title: "AR & VR in Business and Retail",
    description: "How immersive technologies are transforming customer experiences and frontline services.",
  },
  {
    title: "AI's Impact on Consumers and Organizations",
    description: "Data-driven marketing and the role of artificial intelligence in business decision-making.",
  },
  {
    title: "Brain-Computer Interfaces: The Next Frontier",
    description: "Exploring the intersection of neuroscience and consumer research.",
  },
  {
    title: "The Future of Immersive Work and the Metaverse",
    description: "What XR technologies mean for remote collaboration, education, and innovation.",
  },
  {
    title: "Digital Transformation & Customer Experience",
    description: "Leveraging emerging technologies for meaningful customer engagement.",
  },
  {
    title: "The Open Academic: Transparency in Research",
    description: "How open science, open data, and transparent practices make academia better for everyone.",
  },
];

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
          {topics.map((topic, i) => (
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
                {topic.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {topic.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
