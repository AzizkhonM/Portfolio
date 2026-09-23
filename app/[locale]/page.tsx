import { getLocale } from "next-intl/server";

import { BeyondCode } from "@/components/portfolio/beyond-code";
import { Contact } from "@/components/portfolio/contact";
import { Education } from "@/components/portfolio/education";
import { HowIBuild } from "@/components/portfolio/how-i-build";
import Intro from "@/components/portfolio/intro";
import { Mindset } from "@/components/portfolio/mindset";
import { SelectedWork } from "@/components/portfolio/selected-work";

const siteUrl = "https://theazizkhon.uz";

export default async function HomePage() {
  const locale = await getLocale();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Azizkhon Muzaffarov",
        url: siteUrl,
        jobTitle: "Software Engineer",
        description:
          "Software Engineer and Full-Stack Developer building digital systems, web applications, and modern software solutions.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
        sameAs: [
          "https://github.com/AzizkhonM",
          "https://linkedin.com/in/azizkhon-muzaffarov/",
          "https://t.me/azizkhon_muzaffarov",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Azizkhon Muzaffarov — Software Engineer",
        description:
          "Personal portfolio of Azizkhon Muzaffarov, a Software Engineer and Full-Stack Developer.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: locale,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main>
        <Intro />
        <Mindset />
        <SelectedWork />
        <HowIBuild />
        <Education />
        <BeyondCode />
        <Contact />

        {/*<section
          id="works"
          className="min-h-screen"
        />*/}
      </main>
    </>
  );
}
