import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Manga } from "~/types/manga";
import { MangaCardWithoutChapters } from "./cards/manga-card";

export default function MangaSlider({ mangaData }: { mangaData: Manga[] }) {
  return (
    <Carousel className="px-8">
      <CarouselContent>
        {mangaData.map((manga, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          >
            <MangaCardWithoutChapters manga={manga} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-2" />
      <CarouselNext className="-right-2" />
    </Carousel>
  );
}
