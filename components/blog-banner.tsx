"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@heroui/react";

import { BlogSidebarImage } from "@/types/api";

interface BlogBannerProps {
  images: BlogSidebarImage[];
}

export const BlogBanner = ({ images }: BlogBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Cambio cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-48 md:h-80 relative overflow-hidden rounded-2xl shadow-lg mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          animate={{ opacity: 1 }}
          className="absolute inset-0 w-full h-full bg-black/20"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            removeWrapper
            alt={images[currentIndex].title || "Banner del blog"}
            className="z-0 w-full h-full object-cover"
            src={images[currentIndex].image}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay for title - Style like a Hero banner */}
      {images[currentIndex].title && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-black/40 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/10 max-w-[90%] md:max-w-2xl text-center">
            <p className="text-white font-bold text-xl md:text-3xl drop-shadow-md">
              {images[currentIndex].title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
