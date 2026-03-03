import type { Metadata } from "next";

import { fetchProjects, fetchProjectBanners } from "@/lib/api";
import type { ProjectBanner } from "@/types/api";

import LomasPlanasClient from "./LomasPlanasClient";

export const metadata: Metadata = {
    title: "Lomas Planas – Proyectos | Vivatech",
    description:
        "Descubre los proyectos de la Finca Lomas Planas. Contenido de valor, actualizaciones y lo más destacado de nuestro trabajo en el campo.",
    openGraph: {
        title: "Lomas Planas – Proyectos | Vivatech",
        description:
            "Contenido de valor, actualizaciones y lo más destacado del trabajo en el campo.",
    },
};

export default async function LomasPlanasPage() {
    const [projects, banners] = await Promise.all([
        fetchProjects(),
        fetchProjectBanners().catch((): ProjectBanner[] => []),
    ]);

    return <LomasPlanasClient banners={banners} projects={projects} />;
}
