"use client";
import { Image, Button, Card, CardHeader, CardBody } from "@heroui/react";
import Link from "next/link";
import type { BlogPost } from "@/types/api";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card radius="lg" shadow="sm" as="article">
      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt={post.title}
          width={600}
          height={320}
          className="h-48 w-full object-cover rounded-t-lg"
        />
      )}

      <CardHeader className="font-semibold text-lg">{post.title}</CardHeader>

      <CardBody className="space-y-4">
        <p className="text-sm text-default-600 line-clamp-3">
          {post.excerpt}
        </p>
        <Button
          as={Link}
          href={`/blog/${post.slug}`}
          color="primary"
          radius="full"
          size="sm"
        >
          Leer más
        </Button>
      </CardBody>
    </Card>
  );
}
