import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Manga_Plain, type Manga } from "~/types/manga";
import { type Payload } from "~/types/payload";

import QueryString from "qs";
import { z } from "zod";
export const mangaRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          pageSize: z.string().or(z.number()).optional(),
          page: z.string().or(z.number()).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const qs = QueryString.stringify({
        populate: {
          cover: true,
        },
        sort: {
          createdAt: "desc",
        },
        pagination: {
          pageSize: input?.pageSize || 15,
          page: input?.page,
        },
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

  getBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          populate: "*",
          filters: {
            slug: {
              $eq: input.slug,
            },
          },
        },
        { encodeValuesOnly: true },
      );
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/mangas?${qs}`);
      const data = (await response.json()) as Payload<Manga[]>;

      return data.data[0];
    }),
});
