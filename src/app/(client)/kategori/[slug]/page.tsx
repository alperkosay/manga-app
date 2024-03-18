import React from "react";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import CategoryList from "../_components/category-list";
import { api } from "~/trpc/server";
import MangaGrid from "~/components/manga-grid";
import MangaCard, {
  MangaCardWithoutChapters,
} from "~/components/cards/manga-card";
import SectionTitle from "~/components/ui/section-title";

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

      <section>
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
        <div className="container">
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
