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

  // Fix Robusto: Reemplazar SIEMPRE (cliente y servidor) la URL interna
  // para que las imágenes sean accesibles desde el navegador.
  return JSON.parse(
    text.replace(/http:\/\/api-vivatech:8000/g, "http://localhost:8000")
  ) as T;
};

/* -------------------------  Productos  ------------------------------- */
export const fetchProducts = (categorySlug?: string) => {
  let url = `${INTERNAL_API}/productos/`;
  if (categorySlug) {
    url += `?category=${categorySlug}`;
  }
  return fetch(url, { cache: "no-store" }).then(r => toJSON<Product[]>(r));
};

export const fetchCategories = () =>
  fetch(`${INTERNAL_API}/categorias/`, { cache: "no-store" })
    .then(r => toJSON<Category[]>(r));

/* -------------------------  Blog  ----------------------------------- */
export const fetchPosts = () =>
  fetch(`${INTERNAL_API}/blog/posts/`, { cache: "no-store" })
    .then(toJSON<BlogPost[]>);

export const fetchPost = (slug: string) =>
  fetch(`${INTERNAL_API}/blog/posts/?slug=${slug}`)
    .then(r => r.json())
    .then((data: BlogPost[]) => data[0] ?? null);

export const fetchBlogSidebarImages = () =>
  fetch(`${INTERNAL_API}/blog/sidebar-images/?is_active=true`, { cache: "no-store" })
    .then(toJSON<import("@/types/api").BlogSidebarImage[]>);

/* -------------------------  FAQs  ----------------------------------- */
export const fetchFaqs = () =>
  fetch(`${INTERNAL_API}/faqs/`, { cache: "no-store" })
    .then(toJSON<Faq[]>);

/* -------------------------  Clientes  ------------------------------- */
export const fetchClients = () =>
  fetch(`${INTERNAL_API}/clientes/`, { cache: "no-store" })
    .then(toJSON<Client[]>);
