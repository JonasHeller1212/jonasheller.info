"use client";

import { useEffect, useState } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function useScrambleText(finalText: string, options?: { delay?: number; speed?: number }) {
  const [text, setText] = useState("");
  const delay = options?.delay ?? 0;
  const speed = options?.speed ?? 30;

  useEffect(() => {
    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(finalText);
      return;
    }

    const timeout = setTimeout(() => {
      let iteration = 0;
      const totalIterations = finalText.length * 3;

      const interval = setInterval(() => {
        setText(
          finalText
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration / 3) return finalText[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        iteration++;
        if (iteration > totalIterations) {
          setText(finalText);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [finalText, delay, speed]);

  return text;
}
