# Frontend Take-Home Bundle Builder

A polished React prototype for a multi-step security bundle builder built with Next.js, Tailwind CSS, and Zustand. The experience is designed to mirror the requested take-home brief with a four-step accordion builder, interactive product cards, and a live review panel that updates as the shopper configures their bundle.

## Overview

This project delivers a production-style frontend experience for assembling a security bundle. It focuses on:

- a multi-step accordion experience for selecting products
- data-driven product cards with pricing, badges, and variants
- synchronized quantity controls across the builder and review panel
- a live summary that recalculates totals and savings in real time
- persistent state so the user’s configuration can be restored after a refresh

## What the app includes

### Builder experience
- Four-step accordion flow: Cameras, Plan, Sensors, and Accessories
- Step headers with the requested “STEP X OF 4” presentation
- Expand/collapse interaction with selection counters and next-step navigation
- Product cards rendered from structured JSON data rather than hardcoded markup

### Product cards
- Optional discount badges
- Product images, titles, descriptions, and a Learn More link
- Variant selection for products that support it
- Quantity steppers that update the selected bundle state
- Selected-state styling for items with a positive quantity

### Review panel
- Grouped summary for Cameras, Sensors, Accessories, and Plan
- Thumbnail-based line items with independent quantity controls
- Pricing breakdown, savings messaging, and checkout/save actions
- A responsive, desktop-first layout that remains usable on smaller screens

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand

## Project structure

- [app](app) — app entry and main layout
- [components](components) — accordion, product cards, review panel, stepper, and selectors
- [data](data) — local product JSON used to drive the UI
- [store](store) — Zustand store for bundle state and persistence
- [utils](utils) — helpers for formatting and review-item generation

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Build

```bash
npm run build
```

## Data source

Product data is stored locally in [data/products.json](data/products.json), making the UI easy to extend and update without changing component logic.

## Persistence

The bundle state is persisted in the browser using Zustand persistence, so a saved configuration can be restored after reload.

## Notes

This implementation focuses on the core experience and interaction requirements from the take-home brief. It is a strong prototype for a production-style UI, while still leaving room for more fine-grained visual refinement against a specific Figma reference.
