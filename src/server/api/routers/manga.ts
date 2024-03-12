import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Manga } from "~/types/manga";
import { Payload } from "~/types/payload";

import QueryString from "querystring";
export const mangaRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const qs = QueryString.stringify({
      populate: "*",
    });

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/mangas?${qs}`);
    const data: Payload<Manga[]> = await response.json();

    return data;
  }),
});
