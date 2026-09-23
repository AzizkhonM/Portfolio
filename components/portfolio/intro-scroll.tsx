"use client";

import { useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CommitTyping } from "./commit-typing";

gsap.registerPlugin(ScrollTrigger);

interface IntroScrollProps {
  children: React.ReactNode;
  lines: React.ReactNode[];
}

export function IntroScroll({ children, lines }: IntroScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);

  const basePatternId = useId();
  const movingPatternId = useId();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRefs.current, {
        x: -120,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          scrub: true,
          pin: true,
        },
      });

      lineRefs.current.forEach((line, index) => {
        timeline.to(
          line,
          {
            x: 0,
            opacity: 1,
            ease: "none",
            duration: 1,
          },
          index,
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh overflow-hidden"
    >
      {/* Dot background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Base dots */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full fill-black/10"
        >
          <defs>
            <pattern
              id={basePatternId}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.8" />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill={`url(#${basePatternId})`}
          />
        </svg>

        {/* Moving dots */}
        <svg
          aria-hidden="true"
          className="animate-dot-drift absolute inset-0 h-full w-full fill-black/15"
        >
          <defs>
            <pattern
              id={movingPatternId}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.8" />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill={`url(#${movingPatternId})`}
          />
        </svg>
      </div>

      {children}

      {/* Headline */}
      <div className="relative z-10 grid min-h-[calc(100dvh-150px)] grid-cols-1 items-center px-6 md:px-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        {/* Hero text */}
        <h1 className="pointer-events-none max-w-4xl font-advaken text-[2rem] font-medium lowercase leading-[0.98] tracking-[-0.04em] sm:text-[2.8rem] md:text-[4rem] lg:text-[5rem]">
          {lines.map((line, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) {
                  lineRefs.current[index] = el;
                }
              }}
              className="block"
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Developer reference */}
        <div className="hidden lg:block">
          <CommitTyping />
        </div>
      </div>
    </section>
  );
}
