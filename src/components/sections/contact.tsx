"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { CheckIcon, CopyIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SOCIALS = [
  {
    name: "GitHub",
    url: DATA.contact.social.GitHub.url,
    icon: DATA.contact.social.GitHub.icon,
  },
  {
    name: "LinkedIn",
    url: DATA.contact.social.LinkedIn.url,
    icon: DATA.contact.social.LinkedIn.icon,
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore silently.
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <BlurFade inView>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 text-center shadow-xl sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-cyan-400/30 blur-3xl"
            />

            <SectionHeading
              align="center"
              eyebrow="05 · Contact"
              title="Let's build something together"
              description="I am currently open to new opportunities and collaborations. Whether you have a question, a project idea, or just want to say hi, my inbox is always open."
            />

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110"
              >
                <a href={`mailto:${DATA.contact.email}`}>
                  <MailIcon className="mr-2 size-4" />
                  Say Hello
                </a>
              </Button>
              <Button size="lg" variant="outline" onClick={copyEmail}>
                {copied ? (
                  <CheckIcon className="mr-2 size-4 text-emerald-500" />
                ) : (
                  <CopyIcon className="mr-2 size-4" />
                )}
                <span aria-live="polite">
                  {copied ? "Copied!" : "Copy Email"}
                </span>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {SOCIALS.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="rounded-full p-2.5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-foreground"
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs text-muted-foreground">
              {DATA.contact.email} · {DATA.contact.tel}
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
