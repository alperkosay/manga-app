import QueryString from "qs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import { MangaChapter } from "~/types/manga-chapter";
import { Payload } from "~/types/payload";
import { z } from "zod";

export const mangaChapterRouter = createTRPCRouter({
  getLastUpdatedChaptersByMangaId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          sort: ["updatedAt:desc"],
          filters: {
            manga: {
              id: {
                $eq: input.id,
              },
            },
          },
          pagination: {
            pageSize: 2,
          },
        },

        {
          encodeValuesOnly: true,
        },
      );
        
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/manga-chapters?${qs}`,
      );

      const data = (await response.json()) as Payload<MangaChapter[]>;

      return data;
    }),
});
