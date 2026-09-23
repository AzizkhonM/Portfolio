"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadlineProps {
  lines: string[];
}

export function AnimatedHeadline({
  lines,
}: AnimatedHeadlineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = linesRef.current;

      gsap.set(items, {
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

      items.forEach((item, index) => {
        timeline.to(
          item,
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

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex min-h-screen items-center"
    >
      <h1 className="font-advaken lowercase max-w-4xl text-[2rem] font-medium leading-[0.98] tracking-[-0.04em] sm:text-[2.8rem] md:text-[4rem] lg:text-[5rem]">
        {lines.map((line, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) linesRef.current[index] = el;
            }}
            className="block"
          >
            {line}
          </span>
        ))}
      </h1>
    </div>
  );
}
