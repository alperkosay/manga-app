import Link from "next/link";
import React from "react";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { ROUTES } from "~/lib/consts";
import { api } from "~/trpc/server";
import CategoryList from "./_components/category-list";
import SectionTitle from "~/components/ui/section-title";

export default async function CategoryListPage() {
  const genreResponse = await api.genre.getAll.query();
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
    </main>
  );
}
