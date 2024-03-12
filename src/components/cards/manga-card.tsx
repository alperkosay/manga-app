import Image from "next/image";
import React from "react";
import { env } from "~/env";
import { Manga } from "~/types/manga";
import CardPlaceholder from "./card-placeholder.webp";
import Link from "next/link";

export default function MangaCard({ manga }: { manga: Manga }) {
  return (
    <div className="flex flex-col">
      <Link className="block" href={`/manga/${manga.attributes.slug}`}>
        <Image
          src={
            env.NEXT_PUBLIC_MEDIA_PREFIX +
            manga.attributes.cover.data.attributes.url
          }
          width={300}
          height={400}
          className="w-full object-cover"
          placeholder="blur"
          blurDataURL={CardPlaceholder.src}
          alt={manga.attributes.title}
        />
      </Link>

      <div>
        <h3 className="text-lg">{manga.attributes.title}</h3>
      </div>
    </div>
  );
}
