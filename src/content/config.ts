import { defineCollection, z } from 'astro:content';

/**
 * Case studies are stored as structured "block" documents so the /admin CMS
 * can add/reorder/stack sections without touching code. Each case study is:
 *   - top-level meta (title, client, category, hero video, SEO), bilingual
 *   - an ordered `blocks[]` array; each block is a typed section with its own
 *     localized text (en/es) and free style props (bg tone or custom colour,
 *     accent, alignment, divider).
 * The public pages render these blocks with the site's existing `.cs-*` design.
 */

// Per-block style controls (wide freedom, with brand tokens as the safe default).
const style = z
  .object({
    // 'default' | 'alt' | 'craft' brand tones, or any custom CSS colour (e.g. "#0a0a0a").
    bg: z.string().optional(),
    // Custom accent colour for this block; falls back to brand orange.
    accent: z.string().optional(),
    // Text colour override (advanced).
    textColor: z.string().optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
    // Top divider line.
    border: z.boolean().optional(),
  })
  .optional();

// Localized string helper.
const loc = <T extends z.ZodTypeAny>(shape: T) => z.object({ en: shape, es: shape });

const base = z.object({ id: z.string(), style });

const textBlock = base.extend({
  type: z.literal('text'),
  // Groups of paragraphs — each group is one reveal unit of <p>s.
  content: loc(z.object({ paragraphs: z.array(z.array(z.string())) })),
});

const quoteBlock = base.extend({
  type: z.literal('quote'),
  content: loc(z.object({ statement: z.string(), subline: z.string().optional() })),
});

const numberedListBlock = base.extend({
  type: z.literal('numberedList'),
  content: loc(
    z.object({
      label: z.string(),
      items: z.array(z.object({ heading: z.string(), body: z.string() })),
    })
  ),
});

const audioBlock = base.extend({
  type: z.literal('audio'),
  soundcloud: z.object({ playlistId: z.string(), secretToken: z.string().optional() }).optional(),
  link: z.string().optional(),
  content: loc(z.object({ title: z.string() })),
});

const creditsBlock = base.extend({
  type: z.literal('credits'),
  // role/name pairs are language-neutral (proper nouns).
  items: z.array(z.object({ role: z.string(), name: z.string() })),
  content: loc(z.object({ label: z.string() })),
});

const deliverablesBlock = base.extend({
  type: z.literal('deliverables'),
  content: loc(z.object({ label: z.string(), items: z.string() })),
});

const aboutBlock = base.extend({
  type: z.literal('about'),
  content: loc(z.object({ label: z.string(), body: z.string() })),
});

const block = z.discriminatedUnion('type', [
  textBlock,
  quoteBlock,
  numberedListBlock,
  audioBlock,
  creditsBlock,
  deliverablesBlock,
  aboutBlock,
]);

const caseStudies = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(),
    // Hero + index thumbnail video.
    videoId: z.string(),
    durationLabel: z.string().optional(),
    // Show the "jump to score" pill under the hero video, targeting a block id.
    jumpToScore: z.boolean().optional(),
    jumpToId: z.string().optional().default('score'),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
    dek: loc(z.string()),
    backLabel: loc(z.string()),
    jumpLabel: loc(z.string()).optional(),
    seo: loc(z.object({ metaTitle: z.string(), metaDescription: z.string() })),
    blocks: z.array(block),
  }),
});

export const collections = { caseStudies };
