import { title } from "@/components/primitives";
import ProductosClient from "./ProductosClient";
import { fetchProducts, fetchCategories, fetchProductCarouselImages } from "@/lib/api";
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
  // 3. Obtenemos imágenes del carrusel
  const [gridProducts, categories, carouselImages] = await Promise.all([
    fetchProducts(categorySlug),
    fetchCategories(),
    fetchProductCarouselImages(),
  ]);

  return (
    <section className="max-w-screen-2xl mx-auto px-4 pb-12">
      {/* 1. Carrusel Superior */}
      <ProductCarousel images={carouselImages} />

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* 2. Sidebar Izquierdo */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <CategorySidebar categories={categories} />
        </aside>

        {/* 3. Grid de Productos (Cliente: Maneja Modal y Deep Linking) */}
        <ProductosClient
          gridProducts={gridProducts}
          categories={categories}
          categorySlug={categorySlug}
        />
      </div>
    </section>
  );
}
