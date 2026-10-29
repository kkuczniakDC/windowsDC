# Architecture

## Overview

Single **Next.js App Router** application: mostly static marketing pages, one **client island** for GSAP, and **Server Actions** for consultation email. No separate API routes, no global state library, no database.

```
┌─────────────────────────────────────────────────────────┐
│  app/layout.tsx (fonts, SiteHeader, SiteFooter)         │
├─────────────────────────────────────────────────────────┤
│  app/page.tsx → HomePage (RSC)                          │
│    Hero (RSC) │ sections (RSC) │ SignatureSequence (CC) │
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
| `ConsultationForm` | Client | Form state, accessibility, submit |
| `submitConsultationForm` | Server Action | Validation, rate limit, email |

**Coupling:** Homepage sections import images directly from `assets/`. There is no shared `Media` abstraction yet.

## Routing and navigation

- File-system routing under `src/app/`.
- Shared layout wraps all pages with the same header/footer (consultation/privacy use their own `<main id="main-content">`—duplicate skip target id per page, which is acceptable when one main per document).
- In-page anchors on `/` for systems, approach, architects, atmospheres.
- Route map centralized in `src/lib/brand.ts`—extend here when adding pages.

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

- GSAP is **localized** to `SignatureSequence` (good for maintenance).
- Enhancement gate matches CSS breakpoints: desktop-ish viewport, fine pointer, no reduced motion.
- Fallback: vertical stack of three scenes without pin/scrub (CSS default `.scenes { flex-direction: column }`).

**Recommendations (future, not implemented):**

- Extract shared `registerGsapOnce()` if more motion components appear.
- Add optional `ScrollTrigger.refresh()` on font/load if layout shift appears in QA.
- Keep new motion behind the same approval process (`.cursor/rules/gsap-animation.mdc`).

## Data and content

| Module | Status |
| --- | --- |
| `src/lib/content/index.ts` | Stub |
| `src/content/` | Empty placeholder |
| Marketing copy | Inline in TSX |

**Recommendation:** Introduce typed content (MDX, JSON, or CMS) when Etap 2+ adds pages—avoid scattering strings across components.

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
