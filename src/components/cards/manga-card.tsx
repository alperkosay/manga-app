"use client";
import Image from "next/image";
import React from "react";
import { env } from "~/env";
import { Manga, Manga_Plain } from "~/types/manga";
import CardPlaceholder from "./assets/card-placeholder.webp";
import Link from "next/link";
import { Button } from "../ui/button";
import { calcDateDiff } from "~/lib/utils";
import { ROUTES } from "~/lib/consts";

export default function MangaCard({ manga }: { manga: Manga_Plain }) {
  return (
    <div className="flex flex-col">
      <Link className="block" href={`/manga/${manga.slug}`}>
        <Image
          src={env.NEXT_PUBLIC_MEDIA_PREFIX + manga.cover.url}
          width={300}
          height={400}
          className="w-full object-cover"
          placeholder="blur"
          blurDataURL={CardPlaceholder.src}
          alt={manga.title}
        />
      </Link>

      <div>
        <h3 className="mb-2 text-lg">{manga.title}</h3>

        <div className="flex flex-col gap-y-2">
          {manga.manga_chapters.map((chapter, index) => (
            <div key={index} className="flex items-center gap-2">
              <Button asChild size={"xs"}>
                <Link
                  href={`/manga/${manga.slug}/chapter-${chapter.chapter}`}
                  className="gap-4"
                >
                  <span>Bölüm {chapter.chapter}</span>
                </Link>
              </Button>
              <span className="text-xs">
                {calcDateDiff(chapter.createdAt.toString()) || "Az"} önce
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const MangaCardWithoutChapters = ({ manga }: { manga: Manga }) => {
  return (
    <div className="flex flex-col">
      <Link className="block" href={`${ROUTES.manga}/${manga.attributes.slug}`}>
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
      </div>
    </div>
  );
};
