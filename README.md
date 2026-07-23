# Kushal Vaghela — Portfolio

A dark-first, 3D-inspired developer portfolio with parallax effects, an interactive terminal hero, a filterable project grid, an MDX blog, and a print-ready resume page.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**. Deployed on **Vercel**.

## Features

- **Single source of truth** — all content (bio, skills, work, education, projects, socials) lives in [`src/data/resume.tsx`](./src/data/resume.tsx)
- **3D-inspired visuals without WebGL** — mouse-tracking tilt cards, parallax aurora orbs, a floating terminal window, and glassmorphism, all via CSS transforms and Framer Motion (no three.js)
- **Filterable project grid** — filter chips are derived automatically from each project's technologies, with animated layout transitions and GitHub/live links
- **Downloadable resume** — [`/resume`](./src/app/resume/page.tsx) renders a print-optimized resume from `resume.tsx`; the "Download PDF" button uses the browser's *Save as PDF*
- **Blog** — MDX posts in [`content/`](./content) with Shiki syntax highlighting
- **Dark / light theme** — dark by default, toggle in the dock
- **Accessibility** — skip link, `prefers-reduced-motion` support (marquee/tilt/orbs degrade gracefully), focus rings, ARIA labels
- **SEO** — metadata, JSON-LD Person schema, `sitemap.xml`, and `robots.txt`

## Getting Started

```bash
# 1. Install dependencies
pnpm install   # or: npm install

# 2. Start the dev server
pnpm dev       # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command      | Description                       |
| ------------ | --------------------------------- |
| `pnpm dev`   | Start the development server      |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Serve the production build        |
| `pnpm lint`  | Run ESLint                        |

## Editing Content

- **Everything on the site** — edit the `DATA` object in [`src/data/resume.tsx`](./src/data/resume.tsx)
- **Project videos** — drop `.mp4` files into [`public/`](./public) and reference them by filename in a project's `video` field
- **Blog posts** — add `.mdx` files to [`content/`](./content) with `title`, `publishedAt`, and `summary` frontmatter
- **Deployed URL** — update `DATA.url` so metadata, the sitemap, and OpenGraph tags point at your domain

## Deploy

Push to GitHub and import the repo into [Vercel](https://vercel.com/new) — no extra configuration needed.

## Credits & License

Originally based on the [dillionverma/portfolio](https://github.com/dillionverma/portfolio) template. Licensed under the [MIT license](./LICENSE).
