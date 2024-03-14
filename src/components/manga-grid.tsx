import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const gridVariants = cva("grid gap-4", {
  variants: {
    size: {
      default: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      sm: "grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5",
      lg: "grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface GridProps extends VariantProps<typeof gridVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

export default function MangaGrid({ size, ...props }: GridProps) {
  const Comp = "div";
  return <Comp className={gridVariants({ size })} {...props} />;
}
