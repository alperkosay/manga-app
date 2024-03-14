import { createTRPCRouter } from "~/server/api/trpc";
import { mangaRouter } from "./routers/manga";
import { genreRouter } from "./routers/genres";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  manga: mangaRouter,
  genre: genreRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
