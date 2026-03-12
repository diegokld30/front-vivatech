"use client";

import { useState } from "react";

import type { Project, ProjectBanner } from "@/types/api";

import ProjectBannerSection from "@/components/ProjectBannerSection";
import {
    ProjectCardThumbnail,
    ProjectDetailModal,
} from "../../components/ProjectCard";

interface Props {
    projects: Project[];
    banners: ProjectBanner[];
}

export default function LomasPlanasClient({ projects, banners }: Props) {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* ── Título ───────────────────────────────────────────── */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary-700 tracking-tight">
                    Finca Lomas Planas
                </h1>
                <p className="text-default-500 text-lg mt-3 max-w-2xl mx-auto">
                    Así se trabaja en el campo hoy. Descubre nuestros proyectos,
                    avances y contenido de valor.
                </p>
            </div>

            {/* ── Banner / Highlight ───────────────────────────────── */}
            <ProjectBannerSection banners={banners} />

            {/* ── Sección de proyectos ─────────────────────────────── */}
            {projects.length > 0 && (
                <>
                    <h2 className="text-2xl md:text-3xl font-bold text-default-800 mb-6">
                        Nuestros Proyectos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((p) => (
                            <ProjectCardThumbnail
                                key={p.id}
                                project={p}
                                onClick={() => setSelected(p)}
                            />
                        ))}
                    </div>
                </>
            )}

            {projects.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-default-400 text-lg">
                        Pronto se publicarán proyectos. ¡Vuelve pronto!
                    </p>
                </div>
            )}

            {/* ── Modal de detalle ─────────────────────────────────── */}
            {selected && (
                <ProjectDetailModal
                    isOpen={!!selected}
                    project={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}
