import Image from "next/image";
import React from "react";
import { env } from "~/env";
import { Manga } from "~/types/manga";
import CardPlaceholder from "./card-placeholder.webp";
import Link from "next/link";
import { Button } from "../ui/button";
import { calcDateDiff } from "~/lib/utils";

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
        <h3 className="mb-2 text-lg">{manga.attributes.title}</h3>

        <div className="flex flex-col gap-y-2">
          {manga.attributes.manga_chapters.data.map((chapter, index) => {
            const dateDiff = calcDateDiff(
              chapter.attributes.updatedAt.toString(),
            );

            return (
              <div key={index} className="flex items-center gap-2">
                <Button asChild size={"xs"}>
                  <Link
                    href={`/manga/${manga.attributes.slug}/${chapter.attributes.chapter}`}
                    className="gap-4"
                  >
                    <span>Bölüm {chapter.attributes.chapter}</span>
                  </Link>
                </Button>
                <span className="text-xs">{dateDiff} önce</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
