import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";

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
  title: "Dr. Jonas Heller | AR, VR & AI Marketing Expert | Keynote Speaker & Consultant",
  description:
    "Dr. Jonas Heller is a marketing professor at Maastricht University and keynote speaker specializing in AR, VR, AI and consumer behavior. Available for speaking, consulting, and research collaboration.",
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
    title: "Dr. Jonas Heller — AR, VR & AI Marketing Expert",
    description:
      "Marketing professor, keynote speaker, and consultant on immersive technologies and AI-driven consumer behavior.",
    url: siteUrl,
    siteName: "Jonas Heller",
    type: "profile",
    locale: "en_US",
    alternateLocale: ["de_DE", "nl_NL"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Jonas Heller — AR, VR & AI Marketing Expert",
    description:
      "Marketing professor, keynote speaker, and consultant on immersive technologies and AI-driven consumer behavior.",
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
    name: "Maastricht University School of Business and Economics",
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
    "Consumer Behavior",
    "AI Marketing",
    "Behavioral Science",
    "Extended Reality",
    "Digital Transformation",
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
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
