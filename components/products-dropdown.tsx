"use client";

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
    Button
} from "@heroui/react";
import { ChevronDownIcon } from "@/components/icons";
import { Category } from "@/types/api";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/lib/api";
import clsx from "clsx";
import { usePathname } from "next/navigation";

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
                        "p-0 bg-transparent data-[hover=true]:bg-transparent text-ms font-bold transition-colors min-w-0 h-auto",
                        isActive ? "text-primary-400" : "text-foreground/80"
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
                <DropdownSection title="Categorías" showDivider>
                    {categories.length > 0 ? (
                        categories.map((c) => (
                            <DropdownItem
                                key={c.id}
                                href={`/productos?category=${c.slug}`}
                            >
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
                        href="/productos"
                        className="font-bold text-primary"
                    >
                        Ver todos los productos
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};
