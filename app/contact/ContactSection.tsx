"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardBody, Input, Textarea, Button } from "@heroui/react";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { BranchLocation } from "./BranchesMap";

const BOGOTA_MAP_URL = "https://www.google.com/maps?q=4.615336,-74.083122";
const CALI_MAP_URL = "https://www.google.com/maps?q=3.440828,-76.463600";
const PITALITO_MAP_URL =
  "https://www.google.com/maps?q=1.8485303033412692,-76.070617515073";

const MAIN_BRANCH_ADDRESS_LINE_1 = "Carrera 3C #26-18 Sur";
const MAIN_BRANCH_ADDRESS_LINE_2 = "Urbanización Niza, Pitalito – Huila";

const BRANCHES: readonly BranchLocation[] = [
  {
    address: "Carrera 22 #19-37 Paloquemao.",
    lat: 4.615336,
    lng: -74.083122,
    mapUrl: BOGOTA_MAP_URL,
    name: "Bogotá",
    phone: "313 818 2482",
    whatsapp: "573138182482",
  },
  {
    address:
      "Condominio Industrial la Nubia 1. Bodega 64, 1.5 km después del puente de Juanchito vía Cavasa.",
    lat: 3.440828,
    lng: -76.4636,
    mapUrl: CALI_MAP_URL,
    name: "Cali",
    phone: "320 490 4898",
    whatsapp: "573204904898",
  },
] as const;

const MAIN_BRANCH: BranchLocation = {
  address: `${MAIN_BRANCH_ADDRESS_LINE_1}, ${MAIN_BRANCH_ADDRESS_LINE_2}`,
  lat: 1.8485303033412692,
  lng: -76.070617515073,
  mapUrl: PITALITO_MAP_URL,
  name: "Sede Principal: Pitalito",
  phone: "322 827 1786",
  whatsapp: "573228271786",
};

const MAP_BRANCHES: readonly BranchLocation[] = [...BRANCHES, MAIN_BRANCH];

const BranchesMap = dynamic(() => import("./BranchesMap"), {
  loading: () => (
    <div className="h-64 md:h-72 rounded-xl border border-default-200 bg-default-100 animate-pulse" />
  ),
  ssr: false,
});

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ------- helpers ------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construye mensaje — líneas se unen con \n
    const msgLines = [
      `Hola, soy ${form.name}`,
      `Correo: ${form.email}`,
      form.phone && `Teléfono: ${form.phone}`,
      `Mensaje: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    // URL encode completo
    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(msgLines)}`;

    window.open(url, "_blank");
  };

  /* ------- render ------- */
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {/* ---------- Formulario ---------- */}
      <Card className="h-full" shadow="lg">
        <CardBody className="h-full">
          <form className="h-full flex flex-col" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Input
                isRequired
                label="Nombre"
                name="name"
                placeholder="Tu nombre completo"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                isRequired
                label="Correo"
                name="email"
                placeholder="usuario@ejemplo.com"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                label="Teléfono"
                name="phone"
                placeholder="3xx xxx xxxx"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
              <Textarea
                isRequired
                label="Mensaje"
                minRows={4}
                name="message"
                placeholder="Cuéntanos qué equipo necesitas…"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <div className="mt-auto pt-6 flex justify-center">
              <Button
                className="w-full max-w-md h-12 text-base font-semibold"
                color="primary"
                type="submit"
              >
                Enviar por WhatsApp
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* ---------- Datos + mapa ---------- */}
      <div className="space-y-8">
        {/* Sucursales */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-default-800 mb-4">
            Nuestras sucursales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BRANCHES.map((branch) => (
              <div key={branch.name} className="space-y-3">
                <p className="flex items-start gap-2 text-default-600">
                  <MapPinIcon
                    className="mt-1 flex-shrink-0 text-primary-500"
                    size={20}
                  />
                  <span>
                    <a
                      className="font-semibold text-default-700 hover:text-primary hover:underline underline-offset-4"
                      href={branch.mapUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {branch.name}
                    </a>
                    <br />
                    {branch.address}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-default-600">
                  <PhoneIcon className="text-primary-500" size={20} />
                  <a
                    className="hover:text-primary hover:underline underline-offset-4"
                    href={`https://wa.me/${branch.whatsapp}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {branch.phone}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sede Principal */}
        <div className="pt-4 border-t border-default-200 space-y-4">
          <h2 className="font-bold text-xl text-primary-700">
            <a
              className="hover:underline underline-offset-4"
              href={MAIN_BRANCH.mapUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {MAIN_BRANCH.name}
            </a>
          </h2>
          <p className="flex items-start gap-2 text-default-600">
            <MapPinIcon
              className="mt-1 flex-shrink-0 text-primary-500"
              size={20}
            />
            <span>
              {MAIN_BRANCH_ADDRESS_LINE_1}
              <br />
              {MAIN_BRANCH_ADDRESS_LINE_2}
            </span>
          </p>
          <p className="flex items-center gap-2 text-default-600">
            <PhoneIcon className="text-primary-500" size={20} />
            <a
              className="hover:text-primary hover:underline underline-offset-4"
              href={`https://wa.me/${MAIN_BRANCH.whatsapp}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {MAIN_BRANCH.phone}
            </a>
          </p>
          <p className="flex items-center gap-2 text-default-600">
            <MailIcon className="text-primary-500" size={20} />{" "}
            ventas@vivatech.com.co
          </p>

          <BranchesMap
            branches={MAP_BRANCHES}
            className="w-full h-64 md:h-72 rounded-xl border border-default-200 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
