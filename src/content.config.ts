import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    aside: z.string().optional(),
    /** If true, readers can mark this section to sign at the end of the letter. */
    signable: z.boolean().default(false),
  }),
});

export const collections = { sections };
