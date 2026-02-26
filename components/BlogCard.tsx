"use client";
import type { BlogPost } from "@/types/api";

import { Image, Button, Card, CardHeader, CardBody } from "@heroui/react";
import Link from "next/link";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card
      className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300"
      radius="lg"
    >
      {post.cover_image && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            removeWrapper
            alt={post.title}
            className="z-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            src={post.cover_image}
          />
        </div>
      )}

      <CardHeader className="px-5 pt-5 pb-0 flex-col items-start">
        <h3 className="font-bold text-xl text-default-900 leading-tight">
          {post.title}
        </h3>
      </CardHeader>

      <CardBody className="px-5 py-3 flex-grow">
        <p className="text-default-500 text-sm line-clamp-3">{post.excerpt}</p>
      </CardBody>

      <div className="px-5 pb-5 pt-0 mt-auto">
        <Button
          as={Link}
          className="w-full bg-black text-white font-medium"
          href={`/blog/${post.slug}`}
          radius="full"
          size="md"
        >
          Leer más
        </Button>
      </div>
    </Card>
  );
}
