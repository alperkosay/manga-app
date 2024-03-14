"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { cn } from "~/lib/utils";

const PopularMangaList = [
  "One Piece",
  "Naruto",
  "Dragon Ball",
  "Attack on Titan",
  "One Punch Man",
  "Bleach",
  "Tokyo Ghoul",
  "Death Note",
  "My Hero Academia",
  "Hunter x Hunter",
  "Fairy Tail",
  "Fullmetal Alchemist",
  "Demon Slayer: Kimetsu no Yaiba",
  "Naruto: Shippuden",
  "Dragon Ball Z",
  "Berserk",
  "JoJo's Bizarre Adventure",
  "Attack on Titan: The Final Season",
  "Sailor Moon",
  "Haikyuu!!",
  "Black Clover",
  "Gintama",
  "Detective Conan",
  "The Seven Deadly Sins",
  "Yu Yu Hakusho",
  "One Piece: Stampede",
  "Magi: The Labyrinth of Magic",
  "Fruits Basket",
  "Neon Genesis Evangelion",
  "Sword Art Online",
];
gsap.registerPlugin(ScrollTrigger);

export default function ScrollMarquee({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.to(".marquee-content.scroll", {
        animationDuration: "60s",
      });
    },
    { scope: container },
  );

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 -z-10 w-screen rotate-12 overflow-hidden bg-black",
        className,
      )}
      ref={container}
    >
      <div className="marquee">
        <div className="marquee-content scroll">
          <MangaList />
        </div>

        <div className="marquee-content scroll copy">
          <MangaList />
        </div>
      </div>
    </div>
  );
}

function MangaList() {
  return PopularMangaList.map((manga, index) => (
    <span
      className="font-archivo_black py-4 text-4xl opacity-20 md:text-8xl"
      key={index}
    >
      {manga}
    </span>
  ));
}
