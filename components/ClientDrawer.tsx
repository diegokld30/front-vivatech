// components/ClientDrawer.tsx
"use client";

import type { Client } from "@/types/api";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Image,
  Button,
} from "@heroui/react";

export default function ClientDrawer({
  client,
  open,
  onClose,
}: {
  client: Client;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer isOpen={open} size="xl" onClose={onClose}>
      <DrawerContent>
        {(close) => (
          <>
            <DrawerHeader>{client.name}</DrawerHeader>

            <DrawerBody className="space-y-6 overflow-y-auto">
              {!!client.gallery.length && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {client.gallery.map((img) => (
                    <Image
                      key={img.id}
                      alt={img.alt ?? client.name}
                      className="aspect-video object-cover rounded-lg"
                      height={400}
                      src={img.image}
                      width={600}
                    />
                  ))}
                </div>
              )}

              <p className="whitespace-pre-line">{client.testimonial}</p>
            </DrawerBody>

            <DrawerFooter>
              <Button color="danger" variant="light" onPress={close}>
                Cerrar
              </Button>
              <Button as="a" color="primary" href="/contact">
                Cotizar
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
