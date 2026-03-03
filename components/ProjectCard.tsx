"use client";

import type { Project } from "@/types/api";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Image,
} from "@heroui/react";
import { useState, useEffect } from "react";
import {
    MapPinIcon,
    PlayCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

/* ── helpers video ───────────────────────────────────────────────── */
function getYouTubeId(url: string): string | null {
    const m =
        url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/) ??
        url.match(/youtube\.com\/embed\/([\w-]+)/);

    return m?.[1] ?? null;
}

/* ── Card thumbnail ──────────────────────────────────────────────── */
function ProjectCardThumbnail({
    project,
    onClick,
}: {
    project: Project;
    onClick: () => void;
}) {
    const allImages = [
        ...(project.cover ? [project.cover] : []),
        ...project.gallery.map((g) => g.image),
    ];
    const [imgIdx, setImgIdx] = useState(0);
    const total = allImages.length;

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImgIdx((i) => (i - 1 + total) % total);
    };
    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImgIdx((i) => (i + 1) % total);
    };

    return (
        <div
            className="group relative w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-primary/30 hover:shadow-[0_14px_34px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_16px_38px_rgba(0,0,0,0.45)] transition-all duration-300 overflow-hidden cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
        >
            {/* Imagen con carrusel */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-default-100">
                {allImages.length > 0 ? (
                    <img
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={allImages[imgIdx]}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-default-400">
                        Sin imagen
                    </div>
                )}

                {/* Controles de carrusel */}
                {total > 1 && (
                    <>
                        <button
                            aria-label="Anterior"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            onClick={prev}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            aria-label="Siguiente"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            onClick={next}
                        >
                            <ChevronRight size={18} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {allImages.map((_, i) => (
                                <span
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? "bg-primary scale-110" : "bg-white/70"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Badge video */}
                {project.video_url && (
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <PlayCircle size={14} /> Video
                    </span>
                )}

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                        className="font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        color="primary"
                        radius="full"
                        variant="solid"
                    >
                        Ver más
                    </Button>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-1">
                <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-gray-100 line-clamp-2">
                    {project.name}
                </h3>
                {project.location && (
                    <p className="flex items-center gap-1 text-sm text-default-500">
                        <MapPinIcon size={14} /> {project.location}
                    </p>
                )}
                {project.testimonial && (
                    <p className="text-sm text-default-600 line-clamp-2 mt-1">
                        {project.testimonial}
                    </p>
                )}
            </div>
        </div>
    );
}

/* ── Modal centrado ──────────────────────────────────────────────── */
function ProjectDetailModal({
    project,
    isOpen,
    onClose,
}: {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}) {
    const allImages = [
        ...(project.cover ? [project.cover] : []),
        ...project.gallery.map((g) => g.image),
    ];

    const [selectedImage, setSelectedImage] = useState(
        allImages[0] ?? "/placeholder.jpg",
    );

    const isYouTube = !!(
        project.video_url &&
        (project.video_url.includes("youtube.com") ||
            project.video_url.includes("youtu.be"))
    );
    const videoId = isYouTube ? getYouTubeId(project.video_url!) : null;
    const [showVideo, setShowVideo] = useState(!!(isYouTube && videoId));

    useEffect(() => {
        if (isOpen) {
            setSelectedImage(allImages[0] ?? "/placeholder.jpg");
            setShowVideo(!!(isYouTube && videoId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project, isOpen]);

    return (
        <Modal
            backdrop="blur"
            isOpen={isOpen}
            scrollBehavior="inside"
            size="5xl"
            onClose={onClose}
        >
            <ModalContent className="max-h-[90vh]">
                {(onModalClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold">{project.name}</h2>
                            {project.location && (
                                <p className="text-sm text-default-500 font-normal flex items-center gap-1">
                                    <MapPinIcon size={14} /> {project.location}
                                </p>
                            )}
                        </ModalHeader>

                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* COLUMNA IZQUIERDA: medios */}
                                <div className="space-y-4">
                                    {/* Visor principal */}
                                    {showVideo && isYouTube && videoId ? (
                                        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                                            <iframe
                                                allowFullScreen
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                className="w-full h-full"
                                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                                title="Video del proyecto"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-default-200 shadow-sm bg-white dark:bg-zinc-900 flex items-center justify-center">
                                            <Image
                                                alt={project.name}
                                                className="object-contain w-full h-full"
                                                src={selectedImage}
                                            />
                                        </div>
                                    )}

                                    {/* Miniaturas */}
                                    <div className="flex gap-2 overflow-x-auto py-2 px-1">
                                        {isYouTube && videoId && (
                                            <button
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center bg-black/10 hover:bg-black/20 ${showVideo
                                                        ? "border-primary"
                                                        : "border-transparent"
                                                    }`}
                                                title="Ver Video"
                                                onClick={() => setShowVideo(true)}
                                            >
                                                <PlayCircle className="w-8 h-8 text-danger" />
                                            </button>
                                        )}

                                        {allImages.map((img, i) => (
                                            <button
                                                key={i}
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${!showVideo && selectedImage === img
                                                        ? "border-primary"
                                                        : "border-transparent"
                                                    }`}
                                                onClick={() => {
                                                    setSelectedImage(img);
                                                    setShowVideo(false);
                                                }}
                                            >
                                                <img
                                                    alt={`Galería ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                    src={img}
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Video no-YouTube */}
                                    {project.video_url && !isYouTube && (
                                        <div className="p-4 bg-default-100 rounded-lg">
                                            <p className="text-sm font-semibold mb-2">
                                                Video disponible:
                                            </p>
                                            <Button
                                                as="a"
                                                color="secondary"
                                                href={project.video_url}
                                                rel="noopener noreferrer"
                                                size="sm"
                                                target="_blank"
                                                variant="flat"
                                            >
                                                Ver Video Externo
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* COLUMNA DERECHA: contenido */}
                                <div className="space-y-6">
                                    {project.testimonial && (
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Resumen</h3>
                                            <p className="text-default-700">{project.testimonial}</p>
                                        </div>
                                    )}

                                    {project.content && (
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Detalle</h3>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: project.content }}
                                                className="text-default-700 rich-text px-1"
                                            />
                                        </div>
                                    )}

                                    {/* Mapa si tiene GPS */}
                                    {project.latitude && project.longitude && (
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Ubicación</h3>
                                            <iframe
                                                allowFullScreen
                                                className="w-full h-48 rounded-xl border border-default-200 shadow-sm"
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                src={`https://maps.google.com/maps?q=${project.latitude},${project.longitude}&z=14&output=embed`}
                                                title="Ubicación del proyecto"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onModalClose}
                            >
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

/* ── Exports ─────────────────────────────────────────────────────── */
export { ProjectCardThumbnail, ProjectDetailModal };
