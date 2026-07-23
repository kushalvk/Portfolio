import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";
import Link from "next/link";

interface TimelineItem {
  kind: "Work" | "Education";
  title: string;
  subtitle: string;
  period: string;
  logoUrl: string;
  href?: string;
  description?: string;
}

const ITEMS: TimelineItem[] = [
  ...DATA.work.map((job) => ({
    kind: "Work" as const,
    title: job.company,
    subtitle: job.title,
    period: `${job.start} — ${job.end ?? "Present"}`,
    logoUrl: job.logoUrl,
    href: job.href || undefined,
    description: job.description,
  })),
  ...DATA.education.map((school) => ({
    kind: "Education" as const,
    title: school.school,
    subtitle: school.degree,
    period: `${school.start} — ${school.end}`,
    logoUrl: school.logoUrl,
    href: school.href || undefined,
  })),
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <BlurFade inView>
          <SectionHeading
            eyebrow="02 · Journey"
            title="Experience & Education"
            description="Where I have worked and studied along the way."
          />
        </BlurFade>

        <div className="relative mt-12 space-y-10 before:absolute before:inset-y-2 before:left-6 before:-ml-px before:w-px before:bg-gradient-to-b before:from-indigo-500/60 before:via-violet-500/40 before:to-transparent">
          {ITEMS.map((item, index) => (
            <BlurFade inView key={item.title} delay={0.1 + index * 0.08}>
              <article className="relative flex gap-5 md:gap-7">
                <div className="relative z-10 mt-1 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logoUrl}
                    alt=""
                    className="size-full object-contain p-1.5"
                  />
                </div>
                <div className="glass flex-1 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div>
                      <h3 className="font-display font-semibold">
                        {item.href ? (
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
                          >
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.kind}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {item.period}
                      </span>
                    </div>
                  </div>
                  {item.description && (
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
