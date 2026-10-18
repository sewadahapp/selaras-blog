# Selaras Blog Starter

A nocturnal-editorial personal site starter for [Nuxt 4](https://nuxt.com), built around [Nuxt Content](https://content.nuxt.com) and the [Selaras](https://selarasui.my.id) UI library. Markdown-first publishing with a project archive — journal, writing, and work pages in one dark, quiet design system.

> The demo content is **fictional** — a musician named "Naya Arunika" who doesn't exist. Every page is replaceable; the starter is general-purpose (writers, designers, developers, freelancers, ...).

## Quick Start

Scaffold a new project from this template:

```bash
npx giget gh:sewadahapp/selaras-blog my-blog
cd my-blog && bun install && bun run dev
```

Prefer GitHub? Use **Use this template** on the repo, clone your copy, then `bun install && bun run dev`. (npm/pnpm/yarn work everywhere Bun is mentioned — locks ship as `bun.lock` for Bun users, `package.json` for the rest.)

> Once this template is accepted into the [official Nuxt templates registry](https://github.com/nuxt/starter/tree/templates/templates), the shorter form becomes available too: `npm create nuxt@latest -- -t selaras-blog`.

Start with your identity in `app/app.config.ts`:

```ts
export default defineAppConfig({
  site: {
    name: 'Your Name',              // shown in header, bylines, footer
    shortName: 'You',
    description: 'One sentence about you.',
    location: 'Wherever',
    email: 'you@example.com',       // used by the contact page CTA
  },
  // ...Selaras theme + icon overrides below
})
```

Then write your first post — drop a Markdown file into `content/journal/`:

```md
---
title: My first note
description: What this note is about, in one line.
date: 2026-01-15
category: Notes
readingTime: 4 min read
cover: /images/your-photo.jpg        # optional
coverAlt: 'What the photo shows. Your own photo — credit optional.'
---

Body copy in plain Markdown. Inline images get captioned figures
automatically; type/blocks render through Selaras prose components.
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsewadahapp%2Fselaras-blog&project-name=selaras-blog)

Vercel deploys with the default SSR build (`bun run build`). For a fully static site instead, set the build command to `bun run generate` and the output directory to `.output/public` — any other static host (Netlify, Cloudflare Pages, GitHub Pages) works the same way: upload `.output/public` and set your **404 fallback** to `404.html` so themed error pages serve with a real 404 status.

## Project map

| Path | What lives there |
|---|---|
| `content/journal/` | Blog posts (Collection: `journal`) |
| `content/projects/` | Work archive entries (Collection: `projects`) |
| `content/music/` | Demo-shaped section — releases for the musician; repurpose or delete (Collection: `music`) |
| `content/*.md` | Standalone pages (`about.md`, `contact.md`), rendered as editorial prose pages |
| `app/pages/` | Route components per section, composed with Selaras components |
| `app/components/` | Editorial building blocks (byline, meta, TOC, post navigation, prose figure, waveform) |
| `app/app.config.ts` | Site identity + Selaras component overrides + icon map |
| `app/assets/css/main.css` | Static theme tokens (palette, fonts, page rules) |
| `content.config.ts` | Content collections and their Zod schemas |

## Day-to-day

- **Sections you don't need:** delete your collection from `content.config.ts`, its Markdown folder, and its page folder (`app/pages/music/` etc.), then remove its link from the navigation in `app/layouts/default.vue`. The remaining pages handle empty content gracefully — an empty `journal/` folder just shows a friendly "nothing here yet" state.
- **Images:** demo photography is borrowed from Wikimedia Commons (CC BY / CC BY-SA / CC0), credited inline and in `public/images/credits.json` — swap all of it for your own before publishing.
- **Theme & icons:** the theme ships [Lucide](https://lucide.dev) via `@iconify-json/lucide`. Selaras components take semantic icon slots, remapped in `app/app.config.ts` under `selaras.icons` — point them at any Iconify collection (install e.g. `@iconify-json/tabler` and update `serverBundle.collections` in `nuxt.config.ts`).

## Commands

```bash
bun run dev        # development server
bun run lint       # eslint
bun run typecheck  # nuxt typecheck
bun run generate   # fully static site → .output/public (recommended)
bun run build      # SSR build
bun run preview    # preview the production output
```
