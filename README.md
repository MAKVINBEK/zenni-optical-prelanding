# Zenni Optical promotional prelanding

An independent single-page promotional concept built with React, Vite, and TypeScript. The page sends visitors only to official `zennioptical.com` destinations and does not contain checkout, payment, sign-up, or simulated order flows.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Production commands:

```bash
npm run lint
npm run build
npm run preview
```

## Analytics setup

Copy the environment template and add only the IDs that are needed:

```bash
cp .env.example .env.local
```

Supported variables:

- `VITE_GA_ID` — Google Analytics 4 measurement ID (`G-...`).
- `VITE_GTM_ID` — Google Tag Manager container ID (`GTM-...`).
- `VITE_YM_ID` — numeric Yandex Metrika counter ID.

All variables are optional. A missing or malformed value is ignored; its script is not requested. Analytics scripts are inserted asynchronously after the React app renders. Yandex Metrika is initialized with link tracking, click map, and Webvisor enabled.

Every outbound CTA uses the shared `TrackedLink` component and `trackCta` helper. A click records `cta_click` with:

- `label`
- `section`
- `destination_url`

The event is pushed to `dataLayer`, sent to GA4 when configured, and sent through `reachGoal` to Yandex Metrika when configured. The destination then opens in a new browser tab.

## Project structure

- `src/App.tsx` — semantic page structure, responsive navigation, sections, and CTA destinations.
- `src/App.css` — editorial layout, responsive states, and reduced-motion handling.
- `src/components/TrackedLink.tsx` — single tracked CTA component.
- `src/lib/analytics.ts` — optional GA4, GTM, Yandex Metrika, Webvisor, and CTA event integration.
- `src/assets/` — local responsive AVIF/WebP campaign imagery.
- `index.html` — page title, SEO, Open Graph, Twitter card, and theme metadata.

## Performance and accessibility notes

- No UI or animation libraries and no third-party web fonts.
- Hero art is pre-sized, responsive, eagerly loaded, and given high fetch priority.
- Below-the-fold imagery is lazy-loaded with AVIF and WebP sources.
- All raster images have intrinsic dimensions to prevent layout shift.
- Motion uses only opacity and transforms and is disabled by `prefers-reduced-motion`.
- The page includes a skip link, semantic regions, keyboard focus styles, a keyboard-operable mobile menu, useful alt text, and touch-friendly controls.
- The layout is designed from 320 px through large desktop widths without horizontal scrolling.

## Official information sources

Marketing copy is limited to product directions supported by Zenni’s official website:

- [Zenni Optical home](https://www.zennioptical.com/)
- [All glasses](https://www.zennioptical.com/b/all-glasses)
- [Women’s glasses](https://www.zennioptical.com/b/all-women-glasses)
- [Men’s glasses](https://www.zennioptical.com/b/all-men-glasses)
- [Sunglasses](https://www.zennioptical.com/b/all-sunglasses)
- [Virtual Try-On help](https://www.zennioptical.com/help/frames-fitting/virtual-try-on)

The two campaign images are original AI-generated assets created for this technical concept, then stored locally and optimized into responsive AVIF/WebP variants. They do not reproduce Zenni’s official photography.

## Disclaimer

Zenni and Zenni Optical are trademarks of their respective owner. This repository is an independent technical assessment and is not affiliated with or endorsed by Zenni Optical.
