import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    journal: defineCollection({
      type: 'page',
      source: 'journal/*.md',
      schema: z.object({
        date: z.string(),
        category: z.string().default('Notes'),
        author: z.string().default('Naya Arunika'),
        readingTime: z.string().optional(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
      }),
    }),
    music: defineCollection({
      type: 'page',
      source: 'music/*.md',
      schema: z.object({
        releaseType: z.string(),
        releaseDate: z.string(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        featured: z.boolean().default(false),
        tracks: z.array(z.object({
          title: z.string(),
          duration: z.string(),
        })).default([]),
        spotifyUrl: z.string().url().optional(),
        bandcampUrl: z.string().url().optional(),
      }),
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        year: z.number(),
        projectType: z.string(),
        role: z.string(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        collaborator: z.string().optional(),
        featured: z.boolean().default(false),
        externalUrl: z.string().url().optional(),
      }),
    }),
  },
})
