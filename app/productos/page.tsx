import { title } from "@/components/primitives";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { CategorySidebar } from "@/components/category-sidebar";
import { ProductCarousel } from "@/components/product-carousel";
import type { Product, Category } from "@/types/api";

export const metadata = { title: "Productos – Vivatech" };
export const dynamic = "force-dynamic";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams?.category;

  // 1. Obtenemos categorías
  // 2. Obtenemos productos filtrados para el GRID
  // 3. Obtenemos productos destacados para el CARRUSEL (por ahora todos, o los más recientes)
  const [gridProducts, categories, featuredProducts] = await Promise.all([
    fetchProducts(categorySlug),
    fetchCategories(),
    fetchProducts(), // Trae todos para el carrusel
  ]);

  return (
    <section className="max-w-screen-2xl mx-auto px-4 pb-12">
      {/* 1. Carrusel Superior */}
      <ProductCarousel products={featuredProducts} />

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* 2. Sidebar Izquierdo */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <CategorySidebar categories={categories} />
        </aside>

        {/* 3. Grid de Productos (Derecha) */}
        <div className="flex-grow">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {categorySlug
                ? categories.find(c => c.slug === categorySlug)?.name || "Productos"
                : "Todos los productos"
              }
            </h1>
            <p className="text-default-500 text-sm">Mostrando {gridProducts.length} resultados</p>
          </div>

          {gridProducts.length > 0 ? (
            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
            >
              {gridProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-default-50 rounded-xl">
              <p className="text-xl text-default-500">
                No se encontraron productos en esta categoría.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
