import React from "react";

export default function MangaPage({ params }: { params: { slug: string } }) {
  return <main>{params.slug}</main>;
}
