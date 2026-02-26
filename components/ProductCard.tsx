"use client";
import { Button } from "@heroui/button";
import type { Product } from "@/types/api";
import { WHATSAPP_NUMBER } from "@/lib/constants";


export default function ProductCard({ product, onOpen }: { product: Product, onOpen: (p: Product) => void }) {
  const coverSrc = product.cover ?? "/placeholder.jpg";

  return (
    <div className="group relative w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-transparent hover:border-primary/20 transition-all duration-300 overflow-hidden">
      {/* Container de Imagen 3:4 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white p-4 flex items-center justify-center">
        <img
          src={coverSrc}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay en Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          <Button
            radius="full"
            variant="solid"
            color="primary"
            className="font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            onPress={() => onOpen(product)}
          >
            Ver más
          </Button>
          <Button
            as="a"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, estoy interesado en el producto: ${product.name}. Me gustaría recibir más información.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            radius="full"
            variant="faded"
            className="bg-white/90 text-black font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
          >
            Cotizar
          </Button>
        </div>
      </div>

      {/* Info Product */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-gray-100 line-clamp-2">
          {product.name}
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
