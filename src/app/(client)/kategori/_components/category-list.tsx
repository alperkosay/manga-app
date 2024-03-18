import Link from "next/link";
import React from "react";
import { ROUTES } from "~/lib/consts";
import { Genre } from "~/types/genre";

export default function CategoryList({ categories }: { categories: Genre[] }) {
  return (
    <ul className="flex flex-wrap gap-4">
      {categories.map((genre, index) => (
        <li key={index}>
          <Link
            href={`${ROUTES.categories}/${genre.attributes.slug}`}
            className="text-lg"
          >
            {genre.attributes.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
