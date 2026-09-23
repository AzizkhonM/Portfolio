import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Software Engineer",
  description: "Software Engineer & Full-Stack Developer",
};

const raptor = localFont({
  src: "../public/fonts/RaptorBold.ttf",
  variable: "--font-raptor",
});

const advaken = localFont({
  src: "../public/fonts/AdvakenSans.otf",
  variable: "--font-advaken",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={advaken.variable}>
      <body>{children}</body>
    </html>
  );
}
