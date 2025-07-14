import { title } from "@/components/primitives";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types/api";

export const metadata = { title: "Productos – Vivatech" };
export const dynamic = "force-dynamic"; // sin caché mientras desarrollas

export default async function ProductosPage() {
  const products: Product[] = await fetchProducts();

  return (
    <section className="max-w-screen-xl mx-auto px-4">
      <p className={title()}>
        Conoce más sobre nuestros productos.
      </p>
      
      <div
        className="grid gap-8 place-items-center
                   sm:grid-cols-2 lg:grid-cols-3 pt-3"
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
