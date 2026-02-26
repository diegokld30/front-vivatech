import ContactSection from "./ContactSection";

import { subtitle } from "@/components/primitives";

export const metadata = {
  title: "Contáctanos – Vivatech",
  description:
    "¿Tienes preguntas sobre nuestra maquinaria agrícola? Escríbenos o llámanos, estamos listos para ayudarte.",
};

export default function ContactoPage() {
  return (
    <>
      {/* <h1 className={title({ class: "mb-2 text-center" })}>Contáctanos</h1> */}
      <p className={subtitle({ class: "text-center mb-10" })}>
        Responderemos en menos de 24&nbsp;h hábiles.
      </p>

      {/* Client component con HeroUI */}
      <ContactSection />
    </>
  );
}
