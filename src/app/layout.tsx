import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/layout/header";
import { comfortaa, archivo_black } from "~/lib/fonts";

import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Manga App",
  description: "Developed by Alper Koşay",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${comfortaa.variable} ${archivo_black.variable}`}
    >
      <body className={`font-sans ${inter.variable}`}>
        <NextTopLoader color="#3a31d8" />

        <Header />
        <TRPCReactProvider>
          <div className="pt-32">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
