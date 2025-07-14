"use client";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import type { Product } from "@/types/api";

export default function ProductCard({ product }: { product: Product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const coverSrc = product.cover ?? "/placeholder.jpg";

  return (
    <>
      {/* ------------ CARD ------------- */}
      <Card radius="lg" isFooterBlurred className="border-none">
        <Image
          src={coverSrc}
          alt={product.name}
          width={640}
          height={420}
          className="h-60 w-full object-cover"
        />

        <CardFooter className="absolute bottom-1 ml-1 w-[calc(100%_-_8px)]
                               rounded-large border-1 border-white/20
                               before:bg-white/10 py-1 shadow-small
                               overflow-hidden z-10 justify-between">
          <p className="text-white font-medium truncate">{product.name}</p>
          <Button size="sm" radius="lg" color="primary" onPress={onOpen}>
            Ver más
          </Button>
        </CardFooter>
      </Card>

      {/* ------------ DRAWER ------------- */}
      <Drawer size="3xl" isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader>{product.name}</DrawerHeader>

              <DrawerBody className="space-y-6">
                {/* GALERÍA RESPONSIVA */}
                {product.gallery.length > 0 && (
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                    {product.gallery.map((img) => (
                      <Image
                        key={img.id}
                        src={img.image}
                        alt={img.alt || product.name}
                        width={400}
                        height={260}
                        className="rounded-lg h-40 w-full object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                <p>{product.short_desc}</p>
                {/* Descripción en viñetas */}
                <ul className="list-disc pl-5 space-y-1">
                  {product.description
                    .split(/\r?\n/)
                    .map(
                      (line, idx) => line.trim() && <li key={idx}>{line}</li>
                    )}
                </ul>

                <p className="font-semibold text-primary-700">
                  Precio:&nbsp;
                  {Number(product.price).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="light" color="danger" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" as="a" href="/contact">
                  Cotizar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
