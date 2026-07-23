"use client";

import { DATA } from "@/data/resume";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const LINES = [
  `> boot portfolio --user ${slugify(DATA.name)}`,
  "> loading modules: react · next.js · typescript",
  "> compiling ui: hero, projects, skills, contact",
  "> build successful ✓ launching...",
];

const TYPING_MS_PER_CHAR = 12;
const HOLD_MS = 400;
const EXIT_MS = 550;

const TOTAL_CHARS = LINES.reduce((sum, line) => sum + line.length, 0);
const TOTAL_TYPING_MS = TOTAL_CHARS * TYPING_MS_PER_CHAR;

/**
 * Seconds until the overlay starts revealing the page.
 * The hero uses this to time its entrance animations.
 */
export const PRELOADER_REVEAL_DELAY = (TOTAL_TYPING_MS + HOLD_MS) / 1000;

// Per-line typing schedule (delay = when the previous lines finish)
let accumulated = 0;
const LINE_META = LINES.map((line, index) => {
  const chars = line.length;
  const delay = accumulated * TYPING_MS_PER_CHAR;
  accumulated += chars;
  return {
    text: line,
    chars,
    delay,
    duration: chars * TYPING_MS_PER_CHAR,
    isLast: index === LINES.length - 1,
  };
});

// CSS 3D cube — six faces pushed out from the center (cube is 4rem wide)
const CUBE_FACES = [
  "[transform:translateZ(2rem)]",
  "[transform:rotateY(180deg)_translateZ(2rem)]",
  "[transform:rotateY(90deg)_translateZ(2rem)]",
  "[transform:rotateY(-90deg)_translateZ(2rem)]",
  "[transform:rotateX(90deg)_translateZ(2rem)]",
  "[transform:rotateX(-90deg)_translateZ(2rem)]",
];

/**
 * Full-screen "boot sequence" shown when the home page loads.
 *
 * IMPORTANT: the whole animation (typing, caret, progress bar, percentage,
 * final fade-out) runs on a pure-CSS timeline that starts as soon as the HTML
 * paints — it does NOT wait for React to hydrate. This means it plays
 * correctly even on a cold first load while the page JavaScript is still
 * downloading/compiling. JavaScript only handles scroll-locking, the
 * reduced-motion skip, and removing the overlay from the DOM afterwards.
 */
export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  // Remove the overlay from the DOM once the CSS exit animation has finished.
  // Anchored to wall-clock time (performance.now() ≈ time since page load),
  // so late hydration just removes it immediately instead of re-waiting.
  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }
    const removeAt = TOTAL_TYPING_MS + HOLD_MS + EXIT_MS + 100;
    const remaining = Math.max(0, removeAt - performance.now());
    const id = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(id);
  }, [prefersReducedMotion]);

  // Lock scrolling until the reveal moment (skipped if it already passed)
  useEffect(() => {
    if (!visible || prefersReducedMotion) return;
    const remaining = TOTAL_TYPING_MS + HOLD_MS - performance.now();
    if (remaining <= 0) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    const id = setTimeout(() => {
      html.style.overflow = previous;
    }, remaining);
    return () => {
      clearTimeout(id);
      html.style.overflow = previous;
    };
  }, [visible, prefersReducedMotion]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="preloader-overlay fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-background"
      style={{
        animation: `preloader-exit ${EXIT_MS}ms ease-in-out ${
          TOTAL_TYPING_MS + HOLD_MS
        }ms both`,
      }}
    >
      {/* Ambient backdrop to match the site */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_50%,transparent_100%)]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 via-violet-500/15 to-cyan-400/20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-10 px-6">
        {/* Spinning 3D code cube */}
        <div className="[perspective:600px]">
          <div className="relative size-16 animate-cube-spin [transform-style:preserve-3d]">
            {CUBE_FACES.map((face) => (
              <div
                key={face}
                className={`absolute inset-0 flex items-center justify-center border-2 border-indigo-400/60 bg-indigo-500/10 font-mono text-sm text-cyan-300/90 shadow-[0_0_24px_rgba(99,102,241,0.35)] ${face}`}
              >
                {"</>"}
              </div>
            ))}
          </div>
        </div>

        {/* Terminal typing the boot log — clip-reveal driven entirely by CSS */}
        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d1022]/95 shadow-2xl shadow-indigo-500/10">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-white/40">
              boot.log
            </span>
          </div>
          <div className="space-y-1 p-4 font-mono text-[13px] leading-5">
            {LINE_META.map((line) => (
              <p key={line.text} className="min-h-5">
                <span
                  className="preloader-line-clip"
                  style={
                    {
                      "--line-length": `${line.chars}ch`,
                      animation: `preloader-typing ${line.duration}ms steps(${line.chars}, end) ${line.delay}ms both`,
                    } as React.CSSProperties
                  }
                >
                  <span className="text-cyan-300">{line.text.slice(0, 1)}</span>
                  <span
                    className={
                      line.isLast ? "text-emerald-300" : "text-white/70"
                    }
                  >
                    {line.text.slice(1)}
                  </span>
                </span>
                <span
                  className="preloader-caret ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-cyan-300 align-baseline"
                  style={{
                    animation: `${
                      line.isLast
                        ? "preloader-caret-window-hold"
                        : "preloader-caret-window"
                    } ${line.duration}ms linear ${line.delay}ms both, preloader-caret-blink 1.2s ease-out infinite`,
                  }}
                />
              </p>
            ))}
          </div>
        </div>

        {/* Progress — bar fill and percentage are both CSS-animated */}
        <div className="w-full">
          <div className="h-1 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
              style={{
                animation: `preloader-progress ${TOTAL_TYPING_MS}ms linear both`,
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>booting portfolio</span>
            <span
              className="preloader-percent"
              style={{
                animation: `preloader-counting ${TOTAL_TYPING_MS}ms linear both`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
