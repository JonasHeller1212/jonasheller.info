"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const terminalLines = [
  { prompt: ">", text: 'name: "Dr. Jonas Heller"' },
  { prompt: ">", text: 'role: "Assistant Professor of Marketing"' },
  { prompt: ">", text: 'affiliation: "Maastricht University, SBE"' },
  { prompt: ">", text: 'labs: ["DEXLab", "LIT Network"]' },
  { prompt: ">", text: 'research: ["AR/VR", "AI", "Digital Marketing", "Consumer Behavior"]' },
  { prompt: ">", text: 'funding: "€2.1M+ in competitive grants"' },
  { prompt: ">", text: 'awards: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]' },
  { prompt: ">", text: 'education: "PhD UNSW | MSc & BSc Maastricht University"' },
  { prompt: ">", text: 'industry: ["Zalando", "Jimdo"]' },
  { prompt: ">", text: 'publications: "30+ peer-reviewed articles | h-index 23"' },
];

export default function Terminal() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleLines(terminalLines.length);
      setCurrentChar(999);
      return;
    }

    setIsTyping(true);

    if (visibleLines >= terminalLines.length) {
      setIsTyping(false);
      return;
    }

    const fullLine = `${terminalLines[visibleLines].prompt} ${terminalLines[visibleLines].text}`;

    if (currentChar < fullLine.length) {
      const timer = setTimeout(() => setCurrentChar((c) => c + 1), 18);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((l) => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, visibleLines, currentChar]);

  return (
    <section id="about" className="py-14 sm:py-16 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "var(--color-terminal-bg)" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-white/40 font-mono">about.sh</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm sm:text-base leading-relaxed min-h-[320px]">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="mb-1">
                <span style={{ color: "var(--color-terminal-prompt)" }}>
                  {line.prompt}{" "}
                </span>
                <span style={{ color: "var(--color-terminal-text)" }}>
                  {line.text}
                </span>
              </div>
            ))}

            {/* Currently typing line */}
            {visibleLines < terminalLines.length && isVisible && (
              <div className="mb-1">
                <span style={{ color: "var(--color-terminal-prompt)" }}>
                  {terminalLines[visibleLines].prompt}{" "}
                </span>
                <span style={{ color: "var(--color-terminal-text)" }}>
                  {terminalLines[visibleLines].text.slice(0, Math.max(0, currentChar - 2))}
                </span>
                <span className="terminal-cursor" style={{ color: "var(--color-terminal-text)" }}>
                  █
                </span>
              </div>
            )}

            {/* Blinking cursor after all done */}
            {visibleLines >= terminalLines.length && (
              <div className="mt-2">
                <span style={{ color: "var(--color-terminal-prompt)" }}>&gt; </span>
                <span className="terminal-cursor" style={{ color: "var(--color-terminal-text)" }}>
                  █
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
