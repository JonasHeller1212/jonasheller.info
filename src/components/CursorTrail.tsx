"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorTrail() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const ringX = useSpring(dotX, { stiffness: 150, damping: 15, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 150, damping: 15, mass: 0.5 });

  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-magnetic], input, textarea, select, [role='button']");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [dotX, dotY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: "var(--color-accent)",
            opacity: isVisible ? 1 : 0,
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border-2"
          style={{
            borderColor: "var(--color-accent)",
            opacity: isVisible ? 0.5 : 0,
          }}
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            mixBlendMode: isHovering ? "difference" : "normal",
            backgroundColor: isHovering ? "rgba(255,255,255,0.15)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
