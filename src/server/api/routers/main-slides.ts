import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "../trpc";
import QueryString from "qs";
import { Payload } from "~/types/payload";
import { MainSlide } from "~/types/main-slides";
import { getStrapiData } from "~/lib/utils";

export const mainSlidesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const qs = QueryString.stringify(
      {
        populate: ["manga.cover"],
      },
      { encodeValuesOnly: true },
    );
    return getStrapiData<MainSlide[]>("/main-slides", qs);
  }),
});
