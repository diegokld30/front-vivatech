"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@heroui/react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { ChevronDownIcon } from "@/components/icons";
import { Category } from "@/types/api";
import { fetchCategories } from "@/lib/api";

export const ProductsDropdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const isActive = pathname.startsWith("/productos");

  useEffect(() => {
    // Obtenemos categorías en lugar de productos
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disableRipple
          className={clsx(
            "px-0 py-0 bg-transparent data-[hover=true]:bg-transparent text-sm font-bold leading-none transition-colors min-w-0 h-auto",
            isActive
              ? "text-primary-500 dark:text-primary-400"
              : "text-zinc-800 dark:text-zinc-100/90 hover:text-primary-500 dark:hover:text-primary-400",
          )}
          endContent={<ChevronDownIcon fill="currentColor" size={16} />}
          radius="sm"
          variant="light"
        >
          Productos
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Categorías de Productos"
        className="w-[340px]"
        itemClasses={{ base: "gap-4" }}
      >
        <DropdownSection showDivider title="Categorías">
          {categories.length > 0 ? (
            categories.map((c) => (
              <DropdownItem key={c.id} href={`/productos?category=${c.slug}`}>
                {c.name}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem key="loading" isReadOnly>
              Cargando categorías...
            </DropdownItem>
          )}
        </DropdownSection>

        <DropdownSection title="Opciones">
          <DropdownItem
            key="all"
            className="font-bold text-primary"
            href="/productos"
          >
            Ver todos los productos
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
