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
    work: 'Trabajo',
    contact: 'Contacto',
    langSwitch: 'English',
    langSwitchHref: '/',
  },
  hero: {
    eyebrow: 'Agencia de Sonic Branding',
    headline: 'El sonido como identidad.',
    subheadline:
      'Creamos identidades sonoras originales para marcas que quieren ser reconocidas sin necesidad de ser vistas.',
    cta: 'Iniciar un proyecto',
    ctaHref: '#contact',
    secondary: 'Ver nuestro trabajo',
    secondaryHref: '#work',
  },
  offer: {
    eyebrow: 'Lo que hacemos',
    headline: 'El sonido es tu activo de marca más infrautilizado.',
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
  packages: {
    eyebrow: 'Oferta',
    headline: 'Tres niveles de identidad sonora.',
    items: [
      {
        tier: '01',
        name: 'Sonic Branding',
        price: '800€',
        positioning: 'Para marcas que necesitan una firma sonora clara y profesional para sus contenidos digitales.',
        result: 'Una identidad de audio distintiva que refuerza el reconocimiento de marca.',
        includes: [
          'Audio logo original (2–4 seg)',
          '1 variación funcional',
          'Mood sonoro esencial',
          'Emoción y carácter principal',
          'Documento básico de uso',
          'Derechos de uso comercial digital',
          '1 ronda de revisión',
        ],
      },
      {
        tier: '02',
        name: 'Sonic Identity Pro',
        price: '1.500€',
        positioning: 'Para marcas activas que generan contenido y campañas de forma frecuente.',
        result: 'Un sistema sonoro completo para publicidad y redes sociales.',
        includes: [
          'Audio logo + 2 variaciones',
          'Bed musical (10–20 seg)',
          'Adaptación sonora para 1 canal',
          'Mood sonoro definido',
          'Mini guía de uso',
          'Derechos de uso comercial ampliados',
          '2 rondas de revisión',
        ],
        featured: true,
      },
      {
        tier: '03',
        name: 'Sonic Branding Estratégico',
        price: '2.500€',
        positioning:
          'Para marcas que buscan coherencia, posicionamiento a largo plazo y escalabilidad total.',
        result: 'Una identidad sonora completa diseñada para durar y escalar.',
        includes: [
          'Audio logo completo + variaciones',
          'Sistema sonoro de marca completo',
          'Bed musical, transición y cierre',
          'Mood estratégico, emoción, energía, timbres y tono',
          'Adaptaciones para 2–3 formatos',
          'Guía estratégica de identidad sonora',
          'Derechos de uso comercial completos',
          '3 rondas de revisión',
          '1 mes de soporte ligero para ajustes',
        ],
      },
    ],
  },
  extras: {
    eyebrow: 'Complementos',
    headline: 'Amplía tu sistema sonoro.',
    items: [
      { name: 'Adaptaciones adicionales', price: '200€' },
      { name: 'Pieza sonora individual', price: '400€' },
      { name: 'Nuevos canales o formatos', price: '300€' },
      { name: 'Mantenimiento sonoro mensual', price: '150€ / mes' },
      { name: 'Consultoría estratégica de identidad sonora', price: '300€' },
    ],
  },
  work: {
    eyebrow: 'Trabajo seleccionado',
    headline: 'Identidad en práctica.',
    empty: 'Próximamente, casos de estudio.',
  },
  contact: {
    eyebrow: 'Inicia un proyecto',
    headline: 'Hablemos.',
    body: 'Cuéntanos sobre tu marca y lo que quieres conseguir. Te responderemos en menos de 48 horas.',
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
  },
  footer: {
    tagline: 'El sonido como identidad.',
    rights: '© 2025 Auden. Todos los derechos reservados.',
  },
};
