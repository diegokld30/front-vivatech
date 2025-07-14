import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchPost, fetchPosts } from "@/lib/api";
import type { BlogPost } from "@/types/api";

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true; // nuevas entradas sin rebuild

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: BlogPost | null = await fetchPost(params.slug);

  if (!post) return notFound();

  return (
    <article className="max-w-screen-md mx-auto px-4 py-12 space-y-8">
      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt={post.title}
          width={800}
          height={450}
          className="rounded-xl w-full h-auto object-cover"
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
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
