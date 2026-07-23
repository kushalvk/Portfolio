import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";

const STATS = [
  {
    label: "Projects shipped",
    value: "10+",
  },
  { label: "Technologies", value: `${DATA.skills.length}+` },
  { label: "Based in", value: DATA.location.split(",")[0] },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto grid max-w-5xl items-start gap-12 px-6 md:grid-cols-[auto_1fr] md:gap-14">
        <BlurFade inView delay={0.1}>
          <div className="group relative mx-auto w-fit">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 opacity-25 blur-xl transition-opacity duration-500 group-hover:opacity-50"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DATA.avatarUrl}
              alt={DATA.name}
              className="relative size-44 rounded-[1.75rem] border border-white/20 object-cover shadow-2xl transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-[1.03] md:size-52"
            />
          </div>
        </BlurFade>

        <div className="space-y-8">
          <BlurFade inView>
            <SectionHeading eyebrow="01 · About" title="A bit about me" />
          </BlurFade>

          <BlurFade inView delay={0.15}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm leading-relaxed text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>

          <BlurFade inView delay={0.25}>
            <div className="glass grid grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-2xl">
              {STATS.map((stat) => (
                <div key={stat.label} className="p-4 text-center sm:p-5">
                  <p className="gradient-text font-display text-xl font-bold sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
