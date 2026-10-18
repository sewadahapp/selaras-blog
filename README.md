# Selaras Blog Starter

A nocturnal-editorial personal site starter for [Nuxt 4](https://nuxt.com), built around [Nuxt Content](https://content.nuxt.com) and the [Selaras](https://selarasui.my.id) UI library. Markdown-first publishing with a project archive — journal, writing, and work pages in one dark, quiet design system.

> The demo content is **fictional** — a musician named "Naya Arunika" who doesn't exist. Every page is replaceable; the starter is general-purpose (writers, designers, developers, freelancers, ...).

## Quick start

1. **Scaffold a new project from this template.** On GitHub, click **Use this template → Create new repository**, then clone your copy. (Or clone this repo directly and reset the remote to yours.)
2. **Install** — Bun is recommended, but npm/pnpm/yarn all work:

   ```bash
   bun install
   ```

3. **Run it:**

   ```bash
   bun run dev     # http://localhost:3000
   ```

4. **Make it yours** — start with your identity in `app/app.config.ts`:

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

5. **Write your first post** — drop a Markdown file into `content/journal/`:

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

6. **Ship it:** `bun run generate` → deploy `.output/public` (see [Deployment](#deployment)).

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

## Deployment

Any static host works — upload `.output/public`. Set your host's **404 fallback** to the generated `404.html` so themed error pages serve correctly with a 404 status.
