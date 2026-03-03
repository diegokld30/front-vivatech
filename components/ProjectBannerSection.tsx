"use client";

import { useState } from "react";
import { Image } from "@heroui/react";
import { PlayCircle } from "lucide-react";

import type { ProjectBanner } from "@/types/api";

/* ── helpers para embed de video ─────────────────────────────────── */
function getYouTubeId(url: string): string | null {
    const m =
        url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/) ??
        url.match(/youtube\.com\/embed\/([\w-]+)/);
    return m?.[1] ?? null;
}

function getTikTokId(url: string): string | null {
    const m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    return m?.[1] ?? null;
}

function VideoEmbed({ url }: { url: string }) {
    const ytId = getYouTubeId(url);
    if (ytId) {
        return (
            <iframe
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full rounded-2xl"
                src={`https://www.youtube.com/embed/${ytId}`}
                title="Video"
            />
        );
    }

    const ttId = getTikTokId(url);
    if (ttId) {
        return (
            <iframe
                allowFullScreen
                className="w-full h-full rounded-2xl"
                src={`https://www.tiktok.com/embed/v2/${ttId}`}
                title="Video TikTok"
            />
        );
    }

    // Fallback: link genérico
    return (
        <a
            className="flex items-center justify-center gap-2 text-primary font-semibold hover:underline"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
        >
            <PlayCircle size={28} /> Ver video externo
        </a>
    );
}

/* ── Componente principal ────────────────────────────────────────── */
interface Props {
    banners: ProjectBanner[];
}

export default function ProjectBannerSection({ banners }: Props) {
    const [idx, setIdx] = useState(0);

    if (!banners.length) return null;

    const b = banners[idx];
    const hasVideo = !!b.video_url;

    return (
        <section className="mb-14">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-default-200 bg-white dark:bg-zinc-900">
                {/* ── Medios (imagen o video) ────────────────────────────── */}
                <div className="relative w-full aspect-[21/9] md:aspect-[21/7] bg-black/5 dark:bg-black/30">
                    {hasVideo ? (
                        <VideoEmbed url={b.video_url!} />
                    ) : b.image ? (
                        <Image
                            removeWrapper
                            alt={b.title}
                            className="w-full h-full object-cover"
                            src={b.image}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-default-400">
                            Sin media
                        </div>
                    )}

                    {/* Overlay con título */}
                    {!hasVideo && b.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 md:p-10">
                            <h2 className="text-white font-bold text-2xl md:text-4xl drop-shadow-lg max-w-3xl">
                                {b.title}
                            </h2>
                        </div>
                    )}
                </div>

                {/* ── Texto descriptivo ──────────────────────────────────── */}
                <div className="p-6 md:p-8 space-y-2">
                    {hasVideo && (
                        <h2 className="text-2xl md:text-3xl font-bold text-default-900">
                            {b.title}
                        </h2>
                    )}
                    {b.description && (
                        <p className="text-default-600 text-base md:text-lg leading-relaxed max-w-4xl">
                            {b.description}
                        </p>
                    )}
                </div>

                {/* ── Indicadores si hay más de un banner ────────────────── */}
                {banners.length > 1 && (
                    <div className="flex justify-center gap-2 pb-4">
                        {banners.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Banner ${i + 1}`}
                                className={`w-3 h-3 rounded-full transition-all ${i === idx
                                        ? "bg-primary scale-110"
                                        : "bg-default-300 hover:bg-default-400"
                                    }`}
                                onClick={() => setIdx(i)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
