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
import { Product } from "@/types/api";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/api";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const ProductsDropdown = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const pathname = usePathname();
    const isActive = pathname.startsWith("/productos");

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch((err) => console.error("Error cargando productos:", err));
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
                aria-label="Productos"
                className="w-[340px]"
                itemClasses={{ base: "gap-4" }}
            >
                <DropdownSection title="Destacados" showDivider>
                    {products.length > 0 ? (
                        // @ts-ignore
                        products.slice(0, 5).map((p) => (
                            <DropdownItem
                                key={p.id}
                                description={p.short_desc?.slice(0, 50) + "..."}
                                href={`/productos/${p.slug}`}
                            >
                                {p.name}
                            </DropdownItem>
                        ))
                    ) : (
                        <DropdownItem key="loading" isReadOnly>
                            Cargando productos...
                        </DropdownItem>
                    )}
                </DropdownSection>

                <DropdownSection title="Más opciones">
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
