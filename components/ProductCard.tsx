"use client";
import {
  Card,
  CardFooter,
  Button,
} from "@heroui/react";
import type { Product } from "@/types/api";


export default function ProductCard({ product, onOpen }: { product: Product, onOpen: (p: Product) => void }) {
  const coverSrc = product.cover ?? "/placeholder.jpg";

  return (
    <>
      {/* ------------ CARD ------------- */}
      <Card radius="lg" isFooterBlurred className="border-none w-full max-w-[350px]">
        <img
          src={coverSrc}
          alt={product.name}
          className="h-60 w-full object-cover rounded-t-lg"
        />

        <CardFooter className="absolute bottom-1 ml-1 w-[calc(100%_-_8px)]
                               rounded-large border-1 border-white/20
                               before:bg-white/10 py-1 shadow-small
                               overflow-hidden z-10 justify-between">
          <p className="text-black font-medium truncate">{product.name}</p>
          <Button size="sm" radius="lg" color="primary" onPress={() => onOpen(product)}>
            Ver más
          </Button>
        </CardFooter>
      </Card>

      {/* ------------ MODAL (Nuevo) ------------- */}
    </>
  );
}
