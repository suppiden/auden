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
    about: 'About us',
    work: 'Work',
    contact: 'Contact',
    langSwitch: 'Español',
    langSwitchHref: '/es/',
  },
  hero: {
    eyebrow: 'Sonic Branding Agency',
    title: 'AUDEN',
    headline: 'Sound as identity.',
    subheadline:
      'We create original sonic identities for brands that want to be recognized without being seen.',
    cta: 'Start a project',
    ctaHref: 'https://k1ttvgo8.forms.app/auden',
    secondary: 'See our work',
    secondaryHref: '#work',
    about: 'About us',
    aboutHref: '#offer',
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
  identity: {
    eyebrow: 'Our offer',
    headline: 'Auden Sonic Identity.',
    description:
      'Our flagship product. A complete sonic identity built from scratch, following the Auden Sonic Method — from brand research to final delivery.',
    includes: [
      'Original audio logo + variations',
      'Complete sonic brand document',
      'Mood, emotion & sonic character',
      'Strategic sonic identity guide',
      'Full commercial usage rights',
    ],
    cta: 'Start a project',
    methodEyebrow: 'Auden Sonic Method',
    methodHeadline: 'How we work.',
    phases: [
      {
        number: '01',
        name: 'Brand Decode',
        description:
          'We study your brand, audience, and competitive landscape to understand exactly what your sound needs to communicate.',
      },
      {
        number: '02',
        name: 'Sonic Territory',
        description:
          'We map the sonic landscape of your category and define the distinctive territory your brand will own.',
      },
      {
        number: '03',
        name: 'Sonic Blueprint',
        description:
          'We design the complete sonic architecture — mood, tonality, emotion, and all signature sonic elements.',
      },
      {
        number: '04',
        name: 'Sonic Production',
        description:
          'We produce and deliver all final sonic assets, ready to deploy across every format and touchpoint.',
      },
    ],
    servicesEyebrow: 'Individual services',
    servicesHeadline: 'À la carte.',
    services: [
      { name: 'Additional adaptations' },
      { name: 'Individual sonic piece' },
      { name: 'New channels or formats' },
      { name: 'Monthly sonic maintenance' },
      { name: 'Strategic identity consultancy' },
    ],
  },
  work: {
    eyebrow: 'Selected work',
    headline: 'Identity in practice.',
    empty: 'Case studies coming soon.',
  },
  contact: {
    eyebrow: 'Start a project',
    headline: 'Shape your sound.',
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
  extras: {
    eyebrow: 'Individual services',
    headline: 'À la carte.',
    items: [
      { name: 'Additional adaptations', price: 'On request' },
      { name: 'Individual sonic piece', price: 'On request' },
      { name: 'New channels or formats', price: 'On request' },
      { name: 'Monthly sonic maintenance', price: 'On request' },
      { name: 'Strategic identity consultancy', price: 'On request' },
    ],
  },
  footer: {
    tagline: 'Sound as identity.',
    rights: '© 2025 Auden. All rights reserved.',
  },
} as const;

export type Translations = typeof en;
