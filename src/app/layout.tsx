import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./design.css";

const readexProRegular = localFont({
  src: "./fonts/ReadexPro-Regular.ttf",
  variable: "--font-readexpro-regular",
});
const readexProBold = localFont({
  src: "./fonts/ReadexPro-Bold.ttf",
  variable: "--font-readexpro-bold",
});

const libreFranklinRegular = localFont({
  src: "./fonts/LibreFranklin-Regular.ttf",
  variable: "--font-librefranklin-regular",
});
const libreFranklinBold = localFont({
  src: "./fonts/LibreFranklin-Bold.ttf",
  variable: "--font-librefranklin-bold",
});

export const metadata: Metadata = {
  title: "Astro Aura",
  description: "What's your aura?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreFranklinRegular.variable} ${libreFranklinBold.variable} ${readexProRegular.variable} ${readexProBold.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
