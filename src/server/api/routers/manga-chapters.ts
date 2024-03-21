import QueryString from "qs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { MangaChapter } from "~/types/manga-chapter";
import { z } from "zod";
import { getStrapiData } from "~/lib/utils";

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

      return getStrapiData<MangaChapter[]>("/manga-chapters", qs);
    }),

  getByChapter: publicProcedure
    .input(
      z.object({
        mangaSlug: z.string(),
        chapter: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          populate: "*",
          filters: {
            manga: {
              slug: {
                $eq: input.mangaSlug,
              },
            },
            chapter: {
              $eq: input.chapter,
            },
          },
        },
        { encodeValuesOnly: true },
      );

      const data = await getStrapiData<MangaChapter[]>("/manga-chapters", qs);
      return data.data[0];
    }),

  getChaptersBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          sort: ["createdAt:desc"],
          filters: {
            manga: {
              slug: {
                $eq: input.slug,
              },
            },
          },
          pagination: {
            pageSize: 500,
          },
        },

        {
          encodeValuesOnly: true,
        },
      );

      return getStrapiData<MangaChapter[]>("/manga-chapters", qs);
    }),
});
