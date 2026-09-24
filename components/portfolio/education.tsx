"use client";

import { useTranslations } from "next-intl";

const educationItems = ["najot", "jdu", "school21"] as const;

export function Education() {
  const t = useTranslations("Education");

  return (
    <section className="relative bg-[#FFFAF0]">
      <div className="px-6 py-8 md:px-10 md:py-10">
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-65">
            {t("number")}
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] opacity-65">
            {t("label")}
          </p>
        </div>

        {/* TIMELINE */}

        <div className="mt-[8dvh]">
          <div className="flex items-center gap-4">
            <span className="shrink-0 text-[9px] uppercase tracking-[0.2em] opacity-55">
              2022
            </span>

            <div className="h-px flex-1 bg-[#171411]/15" />

            <span className="shrink-0 text-[9px] uppercase tracking-[0.2em] opacity-55">
              {t("period").replace("2022 — ", "")}
            </span>
          </div>
        </div>

        {/* EDUCATION GRID */}

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {educationItems.map((item) => (
            <article
              key={item}
              className="
                flex
                min-h-[300px]
                flex-col
                border
                border-[#171411]/12
                bg-[#171411]/[0.02]
                p-5
                transition-colors
                duration-300
                hover:bg-[#171411]/[0.04]
                md:min-h-[320px]
                lg:min-h-[350px]
              "
            >
              {/* TOP */}

              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.2em] opacity-55">
                  {t(`items.${item}.number`)}
                </span>

                <span className="text-[9px] tracking-[0.2em] opacity-50">
                  /
                </span>
              </div>

              {/* MAIN */}

              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] opacity-55">
                  {t(`items.${item}.period`)}
                </p>

                <h2 className="mt-3 font-advaken text-[clamp(2rem,4vw,3.8rem)] font-medium lowercase leading-[0.9] tracking-[-0.04em]">
                  {t(`items.${item}.institution`)}
                </h2>

                <p className="mt-5 text-xs font-semibold uppercase leading-snug tracking-[0.02em]">
                  {t(`items.${item}.program`)}
                </p>

                <p className="mt-2 text-[10px] uppercase leading-[1.5] tracking-[0.08em] opacity-65">
                  {t(`items.${item}.type`)}
                </p>

                {item === "jdu" && (
                  <p className="mt-5 max-w-xl border-t border-[#171411]/10 pt-4 text-[10px] leading-[1.6] opacity-65">
                    {t(`items.${item}.coursework`)}
                  </p>
                )}

                <p className="mt-5 text-[9px] uppercase tracking-[0.15em] opacity-50">
                  {t("location")}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* FOOTER */}

        <div className="mt-8 flex justify-between text-[9px] uppercase tracking-[0.2em] opacity-50">
          <span>01 — 03</span>

          <span className="hidden md:block">EDUCATION & TRAINING</span>

          <span className="md:hidden">MY BACKGROUND</span>
        </div>
      </div>
    </section>
  );
}
