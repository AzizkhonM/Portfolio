"use client";

import { useEffect, useRef } from "react";

const stages = [
  {
    text: 'git commit -m "final"',
    pause: 1000,
  },
  {
    text: 'git commit -m "final-final"',
    pause: 1500,
  },
  {
    text: 'git commit -m "final-final-v2"',
    pause: 2000,
  },
  {
    text: 'git commit -m "final-final-v2-FINAL"',
    pause: 2000,
  },
];

const TYPE_SPEED = 65;
const DELETE_SPEED = 35;
const CLEAR_PAUSE = 1500;

const STORAGE_KEY = "portfolio-commit-animation";

interface AnimationState {
  text: string;
  stageIndex: number;
  phase: "typing" | "pause" | "deleting" | "clear";
}

export function CommitTyping() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;

    if (!element) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const getState = (): AnimationState => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);

        if (saved) {
          return JSON.parse(saved);
        }
      } catch {}

      return {
        text: "",
        stageIndex: 0,
        phase: "typing",
      };
    };

    const saveState = (state: AnimationState) => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const render = (text: string) => {
      element.textContent = text;
    };

    const animate = async () => {
      let state = getState();

      render(state.text);

      while (!cancelled) {
        const stage = stages[state.stageIndex];

        if (!stage) {
          state = {
            text: "",
            stageIndex: 0,
            phase: "typing",
          };

          saveState(state);
          render("");

          await wait(CLEAR_PAUSE);
          continue;
        }

        // Typing
        if (state.phase === "typing") {
          for (
            let i = state.text.length + 1;
            i <= stage.text.length;
            i++
          ) {
            if (cancelled) return;

            state.text = stage.text.slice(0, i);

            render(state.text);
            saveState(state);

            await wait(TYPE_SPEED);
          }

          state.phase = "pause";
          saveState(state);
        }

        // Pause
        if (state.phase === "pause") {
          await wait(stage.pause);

          if (cancelled) return;

          if (state.stageIndex < stages.length - 1) {
            state.stageIndex += 1;
            state.phase = "typing";
            saveState(state);
          } else {
            state.phase = "deleting";
            saveState(state);
          }
        }

        // Deleting
        if (state.phase === "deleting") {
          for (let i = state.text.length - 1; i >= 0; i--) {
            if (cancelled) return;

            state.text = state.text.slice(0, i);

            render(state.text);
            saveState(state);

            await wait(DELETE_SPEED);
          }

          state = {
            text: "",
            stageIndex: 0,
            phase: "clear",
          };

          saveState(state);
        }

        // Fully clear → 1.5s break
        if (state.phase === "clear") {
          render("");

          await wait(CLEAR_PAUSE);

          if (cancelled) return;

          state = {
            text: "",
            stageIndex: 0,
            phase: "typing",
          };

          saveState(state);
        }
      }
    };

    animate();

    return () => {
      cancelled = true;

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className="font-google-sans-code text-[clamp(0.65rem,4cqw,0.95rem)] tracking-tight"
    >
      <span ref={textRef} />
      <span className="ml-px inline-block animate-pulse">▌</span>
    </span>
  );
}
