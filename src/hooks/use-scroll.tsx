"use client";
import { useEffect, useState } from "react";

const useScroll = () => {
  const [scrollCount, setScrollCount] = useState<number>(0);

  function scrollHandler() {
    setScrollCount(window.scrollY);
  }

  useEffect(() => {
    setScrollCount(window.scrollY);
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return {
    scrollCount,
  };
};

export default useScroll;
