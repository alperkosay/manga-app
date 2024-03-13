import React from "react";

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

export default function ScrollMarquee() {
  return (
    <div className="h-full -translate-y-1/2 -rotate-45 overflow-hidden">
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
    <span className="text-7xl" key={index}>
      {manga}
    </span>
  ));
}
