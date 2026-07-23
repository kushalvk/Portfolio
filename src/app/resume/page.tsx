import { PrintButton } from "@/components/print-button";
import { DATA } from "@/data/resume";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${DATA.name} — Software Engineer & Tech Explorer.`,
};

function host(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="border-b border-border pb-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 print:text-neutral-700">
        {title}
      </h2>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-3xl px-6 pb-32 pt-24 print:max-w-none print:p-0"
    >
      <div className="mb-8 flex items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to portfolio
        </Link>
        <PrintButton />
      </div>

      <article className="glass rounded-3xl p-8 sm:p-10 print:border-0 print:bg-transparent print:p-0 print:backdrop-blur-none">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {DATA.name}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Software Engineer · Tech Explorer
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-muted-foreground">
            <li>{DATA.location}</li>
            <li>
              <a
                href={`mailto:${DATA.contact.email}`}
                className="transition-colors hover:text-foreground"
              >
                {DATA.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${DATA.contact.tel}`}
                className="transition-colors hover:text-foreground"
              >
                {DATA.contact.tel}
              </a>
            </li>
            <li>
              <a
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {host(DATA.contact.social.GitHub.url)}
              </a>
            </li>
            <li>
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {host(DATA.contact.social.LinkedIn.url)}
              </a>
            </li>
          </ul>
        </header>

        <ResumeSection title="Summary">
          <p className="text-sm leading-relaxed">{DATA.summary}</p>
        </ResumeSection>

        <ResumeSection title="Experience">
          {DATA.work.map((job) => (
            <div key={job.company} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{job.company}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {job.start} — {job.end ?? "Present"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{job.title}</p>
              <p className="mt-2 text-sm leading-relaxed">{job.description}</p>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Education">
          {DATA.education.map((school) => (
            <div key={school.school} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{school.school}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {school.start} — {school.end}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{school.degree}</p>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection title="Skills">
          <p className="text-sm leading-relaxed">{DATA.skills.join(" · ")}</p>
        </ResumeSection>

        <ResumeSection title="Projects">
          {DATA.projects.map((project) => (
            <div key={project.title} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{project.title}</h3>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {host(project.href)}
                </a>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                {project.technologies.join(" · ")}
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </ResumeSection>
      </article>

      <p className="mt-4 text-center font-mono text-xs text-muted-foreground print:hidden">
        Tip: choose &ldquo;Save as PDF&rdquo; as the destination in the print
        dialog.
      </p>
    </main>
  );
}
