import { Manga } from "./manga";
import { Media } from "./media";

export interface MangaChapter {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    title: string;
    chapter: number;
    chapterImages: { data: Media[] };
    manga?: { data: Manga };
    slug: string;
  };
}
