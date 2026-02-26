import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vivatech.com.co"
).replace(/\/$/, "");
const API_BASE = (
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000/api"
).replace(/\/$/, "");

type BlogPostForSitemap = {
  slug: string;
  published_at?: string | null;
};

type UrlItem = {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: string;
  lastmod?: string;
};

const ONE_DAY = 60 * 60 * 24;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

// Pide al backend slugs para generar rutas dinámicas existentes.
async function fetchBlogPosts(): Promise<BlogPostForSitemap[]> {
  const response = await fetch(`${API_BASE}/blog/posts/`, {
    next: { revalidate: ONE_DAY },
  });

  if (!response.ok) return [];
  const data = (await response.json()) as BlogPostForSitemap[];

  return Array.isArray(data) ? data : [];
}

export async function GET(_req: NextRequest) {
  const staticPages: UrlItem[] = [
    { changefreq: "weekly", loc: `${BASE_URL}/`, priority: "1.0" },
    { changefreq: "daily", loc: `${BASE_URL}/productos`, priority: "0.95" },
    { changefreq: "weekly", loc: `${BASE_URL}/clients`, priority: "0.85" },
    { changefreq: "weekly", loc: `${BASE_URL}/faqs`, priority: "0.85" },
    { changefreq: "daily", loc: `${BASE_URL}/blog`, priority: "0.9" },
    { changefreq: "monthly", loc: `${BASE_URL}/about`, priority: "0.7" },
    { changefreq: "weekly", loc: `${BASE_URL}/contact`, priority: "0.8" },
  ];

  const blogPosts = await fetchBlogPosts();

  const blogUrls: UrlItem[] = blogPosts.map((post) => ({
    changefreq: "weekly",
    lastmod: post.published_at || undefined,
    loc: `${BASE_URL}/blog/${post.slug}`,
    priority: "0.8",
  }));

  const urls: UrlItem[] = [...staticPages, ...blogUrls];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (url) => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${url.lastmod ? `<lastmod>${new Date(url.lastmod).toISOString()}</lastmod>` : ""}
  </url>`,
      )
      .join("") +
    `\n</urlset>`;

  return new NextResponse(body.trim(), {
    headers: { "Content-Type": "application/xml" },
  });
}
