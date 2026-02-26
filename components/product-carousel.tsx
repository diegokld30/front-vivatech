"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import NextLink from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Asumiendo lucide-react o similar, si no usaré texto < >
import type { ProductCarouselImage } from "@/types/api";

interface ProductCarouselProps {
    images: ProductCarouselImage[];
}

export const ProductCarousel = ({ images }: ProductCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Filtrar solo imágenes activas (ya deberían venir filtradas del backend, pero por seguridad)
    const validImages = images.filter(img => img.is_active);

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000); // Autoplay cada 5s
        return () => clearInterval(timer);
    }, [currentIndex]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = validImages.length - 1;
            if (next >= validImages.length) next = 0;
            return next;
        });
    };

    if (validImages.length === 0) return null;

    const currentImage = validImages[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl mb-8 bg-gray-100 dark:bg-zinc-900 group">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="relative w-full h-full">
                        <img
                            src={currentImage.image || "/placeholder.jpg"}
                            alt={currentImage.title}
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-4 text-center">
                            {currentImage.title && (
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">{currentImage.title}</h2>
                            )}

                            {currentImage.link && (
                                <Button
                                    as={NextLink}
                                    href={currentImage.link}
                                    color="primary"
                                    radius="full"
                                    size="lg"
                                    className="font-bold shadow-lg"
                                >
                                    Más información
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Flechas de navegación */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white z-10 transition-all opacity-0 group-hover:opacity-100"
                onClick={() => paginate(-1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white z-10 transition-all opacity-0 group-hover:opacity-100"
                onClick={() => paginate(1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>

            {/* Indicadores (dots) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {validImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-6" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
