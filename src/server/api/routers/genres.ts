import QueryString from "qs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";
import { Genre } from "~/types/genre";
import { Payload } from "~/types/payload";

export const genreRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const qs = QueryString.stringify({});

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/genres${qs}`);

    const data = (await response.json()) as Payload<Genre[]>;

    return data;
  }),
});
