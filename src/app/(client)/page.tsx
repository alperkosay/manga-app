import { unstable_noStore } from "next/cache";
import MangaCard from "~/components/cards/manga-card";
import MangaGrid from "~/components/manga-grid";

import { api } from "~/trpc/server";
import IndexRevealV2 from "./_components/index-reveal-v2";
import ScrollMarquee from "./_components/scroll-marquee";
import SectionTitle from "~/components/ui/section-title";
import { Button } from "~/components/ui/button";
import { ChevronRight, ChevronRightCircle, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "~/lib/consts";
import HeroSection from "./_components/hero-section";

export default async function Home() {
  unstable_noStore();

  const lastUpdatedMangas = await api.manga.getLastUpdateds.query();
  const genres = await api.genre.getAll.query();

  const mainSlidesResponse = await api.mainSlides.getAll.query();

  return (
    <main>
      <IndexRevealV2 />
      <ScrollMarquee />
      <ScrollMarquee className="-rotate-6" />

      <HeroSection mangaSlides={mainSlidesResponse.data} />

      <div className="container flex flex-col gap-24 md:flex-row">
        <section className="flex-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <SectionTitle>
                <h1>Son Güncellenenler</h1>
              </SectionTitle>
            </div>
            <MangaGrid size={"sm"}>
              {lastUpdatedMangas.map((manga, index) => (
                <MangaCard manga={manga} key={index} />
              ))}
            </MangaGrid>
          </div>
          <div className="mt-6 flex justify-end">
            <Button asChild variant={"link"} className="gap-2">
              <Link href={ROUTES.manga}>
                Tüm Mangalar <ChevronRight />
              </Link>
            </Button>
          </div>
        </section>
        <aside className="w-full space-y-2 sm:w-60 xl:w-96">
          <SectionTitle>
            <p>Kategoriler</p>
          </SectionTitle>

          <ul className="flex w-full flex-wrap gap-4">
            {genres.data.map((genre, index) => (
              <li key={index}>
                <Button variant={"outline"}>
                  <Link href={`${ROUTES.categories}/${genre.attributes.slug}`}>
                    {genre.attributes.title}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
