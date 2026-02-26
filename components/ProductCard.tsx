"use client";
import type { Product } from "@/types/api";

import { Button } from "@heroui/button";
import Link from "next/link";

import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const coverSrc = product.cover ?? "/placeholder.jpg";

  return (
    <div className="group relative w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-primary/30 hover:shadow-[0_14px_34px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_38px_rgba(0,0,0,0.45)] transition-all duration-300 overflow-hidden">
      {/* Container de Imagen 3:4 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white p-4 flex items-center justify-center">
        <img
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          src={coverSrc}
        />
        {/* Overlay en Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <Button
            className="font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            color="primary"
            radius="full"
            variant="solid"
            onPress={() => onOpen(product)}
          >
            Ver más
          </Button>
          <Button
            as="a"
            className="bg-white/90 text-black font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, estoy interesado en el producto: ${product.name}. Me gustaría recibir más información.`)}`}
            radius="full"
            rel="noopener noreferrer"
            target="_blank"
            variant="faded"
          >
            Cotizar
          </Button>
        </div>
      </div>

      {/* Info Product */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-gray-100 line-clamp-2">
          <Link
            className="hover:text-primary transition-colors"
            href={`/productos/${product.slug}`}
          >
            {product.name}
          </Link>
        </h3>

        {!product.hide_price && (
          <p className="text-xl font-bold text-primary mt-1">
            ${parseFloat(product.price).toLocaleString("es-CO")}
          </p>
        )}
      </div>
    </div>
  );
}
