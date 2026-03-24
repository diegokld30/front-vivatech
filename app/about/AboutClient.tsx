"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@heroui/button";
import {
    Tractor,
    Users,
    MapPin,
    Award,
    Leaf,
    Wrench,
    ShieldCheck,
    Heart,
    Star,
    Zap,
    Globe,
    Truck,
} from "lucide-react";

import type { AboutSection } from "@/types/api";
import { WHATSAPP_NUMBER } from "@/lib/constants";

/* ── Mapa de iconos ──────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
    tractor: Tractor,
    users: Users,
    "map-pin": MapPin,
    award: Award,
    leaf: Leaf,
    wrench: Wrench,
    "shield-check": ShieldCheck,
    heart: Heart,
    star: Star,
    zap: Zap,
    globe: Globe,
    truck: Truck,
};

/* ── Formas decorativas SVG verdes (sutiles) ─────────────────────── */
function GreenShapes({ variant = 0 }: { variant?: number }) {
    const shapes = [
        <>
            <motion.div
                animate={{ rotate: 360 }}
                className="absolute -top-20 -right-20 w-60 h-60 border-[3px] border-primary-200/15 rounded-full"
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                animate={{ y: [0, -12, 0] }}
                className="absolute bottom-20 left-10 w-4 h-4 bg-primary-400/20 rounded-full"
                transition={{ duration: 4, repeat: Infinity }}
            />
        </>,
        <>
            <motion.div
                animate={{ rotate: -360 }}
                className="absolute -bottom-16 -left-16 w-52 h-52 border-[3px] border-dashed border-primary-300/10 rounded-full"
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                animate={{ y: [0, 8, 0] }}
                className="absolute top-12 right-16 w-3 h-3 bg-primary-500/15 rounded-full"
                transition={{ duration: 3.5, repeat: Infinity }}
            />
        </>,
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes[variant % shapes.length]}
        </div>
    );
}

/* ── Wrapper con animación al scroll ─────────────────────────────── */
function AnimatedSection({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.section
            ref={ref}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className={className}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
}

/* ── Counter animado ─────────────────────────────────────────────── */
function AnimatedCounter({ value }: { value: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (!inView) return;
        const match = value.match(/^([\d,.]+)(.*)$/);
        if (!match) {
            setDisplay(value);
            return;
        }
        const target = parseFloat(match[1].replace(/,/g, ""));
        const suffix = match[2];
        const duration = 2000;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(current.toLocaleString("es-CO") + suffix);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {display}
        </span>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO — full-bleed, imagen derecha, texto izquierda
   ═══════════════════════════════════════════════════════════════════ */
function HeroSection({ section }: { section: AboutSection }) {
    return (
        <AnimatedSection className="relative w-[100vw] ml-[calc(-50vw+50%)] overflow-hidden">
            <div className="relative min-h-[540px] md:min-h-[620px] flex flex-col md:flex-row">
                {/* Texto */}
                <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-28 py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white relative z-10">
                    <GreenShapes variant={0} />

                    <motion.h1
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight text-center"
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                    >
                        {section.title}
                    </motion.h1>

                    {section.subtitle && (
                        <motion.p
                            animate={{ opacity: 1, y: 0 }}
                            className="text-primary-200/90 text-lg md:text-xl mb-6 max-w-lg leading-relaxed mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        >
                            {section.subtitle}
                        </motion.p>
                    )}

                    {section.body && (
                        <motion.div
                            animate={{ opacity: 1 }}
                            className="text-primary-100/80 rich-text max-w-lg text-base leading-relaxed mx-auto"
                            dangerouslySetInnerHTML={{ __html: section.body }}
                            initial={{ opacity: 0 }}
                            transition={{ delay: 0.7, duration: 0.7 }}
                        />
                    )}
                </div>

                {/* Imagen */}
                {section.image && (
                    <div className="flex-1 relative min-h-[300px] md:min-h-0">
                        <motion.img
                            alt={section.title}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ scale: 1.06 }}
                            src={section.image}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-transparent hidden md:block" />
                    </div>
                )}
            </div>
        </AnimatedSection>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   TEXTO + IMAGEN — alternado izq/der
   ═══════════════════════════════════════════════════════════════════ */
function TextSection({
    section,
    idx,
}: {
    section: AboutSection;
    idx: number;
}) {
    const imageLeft = idx % 2 === 0;

    return (
        <AnimatedSection className="relative max-w-6xl mx-auto px-6">
            <GreenShapes variant={idx} />

            <div
                className={`grid md:grid-cols-2 gap-14 items-center ${imageLeft ? "" : "md:[direction:rtl]"
                    }`}
            >
                {section.image && (
                    <motion.div
                        className="rounded-3xl overflow-hidden shadow-lg md:[direction:ltr]"
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.01 }}
                    >
                        <img
                            alt={section.title}
                            className="w-full h-72 md:h-[400px] object-cover"
                            src={section.image}
                        />
                    </motion.div>
                )}

                <div className={`space-y-5 ${!imageLeft ? "md:[direction:ltr]" : ""}`}>
                    <div className="flex items-center gap-2">
                        <span className="h-[3px] w-10 bg-primary-500 rounded-full" />
                        <span className="h-[3px] w-5 bg-primary-300 rounded-full" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-default-900 leading-tight">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="text-primary-600 dark:text-primary-400 font-medium text-lg">
                            {section.subtitle}
                        </p>
                    )}
                    {section.body && (
                        <div
                            className="text-default-500 dark:text-default-400 rich-text leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.body }}
                        />
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   ESTADÍSTICAS — cifras animadas, centradas
   ═══════════════════════════════════════════════════════════════════ */
function StatsSection({ section }: { section: AboutSection }) {
    const count = section.stats.length;
    /* Ajustar grid: 2 cols si hay 2 o 4 items, 3 si hay 3 o 6, etc. */
    const gridCols =
        count <= 2
            ? "grid-cols-2"
            : count === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-2 md:grid-cols-4";

    return (
        <AnimatedSection className="relative w-[100vw] ml-[calc(-50vw+50%)] bg-gradient-to-b from-primary-50/80 to-white dark:from-primary-950/40 dark:to-zinc-950 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
                <GreenShapes variant={1} />

                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-default-900 tracking-tight">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="text-default-400 mt-3 text-lg max-w-xl mx-auto">
                            {section.subtitle}
                        </p>
                    )}
                </div>

                <div className={`grid ${gridCols} gap-8 max-w-4xl mx-auto`}>
                    {section.stats.map((stat, i) => {
                        const Icon = ICON_MAP[stat.icon] ?? Leaf;
                        return (
                            <motion.div
                                key={stat.id}
                                className="text-center py-8 px-4"
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-5">
                                    <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                                </div>
                                <p className="text-5xl md:text-6xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
                                    <AnimatedCounter value={stat.value} />
                                </p>
                                <p className="text-xs font-semibold text-default-400 uppercase tracking-[0.15em]">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </AnimatedSection>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   GALERÍA — con lightbox al hacer clic
   ═══════════════════════════════════════════════════════════════════ */
function GallerySection({ section }: { section: AboutSection }) {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const images = section.gallery_images;

    const close = () => setActiveIdx(null);
    const prev = () =>
        setActiveIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
    const next = () =>
        setActiveIdx((i) => (i !== null ? (i + 1) % images.length : null));

    /* Cerrar con Escape, navegar con flechas */
    useEffect(() => {
        if (activeIdx === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });

    const activeImg = activeIdx !== null ? images[activeIdx] : null;

    return (
        <AnimatedSection className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-default-900 tracking-tight">
                    {section.title}
                </h2>
                {section.subtitle && (
                    <p className="text-default-400 mt-3 text-lg">{section.subtitle}</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {images.map((img, i) => (
                    <motion.div
                        key={img.id}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        onClick={() => setActiveIdx(i)}
                    >
                        <img
                            alt={img.alt || section.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={img.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                            {img.alt && (
                                <span className="text-white text-sm font-medium">{img.alt}</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Lightbox modal ────────────────────────────────────── */}
            {activeImg && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={close}
                >
                    <motion.div
                        className="relative max-w-4xl w-full"
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Imagen */}
                        <img
                            alt={activeImg.alt || section.title}
                            className="w-full max-h-[75vh] object-contain rounded-2xl"
                            src={activeImg.image}
                        />

                        {/* Descripción */}
                        {activeImg.alt && (
                            <p className="text-white text-center text-lg md:text-xl font-medium mt-5 px-4">
                                {activeImg.alt}
                            </p>
                        )}

                        {/* Contador */}
                        <p className="text-white/50 text-center text-sm mt-2">
                            {(activeIdx ?? 0) + 1} / {images.length}
                        </p>

                        {/* Botón cerrar */}
                        <button
                            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-colors"
                            onClick={close}
                        >
                            ✕
                        </button>

                        {/* Flechas */}
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors"
                                    onClick={prev}
                                >
                                    ‹
                                </button>
                                <button
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors"
                                    onClick={next}
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatedSection>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   CTA — full-bleed
   ═══════════════════════════════════════════════════════════════════ */
function CtaSection({ section }: { section: AboutSection }) {
    return (
        <AnimatedSection className="relative w-[100vw] ml-[calc(-50vw+50%)] overflow-hidden">
            <div className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 py-20 md:py-28">
                <GreenShapes variant={0} />

                <div className="relative z-10 max-w-2xl mx-auto px-6 text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="text-primary-100/80 text-lg md:text-xl mb-8 leading-relaxed">
                            {section.subtitle}
                        </p>
                    )}
                    {section.body && (
                        <div
                            className="text-primary-100/60 mb-10 rich-text"
                            dangerouslySetInnerHTML={{ __html: section.body }}
                        />
                    )}
                    <Button
                        as="a"
                        className="shadow-xl px-10 text-base font-bold bg-white text-primary-700 hover:bg-primary-50"
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero saber más sobre Vivatech.")}`}
                        radius="full"
                        rel="noopener noreferrer"
                        size="lg"
                        target="_blank"
                    >
                        Escríbenos por WhatsApp
                    </Button>
                </div>
            </div>
        </AnimatedSection>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════════ */
interface Props {
    sections: AboutSection[];
}

export default function AboutClient({ sections }: Props) {
    if (sections.length === 0) {
        return (
            <div className="text-center py-24">
                <Leaf className="w-10 h-10 text-primary-300 mx-auto mb-4" />
                <p className="text-default-400 text-lg">
                    Pronto habrá contenido aquí. ¡Vuelve pronto!
                </p>
            </div>
        );
    }

    const renderers: Record<
        string,
        (s: AboutSection, i: number) => React.ReactNode
    > = {
        hero: (s) => <HeroSection key={s.id} section={s} />,
        text: (s, i) => <TextSection key={s.id} idx={i} section={s} />,
        stats: (s) => <StatsSection key={s.id} section={s} />,
        gallery: (s) => <GallerySection key={s.id} section={s} />,
        cta: (s) => <CtaSection key={s.id} section={s} />,
    };

    return (
        <div className="space-y-20 md:space-y-28 pb-10">
            {sections.map((section, i) => (
                <div key={section.id}>
                    {renderers[section.section_type]?.(section, i)}
                </div>
            ))}
        </div>
    );
}
