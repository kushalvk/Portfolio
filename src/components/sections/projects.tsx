"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Project = (typeof DATA.projects)[number];

const TAG_LIMIT = 8;

// Build the filter list once, ranked by how often each technology appears.
const tagCounts = new Map<string, number>();
for (const project of DATA.projects) {
  for (const tech of project.technologies) {
    tagCounts.set(tech, (tagCounts.get(tech) ?? 0) + 1);
  }
}

const FILTERS = [
  "All",
  ...Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, TAG_LIMIT)
    .map(([tag]) => tag),
];

function initialsOf(title: string) {
  return title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 3)
    .join("");
}

function ProjectMedia({ project }: { project: Project }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only mount the <video> once the card approaches the viewport. Videos are
  // NOT in the initial HTML, so the mp4 downloads can't hog the browser's
  // connections and starve the page's JavaScript on a cold first load.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const videoSrc = project.video
    ? project.video.startsWith("http") || project.video.startsWith("/")
      ? project.video
      : `/${project.video}`
    : undefined;

  const showVideo = Boolean(videoSrc) && inView && !videoFailed;
  const showImage = !showVideo && Boolean(project.image) && !imageFailed;

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden">
      {showVideo ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoFailed(true)}
          className="pointer-events-none size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-cyan-400/20 transition-transform duration-500 group-hover:scale-105">
          <span className="font-display text-5xl font-bold text-foreground/20">
            {initialsOf(project.title)}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

function ProjectCard3D({ project }: { project: Project }) {
  return (
    <TiltCard className="h-full rounded-2xl">
      <div className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-indigo-500/40">
        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — open live site`}
          className="block border-b border-border/60"
        >
          <ProjectMedia project={project} />
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold">
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
              >
                {project.title}
              </Link>
            </h3>
            <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-300" />
          </div>

          <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <CalendarIcon className="size-3" />
            {project.dates}
          </p>

          <p className="line-clamp-4 text-pretty text-sm text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.links.map((link) => (
                <Link
                  key={link.type}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium transition-colors hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  {link.icon}
                  {link.type}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered =
    activeFilter === "All"
      ? DATA.projects
      : DATA.projects.filter((project) =>
          (project.technologies as readonly string[]).includes(activeFilter)
        );

  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <BlurFade inView>
          <SectionHeading
            align="center"
            eyebrow="04 · Portfolio"
            title="Featured Projects"
            description="I have worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites."
          />
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  activeFilter === filter
                    ? "border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/25"
                    : "border-border bg-card/60 text-muted-foreground hover:border-indigo-500/40 hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </BlurFade>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectCard3D project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
