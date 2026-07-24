"use client";

import { PRELOADER_REVEAL_DELAY } from "@/components/preloader";
import { TiltCard } from "@/components/tilt-card";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRightIcon, FileDownIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const TERMINAL_SKILLS = DATA.skills.slice(0, 6).join(" · ");
const TERMINAL_PROJECTS = DATA.projects.map((project) => slugify(project.title));

const SOCIALS = [
  {
    name: "GitHub",
    url: DATA.contact.social.GitHub.url,
    icon: DATA.contact.social.GitHub.icon,
    external: true,
  },
  {
    name: "LinkedIn",
    url: DATA.contact.social.LinkedIn.url,
    icon: DATA.contact.social.LinkedIn.icon,
    external: true,
  },
  {
    name: "Email",
    url: `mailto:${DATA.contact.email}`,
    icon: DATA.contact.social.email.icon,
    external: false,
  },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const orbSlowY = useTransform(scrollY, [0, 600], [0, 120]);
  const orbFastY = useTransform(scrollY, [0, 600], [0, -100]);

  const [firstName, ...restName] = DATA.name.split(" ");
  const lastName = restName.join(" ");

  // The preloader's animation is a CSS timeline anchored to page load, so
  // only wait out whatever part of it is still remaining once we hydrate
  // (performance.now() ≈ ms since page load). If hydration happens late,
  // this becomes 0 and the hero enters immediately.
  const [preloaderDelay] = useState(() => {
    if (typeof window === "undefined") return PRELOADER_REVEAL_DELAY;
    return Math.max(0, PRELOADER_REVEAL_DELAY - performance.now() / 1000);
  });

  // Entrance phases. The hero is server-rendered fully VISIBLE (the preloader
  // overlay covers it), so even if JavaScript loads late the portfolio is
  // simply there when the overlay fades — never a blank page. Once hydrated,
  // we snap to hidden for one frame and then play the staggered entrance.
  const [phase, setPhase] = useState<"static" | "hidden" | "enter">("static");

  useEffect(() => {
    if (prefersReducedMotion) return;
    setPhase("hidden");
    let inner: number | undefined;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPhase("enter"));
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner !== undefined) cancelAnimationFrame(inner);
    };
  }, [prefersReducedMotion]);

  const HIDDEN = { opacity: 0, y: 24, filter: "blur(6px)" };
  const VISIBLE = { opacity: 1, y: 0, filter: "blur(0px)" };

  const enter = (delay: number) => {
    if (prefersReducedMotion) return {};
    return {
      initial: false as const,
      animate: phase === "hidden" ? HIDDEN : VISIBLE,
      // Wait for the boot-sequence preloader to start revealing before entering
      transition:
        phase === "enter"
          ? {
              duration: 0.6,
              delay: preloaderDelay + delay,
              ease: "easeOut" as const,
            }
          : { duration: 0 },
    };
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-28"
    >
      {/* Parallax aurora orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: orbSlowY }}
          className="absolute -left-24 top-16 h-72 w-72"
        >
          <div className="size-full animate-blob rounded-full bg-indigo-500/25 blur-[100px]" />
        </motion.div>
        <motion.div
          style={{ y: orbFastY }}
          className="absolute -right-24 top-1/3 h-80 w-80"
        >
          <div className="size-full animate-blob rounded-full bg-cyan-400/20 blur-[110px] [animation-delay:-9s]" />
        </motion.div>
        <div className="absolute bottom-0 left-1/3 h-64 w-64">
          <div className="size-full animate-blob rounded-full bg-violet-500/20 blur-[100px] [animation-delay:-4s]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Intro */}
        <div className="flex flex-col items-start gap-5">
          <motion.a
            {...enter(0.05)}
            href={DATA.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur transition-colors hover:border-indigo-500/40 hover:text-foreground"
          >
            <MapPinIcon className="size-3 text-indigo-500 dark:text-indigo-300" />
            {DATA.location}
          </motion.a>

          <motion.p
            {...enter(0.12)}
            className="font-mono text-sm text-indigo-600 dark:text-indigo-300"
          >
            {"// Hi there, I'm"}
          </motion.p>

          <motion.h1
            {...enter(0.2)}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {firstName} <span className="gradient-text">{lastName}</span>
          </motion.h1>

          <motion.h2
            {...enter(0.28)}
            className="font-display text-xl font-semibold text-muted-foreground sm:text-2xl md:text-3xl"
          >
            Software Engineer · Tech Explorer
          </motion.h2>

          <motion.p
            {...enter(0.36)}
            className="max-w-xl text-pretty text-muted-foreground"
          >
            {DATA.description}
          </motion.p>

          <motion.div
            {...enter(0.44)}
            className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
          >
            <Button
              asChild
              size="lg"
              className="group w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 sm:w-auto"
            >
              <Link href="#projects">
                View My Work
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/resume">
                <FileDownIcon className="mr-2 size-4" />
                Download Resume
              </Link>
            </Button>
          </motion.div>

          <motion.div {...enter(0.52)} className="mt-1 flex items-center gap-1">
            {SOCIALS.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                aria-label={social.name}
                {...(social.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="rounded-full p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-foreground"
              >
                <social.icon className="size-5" />
              </Link>
            ))}
          </motion.div>
        </div>

        {/* 3D floating terminal */}
        <motion.div {...enter(0.35)} className="w-full">
          <TiltCard className="mx-auto w-full max-w-md rounded-2xl lg:max-w-none">
            <div className="animate-float overflow-hidden rounded-2xl border border-white/10 bg-[#0d1022]/95 shadow-2xl shadow-indigo-500/10 backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
                <span className="size-3 shrink-0 rounded-full bg-[#ff5f57]" />
                <span className="size-3 shrink-0 rounded-full bg-[#febc2e]" />
                <span className="size-3 shrink-0 rounded-full bg-[#28c840]" />
                <span className="ml-3 truncate font-mono text-xs text-white/40">
                  {slugify(DATA.name)} — zsh
                </span>
              </div>
              <div className="space-y-1.5 break-words p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-[13px]">
                <p>
                  <span className="text-cyan-300">$</span>{" "}
                  <span className="text-white/90">whoami</span>
                </p>
                <p className="text-white/60">
                  {slugify(DATA.name)} · software engineer
                </p>
                <p className="pt-2">
                  <span className="text-cyan-300">$</span>{" "}
                  <span className="text-white/90">cat skills.txt</span>
                </p>
                <p className="text-white/60">{TERMINAL_SKILLS}</p>
                <p className="pt-2">
                  <span className="text-cyan-300">$</span>{" "}
                  <span className="text-white/90">ls projects/</span>
                </p>
                <p className="grid grid-cols-2 gap-x-4 text-emerald-300/80">
                  {TERMINAL_PROJECTS.map((project) => (
                    <span key={project} className="min-w-0 break-words">
                      {project}
                    </span>
                  ))}
                </p>
                <p className="pt-2">
                  <span className="text-cyan-300">$</span>{" "}
                  <span className="text-white/90">./contact --hire</span>
                  <span
                    aria-hidden
                    className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-caret-blink bg-cyan-300"
                  />
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to the about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          scroll
        </span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1">
          <span className="size-1.5 animate-bounce rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
