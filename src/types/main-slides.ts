import { Manga } from "./manga";

export interface MainSlide {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    manga?: { data: Manga };
  };
}
