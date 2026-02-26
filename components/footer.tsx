import { Link } from "@heroui/link";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  ChevronRightIcon,
} from "lucide-react"; // usa lucide-react (ya instalada por HeroUI)

export const Footer = () => {
  const nav = [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    { label: "Clientes", href: "/clients" },
    { label: "FAQs", href: "/faqs" },
    { label: "Blog", href: "/blog" },
    { label: "Contáctanos", href: "/contact" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-primary-400 pt-16 pb-6">
      <div className="container mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-3">
        {/* ---- Menú ---- */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Menú</h4>
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  className="flex items-center gap-1 hover:text-primary-300"
                  href={item.href}
                >
                  <ChevronRightIcon size={16} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Síguenos ---- */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <ul className="space-y-4">
            <li>
              <Link
                isExternal
                className="inline-flex items-center gap-2 hover:text-blue-400"
                href="https://facebook.com/vivatech"
              >
                <FacebookIcon size={20} /> Vivatech
              </Link>
            </li>
            <li>
              <Link
                isExternal
                className="inline-flex items-center gap-2 hover:text-pink-400"
                href="https://instagram.com/vivatech_colombia"
              >
                <InstagramIcon size={20} /> vivatech_colombia
              </Link>
            </li>
            <li>
              <Link
                isExternal
                className="inline-flex items-center gap-2 hover:text-red-500"
                href="https://youtube.com/@vivatech"
              >
                <YoutubeIcon size={20} /> Vivatech: tecnología para el campo
              </Link>
            </li>
          </ul>
        </div>

        {/* ---- Contacto ---- */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contacto</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-1" size={20} />
              <span>
                Carrera 3C #26-18 Sur
                <br />
                Urbanización Niza, Pitalito – Huila
              </span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon size={20} />
              322 827 1786
            </li>
            <li className="flex items-center gap-2">
              <MailIcon size={20} />
              ventas@vivatech.com.co
            </li>
          </ul>
        </div>
      </div>

      {/* ---- Línea inferior ---- */}
      <div className="border-t border-primary-700 mt-10 pt-4 text-sm text-center px-6">
        © {year} Vivatech •{" "}
        <Link className="hover:text-primary-300" href="/politica-privacidad">
          Política de privacidad
        </Link>
      </div>

      {/* ---- WhatsApp flotante ---- */}
      <Link
        isExternal
        aria-label="Chat por WhatsApp"
        className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 md:right-6 z-[60]"
        href="https://wa.me/573228271786"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-md scale-110 transition-transform duration-300 group-hover:scale-125" />
        <span className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#2EEA7A] to-[#1EA952] ring-4 ring-white/95 dark:ring-zinc-900/80 shadow-[0_14px_34px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_18px_40px_rgba(37,211,102,0.6)]">
          <svg
            aria-hidden
            className="h-9 w-9 md:h-10 md:w-10 text-white"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M16 2.667a13.333 13.333 0 0 0-11.4 20l-1.2 4.666 4.8-1.267A13.333 13.333 0 1 0 16 2.667Zm0 24a10.56 10.56 0 0 1-5.6-1.6l-.4-.267-2.933.8.8-2.933-.267-.4A10.667 10.667 0 1 1 26.667 16 10.694 10.694 0 0 1 16 26.667Zm5.867-8.4c-.32-.16-1.893-.96-2.187-1.067s-.507-.16-.72.16-.827 1.067-1.013 1.28-.373.24-.693.08a8.704 8.704 0 0 1-2.56-1.587 9.75 9.75 0 0 1-1.813-2.24c-.187-.32 0-.493.14-.653.147-.147.32-.373.48-.56s.213-.32.32-.533a.555.555 0 0 0-.027-.56c-.08-.16-.72-1.707-.987-2.347-.26-.627-.533-.533-.72-.533h-.6a1.16 1.16 0 0 0-.827.387 3.48 3.48 0 0 0-1.12 2.56 6.053 6.053 0 0 0 1.28 3.2 13.813 13.813 0 0 0 5.12 4.64 17.485 17.485 0 0 0 1.707.627 4.094 4.094 0 0 0 1.893.12 3.274 3.274 0 0 0 2.133-1.493 2.6 2.6 0 0 0 .187-1.493c-.08-.147-.293-.24-.613-.387Z" />
          </svg>
        </span>
      </Link>
    </footer>
  );
};
