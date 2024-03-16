import { Manga } from "./manga";

export interface Genre {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    title?: string;
    slug?: string;
    manga?: { data: Manga };
  };
}

export interface Genre_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title?: string;
  slug?: string;
  manga?: Manga_Plain;
}
