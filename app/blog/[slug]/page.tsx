import type { BlogPost } from "@/types/api";

import { notFound } from "next/navigation";
import Image from "next/image";

import { fetchPost } from "@/lib/api";

export const dynamicParams = true; // nuevos slugs sin rebuild
export const dynamic = "force-dynamic"; // ← quítalo si quieres SSG

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: BlogPost | null = await fetchPost(slug);

  if (!post) return notFound();

  return (
    <article className="max-w-screen-md mx-auto px-4 py-12 space-y-8">
      {post.cover_image && (
        <Image
          alt={post.title}
          className="rounded-xl w-full h-auto object-cover"
          height={450}
          src={post.cover_image}
          width={800}
        />
      )}

      <h1 className="text-3xl font-bold">{post.title}</h1>
      <time className="text-sm text-default-500">
        {new Date(post.published_at).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="prose max-w-none"
      />
    </article>
  );
}
