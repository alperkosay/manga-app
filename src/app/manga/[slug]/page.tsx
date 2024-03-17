import React from "react";

export default async function MangaPage({
  params,
}: {
  params: { slug: string };
}) {
  return <main>{params.slug}</main>;
}
