"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function IndexReveal() {
  const container = useRef(null);
  //   const [totalX, setTotalX] = useState(0);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLImageElement>(".slide-wrapper img");
      let totalX = 0;

      images.forEach((img) => {
        console.log(img.offsetWidth);
        totalX = totalX + img.clientWidth;
      });
      const tl = gsap.timeline();

      tl.to(".slide-wrapper", {
        x: `-${totalX}px`,
        duration: 2.5,
        ease: "power3.inOut",
      })
        .to(".slide-wrapper img", {
          // y: "-100%",
          width: "14.285vw",

          // stagger: {
          //   each: 0.2,
          //   from: "random",
          // },
          duration: 1.6,
          ease: "power4.out",
        })
        .to(".slide-wrapper img", {
          x: `${totalX}px`,
          delay: -1.8,
          duration: 0.6,
          ease: "power1.inOut",
        })
        .to(".bg-overlay", {
          "--tw-backdrop-blur": "blur(0px)",
        })
        .to(".slide-wrapper img", {
          y: "-100%",
          stagger: {
            each: 0.1,
            from: "random",
          },
          duration: 1.2,
          ease: "power3.inOut",
        })
        .to(container.current, {
          autoAlpha: 0,
          delay: -0.5,
        });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="absolute left-0 top-0 flex h-svh w-screen overflow-hidden "
    >
      <div className="bg-overlay fixed inset-0 left-0 top-0 z-10 bg-black/75 backdrop-blur-sm"></div>
      <div className="slide-wrapper relative flex">
        {[...(Array(7) as number[])].map((_, index) => (
          <Image
            src={`/images/reveal-images/${index + 1}.webp`}
            width={768}
            height={768}
            alt="slide-image"
            key={index}
            className="h-svh w-screen object-cover grayscale"
          />
        ))}
        {/* {[...Array(5)].map((_, index) => (
          <Image
            src={`/images/reveal-images/${index + 1}.webp`}
            width={768}
            height={768}
            alt="slide-image"
            key={index}
            className="h-svh w-screen object-cover grayscale"
          />
        ))} */}
      </div>
    </div>
  );
}
