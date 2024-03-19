"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ROUTES } from "~/lib/consts";
import { MangaChapter } from "~/types/manga-chapter";

export default function ChapterBox({
  chapters,
  params,
}: {
  chapters: MangaChapter[];
  params: {
    slug: string;
    chapter: number;
  };
}) {
  const router = useRouter();

  return (
    <select
      onChange={(e) => {
        router.push(e.target.value);
      }}
      className="border bg-transparent p-2  text-white"
      defaultValue={`${ROUTES.manga}/${params.slug}/chapter-${params.chapter}`}
    >
      {chapters.map((chapter, index) => (
        <option
          key={index}
          className={` ${chapter.attributes.chapter === params.chapter ? "font-bold text-primary" : "text-black"}`}
          value={`${ROUTES.manga}/${params.slug}/chapter-${chapter.attributes.chapter}`}
        >
          {chapter.attributes.chapter === params.chapter ? "✔️" : null}
          {chapter.attributes.title}
        </option>
      ))}
    </select>
  );
}
