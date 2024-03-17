import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const sectionTitleVariant = cva("font-archivo_black ", {
  variants: {
    size: {
      default: "text-4xl",
      sm: "text-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SectionTitleProps
  extends VariantProps<typeof sectionTitleVariant> {
  children?: React.ReactNode;
}

export default function SectionTitle({ size, ...props }: SectionTitleProps) {
  const Comp = "div";
  return <Comp className={sectionTitleVariant({ size })} {...props} />;
}
