import Image from "next/image";

interface Props {
  lat: number;
  lng: number;
  alt?: string;
  className?: string;
}

export default function MapStatic({
  lat,
  lng,
  alt = "Mapa",
  className,
}: Props) {
  // Zoom 15 – 600×300
  const src = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=600x300&markers=${lat},${lng},red-pushpin`;

  return (
    <Image
      key={src}
      unoptimized // ⬅️  evita el loader interno
      alt={alt}
      className={className}
      height={300}
      loader={({ src }) => src} // ⬅️  passthrough
      src={src}
      width={600}
    />
  );
}
