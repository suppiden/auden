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
    tagline: 'Audio Branding & Campaign Sound Studio',
    subheadline:
      'We create original sonic identities for brands that want to be recognized without being seen.',
    cta: 'Start a project',
    ctaHref: 'https://eez6xtvk.forms.app/auden-1',
    secondary: 'See our work',
    secondaryHref: '#work',
    about: 'About us',
    aboutHref: '#offer',
  },
  offer: {
    eyebrow: 'What we do',
    headline: 'Sound is your most underused brand asset.',
    intro:
      'Auden designs sonic identities and campaign sound that help brands become recognizable through audio.',
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
      'A complete sonic identity built from scratch using the Auden Sonic Method — translating brand strategy into sound across digital experiences and campaigns.',
    includes: [
      'Original audio logo + variations',
      'Music bed for campaigns',
      'Mood, emotion & sonic character',
      'Strategic sonic identity guide',
      'Commercial usage rights',
    ],
    cta: 'Start a project',
    methodEyebrow: 'Auden Sonic Method',
    methodHeadline: 'How we work.',
    phases: [
      {
        number: '01',
        name: 'Brand Decode',
        description:
          'Understanding the brand foundations including values, positioning, target audience and emotional tone.',
        points: [] as string[],
      },
      {
        number: '02',
        name: 'Sonic Territory',
        description:
          'We explore the sonic landscape around your brand to define a distinctive sonic territory for your brand.',
        points: [
          'Sound landscape analysis',
          'Competitive listening',
          'Definition of a sonic direction',
        ],
      },
      {
        number: '03',
        name: 'Sonic Blueprint',
        description:
          'The Sonic Blueprint is the strategic document that defines how the brand sounds and how its sonic identity should be used across different touchpoints. It translates the creative work into clear guidelines so the brand can apply sound consistently across campaigns, digital products and brand experiences.',
        points: [] as string[],
      },
      {
        number: '04',
        name: 'Sonic Production',
        description:
          'We produce and deliver the final sonic assets, ready to be used across campaigns, digital platforms and brand experiences.',
        points: [
          'Final audio logo and variations',
          'Campaign-ready sound assets',
          'Optimized formats for different platforms',
        ],
      },
    ],
    servicesEyebrow: 'Sound for campaigns',
    servicesHeadline: 'Auden Sound for Campaigns.',
    services: [
      { name: 'Campaign Sound Production' },
      { name: 'Sonic Mood Playlist' },
      { name: 'Brand Sound Toolkit' },
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
    body: 'Tell us about your brand and what you\'re looking to achieve. We\'ll get back to you as soon as possible.',
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
    emailLabel: 'Prefer email?',
    emailAddress: 'hello@audensonic.com',
  },
  extras: {
    eyebrow: 'Sound for campaigns',
    headline: 'Auden Sound for Campaigns.',
    items: [
      {
        name: 'Campaign Sound Production',
        includes: [
          'Original sound creation',
          'Sound design',
          'Sound effects',
          'Transitions',
          'Final audio production ready for use in campaigns',
        ],
      },
      {
        name: 'Sonic Mood Playlist',
        includes: [
          'Playlist aligned with the brand mood',
          'Musical references for campaigns and content',
          'Smooth and professional track transitions',
        ],
      },
      {
        name: 'Brand Sound Toolkit',
        includes: [
          'Brand stingers',
          'Whooshes and transitions',
          'Small sound elements for digital content',
        ],
      },
    ],
  },
  footer: {
    tagline: 'Sound as identity.',
    rights: '© 2025 Auden. All rights reserved.',
  },
} as const;

export type Translations = typeof en;
