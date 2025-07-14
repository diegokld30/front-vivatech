/* lib/api.ts */
import type { Product } from "@/types/api";
import type { BlogPost } from "@/types/api";
import type { Faq } from "@/types/api";
import type { Client } from "@/types/api";

const API = process.env.NEXT_PUBLIC_API_URL!;

/* Productos */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/productos/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error cargando productos");
  return res.json();
}

/* ------------- BLOG ------------- */
export async function fetchPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API}/posts/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error cargando posts");
  return res.json();
}

export async function fetchPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API}/posts/?slug=${slug}`);
  const data = await res.json();
  return data[0] ?? null;
}

/* ---------- FAQs ---------- */
// export async function fetchFaqs(): Promise<Faq[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/faqs/`,
//     { next: { revalidate: 60 * 60 } }  // 1 h
//   );
//   if (!res.ok) throw new Error("Error al cargar FAQs");
//   return res.json();
// }

export async function fetchFaqs(): Promise<Faq[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/faqs/`,
    { cache: "no-store" }     // ← sin caché
  );
  if (!res.ok) throw new Error("Error al cargar FAQs");
  return res.json();
}

/* Clientes -------------------------------------------------------------- */

export async function fetchClients(): Promise<Client[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al cargar clientes");
  return res.json();
}
