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
import { useScrolled } from "@/components/useScrolled";
import Image from "next/image";

import { ProductsDropdown } from "@/components/products-dropdown";

export const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <HNavbar
      position="static"
      className={clsx(
        "transition-colors duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
      maxWidth="xl"
    >
      {/* ——— Brand ——— */}
      <NavbarBrand as="li" className="gap-2">
        <NextLink href="/" className="flex items-center">
          <Image
            src="/logoVivatechGrande.png"
            alt="Vivatech, tecnología para el campo"
            width={140}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </NextLink>
      </NavbarBrand>

      {/* ——— Desktop nav ——— */}
      <NavbarContent className="hidden lg:flex gap-6 ml-6" justify="start">
        {siteConfig.navItems.map((item) => {
          // Lógica especial para "Productos" -> Dropdown
          if (item.label === "Productos") {
            return (
              <NavbarItem key={item.href}>
                <ProductsDropdown />
              </NavbarItem>
            );
          }

          // Ítems normales
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
        <ThemeSwitch />
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
          {siteConfig.navMenuItems.map((item) => (
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
