import React from "react";

export default function MangaChapter({
  params,
}: {
  params: { chapter: string; slug: string };
}) {
  const chapter = params.chapter.split("-")[1];

  return <div>{chapter}</div>;
}
