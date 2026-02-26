import type { Metadata } from "next";

import ProductosClient from "./ProductosClient";

import {
  fetchProducts,
  fetchCategories,
  fetchProductCarouselImages,
} from "@/lib/api";
import { CategorySidebar } from "@/components/category-sidebar";
import { ProductCarousel } from "@/components/product-carousel";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vivatech.com.co"
).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Productos – Vivatech",
  description:
    "Explora el catálogo de maquinaria agrícola Vivatech: equipos para optimizar tu productividad en el campo.",
  alternates: {
    canonical: `${SITE_URL}/productos`,
  },
  openGraph: {
    title: "Productos – Vivatech",
    description:
      "Catálogo de maquinaria agrícola Vivatech con categorías y productos actualizados.",
    type: "website",
    url: `${SITE_URL}/productos`,
  },
};
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

  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Productos Vivatech",
    description:
      "Catálogo de maquinaria agrícola y tecnología para el campo de Vivatech.",
    url: `${SITE_URL}/productos`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: gridProducts.slice(0, 24).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}/productos/${encodeURIComponent(product.slug)}`,
      })),
    },
  };

  return (
    <section className="max-w-screen-2xl mx-auto px-4 pb-12">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
        type="application/ld+json"
      />

      {/* 1. Carrusel Superior */}
      <ProductCarousel images={carouselImages} />

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* 2. Sidebar Izquierdo */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <CategorySidebar categories={categories} />
        </aside>

        {/* 3. Grid de Productos (Cliente: Maneja Modal y Deep Linking) */}
        <ProductosClient
          categories={categories}
          categorySlug={categorySlug}
          gridProducts={gridProducts}
        />
      </div>
    </section>
  );
}
