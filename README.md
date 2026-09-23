# Yumchi's Portfolio

Personal portfolio site with a legacy Roblox theme, built with Next.js (static export) and Tailwind CSS.

## Prerequisites

- **Node.js** (v18+)

## Getting Started

```bash
git clone https://github.com/Zyn-ic/portfolio-website.git
cd portfolio-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build (static export to `out/`)
- `npm start` — serve the production build
- `npm run lint` — Biome lint + `tsc --noEmit`
- `npm run format` — Biome format

## Content

All site content lives in JSON files under `src/data/`:

- `about.json` — name, title, location, bio, skills
- `projects.json` — project cards (images, features, links)
- `contact.json` — contact cards

Project images can be remote URLs. Imgur GIFs are served as pausable MP4s automatically.

## Features

- Horizontally-scrolling project tiles with thumbnail carousels and fullscreen lightbox
- Animated GIFs pause when tabbed out, unfocused, or scrolled offscreen
- Light/dark legacy-Roblox theme with pixel display type (Pixelify Sans) and Source Sans body

## Branches

- `main` — current Roblox theme
- `roblox-theme` — Roblox theme working branch
- `paper-theme` — previous paper-craft theme

## Deployment

Static export (`out/`) via `next.config.js`, deployed with the included `netlify.toml`.

## Tech

- [Next.js 16](https://nextjs.org/) — App Router, static export
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Biome](https://biomejs.dev/) — linting/formatting
- [Bippy](https://github.com/lxsmnsyc/bippy) — React dev tools

## License

[MIT](./LICENSE)
