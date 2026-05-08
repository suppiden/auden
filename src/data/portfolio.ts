export type PortfolioCategory = 'studio' | 'concept' | 'postProduction';
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
}

export const portfolio: PortfolioItem[] = [
  // ── Studio (horizontal, agency-led) ─────────────────────────────
  {
    id: 'sonic-identity-studio',
    client: 'Auden — Sonic Identity Studio',
    category: 'studio',
    aspect: 'horizontal',
    description: 'A complete sonic identity system built from strategy to final assets.',
    videoUrl: 'https://www.youtube.com/embed/3aAK9RnQxBc',
  },
  {
    id: 'action-sport',
    client: 'Action Sport',
    category: 'studio',
    aspect: 'horizontal',
    description: 'Sound design and sonic concept for an action-sport piece.',
    videoUrl: 'https://www.youtube.com/embed/pGiE_-tjgEU',
  },
  {
    id: 'travel-brand-concept',
    client: 'Auden — Travel Brand Concept',
    category: 'studio',
    aspect: 'horizontal',
    description: 'A sonic identity concept built around movement, discovery and emotion.',
    videoUrl: 'https://www.youtube.com/embed/gJZ66MGXdmo',
  },
  {
    id: 'brand-sound-toolkit',
    client: 'Auden — Brand Sound Toolkit',
    category: 'studio',
    aspect: 'horizontal',
    description: 'Stingers, transitions and sound elements designed for digital content.',
    videoUrl: 'https://www.youtube.com/embed/KtoV6BfEb14',
  },

  // ── Concept (vertical Shorts) ───────────────────────────────────
  {
    id: 'richard-mille',
    client: 'Richard Mille',
    category: 'concept',
    aspect: 'vertical',
    description: 'A short-form sonic concept exploring the brand\'s precision and craft.',
    videoUrl: 'https://www.youtube.com/embed/qQewBkqsNic',
  },
  {
    id: 'concept-reel',
    client: 'Concept Reel',
    category: 'concept',
    aspect: 'vertical',
    description: 'A sonic concept piece exploring brand mood through movement and texture.',
    videoUrl: 'https://www.youtube.com/embed/mEkctaH_ye4',
  },

  // ── Post-Production (horizontal) ────────────────────────────────
  {
    id: 'post-production-01',
    client: 'Post-Production 01',
    category: 'postProduction',
    aspect: 'horizontal',
    description: 'Full sound design and post-production for a finished campaign piece.',
    videoUrl: 'https://www.youtube.com/embed/Q3UmAU7n3jc',
  },
];
