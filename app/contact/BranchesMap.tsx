"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

export interface BranchLocation {
  address: string;
  lat: number;
  lng: number;
  mapUrl: string;
  name: string;
  phone: string;
  whatsapp: string;
}

interface BranchesMapProps {
  branches: readonly BranchLocation[];
  className?: string;
}

const branchMarkerIcon = L.icon({
  iconAnchor: [12, 41],
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function BranchesMap({ branches, className }: BranchesMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mapRef.current;

    if (!container) return;
    if (!branches.length) return;

    // Evita el error "Map container is already initialized" en remounts.
    if ((container as { _leaflet_id?: number })._leaflet_id) {
      (container as { _leaflet_id?: number })._leaflet_id = undefined;
    }

    const map = L.map(container, { scrollWheelZoom: false, zoomControl: true });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const positions = branches.map(
      (branch) => [branch.lat, branch.lng] as [number, number],
    );

    if (positions.length === 1) {
      map.setView(positions[0], 13);
    } else {
      map.fitBounds(L.latLngBounds(positions), { maxZoom: 12, padding: [36, 36] });
    }

    branches.forEach((branch) => {
      const popup = document.createElement("div");
      const title = document.createElement("p");
      const address = document.createElement("p");
      const phoneLink = document.createElement("a");
      const directionsLink = document.createElement("a");

      popup.style.minWidth = "190px";
      popup.style.lineHeight = "1.4";

      title.textContent = branch.name;
      title.style.fontWeight = "600";
      title.style.color = "#1f2937";
      title.style.marginBottom = "8px";

      address.textContent = branch.address;
      address.style.fontSize = "14px";
      address.style.color = "#4b5563";
      address.style.marginBottom = "8px";

      phoneLink.textContent = branch.phone;
      phoneLink.href = `https://wa.me/${branch.whatsapp}`;
      phoneLink.target = "_blank";
      phoneLink.rel = "noopener noreferrer";
      phoneLink.style.display = "block";
      phoneLink.style.fontSize = "14px";
      phoneLink.style.color = "#2e7d32";
      phoneLink.style.textDecoration = "underline";
      phoneLink.style.textUnderlineOffset = "3px";
      phoneLink.style.marginBottom = "6px";

      directionsLink.textContent = "Direcciones";
      directionsLink.href = branch.mapUrl;
      directionsLink.target = "_blank";
      directionsLink.rel = "noopener noreferrer";
      directionsLink.style.display = "block";
      directionsLink.style.fontSize = "14px";
      directionsLink.style.color = "#2e7d32";
      directionsLink.style.textDecoration = "underline";
      directionsLink.style.textUnderlineOffset = "3px";

      popup.append(title, address, phoneLink, directionsLink);

      L.marker([branch.lat, branch.lng], { icon: branchMarkerIcon })
        .addTo(map)
        .bindPopup(popup);
    });

    return () => {
      map.remove();
    };
  }, [branches]);

  return <div ref={mapRef} className={className} />;
}
