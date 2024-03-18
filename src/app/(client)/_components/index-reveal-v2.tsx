"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

export default function IndexRevealV2() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          localStorage.setItem("first-load-animation", "true");
          container.current?.remove();
        },
      });

      const isFirstLoadActive = Boolean(
        localStorage.getItem("first-load-animation"),
      );

      tl.to(".slide-wrapper .image-slides img", {
        scale: 1.2,
        opacity: 0,
        stagger: {
          from: "end",
          each: isFirstLoadActive ? 0.1 : 0.6,
        },
        duration: isFirstLoadActive ? 0.5 : 1,
        ease: "power3.inOut",
      })
        .to(".grid-slides img", {
          width: "14.285vw",
          duration: isFirstLoadActive ? 0.8 : 1.6,
          ease: "power4.out",
        })
        .to(".bg-overlay", {
          "--tw-backdrop-blur": "blur(0px)",
          delay: -0.5,
        })
        .to(".grid-slides img", {
          y: "-100%",
          stagger: {
            each: 0.1,
            from: "random",
          },
          duration: isFirstLoadActive ? 0.6 : 1.2,
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
      className="fixed left-0 top-0 z-20 flex h-svh w-screen overflow-hidden bg-background"
    >
      <div className="bg-overlay fixed inset-0 left-0 top-0 z-20 bg-background/75 backdrop-blur-sm"></div>
      <div className="slide-wrapper relative h-full w-full">
        <div className="image-slides relative z-10 flex h-full w-full">
          {[...(Array(7) as number[])].map((_, index) => (
            <Image
              src={`/images/reveal-images/${index + 1}.webp`}
              width={768}
              height={768}
              alt="slide-image"
              key={index}
              className="absolute left-0 top-0 h-svh w-screen object-cover grayscale"
            />
          ))}
        </div>

        <div className="grid-slides absolute left-0 top-0 flex h-full w-full justify-center">
          {[...(Array(7) as number[])].map((_, index) => (
            <Image
              src={`/images/reveal-images/${index + 1}.webp`}
              width={768}
              height={768}
              alt="slide-image"
              key={index}
              className="h-svh w-[50vw] object-cover grayscale"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
