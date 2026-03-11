export const en = {
  lang: 'en',
  site: {
    title: 'Auden — Sonic Branding Agency',
    description:
      'Auden creates original sonic identities for brands that want to differentiate through sound. Strategic sonic branding for recognition, memory, and consistency.',
    ogImage: '/og-image.jpg',
  },
  nav: {
    offer: 'Our offer',
    work: 'Work',
    contact: 'Contact',
    langSwitch: 'Español',
    langSwitchHref: '/es/',
  },
  hero: {
    eyebrow: 'Sonic Branding Agency',
    headline: 'Sound as identity.',
    subheadline:
      'We create original sonic identities for brands that want to be recognized without being seen.',
    cta: 'Start a project',
    ctaHref: '#contact',
    secondary: 'See our work',
    secondaryHref: '#work',
  },
  offer: {
    eyebrow: 'What we do',
    headline: 'Sound is your most underused brand asset.',
    body: 'Every major brand is remembered by how it sounds. A distinctive audio identity creates instant recognition, builds emotional memory, and signals quality before a word is spoken. Auden designs that system — from the first note to the full sonic architecture of your brand.',
    pillars: [
      {
        title: 'Recognition',
        body: 'A consistent sonic signature that triggers brand recall across every touchpoint.',
      },
      {
        title: 'Memory',
        body: 'Sound creates emotional anchors. Audiences remember what they feel, not just what they see.',
      },
      {
        title: 'Consistency',
        body: 'One coherent sonic system, adapted to every format, channel, and context.',
      },
    ],
  },
  packages: {
    eyebrow: 'Offer',
    headline: 'Three tiers of sonic identity.',
    items: [
      {
        tier: '01',
        name: 'Sonic Branding',
        price: '800€',
        positioning: 'For brands that need a clear, professional sonic signature for digital content.',
        result: 'A distinct audio identity that reinforces brand recognition.',
        includes: [
          'Original audio logo (2–4 sec)',
          '1 functional variation',
          'Essential sonic mood',
          'Core emotion & character',
          'Basic usage document',
          'Commercial digital usage rights',
          '1 revision round',
        ],
      },
      {
        tier: '02',
        name: 'Sonic Identity Pro',
        price: '1,500€',
        positioning: 'For active brands producing content and campaigns at regular frequency.',
        result: 'A complete sonic system for advertising and social media.',
        includes: [
          'Audio logo + 2 variations',
          'Music bed (10–20 sec)',
          'Sonic adaptation for 1 channel',
          'Defined sonic mood',
          'Mini usage guide',
          'Expanded commercial rights',
          '2 revision rounds',
        ],
        featured: true,
      },
      {
        tier: '03',
        name: 'Strategic Sonic Branding',
        price: '2,500€',
        positioning:
          'For brands seeking coherence, long-term positioning, and full scalability.',
        result: 'A comprehensive sonic identity built to last and scale.',
        includes: [
          'Full audio logo + variations',
          'Complete sonic brand system',
          'Music bed, transition & ending',
          'Strategic mood, emotion, energy, timbre & tone',
          'Adaptations for 2–3 formats',
          'Strategic sonic identity guide',
          'Full commercial usage rights',
          '3 revision rounds',
          '1 month of light refinement support',
        ],
      },
    ],
  },
  extras: {
    eyebrow: 'Add-ons',
    headline: 'Extend your sonic system.',
    items: [
      { name: 'Additional adaptations', price: '200€' },
      { name: 'Individual sonic piece', price: '400€' },
      { name: 'New channels or formats', price: '300€' },
      { name: 'Monthly sonic maintenance', price: '150€ / month' },
      { name: 'Strategic identity consultancy', price: '300€' },
    ],
  },
  work: {
    eyebrow: 'Selected work',
    headline: 'Identity in practice.',
    empty: 'Case studies coming soon.',
  },
  contact: {
    eyebrow: 'Start a project',
    headline: 'Let\'s talk.',
    body: 'Tell us about your brand and what you\'re looking to achieve. We\'ll get back to you within 48 hours.',
    fields: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      company: 'Brand or project',
      companyPlaceholder: 'Optional',
      message: 'Message',
      messagePlaceholder: 'Tell us about your project…',
      submit: 'Send message',
      sending: 'Sending…',
    },
    success: 'Message sent. We\'ll be in touch.',
    error: 'Something went wrong. Please try again or use the link below.',
    externalCta: 'Prefer a form? Fill it out here.',
  },
  footer: {
    tagline: 'Sound as identity.',
    rights: '© 2025 Auden. All rights reserved.',
  },
} as const;

export type Translations = typeof en;
