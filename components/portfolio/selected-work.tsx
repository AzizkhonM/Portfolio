"use client";

import { useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    key: "zonter",
    number: "01",
    stack: "NEXT.JS / PRISMA / POSTGRES",
  },
  {
    key: "zmap",
    number: "02",
    stack: "NEXT.JS / PRISMA / NEON",
  },
] as const;

export function SelectedWork() {
  const t = useTranslations("SelectedWork");

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      const horizontalDistance = getDistance();
      const pauseDistance = 200;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${horizontalDistance + pauseDistance * 2}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        {},
        {
          duration: pauseDistance / horizontalDistance,
        },
      );

      timeline.to(track, {
        x: -horizontalDistance,
        duration: 1,
        ease: "none",
      });

      timeline.to(
        {},
        {
          duration: pauseDistance / horizontalDistance,
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden bg-[#FFFAF0]"
    >
      {/* HEADER */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-start justify-between px-6 py-8 md:px-10 md:py-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-50">
          {t("number")}
        </p>

        <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
          {t("label")}
        </p>
      </div>

      {/* HORIZONTAL TRACK */}
      <div ref={trackRef} className="flex min-h-dvh w-max items-center">
        {projects.map((project) => (
          <article
            key={project.key}
            className="
              flex
              min-h-dvh
              w-screen
              shrink-0
              items-center
              px-6
              pt-16
              md:px-10
              md:pt-20
            "
          >
            <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              {/* INFO */}
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.2em] opacity-40">
                    {project.number}
                  </span>

                  <span className="text-[10px] tracking-[0.2em] opacity-30">
                    /
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.15em] opacity-50">
                    {project.stack}
                  </span>
                </div>

                <h2
                  className="
                    font-advaken
                    text-[clamp(4rem,10vw,9rem)]
                    font-medium
                    lowercase
                    leading-[0.85]
                    tracking-[-0.05em]
                  "
                >
                  {t(`projects.${project.key}.name`)}
                </h2>

                <p className="mt-8 max-w-xl text-sm leading-[1.7] opacity-60 md:text-base">
                  {t(`projects.${project.key}.description`)}
                </p>
              </div>

              {/* VISUAL */}
              <div
                className="
                  relative
                  aspect-[4/3]
                  w-[calc(100vw-3rem)]
                  overflow-hidden
                  border
                  border-[#171411]/12
                  bg-[#171411]/[0.025]
                  lg:w-auto
                "
              >
                <img
                  src={`/projects/${project.key}.png`}
                  alt={t(`projects.${project.key}.name`)}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-30">
                    {project.key}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-6 z-20 md:left-10">
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">
          SCROLL →
        </span>
      </div>
    </section>
  );
}
