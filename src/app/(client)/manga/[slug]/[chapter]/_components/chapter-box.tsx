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
    >
      {chapters.map((chapter, index) => (
        <option
          key={index}
          className={` ${chapter.attributes.chapter === params.chapter ? "font-bold text-primary" : "text-black"}`}
          // disabled={chapter.attributes.chapter === params.chapter}
          value={`${ROUTES.manga}/${params.slug}/chapter-${chapter.attributes.chapter}`}
          selected={chapter.attributes.chapter === params.chapter}
        >
          {chapter.attributes.chapter === params.chapter ? "✔️" : null}
          {chapter.attributes.title}
        </option>
      ))}
    </select>
  );
}
