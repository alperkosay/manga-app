import { unstable_noStore } from "next/cache";
import MangaCard from "~/components/cards/manga-card";
import MangaGrid from "~/components/manga-grid";

import { api } from "~/trpc/server";
import IndexRevealV2 from "./_components/index-reveal-v2";
import ScrollMarquee from "./_components/scroll-marquee";
import SectionTitle from "~/components/ui/section-title";
import { Button } from "~/components/ui/button";
import { ChevronRight, ChevronRightCircle, ChevronsRight } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category?: string;
    page?: string;
  };
}) {
  unstable_noStore();

  const lastUpdatedMangas = await api.manga.getLastUpdateds.query();

  return (
    <main className="min-h-[400vh]">
      <IndexRevealV2 />
      <ScrollMarquee />
      <ScrollMarquee className="-rotate-6" />
      <div className="container flex gap-24">
        <section className="flex-1">
          <div className=" space-y-4">
            <div className="flex items-center justify-between">
              <SectionTitle>
                <h1>Son Güncellenenler</h1>
              </SectionTitle>
              <Button variant={"link"} className=" gap-2">
                Tüm Mangalar <ChevronRight />
              </Button>
            </div>
            <MangaGrid size={"lg"}>
              {lastUpdatedMangas.data.map((manga, index) => (
                <MangaCard manga={manga} key={index} />
              ))}
            </MangaGrid>
          </div>
        </section>
        <aside className="w-96">
          <SectionTitle>
            <p>Kategoriler</p>
          </SectionTitle>
        </aside>
      </div>
    </main>
  );
}
