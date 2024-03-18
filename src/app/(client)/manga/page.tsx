import { redirect } from "next/navigation";
import React from "react";
import { MangaCardWithoutChapters } from "~/components/cards/manga-card";
import MangaGrid from "~/components/manga-grid";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import Pagination from "~/components/ui/pagination";
import { ROUTES } from "~/lib/consts";
import { api } from "~/trpc/server";

export default async function MangaListPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const mangaListResponse = await api.manga.getAll.query({
    pageSize: 18,
    page: searchParams.page,
  });

  if (
    !mangaListResponse.data.length &&
    searchParams.page &&
    searchParams.page !== "1"
  ) {
    redirect(ROUTES.manga);
  }

  return (
    <main>
      {" "}
      <section>
        <Breadcrumb />
      </section>
      <section>
        <div className="container">
          <MangaGrid size={"lg"}>
            {mangaListResponse.data.map((manga, index) => (
              <MangaCardWithoutChapters manga={manga} key={index} />
            ))}
          </MangaGrid>

          <Pagination
            meta={mangaListResponse.meta}
            searchParams={searchParams}
          />
        </div>
      </section>
    </main>
  );
}
