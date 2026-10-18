# Selaras Blog Starter

A nocturnal-editorial personal site starter for [Nuxt 4](https://nuxt.com), built around [Nuxt Content](https://content.nuxt.com) and the [Selaras](https://selarasui.my.id) UI library. Markdown-first publishing with a project archive — journal, writing, and work pages in one dark, quiet design system.

> The demo content is **fictional** — a musician named "Naya Arunika" who doesn't exist. Every page is replaceable; the starter is general-purpose (writers, designers, developers, freelancers, ...).

## Features

- **Markdown-first** — journal, projects, music, standalone pages all live in `content/` as Markdown files with typed collections (`content.config.ts`).
- **Selaras design system** — semantic components (`SButton`, `SCard`, `SContainer`, ...) with theme and icon overrides in `app/app.config.ts`.
- **Nocturnal editorial theme** — dark reading room, one electric accent, credited photography, editorial layouts per section.
- **Static-first** — `bun run generate` produces a fully static site; an SSR'd `404.html` ships themed "not found" pages even without JavaScript.
- **Runtime-neutral code** — Bun-friendly, but npm/pnpm work equally well.

## Setup

Install dependencies (Bun recommended, locks are in `bun.lock`):

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

## Production

```bash
# fully static site (recommended)
bun run generate   # output in .output/public

# or a SSR build
bun run build
```

Preview the static output locally:

```bash
bun run preview
```

## Making it yours

1. **Replace the demo content** — edit files under `content/` or swap them out entirely. Collections are defined in `content.config.ts`; remove the `music` or `projects` collections you don't need.
2. **Swap the imagery** — all demo photographs are borrowed from Wikimedia Commons (CC BY / CC BY-SA / CC0), credited inline in the content and in `public/images/credits.json`. Replace them with your own before publishing.
3. **Adjust the theme** — colors, surfaces and component recipes are overridden in `app/assets/css/main.css` and `app/app.config.ts`.
4. **Swap the icon set** — the template ships [Lucide](https://lucide.dev) via `@iconify-json/lucide`. Selaras components take semantic icon slots; they're remapped in `app/app.config.ts` (`selaras.icons`) — point them at any Iconify collection you like (install e.g. `@iconify-json/tabler` and update `nuxt.config.ts`'s `serverBundle.collections`).

## Deployment

Any static host works (Netlify, Cloudflare Pages, GitHub Pages, ...): upload `.output/public`. Set your host's **404 fallback** to the generated `404.html` so themed error pages serve correctly with a 404 status.
