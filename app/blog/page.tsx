import { title } from "@/components/primitives";
import BlogCard from "@/components/BlogCard";
import { fetchPosts, fetchBlogSidebarImages } from "@/lib/api";
import { BlogBanner } from "@/components/blog-banner";

export const metadata = {
  title: "Blog – Vivatech",
  description: "Noticias y consejos sobre maquinaria agrícola Vivatech",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, sidebarImages] = await Promise.all([
    fetchPosts(),
    fetchBlogSidebarImages(),
  ]);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-12">
      {/* Título Principal */}
      <div className="text-center py-12">
        <h1 className={title({ size: "lg" })}>Vive al día Con VIVATECH</h1>
        <p className="text-default-500 mt-3 text-lg">
          Noticias, actualizaciones y consejos para tu maquinaria.
        </p>
      </div>

      {/* Banner Principal (Carrusel) */}
      <BlogBanner images={sidebarImages} />

      {/* Grid de Posts */}
      <div className="mt-8">
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-default-50 rounded-xl">
            <p className="text-xl text-default-500">
              No hay publicaciones disponibles por el momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
