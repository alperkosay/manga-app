import { Manga, Manga_Plain } from "./manga";
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

export interface MangaChapter_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title: string;
  chapter: number;
  chapterImages: Media[];
  manga?: Manga_Plain;
  slug: string;
}
