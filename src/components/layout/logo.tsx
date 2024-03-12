import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      src={"/images/logo.png"}
      width={180}
      height={50}
      alt="Logo"
      className="object-contain"
    />
  );
}
