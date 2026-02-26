import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // opcional, funciona en node y edge

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vivatech.com.co"
).replace(/\/$/, "");

export async function GET(_req: NextRequest) {
  const lines = [
    "User-Agent: *",
    "Allow: /",
    // Evita indexar rutas administrativas / técnicas.
    "Disallow: /admin/",
    "Disallow: /api/docs/",
    "Disallow: /api/schema/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Sitemap: ${SITE_URL}/productos/sitemap.xml`,
  ].join("\n");

  return new NextResponse(lines, {
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
  });
}
