"use client";
import {
  Navbar as HNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { WhatsAppIcon, Logo } from "@/components/icons";
import { useScrolled } from "@/components/useScrolled"; // hook del scroll
import Image from "next/image";

export const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <HNavbar
      position="static" // header ya es fixed en layout
      className={clsx(
        "transition-colors duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
      maxWidth="xl"
    >
      {/* ——— Brand ——— */}
      <NavbarBrand as="li" className="gap-2">
        <NextLink href="/" className="flex items-center">
          {/* <Logo className="w-8 h-8 text-primary-600" /> */}
          <Image
            src="/logoVivatechGrande.png" 
            alt="Vivatech, tecnología para el campo"
            width={140} // ajusta según se vea bien
            height={40}
            priority
          />
        </NextLink>
      </NavbarBrand>

      {/* ——— Desktop nav ——— */}
      <NavbarContent className="hidden lg:flex gap-6 ml-6" justify="start">
        {siteConfig.navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <NavbarItem key={item.href} className="relative">
              <NextLink
                href={item.href}
                className={clsx(
                  "text-ms font-bold transition-colors",
                  active ? "text-primary-400" : "text-foreground/80"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary-400"
                  />
                )}
              </NextLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* ——— Right actions ——— */}
      <NavbarContent justify="end" className="hidden sm:flex gap-4">
        {/* WhatsApp */}
        {/* <Link
          isExternal
          aria-label="WhatsApp"
          href="https://wa.me/57XXXXXXXXX"
          className="text-primary-600 hover:text-primary-700"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </Link> */}
        <ThemeSwitch />

        {/* CTA */}
        <Button
          as={Link}
          href="/contact"
          color="primary"
          radius="full"
          className="px-6"
        >
          Cotizar
        </Button>
      </NavbarContent>

      {/* ——— Mobile toggles ——— */}
      <NavbarContent className="sm:hidden gap-3" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* ——— Mobile menu ——— */}
      <NavbarMenu>
        <div className="flex flex-col mt-4 gap-3">
          {siteConfig.navItems.map((item) => (
            <NavbarMenuItem key={item.href}>
              <Link
                href={item.href}
                size="lg"
                className="w-full"
                color={pathname === item.href ? "primary" : "foreground"}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* CTA al fondo */}
          <Button
            as={Link}
            href="/contacto"
            color="primary"
            className="mt-4"
            fullWidth
          >
            Cotizar ahora
          </Button>
        </div>
      </NavbarMenu>
    </HNavbar>
  );
};
