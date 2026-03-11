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
  /** Optional external case study link */
  caseStudyUrl?: string;
  year: number;
}

/**
 * Add real projects here as they become available.
 * The section renders gracefully with zero, one, or many items.
 */
export const portfolio: PortfolioItem[] = [
  // {
  //   id: 'example-brand',
  //   client: 'Example Brand',
  //   category: 'Sonic Branding',
  //   description: 'A minimal sonic identity for a digital-first consumer brand.',
  //   cover: '/portfolio/example-brand.jpg',
  //   year: 2025,
  // },
];
