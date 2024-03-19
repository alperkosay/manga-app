import React from "react";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { api } from "~/trpc/server";
import CategoryList from "./_components/category-list";
import SectionTitle from "~/components/ui/section-title";
import MangaSlider from "~/components/manga-slider";
import { unstable_noStore } from "next/cache";

export default async function CategoryListPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  unstable_noStore();

  const genreResponse = await api.genre.getAll.query();

  const mangaListResponse = await api.manga.getAll.query({
    pageSize: 18,
    page: searchParams.page,
  });

  return (
    <main>
      <section>
        <Breadcrumb />
      </section>

      <section>
        <div className="container">
          <SectionTitle>
            <h1>Kategoriler</h1>
          </SectionTitle>
          <CategoryList categories={genreResponse.data} />
        </div>
      </section>
      <section>
        <div className="container space-y-4">
          <SectionTitle>
            <h1>Diğer Mangalar</h1>
          </SectionTitle>
          <MangaSlider mangaData={mangaListResponse.data} />
        </div>
      </section>
    </main>
  );
}
