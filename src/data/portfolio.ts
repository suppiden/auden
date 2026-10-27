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
    id: 'lor-del-xuquer',
    client: "L'or del Xúquer",
    category: 'studio',
    aspect: 'horizontal',
    description: 'Original score and sound design for the brand launch film.',
    videoUrl: 'https://www.youtube.com/embed/Ky2QgGD40hY',
  },
  {
    id: 'sonic-identity-studio',
    client: 'Auden — Sonic Identity Studio',
    category: 'studio',
    aspect: 'horizontal',
    description: 'A complete sonic identity system built from strategy to final assets.',
    videoUrl: 'https://www.youtube.com/embed/3aAK9RnQxBc',
  },
  {
    id: 'brand-sound-toolkit',
    client: 'Auden — Brand Sound Toolkit',
    category: 'studio',
    aspect: 'horizontal',
    description: 'Stingers, transitions and sound elements designed for digital content.',
    videoUrl: 'https://www.youtube.com/embed/KtoV6BfEb14',
  },

  // ── Concept ─────────────────────────────────────────────────────
  {
    id: 'richard-mille-mclaren',
    client: 'Richard Mille × McLaren',
    category: 'concept',
    aspect: 'horizontal',
    description: 'Original score and sound design for the brand film.',
    videoUrl: 'https://www.youtube.com/embed/OQzD_D4p2Lg',
  },

  // ── Post-Production (horizontal) ────────────────────────────────
  {
    id: 'bandit-grand-prix',
    client: 'Bandit Grand Prix',
    category: 'postProduction',
    aspect: 'horizontal',
    description: 'Original electronic score, sound design and mix for a 45-second film by Anjelica Florendo.',
    videoUrl: 'https://www.youtube.com/embed/boZns6DvLl8',
    caseStudyUrl: '/work/bandit-grand-prix/',
  },
  {
    id: 'post-production-01',
    client: 'Post-Production 01',
    category: 'postProduction',
    aspect: 'horizontal',
    description: 'Full sound design and post-production for a finished campaign piece.',
    videoUrl: 'https://www.youtube.com/embed/Q3UmAU7n3jc',
  },
];
