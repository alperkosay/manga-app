"use client";
import Image from "next/image";
import React from "react";
import { env } from "~/env";
import { Manga, Manga_Plain } from "~/types/manga";
import CardPlaceholder from "./card-placeholder.webp";
import Link from "next/link";
import { Button } from "../ui/button";
import { calcDateDiff } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Skeleton } from "../ui/skeleton";

export default function MangaCard({ manga }: { manga: Manga_Plain }) {
  // const mangaChapters =
  //   api.mangaChapter.getLastUpdatedChaptersByMangaId.useQuery({
  //     id: manga.id,
  //   });

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
          {manga.manga_chapters.map((chapter, index) => {
            const dateDiff = calcDateDiff(chapter.updatedAt.toString());

            return (
              <div key={index} className="flex items-center gap-2">
                <Button asChild size={"xs"}>
                  <Link
                    href={`/manga/${manga.slug}/chapter-${chapter.chapter}`}
                    className="gap-4"
                  >
                    <span>Bölüm {chapter.chapter}</span>
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

function ChaptersSkeleton() {
  return <Skeleton className="h-7 w-full" />;
}
