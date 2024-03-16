import { Genre, Genre_Plain } from "./genre";
import { MangaChapter, MangaChapter_Plain } from "./manga-chapter";
import { Media, Media_Plain } from "./media";

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

export interface Manga_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title: string;
  slug: string;
  status: Status;
  otherNames?: string;
  year: Date;
  cover: Media_Plain;
  manga_chapters: MangaChapter_Plain[];
  genres: Genre_Plain[];
  description?: string;
}
