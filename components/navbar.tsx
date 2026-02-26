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
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useScrolled } from "@/components/useScrolled";
import { ProductsDropdown } from "@/components/products-dropdown";

export const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <HNavbar
      className={clsx(
        "transition-colors duration-300 [--navbar-height:5.5rem] md:[--navbar-height:7rem]",
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/85 backdrop-blur-md shadow-md dark:shadow-black/40"
          : "bg-transparent",
      )}
      maxWidth="xl"
      position="static"
    >
      {/* ——— Brand ——— */}
      <NavbarBrand as="li" className="gap-2">
        <NextLink className="flex items-center" href="/">
          <Image
            priority
            alt="Vivatech, tecnología para el campo"
            className="h-20 md:h-24 w-auto"
            height={96}
            src="/logoVivatechGrande.png"
            width={336}
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
                className={clsx(
                  "text-sm font-bold transition-colors",
                  active
                    ? "text-primary-500 dark:text-primary-400"
                    : "text-zinc-800 dark:text-zinc-100/90 hover:text-primary-500 dark:hover:text-primary-400",
                )}
                href={item.href}
              >
                {item.label}
                {active && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary-400"
                    layoutId="underline"
                  />
                )}
              </NextLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* ——— Right actions ——— */}
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <ThemeSwitch />
        <Button
          as={Link}
          className="px-6"
          color="primary"
          href="/contact"
          radius="full"
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
                className="w-full"
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <Button
            fullWidth
            as={Link}
            className="mt-4"
            color="primary"
            href="/contacto"
          >
            Cotizar ahora
          </Button>
        </div>
      </NavbarMenu>
    </HNavbar>
  );
};
