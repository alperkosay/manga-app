import QueryString from "qs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import { Genre } from "~/types/genre";
import { Payload } from "~/types/payload";
import { z } from "zod";
import { getStrapiData } from "~/lib/utils";

export const genreRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return getStrapiData<Genre[]>("/genres");
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

      const data = await getStrapiData<Genre[]>("/genres", qs);

      return data.data[0];
    }),
});
