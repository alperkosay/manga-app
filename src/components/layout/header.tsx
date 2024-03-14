"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./logo";
import { Button } from "../ui/button";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  {
    href: "/",
    title: "Anasayfa",
  },
  {
    href: "/manga",
    title: "Mangalar",
  },
  {
    href: "/kategori",
    title: "Kategoriler",
  },
  {
    href: "/populer",
    title: "Popüler 🌟",
  },
];

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const tl = useRef<gsap.core.Timeline>();

  const toggleMenu = () => setIsMenuActive((val) => !val);

  useGSAP(() => {
    gsap.set(".header-menu", { y: "-100%" });
    tl.current = gsap
      .timeline({ paused: true })
      .to(".header-menu", {
        y: 0,
        ease: "power4.inOut",
        duration: 1.25,
      })

      .fromTo(
        ".menu-link",
        {
          y: "120%",
        },
        {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        },
      )
      .to(".close-btn", {
        rotate: 90,
        delay: -1.25,
        ease: "power4.inOut",
        duration: 1,
      });
  });

  useEffect(() => {
    if (isMenuActive) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuActive]);

  return (
    <>
      <header
        className={` ${isMenuActive ? "fixed" : "absolute"} left-0 top-0 z-50 w-full`}
      >
        <div className="flex items-center justify-between p-8">
          <Link href={"/"} className="inline-block">
            <Logo />
          </Link>

          <Button onClick={toggleMenu} variant={"default"}>
            {isMenuActive ? "Close" : "Menu"}
          </Button>
        </div>
      </header>
      <div className="header-menu fixed left-0 top-0 z-40 h-svh w-full -translate-y-full bg-secondary  pt-32">
        <div className="relative h-full w-full">
          <nav className="absolute left-8 top-0 md:left-1/4">
            <ul className="flex flex-col">
              {menuLinks.map((item, index) => (
                <li
                  key={index}
                  className="overflow-hidden py-2 pb-4 transition-all duration-300 hover:-translate-y-4"
                >
                  <Link
                    href={item.href}
                    title={item.title}
                    className="menu-link inline-block text-7xl"
                    onClick={toggleMenu}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={toggleMenu}
            className="close-btn absolute bottom-10 left-10 text-9xl text-muted"
          >
            <p>&#x2715;</p>
          </button>
        </div>
      </div>
    </>
  );
}
