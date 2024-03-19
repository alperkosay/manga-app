import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { env } from "~/env";
import { ROUTES } from "~/lib/consts";
import { MainSlide } from "~/types/main-slides";

export default function HeroSection({
  mangaSlides,
}: {
  mangaSlides: MainSlide[];
}) {
  return (
    <section className="mb-10">
      <Carousel>
        <CarouselContent>
          {mangaSlides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="relative  h-[300px] py-4 before:absolute before:inset-0 before:z-10 before:bg-black/70 md:h-[400px]"
            >
              <Image
                src={
                  env.NEXT_PUBLIC_MEDIA_PREFIX +
                  slide.attributes.manga?.data.attributes.cover.data.attributes
                    .url
                }
                width={1440}
                height={900}
                alt={slide.attributes.manga?.data.attributes.title || "Slide"}
                className="absolute h-full w-full object-cover object-center blur-lg"
              />

              <div className="container relative z-10 flex h-full gap-4  max-md:px-3 md:flex-row">
                <Link
                  href={`${ROUTES.manga}/${slide.attributes.manga?.data.attributes.slug}`}
                >
                  <Image
                    src={
                      env.NEXT_PUBLIC_MEDIA_PREFIX +
                      slide.attributes.manga?.data.attributes.cover.data
                        .attributes.url
                    }
                    width={400}
                    height={900}
                    alt={
                      slide.attributes.manga?.data.attributes.title || "Slide"
                    }
                    className=" h-full w-40 object-contain md:w-80"
                  />
                </Link>

                <div className="my-6 flex-1 space-y-2 md:space-y-4">
                  <h2 className="line-clamp-2 py-1.5 text-3xl md:line-clamp-3 md:text-4xl">
                    {slide.attributes.manga?.data.attributes.title}
                  </h2>
                  <p className="line-clamp-4 md:line-clamp-4">
                    {slide.attributes.manga?.data.attributes.description}
                  </p>

                  <Button asChild>
                    <Link
                      href={`${ROUTES.manga}/${slide.attributes.manga?.data.attributes.slug}`}
                      title={slide.attributes.manga?.data.attributes.title}
                    >
                      Mangayı incele
                    </Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
