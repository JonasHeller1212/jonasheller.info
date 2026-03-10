import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV — Dr. Jonas Heller",
  description:
    "Curriculum Vitae of Dr. Jonas Heller — Tenured Assistant Professor of Marketing at Maastricht University. Experience, education, awards, funding, teaching, and supervision.",
  alternates: {
    canonical: "/cv",
  },
  openGraph: {
    title: "CV — Dr. Jonas Heller",
    description:
      "Full academic CV: professional experience, education, awards & honors, €2.1M+ in competitive funding, teaching, PhD supervision, and academic service.",
    url: "https://www.jonasheller.info/cv",
  },
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return children;
}
