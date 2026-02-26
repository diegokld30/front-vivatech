import { NextResponse } from "next/server";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vivatech.com.co"
).replace(/\/$/, "");

export async function GET() {
  const lines = [
    "User-Agent: *",
    "Allow: /productos",
    "",
    `Sitemap: ${SITE_URL}/productos/sitemap.xml`,
  ].join("\n");

  return new NextResponse(lines, {
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
  });
}
