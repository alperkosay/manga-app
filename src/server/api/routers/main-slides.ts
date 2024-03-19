import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "../trpc";
import QueryString from "qs";
import { Payload } from "~/types/payload";
import { MainSlide } from "~/types/main-slides";

export const mainSlidesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const qs = QueryString.stringify(
      {
        populate: ["manga.cover"],
      },
      { encodeValuesOnly: true },
    );
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/main-slides?${qs}`,
    );

    const data = (await response.json()) as Payload<MainSlide[]>;

    return data;
  }),
});
