import Image from "next/image";
import React from "react";
import { env } from "~/env";
import { api } from "~/trpc/server";
import placeholderImg from "./_components/assets/card-placeholder.webp";
import SectionTitle from "~/components/ui/section-title";

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

  return (
    <main>
      <section>
        <div className="container">
          <div className="mb-8 flex space-y-4 ">
            <SectionTitle>
              <h1>
                {chapterResponse?.attributes.manga?.data.attributes.title}
                {" - "}
                {chapterResponse?.attributes.title}
              </h1>
            </SectionTitle>
          </div>

          <div className="mx-auto w-max">
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
                />
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
