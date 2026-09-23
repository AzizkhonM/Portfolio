"use client";

import { useTranslations } from "next-intl";
import { RiCircleFill } from "react-icons/ri";

const languages = [
  {
    key: "uzbek",
    level: "native",
    dots: 5,
  },
  {
    key: "english",
    level: "b2",
    dots: 4,
  },
  {
    key: "russian",
    level: "b2",
    dots: 4,
  },
  {
    key: "japanese",
    level: "b1",
    dots: 3,
  },
] as const;

const interests = [
  {
    key: "cs2",
    number: "01",
  },
  {
    key: "wikipedia",
    number: "02",
  },
  {
    key: "localization",
    number: "03",
  },
  {
    key: "japanese",
    number: "04",
  },
] as const;

const exploring = [
  {
    key: "ai",
    number: "01",
  },
  {
    key: "systemDesign",
    number: "02",
  },
  {
    key: "frameworks",
    number: "03",
  },
] as const;

const levels = ["native", "c1", "b2", "b1", "a2", "a1"] as const;

export function BeyondCode() {
  const t = useTranslations("BeyondCode");

  return (
    <section className="relative bg-[#FFFAF0]">
      <div className="px-6 py-8 md:px-10 md:py-10">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-50">
            {t("number")}
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
            {t("label")}
          </p>
        </div>

        {/* HERO */}
        <div className="mt-[8dvh]">
          <h2
            className="
              max-w-5xl
              font-advaken
              text-[clamp(3rem,8vw,8rem)]
              font-medium
              lowercase
              leading-[0.88]
              tracking-[-0.045em]
            "
          >
            <span className="block">{t("headline.line1")}</span>
            <span className="block">{t("headline.line2")}</span>
          </h2>
        </div>

        {/* LANGUAGES */}
        <div className="mt-[12dvh]">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.22em] opacity-45">
              {t("languages.label")}
            </p>

            <p className="text-[9px] uppercase tracking-[0.18em] opacity-30">
              {t("languages.scale")}
            </p>
          </div>

          <div className="border-t border-[#171411]/12">
            {languages.map((language) => (
              <div
                key={language.key}
                className="
                  grid
                  grid-cols-[1fr_auto]
                  items-center
                  gap-4
                  border-b
                  border-[#171411]/12
                  py-4
                  md:grid-cols-[1fr_auto_auto]
                  md:gap-8
                "
              >
                <p className="text-xs font-medium uppercase tracking-[0.08em]">
                  {t(`languageNames.${language.key}`)}
                </p>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${
                          index < language.dots
                            ? "bg-[#171411]"
                            : "border border-[#171411]/25"
                        }
                      `}
                    />
                  ))}
                </div>

                <p className="hidden min-w-[145px] text-right text-[9px] uppercase tracking-[0.12em] opacity-45 md:block">
                  {t(`levels.${language.level}`)}
                </p>

                <p className="text-[9px] uppercase tracking-[0.12em] opacity-45 md:hidden">
                  {language.level.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* INTERESTS + EXPLORING */}
        <div className="mt-[12dvh] grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-0">
          {/* INTERESTS */}
          <div className="md:border-r md:border-[#171411]/12 md:pr-10">
            <div className="mb-5">
              <p className="text-[9px] uppercase tracking-[0.22em] opacity-45">
                {t("interests.label")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
              {interests.map((interest) => (
                <article
                  key={interest.key}
                  className="
                    group
                    border-t
                    border-[#171411]/12
                    py-6
                    transition-opacity
                    duration-300
                    hover:opacity-70
                  "
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] tracking-[0.2em] opacity-40">
                      {interest.number}
                    </span>
                  </div>

                  <h3 className="mt-10 font-advaken text-[clamp(2rem,4vw,3.5rem)] font-medium lowercase leading-[0.9] tracking-[-0.04em]">
                    {t(`interests.items.${interest.key}.title`)}
                  </h3>

                  <p className="mt-4 max-w-sm text-[10px] leading-[1.6] opacity-50">
                    {t(`interests.items.${interest.key}.description`)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* CURRENTLY EXPLORING */}
          <div className="md:pl-10">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.22em] opacity-45">
                {t("exploring.label")}
              </p>

              <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.15em] opacity-40">
                <RiCircleFill className="h-2 w-2 shrink-0 text-green-500 animate-status-blink" />
                {t("exploring.now")}
              </span>
            </div>

            <div className="border-t border-[#171411]/12">
              {exploring.map((item) => (
                <article
                  key={item.key}
                  className="
                    border-b
                    border-[#171411]/12
                    py-6
                  "
                >
                  <div className="flex items-start gap-4">
                    <span className="pt-1 text-[9px] tracking-[0.2em] opacity-35">
                      {item.number}
                    </span>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold uppercase tracking-[-0.01em]">
                        {t(`exploring.items.${item.key}.title`)}
                      </h3>

                      <p className="mt-3 max-w-md text-[10px] leading-[1.6] opacity-50">
                        {t(`exploring.items.${item.key}.description`)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 flex justify-between text-[9px] uppercase tracking-[0.2em] opacity-35">
          <span>01 — 03</span>

          <span className="hidden md:block">{t("footer.desktop")}</span>

          <span className="md:hidden">{t("footer.mobile")}</span>
        </div>
      </div>
    </section>
  );
}
