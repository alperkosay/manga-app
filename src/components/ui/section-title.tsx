import React from "react";

export default function SectionTitle({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className="font-archivo_black text-4xl">{children}</div>;
}
