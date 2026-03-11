# Agent Brief — Build SEO-first Astro Landing Page for Auden

You are building a premium single-page landing page for a sonic branding agency called Auden.

## Objective

Create a responsive, high-performance, SEO-first landing page in Astro.
The site must feel premium, minimal, modern, editorial, and strategically positioned.
This is not a generic music studio website. It is a strategic sonic branding agency.

The landing page must be production-oriented, visually polished, easy to extend, and ready to grow later into a larger site or product ecosystem.

## Source of truth

If branding documents, business PDFs, visual references, logo files, typography files, copy docs, technical docs, or a sample JSX contact form are present in the repo or attached context, use them as the source of truth.
Do not invent a completely different style or positioning.
Use missing placeholders only where assets or final copy are not yet available.

## Core positioning

Auden is a sonic branding agency creating original sonic identities for brands and projects that want to differentiate through sound.

The positioning is:
- strategic-first, creative-second
- premium, minimal, calm, modern
- brand partner, not “music studio”
- focused on recognition, memory, consistency, and emotional intent

Core idea:
Sound as identity.

Core promise:
Make brands recognizable without being seen.

## Voice and copywriting rules

The copy must feel:
- short
- precise
- premium
- calm
- confident
- strategic
- never loud or hype-driven

Avoid:
- empty marketing fluff
- startup hype language
- excessive exclamation marks
- generic “creative agency” clichés
- music jargon such as “beats”, “vibes”, “fire”, etc.

Prefer language around:
- identity
- recognition
- memory
- system
- clarity
- precision
- texture
- signal
- consistency
- resonance
- craft

If final copy is not fully provided, write polished placeholder copy that matches this tone and is easy to replace later.

## Technical requirements

- Use Astro as the main framework
- Build primarily with `.astro` components
- Keep the site mostly static and server-rendered
- Do not build the site as a SPA
- Do not hydrate unnecessary components
- Use React only if needed for a truly interactive component, ideally only the contact form
- Keep JavaScript to the minimum necessary
- Make the site fully responsive and mobile-first
- Keep the structure clean and easy to scale

## Architecture requirements

Build a one-page landing page.

Same-page anchor navigation is allowed.
Do not create a large multi-page structure unless clearly needed for localization or SEO.

However, the site must be prepared for future growth:
- the portfolio will likely grow later
- the landing page may later become part of a larger website
- the implementation should not block future expansion

Use a clean structure such as:
- reusable sections/components
- centralized site config/data
- centralized translations/content
- clean layout and SEO utilities
- easy-to-extend portfolio data source

## Internationalization

The site will likely have two languages:
- Spanish
- English

Implement the project so that both languages are properly supported.

Preferred approach:
- route-based localization, not client-only text swapping
- e.g. localized routes such as `/` + `/en/` or `/es/` + `/en/`
- each locale should have its own metadata
- proper `lang` attribute
- proper canonical and hreflang setup

Do not build a fake translation layer that is hard to maintain.
Keep translations structured and easy to edit.

## SEO requirements

SEO is a top priority.

Implement:
- semantic HTML
- one clear H1
- correct heading hierarchy
- localized metadata per language
- title and meta description per locale
- canonical URLs
- hreflang
- Open Graph tags
- Twitter card tags
- sitemap
- robots setup
- clean internal anchor structure
- descriptive alt text where relevant
- strong performance and Core Web Vitals awareness

Prefer static output where possible.
Avoid anything that hurts performance without clear value.

If appropriate, add structured data / schema markup for:
- Organization
- WebSite
- Service

Only add schema that is truthful and relevant.

## Visual direction

The visual direction must feel like:
- calm precision
- editorial minimalism
- premium restraint
- subtle innovation

Design principles:
- strong typography
- generous whitespace
- restrained palette
- soft contrast
- elegant rhythm and spacing
- subtle lines, textures, wave-inspired motifs, grids, or signal-inspired visual language
- no gamer equalizers
- no cliché music visuals
- no noisy gradients
- no overdesigned “agency template” feel

Base palette direction:
- off-white / light neutral
- charcoal / near-black
- subtle accent only if needed

Typography:
- use the provided brand typeface once available
- fall back to a clean premium system until final font is added
- structure typography clearly for hero, section titles, service cards, and supporting copy

Animation:
- subtle only
- prioritize CSS or lightweight motion
- no heavy animation systems unless truly justified
- hero can include a refined full-viewport motion treatment related to sonic identity, but it must remain lightweight and elegant
- no autoplay audio
- no UX sounds by default

## Required sections

Build the landing page as a single-page experience with the following sections.

### 1. Hero / Home
Requirements:
- full viewport section
- prominent logo presence
- strong first impression
- concise headline and supporting copy
- premium CTA treatment
- optional subtle motion related to sound / signal / identity

The hero should communicate that Auden creates sonic identities for brands.

### 2. Core offer / Business model
This section should explain the main business clearly:
- sonic branding as the core offer
- what it is
- why it matters
- why it helps recognition, memory, and differentiation

This should not read like a music production service list.
It must read like a strategic brand service.

### 3. Offer cards / Packages
Display the three commercial offers clearly, with pricing and included items.

Use this information as the basis:

#### Package 1 — Sonic Branding
Price: 800€
For:
Brands that want a professional and recognizable sonic signature for digital content

Includes:
- original audio logo (2–4 seconds)
- 1 functional variation of the audio logo
- essential sonic mood
- main emotion
- sonic character
- basic usage document
- commercial digital usage rights
- 1 revision round

Result:
A clear sonic signature that reinforces brand recognition

#### Package 2 — AUDEN SONIC IDENTITY - PRO
Price: 1500€
For:
Active brands creating content and campaigns frequently

Includes:
- audio logo + 2 variations
- music bed (10–20 seconds)
- sonic adaptation for 1 main channel
- defined sonic mood
- mini usage guide
- expanded commercial usage rights
- 2 revision rounds

#### Package 3 — Strategic Sonic Branding
Price: 2500€
For:
Brands seeking coherence, positioning, and long-term scalability

Includes:
- full audio logo + variations
- sonic brand system
- music bed
- transition
- ending
- strategic sonic mood
- emotion
- energy
- timbres
- tone
- adaptations for 2–3 uses
- strategic sonic identity guide
- full commercial usage rights
- 3 revision rounds
- 1 month of light support for refinements and polish

Present the packages in a premium way.
Make them scannable.
Keep the layout elegant and conversion-oriented.

### 4. Extras
Add an extras section with the following items:

- additional adaptations — 200€
- individual piece — 400€
- new channels or formats — 300€
- monthly sonic maintenance — 150€/month
- strategic sonic identity consultancy — 300€

This section should feel complementary, not cluttered.

### 5. Portfolio
Create a portfolio section prepared for future growth.

Requirements:
- show a selected work / portfolio preview section
- support the fact that there may be very few items now
- do not make the section look empty or weak if there are only a few case studies
- structure the data so it can scale later
- make it easy to add more portfolio items without rewriting the section

If real portfolio assets are missing, create elegant placeholders and clearly mark where final content should go.

The portfolio implementation should be data-driven and easy to expand later.

### 6. Contact
Create a contact section with:
- a clear conversion-oriented contact form
- a secondary CTA linking to an external form
- accessible form states
- success and error states
- polished but restrained visual treatment

If a sample JSX form is provided:
- use it as a reference
- simplify and adapt it to the project’s design system
- if React is used, isolate it as an Astro island only for this form
- do not spread React across the whole site unnecessarily

Important:
- do not hardcode secrets, service IDs, template IDs, or private emails directly in reusable source code
- use environment variables for third-party services
- keep integration points clean
- if form integration cannot be safely completed, scaffold the component and leave a clear integration layer plus the external form CTA

## Optional supporting section
If it improves clarity without bloating the page, you may include one concise supporting section such as:
- methodology / process
- why sonic branding matters
- recognition / emotion / consistency pillars

If you include such a section, keep it concise and aligned with the brand strategy.

## UX and accessibility

- accessible contrast
- keyboard-friendly navigation
- visible focus states
- accessible labels and form validation
- reduced motion awareness where relevant
- responsive spacing and typography
- no intrusive effects

## Performance requirements

- optimize images
- avoid layout shift
- keep fonts efficient
- minimize JS
- no heavy libraries without strong justification
- no unnecessary client-side rendering
- no autoplay media
- no large animation payloads for decorative effects

Aim for a fast, polished, premium result.

## Implementation preferences

Prefer a structure similar to:
- `src/layouts`
- `src/components`
- `src/sections`
- `src/data` or `src/content`
- `src/i18n`
- `src/styles`
- reusable SEO helpers

Keep service/package data and portfolio data centralized, not scattered across markup.

## Deliverables

Produce:
1. the Astro landing page implementation
2. reusable components/sections
3. localized content structure
4. SEO setup
5. clean contact section integration
6. a maintainable project structure
7. a short note listing:
   - missing assets
   - missing final copy
   - integration placeholders
   - recommended next steps

## Final quality bar

The result must feel:
- premium
- intentional
- minimal
- strategically positioned
- SEO-conscious
- easy to scale

Do not output a generic template.
Do not output a playful music website.
Do not output a JS-heavy app.
Build a refined editorial landing page for a high-end sonic branding agency.