import Image from "next/image";
import React from "react";
import { env } from "~/env";
import { api } from "~/trpc/server";
import placeholderImg from "./_components/assets/card-placeholder.webp";
import SectionTitle from "~/components/ui/section-title";
import Link from "next/link";
import ChapterBox from "./_components/chapter-box";
import { ROUTES } from "~/lib/consts";
import { Button } from "~/components/ui/button";
import { Breadcrumb } from "~/components/ui/breadcrumb";

export default async function MangaChapter({
  params,
}: {
  params: { chapter: string; slug: string };
}) {
  const chapter = Number(params.chapter.split("-")[1]);

  const chapterResponse = await api.mangaChapter.getByChapter.query({
    chapter: chapter,
    mangaSlug: params.slug,
  });

  const allChaptersResponse = await api.mangaChapter.getChaptersBySlug.query({
    slug: params.slug,
  });

  return (
    <main>
      <section>
        <Breadcrumb />
      </section>
      <section>
        <div className="container">
          <div className="mb-8 flex items-center justify-between space-y-4 ">
            <SectionTitle>
              <h1>
                {chapterResponse?.attributes.manga?.data.attributes.title}
                {" - "}
                {chapterResponse?.attributes.title}
              </h1>
            </SectionTitle>
            <Button asChild>
              <Link href={`${ROUTES.manga}/${params.slug}`}>Geri Dön</Link>
            </Button>
          </div>
          <div>
            <ChapterBox
              chapters={allChaptersResponse.data}
              params={{
                slug: params.slug,
                chapter,
              }}
            />
          </div>

          <div className="mx-auto md:w-max">
            {chapterResponse?.attributes.chapterImages.data?.map(
              (data, index) => (
                <Image
                  key={index}
                  src={env.NEXT_PUBLIC_MEDIA_PREFIX + data.attributes.url}
                  width={768}
                  height={1024}
                  placeholder="blur"
                  blurDataURL={placeholderImg.src}
                  alt={data.attributes.alternativeText}
                  // className="w-full"
                />
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
