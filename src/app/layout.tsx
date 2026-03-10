import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://www.jonasheller.info";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dr. Jonas Heller — Researcher · Consultant · Speaker",
  description:
    "Jonas Heller is a tenured Assistant Professor of Marketing at Maastricht University. Co-Founder of DEXLab & LIT Network. Research in augmented reality, virtual reality, AI, and digital marketing.",
  keywords: [
    "Jonas Heller",
    "Jonas Heller professor",
    "Jonas Heller academic",
    "Jonas Heller consultant",
    "Jonas Heller speaker",
    "Jonas Heller Maastricht University",
    "Jonas Heller marketing",
    "Jonas Heller augmented reality",
    "Jonas Heller researcher",
    "DEXLab",
    "LIT Network",
    "augmented reality marketing",
    "digital marketing professor",
    "AR VR research",
  ],
  authors: [{ name: "Jonas Heller", url: siteUrl }],
  creator: "Jonas Heller",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dr. Jonas Heller — Researcher · Consultant · Speaker",
    description:
      "Tenured Assistant Professor of Marketing at Maastricht University. Co-Founder of DEXLab & LIT Network. Research in AR, VR, AI, and digital marketing.",
    url: siteUrl,
    siteName: "Jonas Heller",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Jonas Heller — Researcher · Consultant · Speaker",
    description:
      "Tenured Assistant Professor of Marketing at Maastricht University. Research in AR, VR, AI, and digital marketing.",
    creator: "@HellerJonas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonas Heller",
  givenName: "Jonas",
  familyName: "Heller",
  honorificPrefix: "Dr.",
  url: siteUrl,
  jobTitle: "Assistant Professor of Marketing",
  worksFor: {
    "@type": "Organization",
    name: "Maastricht University",
    department: "School of Business and Economics",
    url: "https://www.maastrichtuniversity.nl",
  },
  affiliation: [
    {
      "@type": "Organization",
      name: "DEXLab",
      description: "Digital Experience Lab",
    },
    {
      "@type": "Organization",
      name: "LIT Network",
    },
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Maastricht University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of New South Wales",
    },
  ],
  knowsAbout: [
    "Augmented Reality",
    "Virtual Reality",
    "Artificial Intelligence",
    "Digital Marketing",
    "Services Marketing",
    "Consumer Behavior",
    "Immersive Technologies",
    "Brain-Computer Interfaces",
  ],
  sameAs: [
    "https://scholar.google.com/citations?user=NOSPtp8AAAAJ",
    "https://www.researchgate.net/profile/Jonas-Heller-2",
    "https://www.linkedin.com/in/hellerjonas/",
    "https://x.com/hellerjonas",
    "https://cris.maastrichtuniversity.nl/en/persons/jonas-heller",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
