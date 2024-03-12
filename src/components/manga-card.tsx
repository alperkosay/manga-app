import Image from "next/image";
import React from "react";
import { env } from "~/env";
import { Manga } from "~/types/manga";

export default function MangaCard({ manga }: { manga: Manga }) {
  return (
    <div className="flex flex-col">
      <div>
        <Image
          src={
            env.NEXT_PUBLIC_MEDIA_PREFIX +
            manga.attributes.cover.data.attributes.url
          }
          width={300}
          height={400}
          className="w-full object-cover"
          alt={manga.attributes.title}
        />
      </div>

      <div>
        <h3 className="text-lg">{manga.attributes.title}</h3>
      </div>
    </div>
  );
}
