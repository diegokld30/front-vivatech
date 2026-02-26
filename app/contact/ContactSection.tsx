"use client";

import { useState } from "react";
import { Card, CardBody, Input, Textarea, Button } from "@heroui/react";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

import { WHATSAPP_NUMBER } from "@/lib/constants";

const BOGOTA_MAP_URL = "https://www.google.com/maps?q=4.615336,-74.083122";
const CALI_MAP_URL = "https://www.google.com/maps?q=3.440828,-76.463600";
const PITALITO_MAP_URL =
  "https://www.google.com/maps?q=1.8485303033412692,-76.070617515073";

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
            {/* Bogotá */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="text-default-400" size={18} />
                <a
                  className="font-semibold text-default-700 hover:text-primary hover:underline underline-offset-4"
                  href={BOGOTA_MAP_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Bogotá
                </a>
              </div>
              <p className="text-sm text-default-500 pl-7">
                Carrera 22 #19-37 Paloquemao.
              </p>
            </div>

            {/* Cali */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="text-default-400" size={18} />
                <a
                  className="font-semibold text-default-700 hover:text-primary hover:underline underline-offset-4"
                  href={CALI_MAP_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Cali
                </a>
              </div>
              <p className="text-sm text-default-500 pl-7">
                Condominio Industrial la Nubia 1. Bodega 64, 1.5 km después del
                puente de Juanchito via Cavasa.
              </p>
            </div>
          </div>
        </div>

        {/* Sede Principal */}
        <div className="pt-4 border-t border-default-200 space-y-4">
          <h2 className="font-bold text-xl text-primary-700">
            <a
              className="hover:underline underline-offset-4"
              href={PITALITO_MAP_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Sede Principal: Pitalito
            </a>
          </h2>
          <p className="flex items-start gap-2 text-default-600">
            <MapPinIcon
              className="mt-1 flex-shrink-0 text-primary-500"
              size={20}
            />
            <span>
              Carrera 3C #26-18 Sur
              <br />
              Urbanización Niza, Pitalito – Huila
            </span>
          </p>
          <p className="flex items-center gap-2 text-default-600">
            <PhoneIcon className="text-primary-500" size={20} /> 322 827 1786
          </p>
          <p className="flex items-center gap-2 text-default-600">
            <MailIcon className="text-primary-500" size={20} />{" "}
            ventas@vivatech.com.co
          </p>

          <iframe
            className="w-full h-48 rounded-xl border border-default-200 shadow-sm"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d316.2504121569205!2d-76.070617515073!3d1.8485303033412692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sco!4v1751665211399!5m2!1ses!2sco"
            title="Ubicación Vivatech Pitalito"
          />
        </div>
      </div>
    </div>
  );
}
