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
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 select-none pointer-events-none"
          src="/banner%20inicio%20sonrisa.mov"
        />

        {/* Degradado verde semitransparente */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/60 via-primary-900/30 to-black/80" />

        {/* Texto */}
        <h1
          className={title({
            class: "text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4",
          })}
        >
          Maquinaria&nbsp;
          <span className="text-primary-300 font-extrabold">compacta&nbsp;</span>
          para impulsar tu productividad
        </h1>

        <div className="mb-10" />

        {/* Botón único */}
        <div className="flex items-center justify-center">
          <Button
            as="a"
            className="shadow-lg px-8"
            color="primary"
            href="/productos"
            radius="full"
            size="lg"
          >
            Nuestros Productos
          </Button>
        </div>
      </section>
    </div>
  );
}
