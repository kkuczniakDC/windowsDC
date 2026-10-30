# Architecture

## Overview

Single **Next.js App Router** application: static marketing pages, client islands for GSAP, and **Server Actions** for consultation email. No separate API routes, no global state library, no database.

```
┌─────────────────────────────────────────────────────────┐
│  app/layout.tsx (fonts, SiteHeader, SiteFooter)         │
│  SiteScrollShell (ScrollSmoother on `/` only)           │
├─────────────────────────────────────────────────────────┤
│  app/page.tsx → HomePage (RSC)                          │
│    Hero (RSC) │ sections (RSC) │ SignatureSequence (CC) │
├─────────────────────────────────────────────────────────┤
│  app/{windows|sliding-doors|entrance-doors|             │
│       architectural-glazing} → CategoryPage (RSC)       │
│    CategoryMedia │ CategoryMotion (CC)                  │
├─────────────────────────────────────────────────────────┤
│  app/consultation → page (RSC) + ConsultationForm (CC)  │
│                    → actions.ts (Server Action)         │
│                    → lib/consultation/*, lib/email/*    │
├─────────────────────────────────────────────────────────┤
│  app/privacy → static legal draft (RSC)                 │
└─────────────────────────────────────────────────────────┘
```

## Component boundaries

| Component | Server / Client | Role |
| --- | --- | --- |
| `HomePage` | Server | Composes homepage sections |
| `Hero` | Server | Responsive hero imagery via `getImageProps` + `<picture>` |
| `SignatureSequence` | Client | GSAP ScrollTrigger timeline |
| `SiteHeader` / `SiteFooter` | Server | Global chrome, anchor links |
| `CategoryPage` | Server | Shared category presentation, art-directed per `data-category` |
| `CategoryMedia` | Server | Replaceable image slot or designed CSS/SVG placeholder |
| `CategoryMotion` | Client | Category-page GSAP (`useGSAP`, matchMedia, reduced motion) |
| `ConsultationForm` | Client | Form state, accessibility, submit |
| `submitConsultationForm` | Server Action | Validation, rate limit, email |

**Coupling:** Homepage sections import images directly from `assets/`. Category pages use `CategoryMedia` for product slots and optional inspiration imports.

## Routing and navigation

- File-system routing under `src/app/`.
- Shared layout wraps all pages with the same header/footer (consultation/privacy use their own `<main id="main-content">`—duplicate skip target id per page, which is acceptable when one main per document).
- In-page anchors on `/` for systems, approach, architects, atmospheres.
- Category routes: `/windows`, `/sliding-doors`, `/entrance-doors`, `/architectural-glazing`.
- Route map centralized in `src/lib/brand.ts`.

## State management

- **No** Redux/Zustand/React Query.
- Consultation: React `useActionState` + server-returned form state (`form-state.ts`).
- GSAP: ephemeral timeline inside `useGSAP`; DOM `data-*` hooks for selectors.

## Styling architecture

1. `reset.css` → `tokens.css` → `global.css` imported once in layout.
2. Component styles via CSS modules (`*.module.css`).
3. Design tokens as CSS variables; fonts exposed as `--font-*` from `next/font`.

Future pages should reuse tokens and global utilities before introducing new patterns.

## Animation architecture

- Plugins register once via `registerGsapClientPlugins()` (`ScrollTrigger`, `ScrollSmoother`).
- Homepage: `SignatureSequence` (pinned scrub on desktop fine-pointer, no reduced motion), `ScrollDriftFigure`, `SiteScrollShell` smoother gated to `pathname === "/"`.
- Category pages: `CategoryMotion` only—no pins, no ScrollSmoother, no `data-speed`. Gated on `prefers-reduced-motion: no-preference`.
- Sequence fallback: vertical stack of three scenes without pin/scrub (CSS default `.scenes { flex-direction: column }`).

Keep new motion behind the same approval process (`.cursor/rules/gsap-animation.mdc`).

## Data and content

| Module | Status |
| --- | --- |
| `src/lib/content/categories.ts` | Typed category and family copy |
| `src/lib/content/index.ts` | Re-exports category helpers |
| `src/content/` | Empty placeholder |
| Homepage marketing copy | Still inline in TSX |

Future catalogue/admin can replace the category module without changing `CategoryPage` layout. Family `detailHref` is reserved and unset. See `docs/PRODUCT_CATEGORIES.md`.

## Email and security (consultation)

Flow:

1. Client submits `FormData` to Server Action.
2. Origin guard (`lib/consultation/origin.ts`).
3. Env check for Resend credentials.
4. In-memory rate limit (`rate-limit.ts`).
5. Zod validation (`schema.ts`).
6. Plain-text email via `createResendEmailProvider()`.

Bot mitigation: honeypot, minimum form duration, rate limit—not a CAPTCHA layer.

## Configuration

- `next.config.ts`: minimal; caching/prefetch flags enabled.
- TypeScript path alias `@/*` → `src/*`.
- Environment variables only for consultation mail (see `.env.example`).

## Limitations for extension

1. **Static generation** suits marketing; product catalog may need dynamic segments + ISR.
2. **Asset imports** from outside `public/` work with Next but tie media to build graph—large unused files still affect repo size, not bundle, until imported.
3. **Single layout**—future section-specific headers or footers need layout groups (`app/(marketing)/`, etc.).
4. **No i18n** framework present.

## Recommended structural evolution (Etap 2+)

- Route groups for marketing vs. admin (later).
- `routes` + optional `navConfig` array driving header/footer (DRY).
- `components/motion/` for approved shared GSAP helpers.
- `lib/content/` for loaders and normalized types.

These are recommendations only; the current flat structure is appropriate for the existing scope.
