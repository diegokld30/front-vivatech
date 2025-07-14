"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
} from "@heroui/react";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

const WHATSAPP_NUMBER = "573228271786"; // sin + ni espacios

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
      <Card shadow="lg">
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="name"
              label="Nombre"
              placeholder="Tu nombre completo"
              value={form.name}
              onChange={handleChange}
              isRequired
            />
            <Input
              name="email"
              label="Correo"
              type="email"
              placeholder="usuario@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              isRequired
            />
            <Input
              name="phone"
              label="Teléfono"
              type="tel"
              placeholder="3xx xxx xxxx"
              value={form.phone}
              onChange={handleChange}
            />
            <Textarea
              name="message"
              label="Mensaje"
              placeholder="Cuéntanos qué equipo necesitas…"
              minRows={4}
              value={form.message}
              onChange={handleChange}
              isRequired
            />

            <Button color="primary" fullWidth type="submit">
              Enviar por WhatsApp
            </Button>
          </form>
        </CardBody>
      </Card>

      {/* ---------- Datos + mapa ---------- */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Oficina principal</h2>
          <p className="flex items-start gap-2">
            <MapPinIcon size={20} className="mt-1" />
            Carrera 3C #26-18 Sur<br />
            Urbanización Niza, Pitalito – Huila
          </p>
          <p className="flex items-center gap-2">
            <PhoneIcon size={20} /> 322 827 1786 
          </p>
          <p className="flex items-center gap-2">
            <MailIcon size={20} /> ventas@vivatech.com.co
          </p>
        </div>

        <iframe
          title="Ubicación Vivatech"
          loading="lazy"
          className="w-full h-56 rounded-xl border-none"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d316.2504121569205!2d-76.070617515073!3d1.8485303033412692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sco!4v1751665211399!5m2!1ses!2sco"
        />
      </div>
    </div>
  );
}
