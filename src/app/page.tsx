import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import MangaCard from "~/components/cards/manga-card";
import MangaGrid from "~/components/manga-grid";
import { env } from "~/env";

import { api } from "~/trpc/server";

export default async function Home() {
  unstable_noStore();

  const mangas = await api.manga.getAll.query();

  return (
    <main>
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
