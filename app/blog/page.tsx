import { title } from "@/components/primitives";
import BlogCard from "@/components/BlogCard";
import { fetchPosts } from "@/lib/api";
import type { BlogPost } from "@/types/api";

export const metadata = {
  title: "Blog – Vivatech",
  description: "Noticias y consejos sobre maquinaria agrícola Vivatech",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts: BlogPost[] = await fetchPosts();

  return (
    <section className="max-w-screen-lg mx-auto px-4">
      <p className={title()}>Información de interés.</p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-10">
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}
