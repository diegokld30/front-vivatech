import type { Faq } from "@/types/api";

import { subtitle } from "@/components/primitives";
import { fetchFaqs } from "@/lib/api";
import FaqAccordion from "@/components/FaqAccordion"; // ← importa directo

/* ----------- META ---------- */
export const metadata = {
  title: "Preguntas Frecuentes – Vivatech",
  description:
    "Resuelve aquí todas tus dudas sobre Vivatech y su maquinaria agrícola.",
};

export const dynamic = "force-dynamic"; // o usa revalidate en lib/api

/* ----------- PAGE (Server) ---------- */
export default async function FaqPage() {
  const faqs: Faq[] = await fetchFaqs();

  return (
    <section className="space-y-10 ">
      <p className={subtitle()}>
        ¿Tienes alguna duda? Encuentra aquí todas las respuestas.
      </p>

      {/* Client Component (Accordion + búsqueda) */}
      <FaqAccordion faqs={faqs} />

      {/* ---- JSON-LD SEO ---- */}
      <script
        dangerouslySetInnerHTML={{ __html: buildFaqSchema(faqs) }}
        type="application/ld+json"
      />
    </section>
  );
}

/* ----------- JSON-LD helper ---------- */
function buildFaqSchema(faqs: Faq[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}
