# Architecture

## Overview

Single **Next.js App Router** application: static marketing pages, client islands for GSAP, **Server Actions** for consultation email, and a **frontend-only admin preview**. No separate API routes, no global state library, no database.

```
┌─────────────────────────────────────────────────────────┐
│  app/layout.tsx (fonts, tokens, body)                   │
├──────────────────────────┬──────────────────────────────┤
│  app/(marketing)/layout  │  app/admin-preview/layout    │
│  skip-link, SiteHeader,  │  AdminPreviewProvider,       │
│  SiteFooter,             │  AdminShell, demo banner     │
│  SiteScrollShell (`/` )  │  noindex / nofollow          │
├──────────────────────────┼──────────────────────────────┤
│  (marketing)/page.tsx    │  admin-preview/*             │
│  HomePage (RSC)          │  Overview / products /       │
│  categories, about,      │  categories / media /        │
│  architects,             │  content / social            │
│  consultation, privacy   │  session React mock only     │
└──────────────────────────┴──────────────────────────────┘
```

## Component boundaries

| Component | Server / Client | Role |
| --- | --- | --- |
| `HomePage` | Server | Composes homepage sections |
| `Hero` | Server | Responsive hero imagery via `getImageProps` + `<picture>` |
| `SignatureSequence` | Client | GSAP ScrollTrigger timeline |
| `SiteHeader` / `SiteFooter` | Server | Global chrome; `SiteNavLink` client island for `aria-current` |
| `EditorialPage` | Server | Shared About / Architects shell (ink intro, no GSAP) |
| `CategoryPage` | Server | Shared category presentation, art-directed per `data-category` |
| `CategoryMedia` | Server | Replaceable image slot or designed CSS/SVG placeholder |
| `CategoryMotion` | Client | Category-page GSAP (`useGSAP`, matchMedia, reduced motion) |
| `ConsultationForm` | Client | Form state, accessibility, submit |
| `submitConsultationForm` | Server Action | Validation, rate limit, email |
| `AdminPreviewProvider` | Client | Session mock products, content clones, media order |
| `AdminShell` / views | Client | Isolated workspace chrome and six demo screens |

**Coupling:** Homepage sections import images directly from `assets/`. Category pages use `CategoryMedia` for product slots and optional inspiration imports. Admin preview imports a subset of those stills plus About/Architects images; it must not import the large unused JPEG or MP4s.

## Routing and navigation

- File-system routing under `src/app/`.
- Marketing layout (`(marketing)`) wraps public pages with skip-link, header, footer, and `SiteScrollShell` (consultation/privacy use their own `<main id="main-content">`—duplicate skip target id per page, which is acceptable when one main per document).
- Admin preview is a **sibling** of `(marketing)`, not a child, so it does not inherit site chrome.
- In-page anchors on `/` for systems, approach, architects, atmospheres.
- Category routes: `/windows`, `/sliding-doors`, `/entrance-doors`, `/architectural-glazing`.
- Editorial routes: `/about`, `/architects`. Contact remains `/consultation`.
- Admin demo: `/admin-preview` and child routes. Not listed in `brand.ts` `routes`.
- Public route map centralized in `src/lib/brand.ts`.

## State management

- **No** Redux/Zustand/React Query.
- Consultation: React `useActionState` + server-returned form state (`form-state.ts`).
- GSAP: ephemeral timeline inside `useGSAP`; DOM `data-*` hooks for selectors.
- Admin preview: React context (`AdminPreviewProvider`). In-memory only; refresh resets. No `localStorage`.

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
| `src/lib/content/about.ts` / `architects.ts` | Typed editorial copy |
| `src/lib/content/index.ts` | Re-exports content helpers |
| `src/content/` | Empty placeholder |
| Homepage marketing copy | Still inline in TSX |
| `src/lib/admin-preview/` | Session mock types/seed/media catalog (does not persist) |

Future catalogue/admin can replace the category module without changing `CategoryPage` layout. Family `detailHref` is reserved and unset. See `docs/PRODUCT_CATEGORIES.md`. The `/admin-preview` UI is a disposable prototype of editor chrome, not the persistence layer.

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
3. **Route groups**—`(marketing)` vs `admin-preview` is in place. Do not re-wrap admin with `SiteHeader`/`SiteFooter`.
4. **No i18n** framework present.
5. **Admin preview on production** is unauthenticated URL space. Etap 3 must add a real auth/data boundary; do not “just connect” the mock provider to Postgres.

## Recommended structural evolution (Etap 3+)

- Persistence and auth behind a real admin (or headless CMS), separate from the Etap 2.5 mock.
- `routes` + optional `navConfig` array driving header/footer (DRY). Keep `/admin-preview` out of public nav until a staff tool exists.
- `components/motion/` for approved shared GSAP helpers.
- `lib/content/` for loaders and normalized types.

These are recommendations only. Do not treat the current mock provider as the Etap 3 content layer.
