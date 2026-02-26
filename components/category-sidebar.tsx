"use client";

import type { Category } from "@/types/api";

import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export const CategorySidebar = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleSelect = (key: string) => {
    // Si se selecciona "todos" (key="all"), quitamos el param
    if (key === "all") {
      router.push("/productos");

      return;
    }
    router.push(`/productos?category=${key}`);
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0 p-4 bg-default-50 rounded-xl h-fit sticky top-24">
      <h3 className="font-bold text-lg mb-4 px-2">Categorías</h3>
      <div className="flex flex-col gap-1">
        <button
          className={clsx(
            "text-left px-4 py-2 rounded-lg transition-colors text-sm",
            !currentCategory
              ? "bg-primary text-white font-semibold"
              : "hover:bg-default-200 text-default-600",
          )}
          onClick={() => handleSelect("all")}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={clsx(
              "text-left px-4 py-2 rounded-lg transition-colors text-sm",
              currentCategory === cat.slug
                ? "bg-primary text-white font-semibold"
                : "hover:bg-default-200 text-default-600",
            )}
            onClick={() => handleSelect(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
