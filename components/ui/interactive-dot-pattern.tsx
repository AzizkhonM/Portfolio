"use client";

import { useState } from "react";
import { DotPattern } from "./dot-pattern";

export function InteractiveDotPattern() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute inset-0"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Base dots */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={0.8}
        className="fill-[#171411]/10"
      />

      {/* Dark dots around cursor */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={0.8}
        className={hovered ? "fill-[#171411]/40" : "opacity-0"}
        style={{
          maskImage: `radial-gradient(
            circle 180px at ${mouse.x}px ${mouse.y}px,
            black 0%,
            transparent 100%
          )`,
          WebkitMaskImage: `radial-gradient(
            circle 180px at ${mouse.x}px ${mouse.y}px,
            black 0%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
}
