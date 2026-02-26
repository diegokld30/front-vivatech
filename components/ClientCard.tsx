"use client";

import type { Client } from "@/types/api";

import {
  Card,
  CardBody,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  useDisclosure,
} from "@heroui/react";
import { MapPinIcon } from "lucide-react";

import MapEmbed from "@/components/MapEmbed";

export default function ClientCard({ client }: { client: Client }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* ───────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ───── Tarjeta resumen ───── */}
      <Card
        isPressable
        aria-label={`Caso de éxito: ${client.name}`}
        className="w-full cursor-pointer"
        radius="lg"
        shadow="sm"
        onPress={onOpen}
      >
        <CardBody className="flex items-center gap-4 py-3">
          <Avatar
            className="shrink-0"
            name={client.name}
            radius="lg"
            size="lg"
            src={client.logo || undefined}
          />

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{client.name}</p>

            {client.location && (
              <p className="flex items-center gap-1 text-sm text-default-500 truncate">
                <MapPinIcon className="shrink-0" size={16} />
                {client.location}
              </p>
            )}
          </div>
        </CardBody>
      </Card>

      {/* ───── Drawer detalle ───── */}
      <Drawer isOpen={isOpen} size="lg" onClose={onClose}>
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex-col gap-2 pb-0">
                <h2 className="text-xl font-semibold">{client.name}</h2>

                {client.location && (
                  <div className="flex items-center gap-1 text-xs text-default-500">
                    <MapPinIcon className="shrink-0" size={14} />
                    {client.location}
                  </div>
                )}
              </DrawerHeader>

              <DrawerBody className="space-y-6 px-6 pb-8 max-h-[80vh] overflow-y-auto">
                {/* portada */}
                {client.cover && (
                  <Image
                    alt={`Portada de ${client.name}`}
                    className="w-full aspect-[16/9] rounded-lg object-cover"
                    height={500}
                    src={client.cover}
                    width={900}
                  />
                )}

                {/* testimonio */}
                {client.testimonial && (
                  <p className="whitespace-pre-line">{client.testimonial}</p>
                )}

                {/* galería */}
                {client.gallery.length > 0 && (
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {client.gallery.map((img) => (
                      <li key={img.id}>
                        <Image
                          alt={img.alt || `Imagen ${img.id}`}
                          className="w-full aspect-[16/9] rounded-lg object-cover"
                          height={225}
                          src={img.image}
                          width={400}
                        />
                      </li>
                    ))}
                  </ul>
                )}

                {/* mapa estático */}

                {client.latitude && client.longitude && (
                  <MapEmbed
                    className="rounded-lg"
                    lat={parseFloat(client.latitude)}
                    lng={parseFloat(client.longitude)}
                  />
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
