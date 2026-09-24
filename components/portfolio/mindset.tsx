"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principleKeys = ["structure", "simple", "change", "improve"] as const;

export function Mindset() {
  const t = useTranslations("Mindset");

  const sectionRef = useRef<HTMLElement>(null);
  const oldTextRef = useRef<HTMLDivElement>(null);
  const newTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const oldText = oldTextRef.current;
    const newText = newTextRef.current;
    const cards = cardsRef.current;

    if (!section || !oldText || !newText || !cards) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(oldText, {
        y: 0,
        opacity: 1,
      });

      gsap.set(newText, {
        y: "80%",
        opacity: 0,
      });

      gsap.set(cards, {
        y: 50,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Bir oz ushlab turadi
      timeline.to(
        {},
        {
          duration: 0.3,
        },
      );

      // 2. Eski text tepaga chiqib ketadi
      timeline.to(oldText, {
        y: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      // 3. Yangi text pastdan kirib keladi
      timeline.to(
        newText,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "<",
      );

      // 4. Yangi text biroz turadi
      timeline.to(
        {},
        {
          duration: 0.7,
        },
      );

      // 5. Cardlar kirib keladi
      timeline.to(cards, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden bg-[#FFFAF0]"
    >
      <div className="flex min-h-dvh flex-col px-6 py-8 md:px-10 md:py-10">
        {/* SECTION HEADER */}
        <div className="flex items-start justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-65">
            {t("number")}
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] opacity-65">
            {t("label")}
          </p>
        </div>

        {/* STATEMENT + CARDS */}
        <div className="flex flex-1 flex-col pt-[5dvh]  max-md:justify-start md:justify-between">
          {/* STATEMENT */}
          <div className="relative h-[calc(clamp(2.8rem,8vw,8rem)*1.8)] w-full">
            {/* OLD TEXT */}
            <h2
              ref={oldTextRef}
              className="
                absolute
                left-0
                top-0
                font-advaken
                text-[clamp(2.8rem,8vw,8rem)]
                font-medium
                lowercase
                leading-[0.9]
                tracking-[-0.045em]
                will-change-transform
              "
            >
              <span className="block">{t("statement.line1")}</span>
              <span className="block">{t("statement.line2")}</span>
            </h2>

            {/* NEW TEXT */}
            <h2
              ref={newTextRef}
              className="
                absolute
                left-0
                top-0
                font-advaken
                text-[clamp(2.8rem,8vw,8rem)]
                font-medium
                lowercase
                leading-[0.9]
                tracking-[-0.045em]
                will-change-transform
              "
            >
              <span className="block">{t("statement.line3")}</span>
              <span className="block">{t("statement.line4")}</span>
            </h2>
          </div>

          {/* CARDS */}
          <div
            ref={cardsRef}
            className="
              mt-5
              grid
              grid-cols-1
              gap-3
              border-t
              border-[#171411]/15
              pt-5
              md:grid-cols-2
              lg:grid-cols-4
            "
          >
            {principleKeys.map((key, index) => (
              <article
                key={key}
                className="
                  min-h-[160px]
                  border
                  border-[#171411]/12
                  bg-[#171411]/[0.025]
                  p-4
                  md:min-h-[190px]
                  md:p-5
                  lg:min-h-[210px]
                "
              >
                <div className="mb-5 flex items-center justify-between sm:mb-6 md:mb-8">
                  <span className="text-[9px] tracking-[0.2em] opacity-55 sm:text-[10px]">
                    0{index + 1}
                  </span>

                  <span className="text-[9px] tracking-[0.2em] opacity-50 sm:text-[10px]">
                    /
                  </span>
                </div>

                <h3 className="max-w-[200px] text-[11px] font-semibold uppercase leading-snug tracking-[0.05em] sm:text-xs">
                  {t(`principles.${key}.title`)}
                </h3>

                <p className="mt-3 max-w-[280px] text-[11px] leading-[1.55] opacity-55 sm:mt-4 sm:text-xs sm:leading-[1.6]">
                  {t(`principles.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
