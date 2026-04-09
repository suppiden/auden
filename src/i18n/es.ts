import type { Translations } from './en';

export const es: Translations = {
  lang: 'es',
  site: {
    title: 'Auden — Agencia de Sonic Branding',
    description:
      'Auden crea identidades sonoras originales para marcas que quieren diferenciarse a través del sonido. Sonic branding estratégico para el reconocimiento, la memoria y la consistencia.',
    ogImage: '/og-image.jpg',
  },
  nav: {
    offer: 'Nuestra oferta',
    about: 'Sobre nosotros',
    work: 'Trabajo',
    contact: 'Contacto',
    langSwitch: 'English',
    langSwitchHref: '/',
  },
  hero: {
    eyebrow: 'Agencia de Sonic Branding',
    title: 'AUDEN',
    headline: 'El sonido como identidad.',
    tagline: 'Audio Branding y Sonido para Campañas',
    subheadline:
      'Creamos identidades sonoras originales para marcas que quieren ser reconocidas sin necesidad de ser vistas.',
    cta: 'Iniciar un proyecto',
    ctaHref: 'https://eez6xtvk.forms.app/auden-1',
    secondary: 'Ver nuestro trabajo',
    secondaryHref: '#work',
    about: 'Sobre nosotros',
    aboutHref: '#offer',
  },
  offer: {
    eyebrow: 'Lo que hacemos',
    headline: 'El sonido es tu activo de marca más infrautilizado.',
    intro:
      'Auden diseña identidades sonoras y sonido para campañas que ayudan a las marcas a ser reconocibles a través del audio.',
    body: 'Las grandes marcas se recuerdan por cómo suenan. Una identidad sonora distintiva genera reconocimiento instantáneo, construye memoria emocional y transmite calidad antes de que se pronuncie una palabra. Auden diseña ese sistema: desde la primera nota hasta la arquitectura sonora completa de tu marca.',
    pillars: [
      {
        title: 'Reconocimiento',
        body: 'Una firma sonora consistente que activa el recuerdo de marca en cada punto de contacto.',
      },
      {
        title: 'Memoria',
        body: 'El sonido crea anclas emocionales. Las audiencias recuerdan lo que sienten, no solo lo que ven.',
      },
      {
        title: 'Consistencia',
        body: 'Un sistema sonoro coherente, adaptado a cada formato, canal y contexto.',
      },
    ],
  },
  identity: {
    eyebrow: 'Nuestra oferta',
    headline: 'Auden Sonic Identity.',
    description:
      'Una identidad sonora completa creada desde cero utilizando el Auden Sonic Method — traduciendo la estrategia de marca en sonido a través de experiencias digitales y campañas.',
    includes: [
      'Audio logo original + variaciones',
      'Music bed para campañas',
      'Mood, emoción y carácter sonoro',
      'Guía estratégica de identidad sonora',
      'Derechos de uso comercial',
    ],
    cta: 'Iniciar un proyecto',
    methodEyebrow: 'Auden Sonic Method',
    methodHeadline: 'Cómo trabajamos.',
    phases: [
      {
        number: '01',
        name: 'Brand Decode',
        description:
          'Comprensión de los fundamentos de la marca incluyendo valores, posicionamiento, audiencia objetivo y tono emocional.',
        points: [] as string[],
      },
      {
        number: '02',
        name: 'Sonic Territory',
        description:
          'Exploramos el paisaje sonoro alrededor de tu marca para definir un territorio sonoro distintivo para tu marca.',
        points: [
          'Análisis del paisaje sonoro',
          'Escucha competitiva',
          'Definición de una dirección sonora',
        ],
      },
      {
        number: '03',
        name: 'Sonic Blueprint',
        description:
          'El Sonic Blueprint es el documento estratégico que define cómo suena la marca y cómo debe utilizarse su identidad sonora en los diferentes puntos de contacto. Traduce el trabajo creativo en directrices claras para que la marca pueda aplicar el sonido de forma consistente en campañas, productos digitales y experiencias de marca.',
        points: [] as string[],
      },
      {
        number: '04',
        name: 'Sonic Production',
        description:
          'Producimos y entregamos los activos sonoros finales, listos para ser utilizados en campañas, plataformas digitales y experiencias de marca.',
        points: [
          'Audio logo final y variaciones',
          'Activos sonoros listos para campañas',
          'Formatos optimizados para diferentes plataformas',
        ],
      },
    ],
    servicesEyebrow: 'Sonido para campañas',
    servicesHeadline: 'Auden Sound for Campaigns.',
    services: [
      { name: 'Campaign Sound Production' },
      { name: 'Sonic Mood Playlist' },
      { name: 'Brand Sound Toolkit' },
    ],
  },
  work: {
    eyebrow: 'Trabajo seleccionado',
    headline: 'Identidad en práctica.',
    empty: 'Próximamente, casos de estudio.',
  },
  contact: {
    eyebrow: 'Inicia un proyecto',
    headline: 'Dale forma a tu sonido.',
    body: 'Cuéntanos sobre tu marca y lo que quieres conseguir. Te responderemos lo antes posible.',
    fields: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      company: 'Marca o proyecto',
      companyPlaceholder: 'Opcional',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto…',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
    },
    success: 'Mensaje enviado. Nos pondremos en contacto contigo.',
    error: 'Algo salió mal. Por favor inténtalo de nuevo o usa el enlace de abajo.',
    externalCta: '¿Prefieres un formulario? Rellénalo aquí.',
    emailLabel: '¿Prefieres email?',
    emailAddress: 'hello@audensonic.com',
  },
  extras: {
    eyebrow: 'Sonido para campañas',
    headline: 'Auden Sound for Campaigns.',
    items: [
      {
        name: 'Campaign Sound Production',
        includes: [
          'Creación de sonido original',
          'Diseño de sonido',
          'Efectos de sonido',
          'Transiciones',
          'Producción de audio final lista para campañas',
        ],
      },
      {
        name: 'Sonic Mood Playlist',
        includes: [
          'Playlist alineada con el mood de la marca',
          'Referencias musicales para campañas y contenido',
          'Transiciones de pistas suaves y profesionales',
        ],
      },
      {
        name: 'Brand Sound Toolkit',
        includes: [
          'Stingers de marca',
          'Whooshes y transiciones',
          'Pequeños elementos sonoros para contenido digital',
        ],
      },
    ],
  },
  footer: {
    tagline: 'El sonido como identidad.',
    rights: '© 2025 Auden. Todos los derechos reservados.',
  },
};
