export interface PortfolioItem {
  id: string;
  /** Short client/project name */
  client: string;
  /** Project category, e.g. "Sonic Branding" */
  category: string;
  /** One-line description */
  description: string;
  /** Path to cover image in /public */
  cover?: string;
  /** Optional audio preview URL */
  audioUrl?: string;
  /** Optional YouTube embed URL */
  videoUrl?: string;
  /** Optional external case study link */
  caseStudyUrl?: string;
  year: number;
}

/**
 * Add real projects here as they become available.
 * The section renders gracefully with zero, one, or many items.
 */
export const portfolio: PortfolioItem[] = [
  {
    id: 'travel-brand-concept',
    client: 'Auden — Travel Brand Concept',
    category: 'Sonic Branding',
    description: 'A sonic identity concept built around movement, discovery and emotion.',
    videoUrl: 'https://www.youtube.com/embed/gJZ66MGXdmo',
    year: 2025,
  },
  {
    id: 'sonic-identity-studio',
    client: 'Auden — Sonic Identity Studio',
    category: 'Sonic Branding',
    description: 'A complete sonic identity system built from strategy to final assets.',
    videoUrl: 'https://www.youtube.com/embed/3aAK9RnQxBc',
    year: 2025,
  },
  {
    id: 'brand-sound-toolkit',
    client: 'Auden — Brand Sound Toolkit',
    category: 'Sonic Branding',
    description: 'Stingers, transitions and sound elements designed for digital content.',
    videoUrl: 'https://www.youtube.com/embed/KtoV6BfEb14',
    year: 2025,
  },
];
