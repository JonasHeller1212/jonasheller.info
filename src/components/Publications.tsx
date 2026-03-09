"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import MagneticButton from "./MagneticButton";

interface Paper {
  paperId: string;
  title: string;
  year: number | null;
  venue: string;
  citationCount: number;
  url: string;
}

// TODO: Replace with Jonas Heller's actual Semantic Scholar author ID
const AUTHOR_ID = "2898335";

const fallbackPapers: Paper[] = [
  {
    paperId: "1",
    title: "Brave new procurement deals: how procurement managers can leverage AI to negotiate better deals",
    year: 2025,
    venue: "Journal of Purchasing & Supply Management",
    citationCount: 0,
    url: "https://scholar.google.com/citations?user=YOUR_ID",
  },
  {
    paperId: "2",
    title: "The 4C framework: Towards a holistic understanding of consumer engagement with augmented reality",
    year: 2024,
    venue: "Computers in Human Behavior",
    citationCount: 45,
    url: "https://scholar.google.com/citations?user=YOUR_ID",
  },
  {
    paperId: "3",
    title: "Tangible service automation: Decomposing the technology-enabled engagement process (TEEP) for augmented reality",
    year: 2021,
    venue: "Journal of Service Research",
    citationCount: 120,
    url: "https://scholar.google.com/citations?user=YOUR_ID",
  },
  {
    paperId: "4",
    title: "Touching the untouchable: Exploring multi-sensory augmented reality in the context of online retailing",
    year: 2019,
    venue: "Journal of Retailing",
    citationCount: 350,
    url: "https://scholar.google.com/citations?user=YOUR_ID",
  },
  {
    paperId: "5",
    title: "Let me imagine that for you: Transforming the retail frontline through augmenting customer mental imagery ability",
    year: 2019,
    venue: "Journal of Retailing",
    citationCount: 280,
    url: "https://scholar.google.com/citations?user=YOUR_ID",
  },
  {
    paperId: "6",
    title: "Augmented reality: Mapping a research agenda",
    year: 2022,
    venue: "Journal of Business Research",
    citationCount: 160,
    url: "https://scholar.google.com/citations?user=YOUR_ID",
  },
];

function SkeletonCard() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="skeleton h-5 w-3/4 mb-3" />
      <div className="skeleton h-4 w-1/2 mb-2" />
      <div className="skeleton h-4 w-1/3" />
    </div>
  );
}

export default function Publications() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchPapers() {
      try {
        const res = await fetch(
          `https://api.semanticscholar.org/graph/v1/author/${AUTHOR_ID}/papers?fields=title,year,venue,citationCount,url&limit=20`,
          { next: { revalidate: 86400 } } as RequestInit
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const fetched: Paper[] = (data.data || [])
          .filter((p: Paper) => p.title && p.year)
          .sort((a: Paper, b: Paper) => (b.year ?? 0) - (a.year ?? 0));
        setPapers(fetched.length > 0 ? fetched : fallbackPapers);
      } catch {
        setPapers(fallbackPapers);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, []);

  const displayed = showAll ? papers : papers.slice(0, 6);

  return (
    <section id="publications" className="py-24 px-6">
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
            Publications
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Recent Papers
          </h2>
          <div className="flex gap-6 text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <span>3,500+ Citations</span>
            <span>h-index 23</span>
            <span>30+ Publications</span>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {displayed.map((paper) => (
                <motion.a
                  key={paper.paperId}
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-6 hover:scale-[1.02] transition-transform group"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <h3
                    className="font-semibold mb-2 leading-snug group-hover:underline decoration-1 underline-offset-4"
                    style={{ color: "var(--color-text)" }}
                  >
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    {paper.year && <span>{paper.year}</span>}
                    {paper.venue && (
                      <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-border)" }}>
                        {paper.venue}
                      </span>
                    )}
                    {paper.citationCount > 0 && <span>{paper.citationCount} citations</span>}
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {papers.length > 6 && (
              <div className="mt-8 text-center">
                <MagneticButton
                  className="px-6 py-2 rounded-full text-sm font-semibold border transition-colors"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less" : `Show All ${papers.length} Papers`}
                </MagneticButton>
              </div>
            )}

            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://scholar.google.com/citations?user=sJkFr2kAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                Google Scholar →
              </a>
              <a
                href="https://orcid.org/0000-0002-7078-0464" /* TODO: Verify full ORCID */
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent)" }}
              >
                ORCID →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
