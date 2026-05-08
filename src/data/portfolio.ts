export type PortfolioCategory = 'concept' | 'postProduction' | 'studio';
export type PortfolioAspect = 'vertical' | 'horizontal';

export interface PortfolioItem {
  id: string;
  client: string;
  category: PortfolioCategory;
  aspect: PortfolioAspect;
  description: string;
  cover?: string;
  audioUrl?: string;
  videoUrl?: string;
  caseStudyUrl?: string;
  year: number;
}

export const portfolio: PortfolioItem[] = [
  // ── Concept (vertical Shorts) ───────────────────────────────────
  {
    id: 'concept-short-1',
    client: 'Concept Reel 01',
    category: 'concept',
    aspect: 'vertical',
    description: 'A sonic concept piece exploring brand mood through movement and texture.',
    videoUrl: 'https://www.youtube.com/embed/mEkctaH_ye4',
    year: 2026,
  },
  {
    id: 'concept-short-2',
    client: 'Concept Reel 02',
    category: 'concept',
    aspect: 'vertical',
    description: 'A sonic exploration of rhythm, atmosphere and emotional tone.',
    videoUrl: 'https://www.youtube.com/embed/pGiE_-tjgEU',
    year: 2026,
  },
  {
    id: 'concept-short-3',
    client: 'Concept Reel 03',
    category: 'concept',
    aspect: 'vertical',
    description: 'A short-form sonic concept built around dynamic transitions.',
    videoUrl: 'https://www.youtube.com/embed/qQewBkqsNic',
    year: 2026,
  },

  // ── Post-Production (horizontal) ────────────────────────────────
  {
    id: 'post-production-01',
    client: 'Post-Production 01',
    category: 'postProduction',
    aspect: 'horizontal',
    description: 'Full sound design and post-production for a finished campaign piece.',
    videoUrl: 'https://www.youtube.com/embed/Q3UmAU7n3jc',
    year: 2026,
  },

  // ── Studio (agency-led horizontal pieces) ───────────────────────
  {
    id: 'travel-brand-concept',
    client: 'Auden — Travel Brand Concept',
    category: 'studio',
    aspect: 'horizontal',
    description: 'A sonic identity concept built around movement, discovery and emotion.',
    videoUrl: 'https://www.youtube.com/embed/gJZ66MGXdmo',
    year: 2025,
  },
  {
    id: 'sonic-identity-studio',
    client: 'Auden — Sonic Identity Studio',
    category: 'studio',
    aspect: 'horizontal',
    description: 'A complete sonic identity system built from strategy to final assets.',
    videoUrl: 'https://www.youtube.com/embed/3aAK9RnQxBc',
    year: 2025,
  },
  {
    id: 'brand-sound-toolkit',
    client: 'Auden — Brand Sound Toolkit',
    category: 'studio',
    aspect: 'horizontal',
    description: 'Stingers, transitions and sound elements designed for digital content.',
    videoUrl: 'https://www.youtube.com/embed/KtoV6BfEb14',
    year: 2025,
  },
];
