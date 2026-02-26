/* lib/api.ts ------------------------------------------------------------*/
import type { Product, BlogPost, Faq, Client, Category } from "@/types/api";

/**
 *  ───────────────────────────────────────────────────────────────────
 *  ▸ PUBLIC_API  →  lo que usa el navegador (NEXT_PUBLIC_API_URL)
 *  ▸ INTERNAL    →  disponible durante next build / SSR
 *                  (se define como INTERNAL_API_URL en docker‑compose)
 *  Si INTERNAL_API_URL no existe, usamos la pública (útil en local).
 *  ───────────────────────────────────────────────────────────────────
 */
const PUBLIC_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const INTERNAL_API = (typeof window === "undefined" && process.env.INTERNAL_API_URL)
  ? process.env.INTERNAL_API_URL
  : PUBLIC_API;

/* Utilidad para parsear JSON con control de error */
const toJSON = async <T>(r: Response): Promise<T> => {
  if (!r.ok) throw new Error(`Fetch error → ${r.status} ${r.statusText}`);
  let text = await r.text();

  // Fix Robusto: Convertir URLs absolutas internas a relativas.
  // Reemplazamos "http://api-vivatech:8000" y "http://localhost:8000" por cadena vacía.
  // Así obtenemos "/media/imagen.jpg", que el navegador resolverá contra el dominio actual.
  const cleanText = text.replace(/https?:\/\/(api-vivatech|localhost):8000/g, "");

  try {
    return JSON.parse(cleanText) as T;
  } catch (e) {
    console.error("JSON Parse Error. Cleaned Text:", cleanText);
    throw new Error("Failed to parse JSON response");
  }
};

const safeFetch = async <T>(url: string): Promise<T> => {
  console.log(`[API] Fetching: ${url}`);
  try {
    const res = await fetch(url, { cache: "no-store" });
    return await toJSON<T>(res);
  } catch (error) {
    console.error(`[API] Error fetching ${url}:`, error);
    throw error;
  }
}

/* -------------------------  Productos  ------------------------------- */
export const fetchProducts = (categorySlug?: string) => {
  let url = `${INTERNAL_API}/productos/`;
  if (categorySlug) {
    url += `?category=${categorySlug}`;
  }
  return safeFetch<Product[]>(url);
};

export const fetchCategories = () =>
  safeFetch<Category[]>(`${INTERNAL_API}/categorias/`);

export const fetchProductCarouselImages = () =>
  safeFetch<import("@/types/api").ProductCarouselImage[]>(`${INTERNAL_API}/product-carousel-images/`);

/* -------------------------  Blog  ----------------------------------- */
export const fetchPosts = () =>
  safeFetch<BlogPost[]>(`${INTERNAL_API}/blog/posts/`);

export const fetchPost = (slug: string) =>
  fetch(`${INTERNAL_API}/blog/posts/?slug=${slug}`)
    .then(r => r.json())
    .then((data: BlogPost[]) => data[0] ?? null)
    .catch(err => { console.error("fetchPost error:", err); return null; });

export const fetchBlogSidebarImages = () =>
  safeFetch<import("@/types/api").BlogSidebarImage[]>(`${INTERNAL_API}/blog/sidebar-images/?is_active=true`);

/* -------------------------  FAQs  ----------------------------------- */
export const fetchFaqs = () =>
  safeFetch<Faq[]>(`${INTERNAL_API}/faqs/`);

/* -------------------------  Clientes  ------------------------------- */
export const fetchClients = () =>
  safeFetch<Client[]>(`${INTERNAL_API}/clientes/`);
