# Vesper Labs

Vesper Labs is a premium digital innovation studio website — a dark, minimalist portfolio. The design philosophy is simple: precision over noise, motion with purpose, and typography that speaks for itself.

---

## What's in here

This is a plain HTML/CSS/JS project. No frameworks, no build step, no dependencies. Just three files doing a lot of heavy lifting.

```
vesper-labs/
├── index.html      # Main landing page
├── team.html       # Team page
├── styles.css      # All styles — design tokens, components, animations
├── script.js       # Custom cursor, matrix rain, preloader, sticky nav
└── package.json    # npm placeholder (for future dependencies)
```

---

## Running it

If you have Node installed:

```bash
npm start
```

That opens the site at `http://localhost:3000` via `npx serve`.

Alternatively, open `index.html` directly in your browser — it works fine without a server since there's no backend.

---

## What makes it feel premium

A few things were deliberately crafted to push beyond a basic site:

- **Matrix rain canvas** — A full-screen `<canvas>` behind the hero text draws falling Latin, Greek, and Katakana characters in real time, throttled to 20fps for a cinematic look. It pauses automatically when scrolled off-screen.
- **Preloader** — On every page load, `vspr.` fades in with an animated progress bar, then the preloader sweeps away to reveal the site.
- **Custom cursor** — The OS cursor is hidden. A dot and trailing ring follow the mouse with easing. Interactive elements cause it to morph.
- **Sticky header with blur** — After 60px of scroll, the header gains a frosted glass effect using `backdrop-filter`.
- **Active section nav** — As you scroll, the nav link for the section currently in view underlines itself, tracked via Intersection Observer.
- **Magnetic elements** — Buttons and links have a subtle magnetic pull toward the cursor on hover.
- **Scroll reveal** — Text sections fade and translate in as they enter the viewport.

---

## Design system

All design decisions live in CSS custom properties at the top of `styles.css`:

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
