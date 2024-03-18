"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function Breadcrumb() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <section className="pb-4">
      <div className="relative z-10 flex-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ul className="flex flex-wrap items-center gap-2 gap-y-1.5 pr-2 text-lg lg:text-xl">
              <li className={`font-medium`}>
                <Link href={"/"}>Anasayfa</Link>
              </li>
              <li>
                <ChevronRight />
              </li>
              {pathNames.map((link, index) => {
                const href = `/${pathNames.slice(0, index + 1).join("/")}`;
                const active = paths === href;
                const title = link.charAt(0).toUpperCase() + link.slice(1);
                const titleParsed = title.replaceAll("-", " ");

                return (
                  <React.Fragment key={index}>
                    <li
                      className={`${active ? "font-bold text-primary" : "font-medium"}`}
                    >
                      <Link href={href} title={titleParsed} className="block">
                        {titleParsed}
                      </Link>
                    </li>
                    {pathNames.length !== index + 1 && (
                      <li>
                        {" "}
                        <ChevronRight />{" "}
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
