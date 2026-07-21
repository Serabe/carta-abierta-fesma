import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Stable section id: a random integer 0–9999, always written as 4 digits
 * (e.g. 0 → "0000", 12 → "0012", 9999 → "9999"). Independent of folder/file order.
 * Quote in frontmatter so YAML keeps leading zeros: uid: "0639"
 */
const sectionUid = z
  .string()
  .regex(/^\d{4}$/, 'uid must be exactly 4 digits (e.g. "0000", "0639")');

const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z
    .object({
      title: z.string(),
      aside: z.string().optional(),
      /**
       * Stable unique id for this section. Decoupled from folder/file names
       * and document order so reordering content does not break signatures.
       * Required when signable is true.
       */
      uid: sectionUid.optional(),
      /** If true, readers can mark this section to sign at the end of the letter. */
      signable: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      if (data.signable && !data.uid) {
        ctx.addIssue({
          code: 'custom',
          message: 'signable sections require a stable uid',
          path: ['uid'],
        });
      }
    }),
});

export const collections = { sections };
