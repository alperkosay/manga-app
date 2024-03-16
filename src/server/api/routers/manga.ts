import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Manga_Plain, type Manga } from "~/types/manga";
import { type Payload } from "~/types/payload";

import QueryString from "qs";
export const mangaRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const qs = QueryString.stringify({
      populate: "*",
    });

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/mangas?${qs}`);
    const data = (await response.json()) as Payload<Manga[]>;

    return data;
  }),

  getLastUpdateds: publicProcedure.query(async () => {
    const qs = QueryString.stringify(
      {
        limit: 20,
      },
      { encodeValuesOnly: true },
    );

    console.log(`${env.NEXT_PUBLIC_API_URL}/mangas/getWithLastChapters?${qs}`);
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/mangas/getWithLastChapters?${qs}`,
    );
    const data = (await response.json()) as Manga_Plain[];

    return data;
  }),
});
