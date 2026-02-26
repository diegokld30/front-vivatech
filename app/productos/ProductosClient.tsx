"use client";

import type { Product, Category } from "@/types/api";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDisclosure } from "@heroui/react";

import ProductCard from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

interface ProductosClientProps {
  gridProducts: Product[];
  categories: Category[];
  categorySlug?: string;
}

export default function ProductosClient({
  gridProducts,
  categories,
  categorySlug,
}: ProductosClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Efecto para Deep Linking: Si hay ?product=slug, abrir modal
  useEffect(() => {
    if (productSlug) {
      // Buscar en los productos cargados (gridProducts)
      // OJO: Si el producto NO está en la categoría actual, podría no encontrarse.
      // Idealmente, `gridProducts` debería contener el producto si llegamos via lInk directo.
      // Pero si filtramos por categoría, quizás no esté.
      // Estrategia simple: Buscar en gridProducts. Si no está, no se abre (o se podría hacer fetch individual).

      const found = gridProducts.find((p) => p.slug === productSlug);

      if (found) {
        setSelectedProduct(found);
        onOpen();
      }
    } else {
      // Si no hay param, asegurar cierre si estaba abierto por URL (navegación atrás)
      if (isOpen && !selectedProduct) {
        onClose();
      }
    }
  }, [productSlug, gridProducts, onOpen]);

  // Manejar apertura manual
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
    // Actualizar URL sin recargar (shallow) para que sea compartible
    // Mantener otros params (como categoría)
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("product", product.slug);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleClose = () => {
    onClose();
    // Limpiar URL param
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("product");
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });

    // Delay para limpiar estado y evitar flash
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="flex-grow">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {categorySlug
            ? categories.find((c) => c.slug === categorySlug)?.name ||
              "Productos"
            : "Todos los productos"}
        </h1>
        <p className="text-default-500 text-sm">
          Mostrando {gridProducts.length} resultados
        </p>
      </div>

      {gridProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {gridProducts.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={handleOpenProduct} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-default-50 rounded-xl">
          <p className="text-xl text-default-500">
            No se encontraron productos en esta categoría.
          </p>
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          isOpen={isOpen}
          product={selectedProduct}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
