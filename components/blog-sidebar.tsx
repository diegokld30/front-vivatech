"use client";

import { useEffect, useState } from "react";
import { BlogSidebarImage } from "@/types/api";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@heroui/react";

interface BlogSidebarProps {
    images: BlogSidebarImage[];
}

export const BlogSidebar = ({ images }: BlogSidebarProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Cambio cada 5 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) {
        return (
            <div className="w-full h-96 bg-default-100 rounded-xl flex items-center justify-center text-default-400">
                <p>Sin imágenes</p>
            </div>
        );
    }

    return (
        <div className="w-full md:w-80 lg:w-96 flex-shrink-0 space-y-6 sticky top-24 h-[calc(100vh-6rem)]">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white relative h-full w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            removeWrapper
                            alt={images[currentIndex].title || "Imagen del blog"}
                            className="z-0 w-full h-full object-cover"
                            src={images[currentIndex].image}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Overlay opcional para texto si se desea */}
                {images[currentIndex].title && (
                    <div className="absolute bottom-0 z-10 w-full bg-black/50 p-4">
                        <p className="text-white font-bold text-center">
                            {images[currentIndex].title}
                        </p>
                    </div>
                )}
            </div>

            {/* Aquí podrías agregar más widgets al sidebar si fuera necesario (tags, categorías, etc) */}
        </div>
    );
};
