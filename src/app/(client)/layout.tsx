import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/layout/header";
import { comfortaa, archivo_black, inter } from "~/lib/fonts";

import NextTopLoader from "nextjs-toploader";
import Footer from "~/components/layout/footer";

export const metadata = {
  title: "Future Manga",
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

        <TRPCReactProvider>
          <Header />
          <div className="pt-32">{children}</div>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
