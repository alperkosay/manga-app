import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { env } from "~/env";

import { api } from "~/trpc/server";

export default async function Home() {
  unstable_noStore();

  const mangas = await api.manga.getAll.query();

  return (
    <main>
      {mangas.data.map((manga, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="">
            <Image
              src={
                env.NEXT_PUBLIC_MEDIA_PREFIX +
                manga.attributes.cover.data.attributes.url
              }
              width={200}
              height={400}
              alt="test"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black">{manga.attributes.title}</h1>
          </div>
          <div>
            {manga.attributes.manga_chapters.data.map((chapter, chapteridx) => (
              <div key={chapteridx}>
                <Link
                  href={`/${manga.attributes.slug}/${chapter.attributes.slug}`}
                >
                  <span className="font-bold">{chapter.attributes.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
