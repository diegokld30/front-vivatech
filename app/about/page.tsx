import { title, subtitle } from "@/components/primitives";

export const metadata = {
  title: "Sobre Nosotros – Vivatech",
  description:
    "Conoce la historia, misión y visión de Vivatech. Tecnología para el campo colombiano.",
};

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 space-y-8 text-center">
      <h1 className={title({ size: "lg" })}>Sobre Nosotros</h1>
      <p className={subtitle({ className: "text-default-500 text-lg" })}>
        Estamos trabajando en esta sección. Muy pronto conocerás más sobre
        nuestra historia, misión y todo lo que nos impulsa como Vivatech.
      </p>

      <div className="inline-flex items-center gap-3 rounded-2xl bg-primary-50 dark:bg-primary-900/20 px-8 py-4 text-primary-700 dark:text-primary-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium">Próximamente</span>
      </div>
    </section>
  );
}
