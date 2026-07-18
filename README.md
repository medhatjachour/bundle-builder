# Bundle Builder

A polished React prototype for a multi-step security bundle builder built with Next.js and Zustand.

## Features

- Four-step accordion builder with live selected counts
- Product cards with optional badges, variant selection, and synchronized quantity steppers
- Live review panel that updates totals, savings, and bundle summary in real time
- Local persistence so the configured system is restored after refreshes

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the experience.

## Build

```bash
npm run build
```

## Notes

- Product data is stored in the local JSON file at [data/products.json](data/products.json).
- The current prototype focuses on the core UI flow and client-side persistence, and uses local state plus Zustand for the bundle summary.
