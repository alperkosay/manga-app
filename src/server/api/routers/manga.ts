import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Manga } from "~/types/manga";
import { type Payload } from "~/types/payload";

import QueryString from "qs";
export const mangaRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const qs = QueryString.stringify({
      populate: "*",
    });

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/mangas?${qs}`);
    const data = (await response.json()) as Promise<Payload<Manga[]>>;

    return data;
  }),

  getLastUpdateds: publicProcedure.query(async () => {
    const qs = QueryString.stringify(
      {
        populate: {
          manga_chapters: {
            sort: ["updatedAt:desc"],
          },
          cover: true,
        },
      },
      { encodeValuesOnly: true },
    );

    console.log(`${env.NEXT_PUBLIC_API_URL}/mangas?${qs}`);
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/mangas?${qs}`);
    const data = (await response.json()) as Payload<Manga[]>;

    return data;
  }),
});
