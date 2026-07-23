import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

function SkillChip({ skill }: { skill: string }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium shadow-sm">
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
      />
      {skill}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={cn(
          "marquee-track flex w-max animate-marquee hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse] [animation-duration:58s]"
        )}
      >
        <div className="marquee-content flex items-center gap-3 pr-3">
          {items.map((skill) => (
            <SkillChip key={skill} skill={skill} />
          ))}
        </div>
        <div
          className="marquee-clone flex items-center gap-3 pr-3"
          aria-hidden="true"
        >
          {items.map((skill) => (
            <SkillChip key={`${skill}-clone`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <BlurFade inView>
          <SectionHeading
            align="center"
            eyebrow="03 · Toolbox"
            title="Skills & Technologies"
            description="The languages, frameworks and tools I reach for when building."
          />
        </BlurFade>
      </div>

      <BlurFade inView delay={0.15}>
        <div className="mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <MarqueeRow items={DATA.skills} />
          <MarqueeRow items={[...DATA.skills].reverse()} reverse />
        </div>
      </BlurFade>
    </section>
  );
}
