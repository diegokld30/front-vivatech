import type { Metadata } from "next";
import KitSolarCalculator from "@/components/KitSolarCalculator";

/* -------- SEO -------- */
export const metadata: Metadata = {
  title: "Calcula tu Kit Solar – Vivatech",
  description:
    "Calcula rápidamente el tamaño del kit solar que necesitas según tu consumo eléctrico y tu departamento.",
};

/* -------- Página -------- */
export default function KitSolarPage() {
  return (
    <section className="max-w-3xl mx-auto space-y-10 px-4 py-12">
      <h1 className="text-center text-3xl font-bold">Calcula tu Kit Solar</h1>

      {/* Componente cliente */}
      <KitSolarCalculator />
    </section>
  );
}
