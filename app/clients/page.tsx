import { title, subtitle } from "@/components/primitives";
import { fetchClients } from "@/lib/api";
import ClientCard from "@/components/ClientCard";
import type { Client } from "@/types/api";

export const metadata = { title: "Clientes – Vivatech" };

export default async function ClientsPage() {
  const clients: Client[] = await fetchClients();

  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <h1 className={title()}>Nuestros clientes</h1>
        <p className={subtitle()}>
          Conoce cómo nuestra tecnología ha transformado fincas en toda Latinoamérica.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
      </div>
    </section>
  );
}
