import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Dr. Jonas Heller",
  description:
    "Tools and platforms built by Jonas Heller — AI2AI-Chat for AI-to-AI conversations and ScholarFolio for interactive research portfolios.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects — Dr. Jonas Heller",
    description:
      "Tools and platforms built by Jonas Heller: AI2AI-Chat and ScholarFolio.",
    url: "https://www.jonasheller.info/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
