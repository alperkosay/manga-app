import React from "react";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import CategoryList from "../_components/category-list";
import { api } from "~/trpc/server";
import MangaGrid from "~/components/manga-grid";
import MangaCard, {
  MangaCardWithoutChapters,
} from "~/components/cards/manga-card";
import SectionTitle from "~/components/ui/section-title";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  unstable_noStore();

  const genreSlugResponse = await api.genre.getBySlug.query({
    slug: params.slug,
  });

  return {
    title: `${genreSlugResponse?.attributes.title} - Future Manga`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const genreResponse = await api.genre.getAll.query();

  const genreSlugResponse = await api.genre.getBySlug.query({
    slug: params.slug,
  });

  return (
    <main>
      <section>
        <Breadcrumb />
      </section>

      <section className="mb-8">
        <div className="container">
          <SectionTitle>
            <h1>
              Kategoriler - {genreSlugResponse?.attributes.title} Kategorisi
            </h1>
          </SectionTitle>
          <CategoryList categories={genreResponse.data} />
        </div>
      </section>

      <section>
        <div className="container space-y-6">
          <SectionTitle>
            <h1>{genreSlugResponse?.attributes.title} Mangaları</h1>
          </SectionTitle>
          <MangaGrid size={"lg"}>
            {genreSlugResponse?.attributes.manga?.data.map((manga, index) => (
              <MangaCardWithoutChapters manga={manga} key={index} />
            ))}
          </MangaGrid>
        </div>
      </section>
    </main>
  );
}
