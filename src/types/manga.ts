import { Genre } from "./genre";
import { MangaChapter } from "./manga-chapter";
import { Media } from "./media";

export enum Status {
  YayNlanmad = "Yayınlanmadı",
  DevamEdiyor = "Devam Ediyor",
  Tamamland = "Tamamlandı",
}

export interface Manga {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    title: string;
    slug: string;
    status: Status;
    otherNames?: string;
    year: Date;
    cover: { data: Media };
    manga_chapters: { data: MangaChapter[] };
    genres: { data: Genre[] };
    description?: string;
  };
}
