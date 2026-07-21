import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Stable section id: lowercase kebab-case, independent of folder/file order. */
const sectionUid = z
  .string()
  .regex(
    /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
    'uid must be lowercase kebab-case (e.g. transparencia)',
  );

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
