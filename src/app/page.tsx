"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import Bento from "@/components/Bento";
import Publications from "@/components/Publications";
import Speaking from "@/components/Speaking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Load cursor and smooth scroll only on client, skip on touch devices
const CursorTrail = dynamic(() => import("@/components/CursorTrail"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CursorTrail />
      <Nav />
      <main className="font-[family-name:var(--font-geist-sans)]">
        <Hero />
        <Terminal />
        <Bento />
        <Publications />
        <Speaking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
