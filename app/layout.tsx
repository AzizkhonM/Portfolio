import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import localFont from "next/font/local";
import { Google_Sans_Code } from "next/font/google";

import "./globals.css";
import Script from "next/script";

const siteUrl = "https://theazizkhon.uz";

const seo = {
  uz: {
    title: "Azizkhon Muzaffarov — Software Engineer",
    description:
      "Azizkhon Muzaffarov — Software Engineer va Full-Stack Developer. Raqamli tizimlar, web ilovalar va zamonaviy software yechimlar yarataman.",
  },
  en: {
    title: "Azizkhon Muzaffarov — Software Engineer",
    description:
      "Azizkhon Muzaffarov — Software Engineer and Full-Stack Developer building digital systems, web applications, and modern software solutions.",
  },
  ru: {
    title: "Azizkhon Muzaffarov — Software Engineer",
    description:
      "Azizkhon Muzaffarov — Software Engineer и Full-Stack Developer. Создаю цифровые системы, веб-приложения и современные программные решения.",
  },
  ja: {
    title: "Azizkhon Muzaffarov — Software Engineer",
    description:
      "Azizkhon Muzaffarov — Software Engineer / Full-Stack Developer。デジタルシステム、Webアプリケーション、最新のソフトウェアを開発しています。",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const currentSeo = seo[locale as keyof typeof seo] ?? seo.uz;

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: currentSeo.title,
      template: "%s — Azizkhon Muzaffarov",
    },

    description: currentSeo.description,

    authors: [
      {
        name: "Azizkhon Muzaffarov",
      },
    ],

    creator: "Azizkhon Muzaffarov",

    openGraph: {
      type: "website",
      locale,
      url: locale === "uz" ? "/" : `/${locale}`,
      siteName: "Azizkhon Muzaffarov — Software Engineer",
      title: currentSeo.title,
      description: currentSeo.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Azizkhon Muzaffarov — Software Engineer",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.description,
      images: ["/og-image.png"],
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: locale === "uz" ? "/" : `/${locale}`,
      languages: {
        uz: "/",
        en: "/en",
        ru: "/ru",
        ja: "/ja",
      },
    },

    icons: {
      icon: "/favicon.svg",
    },
  };
}

const raptor = localFont({
  src: "../public/fonts/RaptorBold.ttf",
  variable: "--font-raptor",
});

const advaken = localFont({
  src: "../public/fonts/AdvakenSans.otf",
  variable: "--font-advaken",
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${advaken.variable} ${raptor.variable}`}>
      <body className={googleSansCode.variable}>
        {/* Umami */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="bcba335a-1b1a-4634-ba7f-fd3e947727c5"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G2P0NLGHQV"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G2P0NLGHQV');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
