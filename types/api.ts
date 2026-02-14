// types/api.ts
/* ---------- PRODUCT ---------- */
export interface ProductImage {
  id: number;
  image: string;          // URL absoluta que devuelve DRF
  alt: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category?: Category;    // puede venir null
  cover: string | null;   // portada puede ser null
  short_desc: string;
  description: string;
  price: string;          // llega como string desde la API
  gallery: ProductImage[]; // siempre array (vacío si no hay fotos)
  video_url?: string;
  specifications?: Record<string, string>;
}
/* ---------- BLOG ---------- */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;        // HTML o Markdown renderizado por DRF
  cover_image: string | null;
  published_at: string;   // ISO string
}

export interface BlogSidebarImage {
  id: number;
  title: string;
  image: string;
  is_active: boolean;
}
/* ---------- FAQs ---------- */
export interface Faq {
  id: number;
  question: string;
  answer: string;
}


/* --- CLIENTES ----------------------------------------------------------- */

export interface ClientImage {
  id: number;
  image: string;
  alt: string | null;
}

export interface Client {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  cover: string | null;
  testimonial: string;
  location: string;
  latitude: string | null;
  longitude: string | null;
  gallery: ClientImage[];
}
