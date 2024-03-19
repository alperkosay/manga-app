import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/lib/consts";
import { Genre } from "~/types/genre";

export default function CategoryList({ categories }: { categories: Genre[] }) {
  return (
    <ul className="my-4 flex flex-wrap gap-4 border-y py-4">
      {categories.map((genre, index) => (
        <li key={index}>
          <Button asChild variant={"outline"}>
            <Link
              href={`${ROUTES.categories}/${genre.attributes.slug}`}
              className="text-lg"
            >
              {genre.attributes.title}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
