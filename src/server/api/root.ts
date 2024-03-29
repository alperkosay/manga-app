import { createTRPCRouter } from "~/server/api/trpc";
import { mangaRouter } from "./routers/manga";
import { genreRouter } from "./routers/genres";
import { mangaChapterRouter } from "./routers/manga-chapters";
import { mainSlidesRouter } from "./routers/main-slides";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  manga: mangaRouter,
  genre: genreRouter,
  mangaChapter: mangaChapterRouter,
  mainSlides: mainSlidesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
