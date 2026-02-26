import Image from "next/image";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";

export const metadata = {
  title: "Vivatech – Tecnología para el campo",
  description:
    "Tractores, mini-cargadores y más maquinaria agrícola. Entrega en toda Colombia.",
};

export default function Home() {
  return (
    /* ───── FULL-BLEED WRAPPER ─────
       rompe los márgenes de <main class="container …">   */
    <div className="relative -mt-6 w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
      <section className="relative h-[92vh] flex flex-col items-center justify-center text-white">
        {/* Imagen de fondo  */}
        <Image
          fill
          priority
          className="object-cover object-center -z-20 select-none pointer-events-none"
          sizes="100vw"
          src="/vivatechEntrada.png" /* debe existir en /public */
          alt="Maquinaria agrícola Vivatech"
        />

        {/* Degradado verde semitransparente */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/60 via-primary-900/30 to-black/80" />

        {/* Texto */}
        <h1
          className={title({
            class: "text-center text-4xl md:text-6xl lg:text-7xl",
          })}
        >
          Maquinaria&nbsp;
          <span className="text-primary-300 font-extrabold">verde&nbsp;</span>
          que multiplica tu cosecha
        </h1>

        <p
          className={subtitle({
            className: "max-w-xl text-center mb-10 text-gray-200",
          })}
        >
          Potencia tu finca con equipos robustos y soporte experto.
        </p>

        {/* Botones */}
        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4">
          <Button
            download
            as="a"
            className="shadow-lg"
            color="primary"
            href="/catalogo.pdf"
            radius="full"
            size="lg" // mismo alto
          >
            Descargar catálogo
          </Button>

          <Button
            as="a"
            color="primary"
            href="/productos"
            radius="full"
            size="lg" // mismo alto
            variant="bordered"
          >
            Conocer más
          </Button>
        </div>
      </section>
    </div>
  );
}
