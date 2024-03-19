import QueryString from "qs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import { Genre } from "~/types/genre";
import { Payload } from "~/types/payload";
import { z } from "zod";

export const genreRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/genres`);

    const data = (await response.json()) as Payload<Genre[]>;

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
          populate: ["manga.cover"],
          filters: {
            slug: {
              $eq: input.slug,
            },
          },
        },
        { encodeValuesOnly: true },
      );

      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/genres?${qs}`);
      const data = (await response.json()) as Payload<Genre[]>;

      return data.data[0];
    }),
});
