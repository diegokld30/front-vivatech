import type { MetadataRoute } from "next";

export const revalidate = 21600; // 6 horas
export const dynamic = "force-dynamic";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vivatech.com.co"
).replace(/\/$/, "");

const API_BASE = (
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000/api"
).replace(/\/$/, "");

type CategorySEO = {
  slug: string;
};

type ProductSEO = {
  slug: string;
  created_at?: string;
};

async function fetchCollection<T>(path: string): Promise<T[]> {
  try {
    const response = await fetch(`${API_BASE}/${path}/`, {
      next: { revalidate: 21600 },
    });

    if (!response.ok) return [];
    const data = (await response.json()) as T[];

    return Array.isArray(data) ? data : [];
  } catch {
    // Durante docker build el backend puede no estar disponible.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    fetchCollection<CategorySEO>("categorias"),
    fetchCollection<ProductSEO>("productos"),
  ]);

  const productIndex: MetadataRoute.Sitemap = products.map((product) => ({
    changeFrequency: "weekly",
    lastModified: product.created_at
      ? new Date(product.created_at)
      : new Date(),
    priority: 0.75,
    url: `${SITE_URL}/productos/${encodeURIComponent(product.slug)}`,
  }));

  const categoryIndex: MetadataRoute.Sitemap = categories.map((category) => ({
    changeFrequency: "daily",
    priority: 0.85,
    url: `${SITE_URL}/productos?category=${encodeURIComponent(category.slug)}`,
  }));

  return [
    {
      changeFrequency: "daily",
      priority: 0.95,
      url: `${SITE_URL}/productos`,
    },
    ...categoryIndex,
    ...productIndex,
  ];
}
