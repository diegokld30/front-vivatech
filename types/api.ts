// types/api.ts
/* ---------- PRODUCT ---------- */
export interface ProductImage {
  id: number;
  image: string; // URL absoluta que devuelve DRF
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
  category?: Category; // puede venir null
  cover: string | null; // portada puede ser null
  short_desc: string;
  description: string;
  price: string; // llega como string desde la API
  gallery: ProductImage[]; // siempre array (vacío si no hay fotos)
  video_url?: string;
  specifications?: Record<string, string>;
  hide_price: boolean;
}

export interface ProductCarouselImage {
  id: number;
  title: string;
  image: string;
  link: string | null;
  is_active: boolean;
  order: number;
}
/* ---------- BLOG ---------- */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML o Markdown renderizado por DRF
  cover_image: string | null;
  published_at: string; // ISO string
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

/* --- PROYECTOS (antes Clientes) ------------------------------------ */

export interface ProjectImage {
  id: number;
  image: string;
  alt: string | null;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  cover: string | null;
  testimonial: string;
  content: string;
  video_url?: string | null;
  location: string;
  latitude: string | null;
  longitude: string | null;
  gallery: ProjectImage[];
}

export interface ProjectBanner {
  id: number;
  title: string;
  description: string;
  image: string | null;
  video_url: string | null;
  is_active: boolean;
  order: number;
  created_at: string;
}
