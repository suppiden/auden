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
    id: 'project-1',
    client: 'Project 1',
    category: 'Sonic Branding',
    description: 'A sonic identity shaped around presence and recognition.',
    videoUrl: 'https://www.youtube.com/embed/gJZ66MGXdmo',
    year: 2025,
  },
  {
    id: 'project-2',
    client: 'Project 2',
    category: 'Sonic Branding',
    description: 'Sound design rooted in brand strategy and emotional recall.',
    videoUrl: 'https://www.youtube.com/embed/3aAK9RnQxBc',
    year: 2025,
  },
  {
    id: 'project-3',
    client: 'Project 3',
    category: 'Sonic Branding',
    description: 'An auditory signature built for consistency across touchpoints.',
    videoUrl: 'https://www.youtube.com/embed/KtoV6BfEb14',
    year: 2025,
  },
];
