import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import SectionTitle from "~/components/ui/section-title";
import { env } from "~/env";
import { ROUTES } from "~/lib/consts";
import { calcDateDiff } from "~/lib/utils";
import { api } from "~/trpc/server";
import { Status } from "~/types/manga";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const mangaData = await api.manga.getBySlug.query({ slug: params.slug });

  if (!mangaData) {
    return {};
  }

  return {
    title: `${mangaData.attributes.title} - Future Manga`,
  };
}

export default async function MangaPage({
  params,
}: {
  params: { slug: string };
}) {
  const mangaData = await api.manga.getBySlug.query({ slug: params.slug });

  if (!mangaData) {
    return "bulunamadı";
  }

  const manga_chapters = mangaData.attributes.manga_chapters.data.reverse();

  const firstChapter = manga_chapters.slice(-1)[0];
  const lastChapter = manga_chapters[0];

  return (
    <main>
      <section>
        <Breadcrumb />
      </section>
      <section>
        <div className="container flex flex-col gap-y-4 md:flex-row">
          <div className="flex h-80 w-full items-center justify-center overflow-hidden md:w-96">
            <Image
              src={
                env.NEXT_PUBLIC_MEDIA_PREFIX +
                mangaData.attributes.cover.data.attributes.url
              }
              width={mangaData.attributes.cover.data.attributes.width}
              height={mangaData.attributes.cover.data.attributes.height}
              alt={mangaData.attributes.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-4 md:flex-1">
            <div className="flex flex-col-reverse justify-between md:flex-row">
              <h1 className="font-archivo_black text-4xl">
                {mangaData.attributes.title}
              </h1>

              <div className="flex items-end gap-2">
                <h2 className="text-xl">Durum:</h2>
                <p
                  className={`${mangaData.attributes.status === Status.DevamEdiyor ? "text-green-600" : "text-red-500"}`}
                >
                  {mangaData.attributes.status}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <h2 className="text-xl">Diğer Adlar:</h2>
              <p>{mangaData.attributes.otherNames || "-"}</p>
            </div>
            <div className="flex gap-4">
              <h2 className="text-xl">Türler:</h2>
              <ul className="flex flex-wrap gap-2">
                {mangaData.attributes.genres.data.map((genre, index) => (
                  <li key={index}>
                    <Button asChild variant={"outline"} size={"sm"}>
                      <Link
                        href={`${ROUTES.categories}/${genre.attributes.slug}`}
                      >
                        {genre.attributes.title}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {firstChapter && lastChapter ? (
              <div className="flex gap-2">
                <Button asChild>
                  <Link
                    href={`${ROUTES.manga}/${mangaData.attributes.slug}/chapter-${firstChapter?.attributes.chapter}`}
                  >
                    İlk Bölüm
                  </Link>
                </Button>
                <Button asChild>
                  <Link
                    href={`${ROUTES.manga}/${mangaData.attributes.slug}/chapter-${lastChapter?.attributes.chapter}`}
                  >
                    Son Bölüm
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="my-8">
        <div className="container space-y-4">
          <SectionTitle>
            <h2>Bölümler</h2>
          </SectionTitle>

          <ul className="space-y-2">
            {manga_chapters.map((chapter, index) => (
              <li key={index}>
                <Link
                  className="flex justify-between border p-4 hover:bg-primary hover:text-primary-foreground"
                  href={`${ROUTES.manga}/${mangaData.attributes.slug}/chapter-${chapter.attributes.chapter}`}
                >
                  <span className="text-xl">{chapter.attributes.title}</span>
                  <span>
                    {calcDateDiff(chapter.attributes.createdAt.toString())} Önce
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
