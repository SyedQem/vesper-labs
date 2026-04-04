# Vesper Labs

Vesper Labs is a premium digital innovation studio website — a dark, minimalist portfolio. The design philosophy is simple: precision over noise, motion with purpose, and typography that speaks for itself.

The site is a **Vite + React** SPA with **Framer Motion** for scroll and entrance animations and **Lenis** for smooth scrolling (disabled when the user prefers reduced motion).

---

## What's in here

```
vesper-labs/
├── index.html          # Vite entry shell
├── public/
│   └── og-image.svg    # Open Graph asset
├── src/
│   ├── main.jsx        # App bootstrap, global CSS + Lenis CSS
│   ├── App.jsx         # Routes
│   ├── components/     # Layout, Header, Footer, Preloader, cursor, hero canvas
│   ├── pages/          # Home, Team
│   └── hooks/          # Hash scroll helper
├── styles.css          # Design tokens, layout, components
├── vite.config.js
└── vercel.json         # SPA fallback + /team.html → /team redirect
```

---

## Development

```bash
npm install
npm run dev
```

Opens the Vite dev server (default **http://localhost:5173**).

---

## Production build

```bash
npm run build
npm run preview
```

Output is **`dist/`**, suitable for static hosting. On Vercel, use the default Vite settings or set the output directory to `dist`.

---

## What makes it feel premium

- **Lenis** — Momentum-style smooth scroll (not used when `prefers-reduced-motion: reduce`).
- **Framer Motion** — Hero line stagger, section fade-ups, expertise row stagger, and short route transitions.
- **Matrix rain canvas** — Full-screen `<canvas>` behind the hero (static fill only under reduced motion).
- **Preloader** — `vspr.` with progress bar, then dismiss (instant when reduced motion).
- **Custom cursor** — Dot and ring with easing; morphs over interactive targets.
- **Sticky header** — Blur after scroll; scroll position from Lenis when enabled, otherwise `window`.
- **Active section nav** — Intersection Observer on the home page sections.
- **Magnetic elements** — Subtle pull on hover for `.magnetic` controls.
- **SEO** — `react-helmet-async` sets title, canonical, Open Graph, Twitter card, and Organization JSON-LD per route.

---

## Design system

Design tokens live at the top of `styles.css`:

| Token | Value |
|---|---|
| Background | `#030303` |
| Text | `#ffffff` |
| Muted text | `#888888` |
| Border | `rgba(255,255,255,0.1)` |
| Heading font | Space Grotesk |
| Body font | Inter |
| Easing | `cubic-bezier(0.19, 1, 0.22, 1)` |

---

## Founder

Built by **Qurb E Muhammad Syed** — driven by the belief that the best digital experiences live at the intersection of precision engineering and timeless design.
