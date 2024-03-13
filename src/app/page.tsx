import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import MangaCard from "~/components/cards/manga-card";
import MangaGrid from "~/components/manga-grid";

import { api } from "~/trpc/server";
import IndexReveal from "./_components/index-reveal";
import IndexRevealV2 from "./_components/index-reveal-v2";

export default async function Home() {
  unstable_noStore();

  const mangas = await api.manga.getAll.query();

  return (
    <main>
      {/* <IndexReveal /> */}
      <IndexRevealV2 />
      <section>
        <div className="container">
          <h1>Mangalar</h1>

          <MangaGrid size={"lg"}>
            {mangas.data.map((manga, index) => (
              <MangaCard manga={manga} key={index} />
            ))}
          </MangaGrid>
        </div>
      </section>
    </main>
  );
}
