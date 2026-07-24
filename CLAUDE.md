# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A single-page personal portfolio (plus a blog and a printable resume) originally based on the [dillionverma/portfolio](https://github.com/dillionverma/portfolio) template, redesigned with a dark-first, 3D-inspired look: Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui (new-york style), Framer Motion. Deployed on Vercel.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`).

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build (also type-checks and lints; use to verify changes)
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (`next lint`)

There is no test suite in this repo.

## Architecture

**Content is data-driven from a single config file.** Almost all site content — name, bio, skills, work history, education, projects, contact/social links, navbar items — lives in `src/data/resume.tsx` as the exported `DATA` object. To change portfolio content, edit `resume.tsx`, not the components.

- `DATA` is declared `as const`; its shape is consumed directly (no separate type definitions). Section components derive their types from it (e.g. `(typeof DATA.projects)[number]`), so keep field names/nesting consistent when adding entries.
- Client components import `DATA` directly rather than receiving it as props (the `links[].icon` values are JSX, which can't cross the RSC serialization boundary).
- Project entries have `image` and `video` fields, each accepting a full URL (optimized Cloudinary URLs are preferred) or a plain filename resolved from `public/`. `sections/projects.tsx` renders **poster-first**: `image` is shown immediately as the poster, and `video` is fetched only on hover (desktop) or the play button (touch/click). Fallback chain is poster → gradient/initials placeholder.
- `src/app/layout.tsx` pulls SEO metadata and the JSON-LD Person schema from `DATA`; `src/app/sitemap.ts` and `src/app/robots.ts` use `DATA.url` (update it when the deploy domain changes).

**Pages** (`src/app/`):
- `page.tsx` — composes the home page from `src/components/sections/*` (hero, about, experience, skills, projects, contact).
- `resume/page.tsx` — print-optimized resume generated from `DATA`; `PrintButton` triggers `window.print()`. Print CSS in `globals.css` forces a light palette and hides site chrome (`print:hidden`).
- `icon.tsx` + `apple-icon.tsx` — favicon/touch icon (the `</>` mark) generated with `ImageResponse`. They must use `runtime = "edge"`: the Node-runtime `@vercel/og` bundle crashes on Windows paths. There is no static `favicon.ico`.
- `blog/page.tsx` + `blog/[slug]/page.tsx` — MDX blog. Posts are `.mdx` files in `content/` (frontmatter: `title`, `publishedAt`, `summary`, optional `image`); `src/data/blog.ts` parses them server-side via a `unified` remark→rehype pipeline with Shiki highlighting.
- The root layout does NOT constrain page width — each page/section manages its own container (`mx-auto max-w-* px-6`).

**Components** (`src/components/`):
- `sections/` — the home page sections. `hero.tsx`, `projects.tsx` (filter state, tag list derived from project technologies at module level), and `contact.tsx` are client components; `about.tsx`, `experience.tsx`, `skills.tsx` are server components.
- `tilt-card.tsx` — generic mouse-tracking 3D tilt wrapper (CSS transforms, no WebGL); `scroll-progress.tsx` — top gradient scroll bar; `section-heading.tsx` — shared eyebrow/title block.
- `preloader.tsx` — boot-sequence overlay played on every home page load (typed terminal log + CSS 3D cube + progress bar). The entire animation is a **pure-CSS timeline** (keyframes in `globals.css`, `preloader-*`) that starts when the HTML paints, so it plays even before React hydrates on a cold first load; JS only scroll-locks, unmounts afterwards, and skips it under reduced motion. It exports `PRELOADER_REVEAL_DELAY`; the hero subtracts `performance.now()` from it at hydration so its entrance syncs with the overlay fade regardless of hydration timing.
- `ui/` — shadcn/ui primitives (managed via `components.json`); `magicui/` — Magic UI animation components (`blur-fade` is used for scroll reveals via its `inView` prop).
- `navbar.tsx` — the floating bottom dock; its items come from `DATA.navbar` + `DATA.contact.social`.
- Legacy template components (`project-card.tsx`, `resume-card.tsx`, `hackathon-card.tsx`) are no longer used by any page.

**Design system:**
- Dark-first (ThemeProvider `defaultTheme="dark"`), indigo→violet→cyan accent. Reusable classes in `globals.css`: `.gradient-text`, `.glass`, `.bg-grid-pattern`.
- Custom animations (`blob`, `float`, `marquee`, `caret-blink`) live in `tailwind.config.ts`; `globals.css` disables them under `prefers-reduced-motion` (the skills marquee degrades to a wrapped static grid via the `marquee-track`/`marquee-content`/`marquee-clone` classes).
- Fonts via `next/font`: Inter (`--font-sans`), Space Grotesk (`--font-display`, headings use `font-display`), JetBrains Mono (`--font-mono`).
- Import alias `@/*` maps to `src/*`; `cn()` from `src/lib/utils.ts` merges Tailwind classes.

## Notes

- `DATA.url` still points at the template author's domain — it should be updated to the real deployed URL.
- Large project `.mp4`s were historically bundled in `public/` (~224 MB, still in git history via commits `c178bfe`/`fde7279`). The intended source is optimized Cloudinary URLs set on each project's `video`/`image` in `resume.tsx`; once migrated, the local `public/*.mp4` files can be deleted (reclaiming the git-history space needs a separate `git filter-repo`/BFG rewrite).
