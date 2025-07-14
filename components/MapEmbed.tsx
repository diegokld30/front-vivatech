"use client";
import { useMemo } from "react";

interface Props {
  lat: number;
  lng: number;
  className?: string;
}

/**
 * Pequeño <iframe> con OpenStreetMap centrado y un marcador.
 * No necesita API-key ni afecta a imágenes remotas.
 */
export default function MapEmbed({ lat, lng, className }: Props) {
  // calcula el bbox 0.01° alrededor del punto (aprox. 1,1 km)
  const { bbox, src } = useMemo(() => {
    const delta = 0.01;
    const left   = lng - delta;
    const right  = lng + delta;
    const top    = lat + delta;
    const bottom = lat - delta;

    const bboxStr = `${left},${bottom},${right},${top}`;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bboxStr}&layer=mapnik&marker=${lat},${lng}`;

    return { bbox: bboxStr, src: url };
  }, [lat, lng]);

  return (
    <div className={className}>
      <iframe
        key={bbox}               /* se recalcula si cambia la posición */
        src={src}
        className="w-full aspect-[16/9] rounded-lg border-none"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
