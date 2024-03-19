import { Comfortaa, Archivo_Black, Inter } from "next/font/google";

export const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--family-comfortaa",
});

export const archivo_black = Archivo_Black({
  subsets: ["latin"],
  variable: "--family-archivo_black",
  weight: "400",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
