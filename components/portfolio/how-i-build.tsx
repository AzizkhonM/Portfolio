"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = ["idea", "frontend", "backend", "database", "deploy"] as const;

export function HowIBuild() {
  const t = useTranslations("HowIBuild");

  const sectionRef = useRef<HTMLElement>(null);

  const desktopStageRefs = useRef<HTMLDivElement[]>([]);
  const desktopConnectorRefs = useRef<HTMLDivElement[]>([]);

  const tabletStageRefs = useRef<HTMLDivElement[]>([]);
  const mobileCardRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* =====================================================
         DESKTOP / TABLET
      ===================================================== */

      mm.add("(min-width: 1024px)", () => {
        const stageElements = desktopStageRefs.current;
        const connectorElements = desktopConnectorRefs.current;

        gsap.set(stageElements, {
          opacity: 0.2,
          scale: 0.94,
        });

        gsap.set(connectorElements, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        stageElements.forEach((stage, index) => {
          timeline.to(stage, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          if (connectorElements[index]) {
            timeline.to(
              connectorElements[index],
              {
                scaleX: 1,
                duration: 0.5,
                ease: "power2.inOut",
              },
              "<",
            );
          }

          timeline.to(
            {},
            {
              duration: 0.35,
            },
          );
        });
      });

      /* =====================================================
         TABLET — 768px → 1023px
      ===================================================== */

      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const stageElements = tabletStageRefs.current;

        if (!stageElements.length) return;

        gsap.set(stageElements, {
          opacity: 0.2,
          scale: 0.94,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        stageElements.forEach((stage) => {
          timeline.to(stage, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          timeline.to(
            {},
            {
              duration: 0.35,
            },
          );
        });
      });

      /* =====================================================
         MOBILE
      ===================================================== */

      mm.add("(max-width: 767px)", () => {
        const cards = mobileCardRefs.current;

        if (!cards.length) return;

        /*
         * Initial stack:
         *
         * 01 → front
         * 02 → slightly down
         * 03 → more down
         * 04 → more down
         * 05 → more down
         */

        gsap.set(cards, {
          y: (index) => {
            const gap = window.innerWidth >= 768 ? 32 : 24;
            return index * gap;
          },
          scale: (index) => 1 - index * 0.035,
          opacity: (index) => {
            if (index === 0) return 1;
            if (index === 1) return 0.12;
            return 0;
          },
          zIndex: (index) => cards.length - index,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) return;

          const previousCard = cards[index - 1];

          /*
           * Current card leaves upward.
           */
          timeline.to(previousCard, {
            y: -170,
            scale: 0.92,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          });

          /*
           * Next card moves from the stack
           * into the main position.
           */
          timeline.to(
            card,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "<",
          );

          /*
           * Small pause between stages.
           */
          timeline.to(
            {},
            {
              duration: 0.35,
            },
          );
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden bg-[#FFFAF0]"
    >
      <div className="flex min-h-dvh flex-col px-6 py-8 md:px-10 md:py-10">
        {/* HEADER */}

        <div className="flex items-start justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-50">
            {t("number")}
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
            {t("label")}
          </p>
        </div>

        {/* TITLE */}

        <div className="pt-[7dvh]">
          <h2
            className="
              font-advaken
              text-[clamp(3rem,7vw,7rem)]
              font-medium
              lowercase
              leading-[0.88]
              tracking-[-0.045em]
            "
          >
            <span className="block">{t("title.line1")}</span>

            <span className="block">{t("title.line2")}</span>
          </h2>
        </div>

        {/* =================================================
            DESKTOP
        ================================================= */}

        <div className="hidden flex-1 items-center lg:flex">
          <div className="w-full">
            <div className="flex w-full items-start">
              {stages.map((stage, index) => {
                const tools =
                  stage === "idea"
                    ? []
                    : (t.raw(`stages.${stage}.tools`) as string[]);

                return (
                  <div key={stage} className="flex flex-1 items-start">
                    <div
                      ref={(el) => {
                        if (el) {
                          desktopStageRefs.current[index] = el;
                        }
                      }}
                      className="w-full max-w-[190px]"
                    >
                      <StageCard
                        index={index}
                        stage={stage}
                        tools={tools}
                        t={t}
                      />
                    </div>

                    {index < stages.length - 1 && (
                      <div
                        ref={(el) => {
                          if (el) {
                            desktopConnectorRefs.current[index] = el;
                          }
                        }}
                        className="
                          mt-[95px]
                          h-px
                          flex-1
                          bg-[#171411]/20
                        "
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            TABLET HORIZONTAL
        ================================================= */}

        <div className="hidden flex-1 items-center md:flex lg:hidden">
          <div className="w-full overflow-hidden">
            <div className="flex w-full items-start gap-5">
              {stages.map((stage, index) => {
                const tools =
                  stage === "idea"
                    ? []
                    : (t.raw(`stages.${stage}.tools`) as string[]);

                return (
                  <div
                    key={stage}
                    ref={(el) => {
                      if (el) {
                        tabletStageRefs.current[index] = el;
                      }
                    }}
                    className="min-w-0 flex-1"
                  >
                    <StageCard
                      index={index}
                      stage={stage}
                      tools={tools}
                      t={t}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE STACK
        ================================================= */}

        <div className="flex flex-1 items-center md:hidden">
          <div className="relative h-[470px] w-full min-[768px]:max-[1023px]:mt-4">
            {stages.map((stage, index) => {
              const tools =
                stage === "idea"
                  ? []
                  : (t.raw(`stages.${stage}.tools`) as string[]);

              return (
                <div
                  key={stage}
                  ref={(el) => {
                    if (el) {
                      mobileCardRefs.current[index] = el;
                    }
                  }}
                  className="absolute left-0 top-0 w-full"
                >
                  <StageCard
                    index={index}
                    stage={stage}
                    tools={tools}
                    t={t}
                    mobile
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}

        <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] opacity-35">
          <span>01 — 05</span>

          <span className="hidden md:block">ENGINEERING PROCESS</span>

          <span className="md:hidden">SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STAGE CARD
========================================================= */

function StageCard({
  index,
  stage,
  tools,
  t,
}: {
  index: number;
  stage: (typeof stages)[number];
  tools: string[];
  t: ReturnType<typeof useTranslations>;
  mobile?: boolean;
}) {
  return (
    <div className="w-full">
      {/* CARD */}

      <div
        className="
          relative
          aspect-square
          w-full
          bg-[#171411]/20
          [clip-path:polygon(0_0,100%_0,100%_70%,70%_100%,0_100%)]
        "
      >
        <div
          className="
            absolute
            inset-px
            bg-[#FFFAF0]
            p-5
            [clip-path:polygon(0_0,100%_0,100%_70%,70%_100%,0_100%)]
          "
        >
          <div className="flex h-full flex-col justify-between">
            {/* NUMBER */}

            <div className="flex justify-between">
              <span className="text-[9px] tracking-[0.2em] opacity-40">
                0{index + 1}
              </span>

              <span className="text-[9px] tracking-[0.2em] opacity-30">/</span>
            </div>

            {/* CONTENT */}

            <div>
              <p className="text-[9px] uppercase tracking-[0.18em] opacity-40 min-[768px]:max-[1023px]:text-[8px]">
                {t(`stages.${stage}.label`)}
              </p>

              <h3 className="mt-2 max-w-[280px] text-base font-semibold uppercase leading-tight tracking-[-0.02em] min-[768px]:max-[1023px]:text-[13px]">
                {t(`stages.${stage}.title`)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}

      <p className="mt-4 max-w-[340px] text-[11px] leading-[1.6] opacity-55 min-[768px]:max-[1023px]:text-[10px]">
        {t(`stages.${stage}.description`)}
      </p>

      {/* TOOLS */}

      {tools.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tools.map((tool) => (
            <span
              key={tool}
              className="
                border
                border-[#171411]/12
                px-2
                py-1
                text-[8px] min-[768px]:max-[1023px]:text-[7px]
                uppercase
                tracking-[0.12em]
                opacity-55
              "
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
