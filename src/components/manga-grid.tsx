import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const gridVariants = cva("grid gap-4", {
  variants: {
    size: {
      default: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
      sm: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5",
      lg: "grid-cols-2 sm:grid-cols-4 md:5 lg:grid-cols-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function MangaGrid({
  size,
  children,
}: {
  size?: VariantProps<typeof gridVariants>;
  children: React.ReactNode;
}) {
  return <div className={gridVariants({ size })}>{children}</div>;
}
