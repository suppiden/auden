# Auden — Project Overview

## Structure

```
auden/
├── public/
│   ├── favicon.svg                  Waveform mark placeholder
│   ├── robots.txt
│   └── og-image.jpg                 ⚠ MISSING — create 1200×630px
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro         HTML shell, SEO head, JSON-LD, hreflang, OG/Twitter
│   │
│   ├── components/
│   │   ├── Nav.astro                Sticky nav with mobile menu + lang switcher
│   │   ├── Footer.astro
│   │   └── ContactForm.tsx          React island — EmailJS form
│   │
│   ├── sections/
│   │   ├── Hero.astro               Full-viewport, animated waveform bars, headline + CTAs
│   │   ├── Offer.astro              Business model — 3 brand pillars
│   │   ├── Packages.astro           Dark section — 3 pricing tiers
│   │   ├── Extras.astro             Add-on list
│   │   ├── Portfolio.astro          Data-driven, graceful empty state
│   │   └── Contact.astro            2-col layout with React form island
│   │
│   ├── i18n/
│   │   ├── en.ts                    All English copy (source of truth)
│   │   ├── es.ts                    All Spanish copy
│   │   └── utils.ts                 getTranslations(), getLangFromUrl()
│   │
│   ├── data/
│   │   └── portfolio.ts             PortfolioItem[] — add real projects here
│   │
│   ├── styles/
│   │   └── global.css               Tailwind layers + design system utilities
│   │
│   └── pages/
│       ├── index.astro              / → English
│       ├── es/
│       │   └── index.astro          /es/ → Spanish
│       └── sitemap.xml.ts           Hand-rolled sitemap endpoint
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── .env.example                     Copy to .env and fill in real values
```

---

## Design system

| Token      | Value     | Usage                          |
|------------|-----------|--------------------------------|
| `cream`    | #F5F4F0   | Background                     |
| `charcoal` | #1A1A1A   | Primary text, buttons, dark bg |
| `mid`      | #6B6B6B   | Subtitles, labels, placeholders|
| `border`   | #E0DED9   | Dividers, form inputs          |

Typography is currently a system font stack. Swap it in `tailwind.config.mjs` once the brand font arrives.

---

## Next steps

### 1 — Logo
Replace the text placeholder in `Nav.astro` and `Footer.astro`:
```astro
<!-- Find this line in both files and replace with an <img> tag -->
<span class="text-lg font-serif tracking-widest text-charcoal">AUDEN</span>
```

### 2 — OG image
Create `public/og-image.jpg` at 1200×630px.
It is referenced in `BaseLayout.astro` for Open Graph and Twitter cards.

### 3 — Contact form (EmailJS)
1. Sign up at https://emailjs.com
2. Create a service (Gmail or other) and an email template
3. Copy `.env.example` to `.env` and fill in the three keys:
```
PUBLIC_EMAILJS_SERVICE_ID=your_service_id
PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4 — External form link
Set `PUBLIC_EXTERNAL_FORM_URL` in `.env` to your Typeform / Tally / Google Form URL.
This appears as a secondary CTA in the contact section.

### 5 — Brand font
When the brand typeface is confirmed:
1. Add the font files to `public/fonts/` or import via `<link>` in `BaseLayout.astro`
2. Update the `fontFamily.sans` (and/or `fontFamily.serif`) arrays in `tailwind.config.mjs`

### 6 — Portfolio
Add items to `src/data/portfolio.ts`.
Each item supports: client name, category, description, cover image, audio preview URL, case study link, and year.
The section renders gracefully with zero items and scales with any number.

### 7 — Real domain
If the domain is not `auden.studio`, update it in three places:
- `astro.config.mjs` → `site:`
- `src/layouts/BaseLayout.astro` → OG image URL and JSON-LD
- `src/pages/sitemap.xml.ts` → `SITE` constant

### 8 — Deploy
The project outputs fully static HTML. It can be deployed to:
- **Vercel** — connect the repo, zero config needed
- **Netlify** — same
- **Cloudflare Pages** — same
- Any static host (`dist/` folder after `npm run build`)

---

## Commands

```bash
npm run dev      # Start local dev server (http://localhost:4321)
npm run build    # Build for production → dist/
npm run preview  # Preview the production build locally
```
