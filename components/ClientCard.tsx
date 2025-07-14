"use client";

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
import type { Client } from "@/types/api";
import MapEmbed from "@/components/MapEmbed";

export default function ClientCard({ client }: { client: Client }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* ───────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ───── Tarjeta resumen ───── */}
      <Card
        isPressable
        radius="lg"
        shadow="sm"
        onPress={onOpen}
        className="w-full cursor-pointer"
        aria-label={`Caso de éxito: ${client.name}`}
      >
        <CardBody className="flex items-center gap-4 py-3">
          <Avatar
            src={client.logo || undefined}
            name={client.name}
            size="lg"
            radius="lg"
            className="shrink-0"
          />

          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{client.name}</p>

            {client.location && (
              <p className="flex items-center gap-1 text-sm text-default-500 truncate">
                <MapPinIcon size={16} className="shrink-0" />
                {client.location}
              </p>
            )}
          </div>
        </CardBody>
      </Card>

      {/* ───── Drawer detalle ───── */}
      <Drawer isOpen={isOpen} onClose={onClose} size="lg">
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex-col gap-2 pb-0">
                <h2 className="text-xl font-semibold">{client.name}</h2>

                {client.location && (
                  <div className="flex items-center gap-1 text-xs text-default-500">
                    <MapPinIcon size={14} className="shrink-0" />
                    {client.location}
                  </div>
                )}
              </DrawerHeader>

              <DrawerBody className="space-y-6 px-6 pb-8 max-h-[80vh] overflow-y-auto">
                {/* portada */}
                {client.cover && (
                  <Image
                    src={client.cover}
                    alt={`Portada de ${client.name}`}
                    width={900}
                    height={500}
                    className="w-full aspect-[16/9] rounded-lg object-cover"
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
                          src={img.image}
                          alt={img.alt || `Imagen ${img.id}`}
                          width={400}
                          height={225}
                          className="w-full aspect-[16/9] rounded-lg object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                )}

                {/* mapa estático */}

                {client.latitude && client.longitude && (
                  <MapEmbed
                    lat={parseFloat(client.latitude)}
                    lng={parseFloat(client.longitude)}
                    className="rounded-lg"
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
