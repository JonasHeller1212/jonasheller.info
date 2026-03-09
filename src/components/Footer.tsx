"use client";

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 border-t text-center text-sm"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text-secondary)",
      }}
    >
      <p>
        © {new Date().getFullYear()} Dr. Jonas Heller. All rights reserved.
      </p>
    </footer>
  );
}
