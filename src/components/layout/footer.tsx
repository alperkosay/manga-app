import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { menuLinks } from "~/lib/consts";

export default function Footer() {
  return (
    <footer className="mt-14">
      <div className="mx-auto max-w-screen-lg rounded-t-[1rem] border border-b-0 p-6 pb-2">
        <div className="flex flex-col justify-between space-y-4 md:flex-row">
          <Logo />

          <ul className="flex flex-col gap-6 gap-y-3 md:flex-row">
            {menuLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  title={item.title}
                  className="text-lg font-semibold"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="text-center">
            {new Date().getFullYear()} Future Manga &copy; Tüm Hakları saklıdır.{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
