"use client";

import type { Faq } from "@/types/api";

import { useState } from "react";
import { Accordion, AccordionItem, Input } from "@heroui/react";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");

  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <Input
        className="max-w-md mb-6"
        placeholder="Buscar pregunta…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Accordion selectionMode="multiple">
        {filtered.map((f) => (
          <AccordionItem key={f.id} title={f.question}>
            <div
              dangerouslySetInnerHTML={{ __html: f.answer }}
              className="prose max-w-none text-justify"
            />
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
