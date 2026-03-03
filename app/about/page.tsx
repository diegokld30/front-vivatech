import type { Metadata } from "next";

import { fetchAboutSections } from "@/lib/api";
import type { AboutSection } from "@/types/api";

import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Sobre Nosotros – Vivatech",
  description:
    "Conoce la historia, misión y visión de Vivatech. Tecnología para el campo colombiano.",
  openGraph: {
    title: "Sobre Nosotros – Vivatech",
    description:
      "Conoce la historia y misión de Vivatech. Tecnología para el campo.",
  },
};

export default async function AboutPage() {
  const sections = await fetchAboutSections().catch(
    (): AboutSection[] => [],
  );

  return <AboutClient sections={sections} />;
}
