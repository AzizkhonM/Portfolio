import { Link } from "@/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";
import { InteractiveDotPattern } from "../ui/interactive-dot-pattern";
import { IntroScroll } from "./intro-scroll";
import { CommitTyping } from "./commit-typing";

export default async function Intro() {
  const t = await getTranslations("Intro");
  const locale = await getLocale();

  return (
    <IntroScroll
      lines={[
        t("headline.line1"),
        t("headline.line2"),
        t("headline.line3"),
        t("headline.line4"),
      ]}
    >
      <InteractiveDotPattern />

      <header className="relative z-10 flex items-start justify-between px-6 py-6 md:px-10 md:py-8">
        <div>
          <p className="text-sm font-medium tracking-tight">AZIZKHON MUZAFFAROV</p>

          <p className="mt-1 text-xs uppercase tracking-[0.2em] opacity-60">
            {t("role")}
          </p>
        </div>

        <nav className="flex gap-4 text-xs uppercase tracking-wider">
          {locale === "uz" ? (
            <span className="font-bold">UZ</span>
          ) : (
            <Link href="/" locale="uz">
              UZ
            </Link>
          )}

          {locale === "en" ? (
            <span className="font-bold">EN</span>
          ) : (
            <Link href="/" locale="en">
              EN
            </Link>
          )}

          {locale === "ru" ? (
            <span className="font-bold">RU</span>
          ) : (
            <Link href="/" locale="ru">
              RU
            </Link>
          )}

          {locale === "ja" ? (
            <span className="font-bold">JA</span>
          ) : (
            <Link href="/" locale="ja">
              JA
            </Link>
          )}
        </nav>
      </header>

      <div className="absolute bottom-6 left-6 right-6 z-10 md:bottom-8 md:left-10 md:right-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end">
          {/* Discipline */}
          <p className="text-center text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-left">
            {t("discipline")}
          </p>

          {/* Scroll */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] opacity-60">
              {t("scroll")}
            </span>

            <span className="animate-scroll-arrow text-lg leading-none opacity-70">
              ↓
            </span>
          </div>

          {/* Empty right column */}
          <div />
        </div>
      </div>
    </IntroScroll>
  );
}
