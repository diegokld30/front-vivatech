import type { Metadata } from "next";
import type { Product } from "@/types/api";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@heroui/button";

import { fetchProductBySlug } from "@/lib/api";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vivatech.com.co"
).replace(/\/$/, "");

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado – Vivatech",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${SITE_URL}/productos/${product.slug}`;
  const description =
    product.short_desc ||
    product.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
    `Ficha técnica y detalles de ${product.name}`;

  return {
    title: `${product.name} – Productos Vivatech`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${product.name} – Vivatech`,
      description,
      images: product.cover ? [{ url: product.cover }] : undefined,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: product.cover ? [product.cover] : undefined,
      title: `${product.name} – Vivatech`,
    },
  };
}

function buildProductSchema(product: Product) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.short_desc ||
      product.description?.replace(/<[^>]*>/g, "").slice(0, 300) ||
      product.name,
    image: product.cover ? [product.cover] : [],
    sku: product.slug,
    category: product.category?.name || "Maquinaria agrícola",
    url: `${SITE_URL}/productos/${product.slug}`,
  };

  if (!product.hide_price && product.price) {
    data.offers = {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/productos/${product.slug}`,
    };
  }

  return data;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) return notFound();

  const coverSrc = product.cover || "/placeholder.jpg";
  const cleanDescription = { __html: product.description };

  return (
    <article className="max-w-6xl mx-auto px-4 pb-12">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductSchema(product)),
        }}
        type="application/ld+json"
      />

      <nav className="mb-6 text-sm text-default-500">
        <Link className="hover:underline" href="/productos">
          Productos
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-default-200 bg-white p-4 shadow-sm">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
            <Image
              fill
              alt={product.name}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={coverSrc}
            />
          </div>
        </div>

        <section className="space-y-5">
          <p className="text-sm font-semibold text-primary-600">
            {product.category?.name || "Producto"}
          </p>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          {product.short_desc ? (
            <p className="text-default-600">{product.short_desc}</p>
          ) : null}

          {!product.hide_price && product.price ? (
            <p className="text-2xl font-bold text-primary">
              {Number(product.price).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button
              as="a"
              color="primary"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, estoy interesado en el producto: ${product.name}. Quiero una cotización.`)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Cotizar por WhatsApp
            </Button>
            <Button as={Link} href="/productos" variant="bordered">
              Ver más productos
            </Button>
          </div>
        </section>
      </div>

      <section className="mt-10 space-y-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold">Descripción</h2>
          <div
            dangerouslySetInnerHTML={cleanDescription}
            className="rich-text text-default-700"
          />
        </div>

        {product.specifications &&
        Object.keys(product.specifications).length > 0 ? (
          <div>
            <h2 className="mb-3 text-2xl font-bold">
              Especificaciones técnicas
            </h2>
            <div className="overflow-hidden rounded-xl border border-default-200">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value], index) => (
                      <tr
                        key={key}
                        className={
                          index % 2 === 0 ? "bg-default-50" : "bg-white"
                        }
                      >
                        <th className="w-1/3 border-r border-default-200 px-4 py-3 text-left font-semibold">
                          {key}
                        </th>
                        <td className="px-4 py-3">{value}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </section>
    </article>
  );
}
