# Void Craft — Building Intelligent Businesses

Premium single-page agency site for **Void Craft**, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## Run

```bash
npm install
npm run dev      # http://localhost:3000 (use -p 3100 if 3000 is busy)
npm run build    # production build
npm run start    # serve production build
```

## Structure

```
app/
  layout.tsx        # fonts (Inter Tight / Inter / JetBrains Mono), SEO metadata
  page.tsx          # section composition
  globals.css       # design tokens, dot-grid & noise textures, reduced-motion
components/
  Nav.tsx           # fixed glass nav, mobile menu
  Hero.tsx          # word-reveal headline, live-systems feed card, drawn pipeline
  Clients.tsx       # logo marquee
  Metrics.tsx       # count-up stats on bone band
  Transformation.tsx# chaos → system storytelling panels (animated SVG paths)
  DecisionStream.tsx# streaming trigger→action rows + giant blur-reveal stat
  Services.tsx      # 8 spotlight-hover cards
  Why.tsx           # two-tone headline, scroll-fill paragraph, 4 pillars
  ProjectJourney.tsx# scroll-drawn wire: volt pills, elbow connectors, showcase panels
  Process.tsx       # 6-step timeline with scroll-drawn spine
  Testimonials.tsx  # quote cards
  FAQ.tsx           # accessible accordion
  FinalCTA.tsx      # full-bleed volt conversion section
  Footer.tsx        # links + giant rising wordmark
  motion/           # Reveal, WordReveal, ScrollFillText, Counter, Magnetic
  ui/               # Button, SectionLabel, Icon
lib/data.ts         # all copy: services, case studies, process, FAQs, metrics
```

## Design system

- **Colors** — `void` #0A0A0C, `bone` #F2F0E8, `volt` #0B4FFF (electric royal blue), signal #FF4D2E, mint #3DDC97. Sections alternate full-bleed void → bone → volt bands.
- **Type** — Inter Tight for display (tight tracking, 0.98 leading), Inter for body, JetBrains Mono for uppercase micro-labels.
- **Motion** — 0.8s reveals on `cubic-bezier(0.16, 1, 0.3, 1)`, masked word reveals, scroll-drawn SVG paths, count-ups, magnetic buttons, cursor spotlight cards. All animation respects `prefers-reduced-motion`.

All content lives in `lib/data.ts` — edit copy there without touching components.

## Adding real project screenshots

Each case study in `lib/data.ts` has an `image: string | null` field. Drop a
screenshot into `public/projects/` (e.g. `public/projects/ai-receptionist.png`)
and set `image: "/projects/ai-receptionist.png"` — the showcase panel swaps the
gradient placeholder for the image automatically (16:9, object-cover).
