import React from "react";

export default async function MangaPage({
  params,
}: {
  params: { slug: string };
}) {
  await new Promise((resolve) => setTimeout(resolve, 30000));

  return <main>{params.slug}</main>;
}
